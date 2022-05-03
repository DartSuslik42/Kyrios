import {I_axiosMarket} from "../model/Market/IaxiosMarket";
import {IMarketInfo} from "../model/Market/IMarketInfo";
import axios from "axios";
import {MarketInfo, MarketTypeInfo} from "../model/Market/MarketInfo";
import {PriceMode} from "../model/LP_Offers/PriceMode";

const EVEMarket = new class axiosMarket_Tyccon implements I_axiosMarket{
    readonly requestURL = "https://evetycoon.com/api/v1/market/stats"
    readonly region_id = "10000002"
    async getMarketInfoOfArray(array: Array<number>): Promise<Array<IMarketInfo>> {
        array = Array.from(new Set(array))
        const PromiseArray = array.map((type_id)=>this.makeRequestToAPI(type_id))
        return await Promise.all(PromiseArray).then(
            data => data
        )
    }

    async getMarketInfoOfItem(type_id: number): Promise<IMarketInfo> {
        return (await this.makeRequestToAPI(type_id))
    }
    private getRequestURL(type_id : number) : string{
        return this.requestURL + "/" + this.region_id + "/" + type_id
    }
    private makeRequestToAPI(type_id : number):Promise<IMarketInfo>{
        return axios.get<IMarketInfo>(this.getRequestURL(type_id), {
            transformResponse(data:any) : IMarketInfo{
                data = JSON.parse(data)
                return new MarketInfo({
                    [PriceMode.Buy]: new MarketTypeInfo({
                        price: data.buyAvgFivePercent,
                        volume: data.buyVolume
                    }),
                    [PriceMode.Sell]: new MarketTypeInfo({
                        price: data.sellAvgFivePercent,
                        volume: data.sellVolume
                    }),
                    type_id: type_id
                })
            }
        }).then(res => res.data)
    }


}
export default EVEMarket