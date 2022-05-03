import {IMarketTypeInfo, IMarketInfo} from "./IMarketInfo";
import {PriceMode} from "../LP_Offers/PriceMode";
import {RemoveMethods} from "../RemoveMethods";

class MarketTypeInfo implements IMarketTypeInfo{
    volume : number
    price : number
    constructor(params : RemoveMethods<IMarketTypeInfo>){
        this.volume = params.volume
        this.price = params.price
    }
}

class MarketInfo implements IMarketInfo{
    type_id : number
    [PriceMode.Buy] : IMarketTypeInfo
    [PriceMode.Sell] :IMarketTypeInfo
    constructor(params : RemoveMethods<IMarketInfo>){
        this.type_id = params.type_id
        this[PriceMode.Buy] = params[PriceMode.Buy]
        this[PriceMode.Sell] = params[PriceMode.Sell]
    }
}
export { MarketInfo, MarketTypeInfo }