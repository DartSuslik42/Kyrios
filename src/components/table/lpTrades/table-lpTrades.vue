<template>
  <div id="table-npc-trades">
    <table id="table-content">
      <thead>
        <tr-trade-header/>
      </thead>
      <tbody v-if="!loading" class="content">
        <tr-trade-element v-for="(trade, idx) in trades" :key="idx" :trade="trade"/>
      </tbody>
      <tbody v-else>
        <tr-trade-element-empty/>
      </tbody>
    </table>
  </div>
</template>

<script>
import axiosESI from "../../../store/axiosESI.js";
import TrTradeHeader from "./tr-trade-header.vue";
import TrTradeElement from "./tr-trade-element.vue";
import TrTradeElementEmpty from "./tr-trade-element-empty.vue";
export default {
  name: "table-lptrades",
  components: {TrTradeElementEmpty, TrTradeElement, TrTradeHeader},
  props: {
    corp:{
      default : null
    }
  },
  data(){
    return{
      trades : [],
      loading : true,
    }
  },
  watch:{
    async corp(newVal){
      this.loading = true
      this.trades = await axiosESI.getCorpLPOffers(newVal?.id)
      this.loading = false
    }
  },
}
</script>

<style>
#table-npc-trades table,#table-npc-trades th,#table-npc-trades td{
  border-color: rgb(32, 32, 32);
  border-width: 0 1px 0 0;
  border-style: solid;
  border-spacing: 0;
  text-align: left;
}
#table-npc-trades{
  position: relative;
  top: 0;
  left: 0;
  width: calc(100% - 2px);
  overflow-x: hidden;
  overflow-y: scroll;
  border: 1px solid rgb(32, 32, 32);
}
#table-npc-trades::-webkit-scrollbar{
  display: none;
}
#table-npc-trades th{
  padding: 5px 5px 3px 5px;
  background-color: rgb(21,21,21);
  position: sticky;
  top: 0;
  border-bottom-width: 1px;
}
#table-npc-trades td{
  border-width: 0 1px 0 0;
  padding: 5px 5px;
}
#table-npc-trades tbody.content tr:hover{
  background-color: rgb(32,32,32);
}
#table-npc-trades .col-1{
  width: 25%;
}
#table-npc-trades .col-2{
  width: 10%;
}
#table-npc-trades .col-3{
  width: 10%;
}
#table-npc-trades .col-4{
  width: 25%;
}
#table-npc-trades .col-5{
  width: 10%;
}
#table-npc-trades .col-6{
  width: 10%;
}
#table-npc-trades .col-7{
  width: 10%;
  border-right-width: 0;
}
</style>

<style scoped>
#table-content{
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(21,21,21);

  border-width: 0;
}
</style>