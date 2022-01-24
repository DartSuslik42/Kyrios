<template>
  <div id="app">
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
import ContentFiltrationBlock from "./components/table/lpTrades/content-filtration-block.vue";
export default {
  name: 'App',
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
#app{
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  cursor:  default;
}
#lp-trades{
  padding: 5px;
  width: 80%;
}
*{
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
