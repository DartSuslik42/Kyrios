<template>
  <div v-if="corp">
    <table>
      <tr>
        <th>Item</th>
        <th>LP</th>
        <th>ISK</th>
        <th>Other Requirements</th>
        <th>Other Cost</th>
        <th>Sell Price</th>
  <!--      <th>Buy Price</th>-->
        <th>isk/lp</th>
      </tr>
      <tr v-for="(trade, idx) in trades" :key="idx">
        <th>
          <Item_Amount_Element :type_id="trade.type_id" :quantity="trade.quantity"></Item_Amount_Element>
        </th>
        <th>{{trade.lp_cost}}</th>
        <th>{{trade.isk_cost}}</th>
        <th>
          <ul class="list_required_items">
            <li v-for="(item,idx) in trade.required_items" :key="idx">
              <Item_Amount_Element :quantity="item.quantity" :type_id="item.type_id"></Item_Amount_Element>
            </li>
          </ul>
        </th>
        <th> ??? </th>
        <th> ??? </th>
        <th> ??? </th>
      </tr>
    </table>
  </div>
</template>

<script>
import axiosESI from "store/axiosESI.js";
import Item_Amount_Element from "./Item_Amount_Element.vue";
export default {
  name: "table-lptrades",
  components: {Item_Amount_Element},
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
    async corp(newVal){
      this.trades = await axiosESI.getCorpLPOffers(newVal?.id)
    }
  },
}
</script>

<style scoped>
.list_required_items{
  list-style-type : none;
  margin: 0 0;
}
</style>