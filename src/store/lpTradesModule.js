import axiosESI from "./axiosESI.ts";
import EVEMarket from "./axiosMarket_Appraisal"
import {TradeFilter} from "../model/Filter";
export const lpTradesModule = {
    namespaced : true,
    state(){
        return{
            trades : [],
            blueprints : [],
            mode : 'buy',
            filters : [],
            sortingFunction : null,
            isFetched : false,
        }
    },
    getters:{
        FilterTrades : (state) => (trades) =>{
            state.filters.forEach((filter) => {
                trades = trades.filter((trade) => {
                    return filter.filter_function({trade: trade, mode: state.mode})
                })
            })
            return trades
        },
        OrderTrades : (state) => (trades) => {
            if(state.sortingFunction){ return trades.sort(state.sortingFunction) }
            return trades
        },
        getTrades : (state, getters) => {
            let trades = [...state.trades]
            // Filtering
            trades = getters.FilterTrades(trades)
            // Sorting
            trades = getters.OrderTrades(trades)

            return trades
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
            if(!(arg instanceof Array)) {
                console.error(`Expected Array of ${TradeFilter}. Got ${arg}.`)
                return
            }

            // Array of Wrong Type check
            const a = arg.find(el => !(el instanceof TradeFilter))
            if(a) {
                console.error(`Expected ${TradeFilter}. Got ${a}.`)
                return
            }

            state.filters = arg
        },
        setSortingFunction(state, arg){
            // Wrong Type check
            if(typeof arg !== "function"){
                console.error(`Expected function. Got ${typeof arg}`)
                return
            }

            state.sortingFunction = arg
        },
        setIsFetched(state, arg){
            state.isFetched = arg
        }
    },
    actions: {
        async fetchTrades({commit}, corp_id){
            commit("setIsFetched", false)
            // Завершение выполнения, если corp_id не число
            if(typeof corp_id != 'number'){
                commit('setTrades', [])
                commit('setBlueprints', [])
                commit("setIsFetched", true)
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
            const marketInfoArray = await EVEMarket.getMarketInfoOfArray(type_ids)
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
            commit("setIsFetched", true)
        },
    },
}