<template>
  <table>
    <thead>
      <tr>
        <th class="col-1">Item</th>
        <th class="col-2">LP</th>
        <th class="col-3">ISK</th>
        <th class="col-4">Other Requirements</th>
        <th class="col-5">Other Cost</th>
        <th class="col-6">Sell Price</th>
        <th class="col-7">ISK/LP</th>
      </tr>
    </thead>
    <tbody v-if="!loading" class="content">
      <tr v-for="(trade, idx) in trades" :key="idx">
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
        <td class="col-5"></td>
        <td class="col-6"></td>
        <td class="col-7"></td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td class="col-1"></td>
        <td class="col-2"></td>
        <td class="col-3"></td>
        <td class="col-4"></td>
        <td class="col-5"></td>
        <td class="col-6"></td>
        <td class="col-7"></td>
      </tr>
    </tbody>
  </table>
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

<style scoped>
.list_required_items{
  list-style-type : none;
}
table, th, td{
  border: 1px solid rgb(32, 32, 32);
  border-collapse: collapse;
  text-align: left;
}
td{
  border-width: 0px 1px;
}
tbody.content tr:hover{
  background-color: rgb(32,32,32);
}
th{
  padding: 5px 5px 3px 5px;
}
td{
  padding: 5px 5px;
}
table{
  width: 100%;
  height: 100%;
  background-color: rgb(21,21,21);
}
thead{
}
tbody{
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.col-1{
  width: 25%;
}
.col-2{
  width: 10%;
}
.col-3{
  width: 10%;
}
.col-4{
  width: 25%;
}
.col-5{
  width: 10%;
}
.col-6{
  width: 10%;
}
.col-7{
  width: 10%;
}
</style>