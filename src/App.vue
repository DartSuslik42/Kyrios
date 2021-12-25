<template>
  <div id="app" class="text">
    <div v-if="!this.loading">
      <select-npc-corporation :corps="FactionsCorps" v-model="selected" class="selector"/>
      <table-lptrades :corp="this.selected" class="table"></table-lptrades>
    </div>
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
      loading : true
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
  async created(){
    await this.fetchFactionsCorps()
    this.loading = false
  }
}
</script>

<style>
.text {
  font-family: "Microsoft Sans Serif";
  text-align: left;
  color: #9F9F9F;
  font-weight: bold;
}
::-webkit-scrollbar{
  width: 6px;
  background-color: #090909;
}
::-webkit-scrollbar-thumb{
  background-color: #484848;
}
</style>
<style scoped>
#app{
  margin: 0 0;
  width: 100%;
  height: 100%;
  background-color: #030303;
}
.selector {
  width: 0;
  height: 0;
}
.table{
  position: relative;
  left : 0;
  top : 2em;
}
</style>
