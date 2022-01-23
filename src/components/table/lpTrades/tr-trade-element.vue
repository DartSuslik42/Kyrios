<template>
  <tr>
    <td class="col-1">
      <Item_Amount_Element :item="trade"></Item_Amount_Element>
    </td>
    <td class="col-2">
      <a v-if="this.trade.lp_cost">
        {{trade.lp_cost}} LP
      </a>
    </td>
    <td class="col-3">
      <a v-if="this.trade.isk_cost">
        {{$format.EVE_number(trade.isk_cost)}} ISK
      </a>
    </td>
    <td class="col-4">
      <ul class="list_required_items">
        <li v-for="(item, idx) in trade.required_items" :key="idx">
          <Item_Amount_Element :item="item"></Item_Amount_Element>
        </li>
      </ul>
    </td>
    <td class="col-5">
      <a v-if="this.trade.required_items.length">
        <ul class="list_required_items">
          <li v-for="(item, idx) in trade.required_items" :key="idx">
            {{$format.EVE_number(item.price)}}
          </li>
        </ul>
        <br/>
        {{$format.EVE_number(this.trade.required_items_price)}} ISK
      </a>
    </td>
    <td class="col-6">
       {{$format.EVE_number(this.trade.price * this.trade.quantity)}} ISK
    </td>
    <td class="col-7">
      {{$format.EVE_number(this.trade.market_volume)}}
    </td>
    <td class="col-8">
      <a :class="{green : this.trade.isk_per_lp > 0, red : this.trade.isk_per_lp < 0 }">
        {{$format.EVE_number(this.trade.isk_per_lp)}}
      </a>
    </td>
  </tr>
</template>
<script>
import Item_Amount_Element from "./Item_Amount_Element.vue";
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
      isk_per_lp : null,
    }
  },
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
  color: var(--color-green);
}
.red{
  color: var(--color-red);
}
</style>