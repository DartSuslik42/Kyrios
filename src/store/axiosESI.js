import axios from "axios"
import axiosSDE from "./axiosSDE.js";

class axiosESI {
    async getNPCCorps(){
        // console.log("getting NPCCorps")
        const promise = await axios
            .get('https://esi.evetech.net/latest/corporations/npccorps/?datasource=tranquility')
            .catch(error => console.log(error))
        return promise.data
    }

    async getCorpLPOffers(id){
        // console.log("getting NPCCorpLPOffers id:"+ id)
        const promise = await axios
            .get('https://esi.evetech.net/latest/loyalty/stores/'+ id +'/offers/?datasource=tranquility')
            .catch(error => console.log(error))
        return promise.data
    }

    async getFactions(){
        const promise = await axios
            .get('https://esi.evetech.net/latest/universe/factions/?datasource=tranquility&language=en')
            .catch(error => console.log(error))
        return promise.data
    }

    async getFactionInfo(id){
        const factions = await this.getFactions()
        return factions.filter((p) => {
            return p.faction_id === id
        })[0]
    }

    async getCorpInfo(id){
        const promise = await axios
            .get('https://esi.evetech.net/latest/corporations/'+ id +'/?datasource=tranquility')
            .catch(error => console.log(error))
        return {
            name : promise.data.name,
        }
    }
}
export default new axiosESI()
