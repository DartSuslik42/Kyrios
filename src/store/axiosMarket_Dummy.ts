import {I_axiosMarket} from "../model/Market/IaxiosMarket";
import {MarketInfo, MarketTypeInfo} from "../model/Market/MarketInfo";
import {IMarketInfo} from "../model/Market/IMarketInfo";
import {PriceMode} from "../model/LP_Offers/PriceMode";

const EVEMarket = new class axiosMarket_Dummy implements I_axiosMarket{
    async getMarketInfoOfArray(array: Array<number>): Promise<Array<IMarketInfo>> {
        array = Array.from(new Set(array))
        return Promise.resolve(array.map(el=>this.createDummyMarketInfo(el)))
    }

    async getMarketInfoOfItem(type_id: number): Promise<IMarketInfo> {
        return Promise.resolve(this.createDummyMarketInfo(type_id))
    }
    createDummyMarketInfo(type_id : number) : IMarketInfo{
        return new MarketInfo({
            [PriceMode.Buy]: new MarketTypeInfo({
                price: 20000, volume: 100000
            }),
            [PriceMode.Sell]: new MarketTypeInfo({
                price: 2000, volume: 200000
            }),
            type_id: type_id
        })
    }

}
export default EVEMarket