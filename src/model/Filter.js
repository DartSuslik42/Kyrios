class TradeFilter{
    constructor({
                    title = 'TradeFilter',
                    fields = {},
                    filter_function
                }) {
        this.title = title
        this.fields = fields
        this.filter_function = filter_function
    }
    clone(){
        return new TradeFilter({
            title: JSON.parse(JSON.stringify(this.title)),
            fields: JSON.parse(JSON.stringify(this.fields)),
            filter_function: this.filter_function
        })
    }
}
export {TradeFilter}