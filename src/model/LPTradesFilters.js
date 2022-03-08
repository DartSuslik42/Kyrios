import {TradeFilter} from "./Filter";
import {LP_Type_Trade} from "./Trade";

export const filters = Object.freeze([
    new TradeFilter({
        title : "ISK/LP",
        fields : {
            min_isk_per_lp: {
                type : "number",
                title : "MIN ISK/LP",
                value : "300",
            },
        },
        filter_function : function({trade,mode}){
            try{
                return trade.getISK_per_LP({mode}) >= this.fields.min_isk_per_lp.value
            }catch (e){
                if(trade instanceof LP_Type_Trade){
                    console.error(e)
                }
                else{
                    console.warn(`${e}\n${trade} is not instance of ${LP_Type_Trade}`)
                }
                return true
            }
        },
    }),
    new TradeFilter({
        title : "Daily Volume",
        fields : {
            min_volume : {
                type : "number",
                title : "MIN daily volume",
                value : "20",
            },
            min_taken_volume_percentile : {
                type : "number",
                title : "MIN taken daily volume percentile",
                value : "100",
            },
        },
        filter_function : function({trade, mode}){
            try{
                const volume = trade.getDailyVolume({mode})
                if(volume < this.fields.min_volume.value){
                    return false
                }
                return volume * (this.fields.min_taken_volume_percentile.value / 100) >= this.fields.min_volume.value
            }catch (e){
                if(trade instanceof LP_Type_Trade){
                    console.error(e)
                }
                else{
                    console.warn(`${e}\n${trade} is not instance of ${LP_Type_Trade}`)
                }
                return true
            }
        },
    }),
    new TradeFilter({
        title : "Other Requirements",
        fields : {
            hasOtherRequirements : {
                type : "checkbox",
                title : "Has other Requirements",
                value : false,
            },
        },
        filter_function : function({trade}){
            try {
                const num = trade.required_items.length
                if (this.fields.hasOtherRequirements.value) {
                    return num > 0
                } else {
                    return num <= 0
                }
            }catch (e){
                if(trade instanceof LP_Type_Trade){
                    console.error(e)
                }
                else{
                    console.warn(`${e}\n${trade} is not instance of ${LP_Type_Trade}`)
                }
                return true
            }
        },
    }),
])