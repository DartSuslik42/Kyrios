<template>
  <tr>
    <td class="col-1">
      <Item_Amount_Element :type_id="trade.type_id" :quantity="trade.quantity"></Item_Amount_Element>
    </td>
    <td class="col-2">{{trade.lp_cost}} LP</td>
    <td class="col-3">{{$format.EVE_number(trade.isk_cost)}} ISK</td>
    <td class="col-4">
      <ul class="list_required_items">
        <li v-for="(item, idx) in trade.required_items" :key="idx">
          <Item_Amount_Element :quantity="item.quantity" :type_id="item.type_id"></Item_Amount_Element>
        </li>
      </ul>
    </td>
    <td class="col-5"><a v-if="other_price">{{$format.EVE_number(other_price)}} ISK</a></td>
    <td class="col-6"><a v-if="sell_price"> {{$format.EVE_number(sell_price)}} ISK</a></td>
    <td class="col-7"><a :class="{green : isk_per_lp > 0, red : isk_per_lp < 0 }">{{$format.EVE_number(isk_per_lp)}}</a></td>
  </tr>
</template>
<script>
import Item_Amount_Element from "./Item_Amount_Element.vue";
import axiosESI from "../../../store/axiosESI.js";
export default {
  name: "tr-trade-element",
  components: {Item_Amount_Element},
  props : {
    trade : {
      required : true,
    }
  },
  data(){
    return{
      other_price : null,
      sell_price : null,
      isk_per_lp : null,
      trade_info : null,
    }
  },
  methods : {
    async getPrice(type_id, region_id, order_type){
      const marketOrders = await axiosESI.getMarketOrders(type_id, region_id, order_type)
      if(marketOrders?.length){
        return marketOrders[0].price
      }
      return 0
    },
    async getArrPrice(arr){
      let price = 0
      for(let el of arr){
          const p = await this.getPrice(el.type_id, null, "sell")
          price += p * el.quantity
      }
      return price
    },
  },
  async created() {
    this.sell_price = await this.getPrice(this.trade.type_id, null, "buy")
    this.other_price = await this.getArrPrice(this.trade.required_items)
    this.trade_info = await axiosESI.getTypeInformation(this.trade.type_id)
  }
}
</script>

<style scoped>
*{
  background-color: inherit;
}
.list_required_items{
  list-style-type : none;
}
.green{
  color: forestgreen;
}
.red{
  color: darkred;
}
</style>