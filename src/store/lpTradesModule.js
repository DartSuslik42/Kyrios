import axiosESI from "./axiosESI.js";
import axiosEVEMarketer from "./axiosEVEMarketer";
import {TradeFilter} from "../model/Filter";
export const lpTradesModule = {
    namespaced : true,
    state(){
        return{
            trades : [],
            blueprints : [],
            mode : 'buy',
            filters : [],
        }
    },
    getters:{
        getTrade : state => (type_id) => {
            return state.trades.find((obj)=>{
                return obj.type_id === type_id
            })
        },
        getFilteredTrades : state => {
            let filteredTrades = state.trades
            state.filters.forEach((filter)=>{
                filteredTrades = filteredTrades.filter((trade)=>{
                    return  filter.filter_function({trade : trade, mode : state.mode})
                })
            })
            return filteredTrades
        },
        getTrades : (state, getters) => {
            return getters.getFilteredTrades
        },
        getMode : state => {
            return state.mode
        },
    },
    mutations:{
        setTrades(state, arg){
            state.trades = arg
        },
        setBlueprints(state, arg){
            state.blueprints = arg
        },
        setMode(state, arg){
            if( arg === 'sell' || arg === 'buy') {
                state.mode = arg
            }else {
                console.error(`Ожидалось:'sell'|'buy', получено:${arg}`)
            }
        },
        setFilters(state, arg){
            // null & undefined check
            if(!(arg instanceof Array)) console.error(`Expected Array of ${TradeFilter}. Got ${arg}.`)

            // Array of Wrong Type check
            const a = arg.find(el => !(el instanceof TradeFilter))
            if(a) console.error(`Expected ${TradeFilter}. Got ${a}.`)

            state.filters = arg
        }
    },
    actions: {
        async fetchTrades({commit}, corp_id){
            // Завершение выполнения, если corp_id не число
            if(typeof corp_id != 'number'){
                commit('setTrades', [])
                commit('setBlueprints', [])
                return
            }

            // Получение всевозможных торговых позиций корпорации.
            let offers = await axiosESI.getCorpLPOffers(corp_id)

            // Формирование массива type_id всех элементов торговых позиций
            let type_ids = []
            offers.forEach((el)=>{
                type_ids.push(el.type_id)
                el.required_items.forEach((_el)=>{
                    type_ids.push(_el.type_id)
                })
            })

            // Запрос названий всех объектов с id = type_id
            const names = await axiosESI.getNamesByIDs(type_ids)

            // Инициализация поля "name" всем объектам в offers[], offers[].required_items[]
            offers.forEach((el)=>{
                el.name = names.find((obj)=>{
                    return obj.id === el.type_id
                }).name
                el.required_items.forEach((_el)=>{
                    _el.name = names.find((obj)=>{
                        return obj.id === _el.type_id
                    }).name
                })
            })

            // Разделение всех оферов на торговые позиции(есть в маркете) и чертежи
            let blueprints = []
            let trades = offers.filter((el)=>{
                if(el.name.includes("Blueprint")){
                    blueprints.push(el)
                    return false
                }
                return true
            })

            // Инициализация поля "market_info"
            const marketInfoArray = await axiosEVEMarketer.getMarketInfoOfArray(type_ids)
            for(let trade of trades) {
                trade.market_info = marketInfoArray.find((obj)=>{
                    return obj.type_id === trade.type_id
                })
                for(let item of trade.required_items){
                    item.market_info = marketInfoArray.find((obj)=>{
                        return obj.type_id === item.type_id
                    })
                }
            }

            commit('setTrades', trades)
            commit('setBlueprints', blueprints)
        },
    },
}