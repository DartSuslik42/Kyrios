import axiosESI from "./axiosESI.js";
// import axiosSDE from "./axiosSDE.js";
// import LocalStorage from "./LocalStorage.js";
export const lpTradesModule = {
    namespaced : true,
    state(){
        return{
            trades : [],
            blueprints : [],
        }
    },
    getters:{
        getTrades : state => () =>{
            return state.trades
        },
        // getCorpFaction : (state, getters) => (corpID) =>{
        //     const Corporation = getters.getCorporation(corpID)
        //     const Faction = getters.getFaction(Corporation.factionID)
        //     if(Faction){
        //         return {
        //             id : Faction.faction_id,
        //             name : Faction.name,
        //         }
        //     }else{
        //         return null
        //     }
        // },
    },
    mutations:{
        setTrades(state, arg){
            state.trades = arg
        },
        setBlueprints(state, arg){
            state.blueprints = arg
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

            // Добавление поля "market_history"

            // "market_history"[
            //      {
            //      "average":500000000.0,
            //      "date":"2020-12-03",
            //      "highest":500000000.0,
            //      "lowest":500000000.0,
            //      "order_count":1,
            //      "volume":1
            //      }
            // ]
            for(let el of trades){
                const a = await axiosESI.getMarketPriceHistory(el.type_id, null)
                if(a.length > 7){
                    el["market_history"] = a.slice(-7)
                }else{
                    el["market_history"] = a
                }
            }

            // Добавление поля "market_volume" - средний оборот товара за день
            for(let el of trades){
                const arr_market_volume = el.market_history.map((_el)=>{return _el.volume})
                el["market_volume"] = arr_market_volume.reduce((sum, el) => sum + el, 0) / arr_market_volume.length
            }

            // Добавление информации о стоимости ордера и о стоимости предметов, необходимых для обмена
            for(let trade of trades) {
                const marketOrders = await axiosESI.getMarketOrders(trade.type_id, undefined, "buy")
                let price = 0
                if(marketOrders?.length){
                    price = marketOrders[0].price
                }
                trade["price"] = price

                for(let item of trade.required_items){
                    const marketOrders = await axiosESI.getMarketOrders(item.type_id, undefined, "sell")
                    price = 0
                    if(marketOrders?.length){
                        price = marketOrders[0].price
                    }
                    item["price"] = price
                }
            }

            // Добавление поля "required_items_price"
            for(let trade of trades){
                trade["required_items_price"]=trade.required_items.reduce((sum, el) => {
                    return sum + el.price * el.quantity
                }, 0)
            }

            // Добавление поля "isk_per_lp"
            for(let el of trades){
                el["isk_per_lp"] = (el.price * el.quantity /* * налог */ - el.isk_cost - el.required_items_price) / (el.lp_cost > 0 ? el.lp_cost : 1)
            }

            commit('setTrades', trades)
            commit('setBlueprints', blueprints)
        },
    },
}