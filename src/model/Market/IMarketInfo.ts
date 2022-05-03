import {PriceMode} from "../LP_Offers/PriceMode";
export interface IMarketInfo {
    type_id : number,
    [PriceMode.Buy] : IMarketTypeInfo,
    [PriceMode.Sell] :IMarketTypeInfo,
}

export interface IMarketTypeInfo{
    // volume: Volume of orders per month
    volume : number,
    // price: Average price
    price : number,
}