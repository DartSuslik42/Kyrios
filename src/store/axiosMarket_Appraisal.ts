/* eslint-disable */
import axios from "axios";
import {I_axiosMarket} from "../model/Market/IaxiosMarket";
import {IMarketInfo} from "../model/Market/IMarketInfo";
import {MarketInfo, MarketTypeInfo} from "../model/Market/MarketInfo";
import {PriceMode} from "../model/LP_Offers/PriceMode";

const EVEMarket = new class axiosMarket_Appraisal implements I_axiosMarket{
    readonly requestURL = "https://evepraisal.com/appraisal/structured.json"
    readonly market_name = "jita"
    async getMarketInfoOfArray(array: Array<number>): Promise<Array<IMarketInfo>> {
        //Make array of unique numbers
        array = Array.from(new Set(array))
        return (await this.makeRequestToAPI(array))
    }

    async getMarketInfoOfItem(type_id: number): Promise<IMarketInfo> {
        return (await this.makeRequestToAPI([type_id]).then(data=>data[0]))
    }

    private createRequestData(array : Array<number>){
        return {
            "market_name" : this.market_name,
            "items" : array.map((el)=>({"type_id": el}))
        }
    }

    private makeRequestToAPI(array: Array<number>): Promise<Array<IMarketInfo>>{
        return axios.post<Array<IMarketInfo>>(this.requestURL, this.createRequestData(array), {
            transformResponse : [ function(data: any):Array<IMarketInfo> {
                data = JSON.parse(data)
                return data.appraisal.items.map((el:any)=>new MarketInfo({
                    type_id : el.typeID,
                    [PriceMode.Buy] : new MarketTypeInfo({
                        volume : el.buy.volume,
                        price :  el.buy.median,
                    }),
                    [PriceMode.Sell] : new MarketTypeInfo({
                        volume : el.sell.volume,
                        price :  el.sell.median,
                    })
                }))
            }],
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }).then((promise)=>promise.data)
            .catch((err)=>{
                console.log(err)
                return []
            })
    }
}
export default EVEMarket