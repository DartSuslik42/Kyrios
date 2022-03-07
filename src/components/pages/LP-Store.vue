<template>
  <div id="lp_store_block">
    <select-npc-corporation :corps="FactionsCorps" v-model="corp" class="selector"/>
    <div id="lp-trades">
      <h6 class="title">LP-Offers <a id="no-blueprints">NO BLUEPRINTS</a></h6>
      <table-lptrades :trades="trades" class="table"/>
      <content-filtration-block/>
    </div>
  </div>
</template>

<script>
import SelectNpcCorporation from "components/select/npcCorporation/select-npcCorporation.vue"
import {mapState, mapActions, mapGetters} from "vuex"
import TableLptrades from "components/table/lpTrades/table-lpTrades.vue";
import ContentFiltrationBlock from "../table/lpTrades/content-filtration-block.vue";
export default {
  name: "LP-Store",
  components: {ContentFiltrationBlock, TableLptrades, SelectNpcCorporation},
  data(){
    return{
      corp : undefined,
    }
  },
  methods:{
    ...mapActions({
      fetchFactionsCorps : "npcCorporationsModule/fetchData",
      fetchTrades : "lpTradesModule/fetchTrades",
    }),
  },
  computed:{
    ...mapState({
      FactionsCorps : "npcCorporationsModule/FactionsCorps",
      trades : state => state.lpTradesModule.trades,
    }),
    ...mapGetters({
      getCorpFaction : "npcCorporationsModule/getCorpFaction",
      getCorporation : "npcCorporationsModule/getCorporation",
    }),
  },
  async created() {
    await this.fetchFactionsCorps()
    //TODO : Ахтунг! Говнокод!
    this.$watch(
        () => this.$route.params,
        () => {
          const route_corpID = Number(this.$route.params.corp_id)
          if(!route_corpID){ this.corp = undefined; return; }
          if(this.corp?.id !== route_corpID){
            const faction = this.getCorpFaction(route_corpID)
            const FactionCorp = this.$store.state.npcCorporationsModule.FactionsCorps.find((el)=>{
              return el.Faction.id === faction.id
            })
            this.corp = FactionCorp.Corporations.find((el)=>{
              return el.id === route_corpID
            })
          }
        },
        { immediate: true }
    )
  },
  watch:{
    async corp(newVal){
      if(!!newVal && newVal.id !== Number(this.$route.params.corp_id)){
        await this.$router.push({path: `/lp_store/${newVal.id}`})
      }
      await this.fetchTrades(!newVal ? undefined : newVal.id)
    }
  },
}
</script>

<style scoped>
#no-blueprints{
  color: var(--color-blue)
}
#lp_store_block{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#lp-trades{
  padding: 5px;
  width: 80%;
}
#lp_store_block *{
  margin: 2px 0;
}
.selector {
  position: static;
  top: 0;
  left: 0;
  background-color: var(--main-bg-color-content);
}
.table{
  position: static;
  height: 400px;
}
.title{
  position: static;
  text-align: left;
  padding: 3px 0 9px 1px;
  font-size: 15px;
}
</style>