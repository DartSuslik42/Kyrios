class MarketTypeInfo{
    constructor({
        volume,
        avg,
        weakAvg,
        max,
        min,
        stdDev,
        median,
        percentile,
        variance
    }){
        // volume: Volume of buy or sell orders per month
        this.volume = volume
        // avg: Average buy or sell price
        this.avg = avg
        // weakAvg : Week average buy or sell price
        this.weakAvg = weakAvg
        // max: Maximum buy or sell price
        this.max = max
        // min: Minimum buy or sell price
        this.min = min
        // stdDev: Standard deviation of buy or sell prices
        this.stdDev = stdDev
        // median: Median buy or sell price
        this.median = median
        // percentile: 95th percentile buy or sell price
        this.percentile = percentile
        // variance: ???
        this.variance = variance
    }
}
class MarketInfo{
    constructor({
        type_id,
        buy,
        sell
    }){
        this.type_id = type_id
        this.buy = buy
        this.sell = sell
    }
}
export { MarketInfo, MarketTypeInfo }