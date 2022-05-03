import {ILP_Type_Item, ILP_Type_Trade, ITypeInformation} from "./ITrade";
import {IMarketInfo} from "../Market/IMarketInfo";
import {PriceMode} from "./PriceMode";
import {RemoveMethods} from "../RemoveMethods";

export class LP_Type_Item implements ILP_Type_Item{
    type_id : number
    name : string | null
    market_info : IMarketInfo | null
    quantity : number
    constructor(params : RemoveMethods<ILP_Type_Item>) {
        this.type_id = params.type_id
        this.name = params.name ?? null
        this.market_info = params.market_info ?? null
        this.quantity = params.quantity ?? 0
    }

    getSingleItemPrice(params : {mode : PriceMode}){
        if(!this.market_info) {
            throw new TypeError(`market_info is of ${typeof this.market_info} type`)
        }
        return this.market_info[params.mode].price
    }

    getTotalItemPrice(params : {mode : PriceMode}){
        return this.getSingleItemPrice(params) * this.quantity
    }

    getDailyVolume(params : {mode : PriceMode}){
        if(!this.market_info) {
            throw new TypeError(`market_info is of ${typeof this.market_info} type`)
        }
        return this.market_info[params.mode].volume * 0.05
    }
}

export class LP_Type_Trade extends LP_Type_Item implements ILP_Type_Trade{
    isk_cost : number
    lp_cost : number
    required_items : Array<ILP_Type_Item>
    constructor(params : RemoveMethods<ILP_Type_Trade>){
        super({
            type_id: params.type_id,
            name : params.name,
            market_info : params.market_info,
            quantity : params.quantity
        })
        this.isk_cost = params.isk_cost
        this.lp_cost = params.lp_cost
        this.required_items = params.required_items
    }
    getRequiredItemsPrice(){
        return this.required_items.reduce((sum, el) => {
            return sum + el.getTotalItemPrice({mode : PriceMode.Sell})
        }, 0)
    }
    getISK_per_LP(params : {mode : PriceMode}){
        return (
            (this.getTotalItemPrice(params) - this.isk_cost - this.getRequiredItemsPrice()) /
            (this.lp_cost ? this.lp_cost : 1)
        )
    }
}

export class TypeInformation implements ITypeInformation{
    description : string
    group_id : number
    market_group_id : number
    mass : number
    name : string
    packaged_volume : number
    portion_size : number
    type_id : number
    volume : number
    constructor(params : RemoveMethods<ITypeInformation>)
    {
        this.description = params.description
        this.group_id = params.group_id
        this.market_group_id = params.market_group_id
        this.mass = params.mass
        this.name = params.name
        this.packaged_volume = params.packaged_volume
        this.portion_size = params.portion_size
        this.type_id = params.type_id
        this.volume = params.volume
    }
}

