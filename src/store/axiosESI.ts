import axios from "axios"
import {LP_Type_Item, LP_Type_Trade, TypeInformation} from "../model/LP_Offers/Trade";

class axiosESI {
    // async getNPCCorpsIDs(){
    //     const promise : any = await axios
    //         .get('https://esi.evetech.net/latest/corporations/npccorps/?datasource=tranquility')
    //         .catch(error => console.log(error))
    //     return promise.data
    // }

    // async getCorpInfo(corp_id : number){
    //     const promise : any = await axios
    //         .get('https://esi.evetech.net/latest/corporations/'+ corp_id +'/?datasource=tranquility')
    //         .catch(error => console.log(error))
    //     return {
    //         corp_id,
    //         name : promise.data,
    //     }
    // }

    async getCorpLPOffers(corpID : number): Promise<Array<LP_Type_Trade>>{
        const url = 'https://esi.evetech.net/latest/loyalty/stores/'+ corpID +'/offers/?datasource=tranquility'
        const {data} = await axios.get<Array<LP_Type_Trade>>(url, {
            transformResponse(data) : Array<LP_Type_Trade>{
                data = JSON.parse(data)
                const array : Array<LP_Type_Trade> = []

                data.forEach((el : any)=>{
                    const required_items : Array<LP_Type_Item> = []
                    for(const item of el.required_items){
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
        return data
    }

    async getFactions(){
        const promise : any = await axios
            .get('https://esi.evetech.net/latest/universe/factions/?datasource=tranquility&language=en')
            .catch(error => console.log(error))
        return promise.data
    }

    async getTypeInformation(type_id : number) : Promise<TypeInformation>{
        const url = 'https://esi.evetech.net/latest/universe/types/'+ type_id +'/?datasource=tranquility&language=en'
        const {data} = await axios.get<TypeInformation>(url, {
                transformResponse(data) : TypeInformation{
                    data = JSON.parse(data)
                    return new TypeInformation({
                        description: data.description,
                        group_id: data.group_id,
                        market_group_id: data.market_group_id,
                        mass: data.mass,
                        name: data.name,
                        packaged_volume: data.packaged_volume,
                        portion_size: data.portion_size,
                        type_id: data.type_id,
                        volume: data.volume,
                    })
                },
            })
        return data
    }

    // async getMarketOrders(type_id : number, region_id : number = 10000002, order_type : string){
    //     const url = "https://esi.evetech.net/latest/markets/"+region_id+
    //         "/orders/?datasource=tranquility&order_type="+order_type+
    //         "&page=1&type_id="+type_id
    //
    //     const promise : any = await axios
    //         .get(url)
    //         .catch(error => console.log(error))
    //     return promise.data
    // }

    // async getMarketPriceHistory(type_id : number, region_id : number = 10000002){
    //     const promise : any= await axios
    //         .get("https://esi.evetech.net/latest/markets/"+region_id+"/history/?datasource=tranquility&type_id="+type_id)
    //         .catch(error => console.log(error))
    //     return promise.data
    // }

    // ARRAY[id] => ARRAY[{id, name, category}]
    async getNamesByIDs(ID_array : Array<number>){
        // Выделение уникальных id
        const _arr = ID_array.filter((el,idx,arr)=>{
            return arr.indexOf(el) === idx;
        })

        // В POST запрос должен передаваться массив, содержащий только уникальные id (политика API)
        const promise : any = await axios
            .post("https://esi.evetech.net/latest/universe/names/?datasource=tranquility", _arr)
            .catch(error => console.log(error))
        return promise.data
    }
}
export default new axiosESI()
