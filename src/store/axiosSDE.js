import axios from "axios"

class axiosSDE {
    async getList_TableSDE() {
        return await axios
            .get('http://sde.zzeve.com/tables.json')
            .catch(error => console.log(error))
    }
    async getCorporations(){
        const promise = await axios
            .get('http://sde.zzeve.com/crpNPCCorporations.json')
            .catch(error => console.log(error))
        console.debug(promise)
        return promise.data
    }
}
export default new axiosSDE()
