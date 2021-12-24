import axios from "axios";

class test {
    async test(){
        const promise = await axios.get('https://esi.evetech.net/latest/alliances/?datasource=tranquility')
        const arr = promise.data
        return await this.getCorpsAmount(arr);
    }
    async getCorps(AlID){
        const promise = await axios.get('https://esi.evetech.net/latest/alliances/'+ AlID +'/corporations/?datasource=tranquility')
        return promise.data
    }
    async getCorpsAmount(arr){
        let response = 0
        for (const item of arr) {
            await this.getCorps(item)
                .then(k => {
                    response += k.length
                    console.log(response)
                })
        }
        return response
    }
}
export default new test()