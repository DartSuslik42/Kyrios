import axios from "axios";
const qs = require('qs')
import {MarketInfo, MarketTypeInfo} from "../model/Market/MarketInfo";

const system_id = 30000142
const max_typeID_amount_per_request = 200

class axiosEVEMarketer{
    async getMarketInfoOfArray(typeID_arr){
        // Make typeID_arr of unique values
        typeID_arr = typeID_arr.filter((val, idx, arr) =>{
            return arr.indexOf(val) === idx
        })

        let arr_promise = []
        while (typeID_arr.length > 0) {
            arr_promise.push(this.getAxiosPromise(typeID_arr.splice(0, max_typeID_amount_per_request)))
        }

        const data = await Promise.all(arr_promise)

        let return_var = []
        for(let data_element of data){
            return_var = return_var.concat(data_element.data)
        }

        return return_var
    }

    getAxiosPromise(request_id_arr) {
        return axios({
            url: 'https://api.evemarketer.com/ec/marketstat/json',
            method: 'get',
            transformResponse: [function (data) {
                let ret = []
                data = JSON.parse(data)
                for (const item of data) {
                    ret.push(new MarketInfo({
                        type_id: item.buy.forQuery.types[0],
                        buy: new MarketTypeInfo({
                            volume: item.buy.volume,
                            avg: item.buy.avg,
                            weakAvg: item.buy.wavg,
                            max: item.buy.max,
                            min: item.buy.min,
                            stdDev: item.buy.stdDev,
                            median: item.buy.median,
                            percentile: item.buy.fivePercent,
                            variance: item.buy.variance,
                        }),
                        sell: new MarketTypeInfo({
                            volume: item.sell.volume,
                            avg: item.sell.avg,
                            weakAvg: item.sell.wavg,
                            max: item.sell.max,
                            min: item.sell.min,
                            stdDev: item.sell.stdDev,
                            median: item.sell.median,
                            percentile: item.sell.fivePercent,
                            variance: item.sell.variance,
                        })
                    }))
                }
                return ret
            }],
            params: {
                typeid: request_id_arr,
                usesystem: system_id,
            },
            paramsSerializer: function (params) {
                return qs.stringify(params, {arrayFormat: 'comma'})
            },
            responseType: 'json',
        });
    }

    async getMarketInfoOfItem(typeID){
        const ret = this.getMarketInfoOfArray([typeID])
        return ret[0]
    }
}
export default new axiosEVEMarketer()