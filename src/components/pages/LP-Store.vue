<template>
  <div id="lp_store_block">
    <select-npc-corporation :corps="FactionsCorps" v-model="selected" class="selector"/>
    <div id="lp-trades">
      <h6 class="title">LP-Offers <a id="no-blueprints">NO BLUEPRINTS</a></h6>
      <table-lptrades :corp="this.selected" class="table"/>
      <content-filtration-block/>
    </div>
  </div>
</template>

<script>
import SelectNpcCorporation from "components/select/npcCorporation/select-npcCorporation.vue"
import {mapState, mapActions} from "vuex"
import TableLptrades from "components/table/lpTrades/table-lpTrades.vue";
import ContentFiltrationBlock from "../table/lpTrades/content-filtration-block.vue";
export default {
  name: "LP-Store",
  components: {ContentFiltrationBlock, TableLptrades, SelectNpcCorporation},
  data(){
    return{
      selected : null,
    }
  },
  methods:{
    ...mapActions({
      fetchFactionsCorps : "npcCorporationsModule/fetchData"
    }),
  },
  computed:{
    ...mapState({
      FactionsCorps : "npcCorporationsModule/FactionsCorps"
    })
  },
  async created() {
    await this.fetchFactionsCorps()
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