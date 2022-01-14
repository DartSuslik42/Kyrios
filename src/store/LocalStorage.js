import Corps from "./json/Corps.json"
import marketPrices from "./json/marketPrices.json"
class localStorage {
    getCorporations(){
        return Corps
    }
    getMarketPrice(type_id){
        const arr = marketPrices.filter(obj => {
            return obj.type_id === type_id
        })
        if(arr.length !== 1){
            console.error("Object Not Found [type_id:%i]", type_id)
            return {
                adjusted_price: null,
                average_price: null,
                type_id: type_id
            }
        }
        return arr[0]
    }
}
export default new localStorage()
