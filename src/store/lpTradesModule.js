import axiosESI from "./axiosESI.js";
import axiosEVEMarketer from "./axiosEVEMarketer";
// import axiosSDE from "./axiosSDE.js";
// import LocalStorage from "./LocalStorage.js";
export const lpTradesModule = {
    namespaced : true,
    state(){
        return{
            trades : [],
            blueprints : [],
            mode : 'buy',
        }
    },
    getters:{
        getTrades : state => () => {
            return state.trades
        },
        getTrade : state => (type_id) => {
            return state.trades.find((obj)=>{
                return obj.type_id === type_id
            })
        },
        getTradePrice : (state) => (trade) => {
            return trade.market_info[state.mode].weakAvg
        },
        getTradeTotalPrice : (state, getters) => (trade) => {
            return getters.getTradePrice(trade) * trade.quantity
        },
        getTradeRequiredItemsPrice : () => (trade) => {
            return trade.required_items.reduce((sum, el) => {
                return sum + el.market_info['sell'].weakAvg * el.quantity
            }, 0)
        },
        getTradeISK_per_LP : (state, getters) => (trade) => {
            return (getters.getTradePrice(trade) * trade.quantity - trade.isk_cost - getters.getTradeRequiredItemsPrice(trade)) / (trade.lp_cost ? trade.lp_cost : 1)
        },
        getTradeDailyVolume : (state) => (trade) => {
            return trade.market_info[state.mode].volume * 0.05
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
        }
    },
    actions: {
        async fetchTrades({commit}, corp_id){
            // Получение всевозможных торговых позиций корпорации.
            let offers = await axiosESI.getCorpLPOffers(corp_id)

            // Формирование массива type_id всех торговых элементов
            let type_ids = offers.map((el)=>{
                return el.type_id
            })
            offers.forEach((el)=>{
                el.required_items.forEach((_el)=>{
                    type_ids.push(_el.type_id)
                })
            })

            // Формирование массива уникальных type_id
            type_ids = type_ids.filter((el, idx, arr)=>{
                return arr.indexOf(el) === idx
            })

            // Запрос названий всех объектов с id = type_id
            const names = await axiosESI.getNamesByIDs(type_ids)

            // Добавление поля "name" всем объектам в offers[], offers[].required_items[]
            offers.forEach((el)=>{
                el['name'] = names.find((obj)=>{
                    return obj.id === el.type_id
                }).name
                el.required_items.forEach((_el)=>{
                    _el['name'] = names.find((obj)=>{
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

            // Добавление поля "market_info"
            const marketInfoArray = await axiosEVEMarketer.getMarketInfoOfArray(type_ids)
            for(let trade of trades) {
                trade["market_info"] = marketInfoArray.find((obj)=>{
                    return obj.type_id === trade.type_id
                })
                for(let item of trade.required_items){
                    item["market_info"] = marketInfoArray.find((obj)=>{
                        return obj.type_id === item.type_id
                    })
                }
            }

            commit('setTrades', trades)
            commit('setBlueprints', blueprints)
        },
    },
}