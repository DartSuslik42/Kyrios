<template>
  <tr>
    <td class="col-1">
      <Item_Amount_Element :type_id="trade.type_id" :quantity="trade.quantity"></Item_Amount_Element>
    </td>
    <td class="col-2">{{trade.lp_cost}} LP</td>
    <td class="col-3">{{trade.isk_cost}} ISK</td>
    <td class="col-4">
      <ul class="list_required_items">
        <li v-for="(item,idx) in trade.required_items" :key="idx">
          <Item_Amount_Element :quantity="item.quantity" :type_id="item.type_id"></Item_Amount_Element>
        </li>
      </ul>
    </td>
    <td class="col-5">{{getArrPrice(trade.required_items)}} ISK</td>
    <td class="col-6">{{getPrice(trade.type_id)}} ISK</td>
    <td class="col-7"></td>
  </tr>
</template>

<script>
import Item_Amount_Element from "./Item_Amount_Element.vue";
import LocalStorage from "../../../store/LocalStorage.js";
export default {
  name: "tr-trade-element",
  components: {Item_Amount_Element},
  props : {
    trade : {
      required : true,
    }
  },
  methods : {
    // async getPrice(type_id){
    //   const ret = await axiosESI.getMarketOrders(type_id, null, null)
    //   return ret[0].price
    // },
    getPrice(type_id){
      return LocalStorage.getMarketPrice(type_id).adjusted_price
    },
    getArrPrice(arr){
      let price = 0
      arr.forEach(el =>{
        const p = this.getPrice(el.type_id)
        price += p * el.quantity
      })
      return price
    },
  },
}
</script>

<style scoped>
.list_required_items{
  list-style-type : none;
}
</style>