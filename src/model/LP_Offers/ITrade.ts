import {IMarketInfo} from "../Market/IMarketInfo";
import {PriceMode} from "./PriceMode";

export interface ILP_Type_Item{
    type_id : number,
    name : string | null,
    market_info : IMarketInfo | null,
    quantity : number,

    getSingleItemPrice({mode} : {mode : PriceMode}) : number,
    getTotalItemPrice({mode} : {mode : PriceMode}) : number,
    getDailyVolume({mode} : {mode : PriceMode}) : number,
}

export interface ILP_Type_Trade extends ILP_Type_Item{
    isk_cost : number,
    lp_cost : number,
    required_items : Array<ILP_Type_Item>,

    getRequiredItemsPrice() : number,
    getISK_per_LP({mode} : {mode : PriceMode}) : number,
}

export interface ITypeInformation{
    description : string,
    group_id : number,
    market_group_id : number,
    mass : number,
    name : string,
    packaged_volume : number,
    portion_size : number,
    type_id : number,
    volume : number
}
