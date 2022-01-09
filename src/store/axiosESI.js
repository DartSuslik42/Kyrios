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
    async getTypeInformation(type_id){
        const promise = await axios
            .get('https://esi.evetech.net/latest/universe/types/'+ type_id +'/?datasource=tranquility&language=en')
            .catch(error => console.log(error))
        console.debug(promise)
        const data = promise.data
        return {
            description : data.description,
            group_id : data.group_id,
            market_group_id : data.market_group_id,
            mass : data.mass,
            name : data.name,
            packaged_volume : data.packaged_volume,
            portion_size : data.portion_size,
            type_id : data.type_id,
            volume : data.volume,
        }
    }
}
export default new axiosESI()
