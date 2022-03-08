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
        <li v-for="(item, idx) in this.trade.required_items" :key="idx">
          <Item_Amount_Element :item="item"></Item_Amount_Element>
        </li>
      </ul>
    </td>
    <td class="col-5">
      <a v-if="this.trade.required_items.length">
        {{$format.EVE_number(this.required_items_price)}} ISK
      </a>
    </td>
    <td class="col-6">
       {{$format.EVE_number(this.price_total)}} ISK
    </td>
    <td class="col-7">
      {{$format.EVE_number(this.daily_volume)}}
    </td>
    <td class="col-8">
      <a :class="{green : this.isk_per_lp > 0, red : this.isk_per_lp < 0 }">
        {{$format.EVE_number(this.isk_per_lp)}}
      </a>
    </td>
  </tr>
</template>
<script>
import Item_Amount_Element from "./Item_Amount_Element.vue";
import {mapGetters} from "vuex";
import {LP_Type_Trade} from "../../../model/Trade";

export default {
  name: "tr-trade-element",
  components: {Item_Amount_Element},
  props : {
    trade : {
      required : true,
      type : LP_Type_Trade,
    }
  },
  computed:{
    ...mapGetters({
      mode : "lpTradesModule/getMode",
    }),
    price_total(){
      return this.trade.getTotalItemPrice({mode : this.mode})
    },
    required_items_price(){
      return this.trade.getRequiredItemsPrice()
    },
    daily_volume(){
      return this.trade.getDailyVolume({mode : this.mode})
    },
    isk_per_lp(){
      return this.trade.getISK_per_LP({mode : this.mode})
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