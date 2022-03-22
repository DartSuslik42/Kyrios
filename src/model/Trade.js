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
    getSingleItemPrice({mode}){
         return this.market_info[mode].weakAvg
    }
    getTotalItemPrice({mode}){
        return this.getSingleItemPrice({mode}) * this.quantity
    }
    getDailyVolume({mode}){
        return this.market_info[mode].volume * 0.05
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
    getRequiredItemsPrice(){
        return this.required_items.reduce((sum, el) => {
            return sum + el.getTotalItemPrice({mode : "sell"})
        }, 0)
    }
    getISK_per_LP({mode}){
       return (
           (this.getTotalItemPrice({mode}) - this.isk_cost - this.getRequiredItemsPrice()) /
           (this.lp_cost ? this.lp_cost : 1)
       )
    }
}
export {LP_Type_Trade, LP_Type_Item}