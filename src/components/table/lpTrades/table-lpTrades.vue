<template>
  <div id="table-npc-trades" ref="table_lpTrades">
    <table id="table-content">
      <thead>
        <tr-trade-header/>
      </thead>
      <tbody class="content">
        <template v-if="!isEmpty">
          <tr-trade-element v-for="(trade, idx) in trades" :key="idx" :trade="trade"/>
        </template>
      </tbody>
      <tr-trade-element-empty class="table-empty" v-show="isEmpty"/>
    </table>
  </div>
</template>

<script>
import TrTradeHeader from "./tr-trade-header.vue";
import TrTradeElement from "./tr-trade-element.vue";
import TrTradeElementEmpty from "./tr-trade-element-empty.vue";
export default {
  name: "table-lptrades",
  components: {TrTradeElementEmpty, TrTradeElement, TrTradeHeader},
  props: {
    trades : {
      default : [],
    }
  },
  data(){
    return{
      isMounted : false,
    }
  },
  computed:{
    isEmpty(){
      return !this.trades.length
    }
  },
  methods:{
    scrollToTop(){
      if(this.isMounted){
        this.$refs.table_lpTrades.scrollTo(0,0)
      }
    }
  },
  watch:{
    trades(){
      this.scrollToTop()
    }
  },
  mounted() {
    this.isMounted = true
  },

}
</script>

<style>
/* border settings */
#table-npc-trades table,#table-npc-trades th,#table-npc-trades td{
  border-color: var(--main-brdr-color-default);
  border-width: 0 1px 0 0;
  border-style: solid;
  border-spacing: 0;
}
#table-npc-trades{
  position: relative;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  border: 1px solid var(--main-brdr-color-default);
}
/* scrollbar settings*/
#table-npc-trades::-webkit-scrollbar{
  display: none;
}

#table-npc-trades th{
  padding: 5px 5px 3px 5px;
  position: sticky;
  top: 0;
  border-bottom-width: 1px;
  background-color: inherit;
}
#table-npc-trades td{
  border-width: 0 1px 0 0;
  padding: 5px 5px;
  background: none;
}
#table-npc-trades tr{
  background-color: var(--main-bg-color-content);
}

#table-npc-trades tbody.content tr:hover{
  background-color: var(--main-bg-color-content-hover);
}
#table-npc-trades .col-1{
  width: 20%;
}
#table-npc-trades .col-2{
  text-align: right;
  width: 10%;
}
#table-npc-trades .col-3{
  text-align: right;
  width: 10%;
}
#table-npc-trades .col-4{
  width: 20%;
}
#table-npc-trades .col-5{
  text-align: right;
  width: 10%;
}
#table-npc-trades .col-6{
  text-align: right;
  width: 10%;
}
#table-npc-trades .col-7{
  width: 10%;
  text-align: right;
}
#table-npc-trades .col-8{
  text-align: right;
  width: 10%;
  border-right-width: 0;
}
</style>
<style scoped>
#table-content{
  position: relative;
  top: 0;
  left: 0;
  height: inherit;
  width: 100%;
  background-color: var(--main-bg-color-content);
  border-width: 0;
}
.table-empty{
  height: inherit;
}
</style>