import {IMarketInfo} from "./IMarketInfo";

export interface I_axiosMarket{
    getMarketInfoOfArray(array : Array<number>) : Promise<Array<IMarketInfo>>,
    getMarketInfoOfItem(type_id : number) : Promise<IMarketInfo>,
}