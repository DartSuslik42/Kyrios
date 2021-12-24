import axios from "axios"

class axiosESI {
    async getNPCCorpsIDs(){
        const promise = await axios
            .get('https://esi.evetech.net/latest/corporations/npccorps/?datasource=tranquility')
            .catch(error => console.log(error))
        console.debug(promise)
        return promise.data
    }
    async getCorpLPOffers(corpID){
        const promise = await axios
            .get('https://esi.evetech.net/latest/loyalty/stores/'+ corpID +'/offers/?datasource=tranquility')
            .catch(error => console.log(error))
        console.debug(promise)
        return promise.data
    }

    async getFactions(){
        const promise = await axios
            .get('https://esi.evetech.net/latest/universe/factions/?datasource=tranquility&language=en')
            .catch(error => console.log(error))
        console.debug(promise)
        return promise.data
    }

    async getCorpInfo(id){
        const promise = await axios
            .get('https://esi.evetech.net/latest/corporations/'+ id +'/?datasource=tranquility')
            .catch(error => console.log(error))
        console.debug(promise)
        return {
            name : promise.data.name,
        }
    }
}
export default new axiosESI()
