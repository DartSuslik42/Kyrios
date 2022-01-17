<template>
  <div id="app" class="text">
    <select-npc-corporation :corps="FactionsCorps" v-model="selected" class="selector"/>
    <h6 class="title">LP-Offers <a style="color: dodgerblue">NO BLUEPRINTS</a></h6>
    <table-lptrades :corp="this.selected" class="table"/>
  </div>
</template>

<script>
import SelectNpcCorporation from "components/select/npcCorporation/select-npcCorporation.vue"
import {mapState, mapActions} from "vuex"
import TableLptrades from "components/table/lpTrades/table-lpTrades.vue";
export default {
  name: 'App',
  components: {TableLptrades, SelectNpcCorporation},
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

<style>
.text {
  font-family: "Microsoft Sans Serif", sans-serif;
  text-align: left;
  color: #9F9F9F;
  font-weight: bold;
  font-size: 10px;
}
::-webkit-scrollbar{
  width: 6px;
  background-color: #090909;
}
::-webkit-scrollbar-thumb{
  background-color: #484848;
}
*{
  background-color: rgb(3, 3, 3);
  border-color: rgb(32,32,32);
  padding: 0;
  margin: 0;
}
</style>
<style scoped>
#app{
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #030303;
  overflow: scroll;
}
.selector {
  position: static;
  top: 0;
  left: 0;
}
.table{
  width: 100%;
  position: static;
  height: 500px;
}
.title{
  position: static;
  text-align: left;
  padding: 3px 0px 9px 1px;
  font-size: 15px;
}
</style>
