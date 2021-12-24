import axios from "axios"
import axiosESI from "./axiosESI.js";

class axiosSDE {
    async getList_TableSDE(){
        return await axios
            .get('http://sde.zzeve.com/tables.json')
            .catch(error => console.log(error))
    }
    async getNPCCorporations(){
        const _promise = await axios
            .get('http://sde.zzeve.com/crpNPCCorporations.json')
            .catch(error => console.log(error))
        return _promise.data
    }

    async getCorpFractionLink(id){
        const corporations = await this.getNPCCorporations()
        return corporations.filter((p) => {
            return p.corporationID === id
        })[0]
    }

    async getCorpFaction(CorpID) {
        // console.log("getting NPCCorpFraction CorpID:"+ CorpID)
        const CorpFactionLink = await this.getCorpFractionLink(CorpID)
        const FactionInfo = await axiosESI.getFactionInfo(CorpFactionLink.factionID)
        return {
            id : FactionInfo.faction_id,
            name : FactionInfo.name,
        }
    }
}
export default new axiosSDE()
