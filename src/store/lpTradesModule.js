import axiosESI from "./axiosESI.js";
// import axiosSDE from "./axiosSDE.js";
// import LocalStorage from "./LocalStorage.js";
export const lpTradesModule = {
    namespaced : true,
    state(){
        return{
            trades : [],
            blueprints : [],
            //{
            // ak_cost:
            // isk_cost:
            // lp_cost:
            // offer_id:
            // quantity:
            // required_items: [{
            //                      quantity:
            //                      type_id:
            //                  }]
            // type_id:
            // }
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

            // Добавление поля "name" всем объектам в offers offers[].required_items
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
            const trades = offers.filter((el)=>{
                if(el.name.includes("Blueprint")){
                    blueprints.push(el)
                    return false
                }
                return true
            })

            commit('setTrades', trades)
            commit('setBlueprints', blueprints)
        },
    },
}