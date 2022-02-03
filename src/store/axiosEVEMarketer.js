import axios from "axios";
const qs = require('qs')

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
        for(const data_element of data){
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
                const _data = JSON.parse(data)
                for (const item of _data) {
                    ret.push({
                        type_id: item.buy.forQuery.types[0],
                        buy: {
                            // volume: Volume of buy or sell orders
                            volume: item.buy.volume,
                            // avg: Average buy or sell price
                            avg: item.buy.avg,
                            // weakAvg : Week average buy or sell price
                            weakAvg: item.buy.wavg,
                            // max: Maximum buy or sell price
                            max: item.buy.max,
                            // min: Minimum buy or sell price
                            min: item.buy.min,
                            // stdDev: Standard deviation of buy or sell prices
                            stdDev: item.buy.stdDev,
                            // median: Median buy or sell price
                            median: item.buy.median,
                            // percentile: 95th percentile buy or sell price
                            percentile: item.buy.fivePercent,
                            // variance: ???
                            variance: item.buy.variance,
                        },
                        sell: {
                            // volume: Volume of buy or sell orders
                            volume: item.sell.volume,
                            // avg: Average buy or sell price
                            avg: item.sell.avg,
                            // weakAvg : Week average buy or sell price
                            weakAvg: item.sell.wavg,
                            // max: Maximum buy or sell price
                            max: item.sell.max,
                            // min: Minimum buy or sell price
                            min: item.sell.min,
                            // stdDev: Standard deviation of buy or sell prices
                            stdDev: item.sell.stdDev,
                            // median: Median buy or sell price
                            median: item.sell.median,
                            // percentile: 95th percentile buy or sell price
                            percentile: item.sell.fivePercent,
                            // variance: ???
                            variance: item.sell.variance,
                        }
                    })
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