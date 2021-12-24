import axiosESI from "./axiosESI.js";
import axiosSDE from "./axiosSDE.js";
export const npcCorporationsModule = {
    namespaced : true,
    state(){
        return{
            FactionsCorps : [],
            Factions : [],
            Corporations : [],
        }
    },
    getters:{
        getFaction : state => factionID =>{
            return state.Factions.find((p)=>{
                return p.faction_id === factionID
            })
        },
        getFactions : state => {
            return state.FactionsCorps.map((p)=>p.Faction)
        },
        getCorporation : state => corpID =>{
            return state.Corporations.find((element)=>{
                return element.corporationID === corpID
            })
        },
        getCorporations : state => factionID =>{
            return state.FactionsCorps.find((element)=>{
               return element.Faction.id === factionID
            })?.Corporations
        },
        getCorpFaction : (state, getters) => (corpID) =>{
            const Corporation = getters.getCorporation(corpID)
            const Faction = getters.getFaction(Corporation.factionID)
            if(Faction){
                return {
                    id : Faction.faction_id,
                    name : Faction.name,
                }
            }else{
                return null
            }
        }
    },
    mutations:{
        setFactionsCorps(state, arg){
            state.FactionsCorps = arg
        },
        setFactions(state, arg){
            state.Factions = arg
        },
        setCorporations(state, arg){
            state.Corporations = arg
        },
    },
    actions: {
        async fetchData({commit, getters, dispatch}){
            await dispatch('fetchFactions')
            await dispatch('fetchCorporations')

            let rawFactionsCorps = []

            let responseID = []
            let responseDescriptions = []
            let responseFaction = []
            let NPCCorpsIDs = await axiosESI.getNPCCorpsIDs()
            NPCCorpsIDs = NPCCorpsIDs.slice(0, 20)

            for(let corpID of NPCCorpsIDs){
                const p = getters.getCorpFaction(corpID)
                if(p){
                    responseID.push(corpID)
                    responseDescriptions.push( await axiosESI.getCorpInfo(corpID))
                    responseFaction.push(p)
                }
            }

            for(let i = 0; i < responseID.length; i++){
                const index = rawFactionsCorps.map(e => e.Faction.id).indexOf(responseFaction[i].id);
                if (index < 0){
                    rawFactionsCorps.push({
                        Faction : responseFaction[i],
                        Corporations : [{
                            id : responseID[i],
                            name : responseDescriptions[i].name,
                        }]
                    })
                }else{
                    rawFactionsCorps[index].Corporations.push({
                        id : responseID[i],
                        name : responseDescriptions[i].name,
                    })
                }
            }
            commit('setFactionsCorps', rawFactionsCorps)
            console.debug(rawFactionsCorps)
        },
        async fetchFactions({commit}){
            const a = await axiosESI.getFactions()
            console.debug(a)
            commit('setFactions', a)
        },
        async fetchCorporations({commit}){
            const a = await axiosSDE.getCorporations()
            console.debug(a)
            commit('setCorporations', a)
        },
    },
}