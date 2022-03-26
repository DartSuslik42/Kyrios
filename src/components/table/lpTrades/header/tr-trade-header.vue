<template>
  <tr>
    <th v-for="(column, idx) in this.columns" :key="idx" :class="column.class">
      <div class="th-content">
        <a>{{column.title}}</a>
        <btn-sorting-arrows v-if="column.canSort"
                            @click="columnSelected($event, column, idx)"
                            :is-active="column.isActive"
                            :states="states"
        />
      </div>
    </th>
  </tr>
</template>

<script>
import BtnSortingArrows from "./btn-sorting-arrows.vue";
import {mapGetters, mapMutations} from "vuex";
import {desc, asc} from "/src/model/sortingComparators.js"
export default {
  name: "tr-trade-header",
  components: {BtnSortingArrows},
  data(){
    return{
      columns : [
        {title: "Trade Item[s]", class: "col-1", canSort: true, isActive: false,
          getTradeSortingParam : function (trade){ return trade.name } },
        {title: "Trade Cost : LP", class: "col-2", canSort: true, isActive: false,
          getTradeSortingParam : function (trade){ return trade.lp_cost } },
        {title: "Trade Cost : ISK", class: "col-3", canSort: true, isActive: false,
          getTradeSortingParam : function (trade){ return trade.isk_cost } },
        {title: "Other Requirements", class: "col-4", canSort: false},
        {title: "Other Cost", class: "col-5", canSort: false},
        {title: "Sell Price per Item", class: "col-6", canSort: true, isActive: false,
          getTradeSortingParam : (trade)=>{ return trade.getSingleItemPrice({mode : this.mode}) } },
        {title: "Average Volume", class: "col-7", canSort: true, isActive: true,
          getTradeSortingParam : (trade)=>{ return trade.getDailyVolume({mode : this.mode}) } },
        {title: "ISK/LP", class: "col-8", canSort: true, isActive: false,
          getTradeSortingParam : (trade)=>{ return trade.getISK_per_LP({mode : this.mode}) } },
      ],
      states : [
        {options: { deg : 180 }, callback: desc},
        {options: { deg : 0 }, callback: asc}
      ],
      sortingColumnIndex : null, // Инициализируется в момент создания компонента
    }
  },
  methods : {
    setTradesSortingFunction(sortingColumn, comparator){
      this.setSortingFunction((a,b)=> {
        return comparator(
            sortingColumn.getTradeSortingParam(a),
            sortingColumn.getTradeSortingParam(b))
      })
    },
    columnSelected(eventCallback, column, idx){
      this.setTradesSortingFunction(column, eventCallback)
      if(idx !== this.sortingColumnIndex) {
        this.columns[this.sortingColumnIndex].isActive = false
        this.sortingColumnIndex = idx
        column.isActive = true
      }
    },
    ...mapMutations({
      setSortingFunction : "lpTradesModule/setSortingFunction"
    })
  },
  computed:{
    ...mapGetters({
      mode : "lpTradesModule/getMode"
    })
  },
  mounted() {
    this.sortingColumnIndex = this.columns.findIndex((el)=>el.isActive)
    this.setTradesSortingFunction(this.columns[this.sortingColumnIndex], desc)
  }
}
</script>

<style scoped>
*{
  background-color: inherit;
}
th{
  border-color: var(--main-bg-color-content);
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-spacing: 0;
  text-align: left;
  padding: 5px 5px 3px 5px;
  position: sticky;
  top: 0;
}
.th-content{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>