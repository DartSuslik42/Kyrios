class LP_Type_Item{
    constructor({
        type_id,
        name,
        market_info,
        quantity,
    }) {
        this.type_id = type_id
        this.name = name
        this.market_info = market_info
        this.quantity = quantity
    }
}

class LP_Type_Trade extends LP_Type_Item{
    constructor({
        type_id,
        name,
        isk_cost,
        lp_cost,
        market_info,
        quantity,
        required_items
    }) {
        super({
            type_id,
            name,
            market_info,
            quantity,
        })
        this.isk_cost = isk_cost
        this.lp_cost = lp_cost
        this.required_items = required_items
    }
}
export {LP_Type_Trade, LP_Type_Item}