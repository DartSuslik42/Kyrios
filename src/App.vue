<template>
  <div id="app">
    <div v-if="!this.loading">
      <select-npc-corporation :corps="this.npcCorps" v-model="selected" class="selector"/>
    </div>
  </div>
</template>

<script>
import axiosESI from "store/axiosESI.js"
import axiosSDE from "store/axiosSDE.js"
import SelectNpcCorporation from "components/select/npcCorporation/select-npcCorporation.vue"
export default {
  name: 'App',
  components: {SelectNpcCorporation},
  data(){
    return{
      npcCorps : [],
      selected : null,
      loading : true
    }
  },
  async created() {
    let npsCorpIDs = []
    let responseIDs = []
    let responseLPOffers = []
    let responseDescriptions = []
    let responseFaction = []

    npsCorpIDs = await axiosESI.getNPCCorps()
    npsCorpIDs = npsCorpIDs.slice(0, 20)

    for(let id of npsCorpIDs){
      const LPOffersData = await axiosESI.getCorpLPOffers(id)
      if(LPOffersData.length) {
        responseIDs.push(id)
        responseLPOffers.push(LPOffersData)
        responseDescriptions.push( await axiosESI.getCorpInfo(id))
        responseFaction.push(await axiosSDE.getCorpFaction(id))
      }
    }

    for(let i = 0; i < responseIDs.length; i++){
      const index = this.npcCorps.map(e => e.Faction.id).indexOf(responseFaction[i].id);
      if (index < 0){
        this.npcCorps.push({
          Faction : responseFaction[i],
          Corporations : [{
            id : responseIDs[i],
            name : responseDescriptions[i].name,
            LPOffers : responseLPOffers[i],
          }]
        })
      }else{
        this.npcCorps[index].Corporations.push({
          id : responseIDs[i],
          name : responseDescriptions[i].name,
          LPOffers : responseLPOffers[i],
        })
      }
    }
    console.debug(this.npcCorps)
    this.loading = false
  },
}
</script>

<style>
#app{
  margin: 0 0;
  width: 100%;
  height: 100%;
  background-color: #030303;
}
.selector{
  width: 100%;
  height: 15em;
}
</style>
