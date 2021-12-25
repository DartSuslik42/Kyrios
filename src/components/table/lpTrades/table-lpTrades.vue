<template>
  <div v-if="corp">
    <table>
      <tr>
        <th>Item</th>
        <th>LP</th>
        <th>ISK</th>
        <th>Other Requirements</th>
        <th>Other Cost</th>
        <th>Quantity</th>
        <th>Sell Price</th>
  <!--      <th>Buy Price</th>-->
        <th>isk/lp</th>
      </tr>
      <tr v-for="(trade, idx) in trades" :key="idx">
        <th>{{trade.type_id}}</th>
        <th>{{trade.lp_cost}}</th>
        <th>{{trade.isk_cost}}</th>
        <th>{{trade.required_items}}</th>
        <th> ??? </th>
        <th>{{trade.quantity}}</th>
        <th> ??? </th>
        <!--      <th>Buy Price</th>-->
        <th> ??? </th>
      </tr>
    </table>
  </div>
</template>

<script>
import axiosESI from "store/axiosESI.js";
export default {
  name: "table-lptrades",
  props: {
    corp:{
      default : null
    }
  },
  data(){
    return{
      trades : []
    }
  },
  watch:{
    async corp(newVal, oldVal){
      if(newVal && newVal !== oldVal) {
        this.trades = await axiosESI.getCorpLPOffers(newVal.id)
      }
    }
  },
}
</script>

<style scoped>

</style>