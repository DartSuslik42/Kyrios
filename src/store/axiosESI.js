import axios from "axios"
import {LP_Type_Trade, LP_Type_Item} from "../model/Trade";

class axiosESI {
    // async getNPCCorpsIDs(){
    //     const promise = await axios
    //         .get('https://esi.evetech.net/latest/corporations/npccorps/?datasource=tranquility')
    //         .catch(error => console.log(error))
    //     console.debug(promise)
    //     return promise.data
    // }
    // async getCorpInfo(id){
    //     const promise = await axios
    //         .get('https://esi.evetech.net/latest/corporations/'+ id +'/?datasource=tranquility')
    //         .catch(error => console.log(error))
    //     console.debug(promise)
    //     return {
    //         corp_id : id,
    //         name : promise.data.name,
    //     }
    // }

    async getCorpLPOffers(corpID){
        const promise = await axios
            .get('https://esi.evetech.net/latest/loyalty/stores/'+ corpID +'/offers/?datasource=tranquility', {
                transformResponse(data){
                    data = JSON.parse(data)
                    let array = []

                    data.forEach((el)=>{
                        let required_items = []
                        for(let item of el.required_items){
                            required_items.push(new LP_Type_Item({
                                market_info: null,
                                name: null,
                                quantity: item.quantity,
                                type_id: item.type_id
                            }))
                        }

                        array.push(new LP_Type_Trade({
                            isk_cost: el.isk_cost,
                            lp_cost: el.lp_cost,
                            market_info: null,
                            name: null,
                            quantity: el.quantity,
                            required_items: required_items,
                            type_id: el.type_id
                        }))
                    })
                    return array
                }

            })
            .catch(error => console.log(error))
        return promise.data
    }

    async getFactions(){
        const promise = await axios
            .get('https://esi.evetech.net/latest/universe/factions/?datasource=tranquility&language=en')
            .catch(error => console.log(error))
        return promise.data
    }

    async getTypeInformation(type_id){
        const promise = await axios
            .get('https://esi.evetech.net/latest/universe/types/'+ type_id +'/?datasource=tranquility&language=en', {
                transformResponse : [function (data){
                    data = JSON.parse(data)
                    return {
                        description : data.description,
                        group_id : data.group_id,
                        market_group_id : data.market_group_id,
                        mass : data.mass,
                        name : data.name,
                        packaged_volume : data.packaged_volume,
                        portion_size : data.portion_size,
                        type_id : data.type_id,
                        volume : data.volume,
                    }
                }],
            })
            .catch(error => console.log(error))
        return promise.data
    }

    async getMarketOrders(type_id, region_id, order_type){
        const promise = await axios
            // .get("https://esi.evetech.net/latest/markets/"+region_id+"/orders/?datasource=tranquility&order_type="+order_type+"&page=1&type_id="+type_id)
            .get("https://esi.evetech.net/latest/markets/10000002/orders/?datasource=tranquility&order_type="+order_type+"&page=1&type_id="+type_id)
            .catch(error => console.log(error))
        return promise.data
    }

    async getMarketPriceHistory(type_id, region_id){
        region_id = "10000002"
        const promise = await axios
            .get("https://esi.evetech.net/latest/markets/"+region_id+"/history/?datasource=tranquility&type_id="+type_id)
            .catch(error => console.log(error))
        return promise.data
    }

    async getNamesByIDs(array){   // [id] => [id, name, category]
        // Выделение уникальных id
        const _arr = array.filter((el,idx,arr)=>{
            return arr.indexOf(el) === idx;
        })

        // В POST запрос должен передаваться массив, содержащий только уникальные id (политика API)
        const promise = await axios
            .post("https://esi.evetech.net/latest/universe/names/?datasource=tranquility", _arr)
            .catch(error => console.log(error))
        return promise.data
    }
}
export default new axiosESI()
