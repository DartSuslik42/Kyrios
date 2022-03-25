<template>
  <tr>
    <th v-for="(column, idx) in this.columns" :key="idx" :class="column.class">
      <div class="th-content">
        <a>{{column.title}}</a>
        <btn-sorting-arrows v-if="column.canSort"
                            @click="columnSelected($event, column, idx)"
                            :is-active="column.isActive"
                            :states="[
                              {options: { deg : 180 }, callback: function (a, b){ return b > a }},
                              {options: { deg : 0 }, callback: function (a, b){ return a < b }} ]"
        />
      </div>
    </th>
  </tr>
</template>

<script>
import BtnSortingArrows from "./btn-sorting-arrows.vue";
export default {
  name: "tr-trade-header",
  components: {BtnSortingArrows},
  data(){
    return{
      columns : [
        {title: "Trade Item[s]", class: "col-1", canSort: true, isActive: false},
        {title: "Trade Cost : LP", class: "col-2", canSort: true, isActive: false},
        {title: "Trade Cost : ISK", class: "col-3", canSort: true, isActive: false},
        {title: "Other Requirements", class: "col-4", canSort: false},
        {title: "Other Cost", class: "col-5", canSort: false},
        {title: "Sell Price per Item", class: "col-6", canSort: true, isActive: false},
        {title: "Average Volume", class: "col-7", canSort: true, isActive: true},
        {title: "ISK/LP", class: "col-8", canSort: true, isActive: false},
      ],
      sortingColumnIndex : null, // Инициализируется в момент создания компонента
    }
  },
  methods : {
    sortTrades(sortingColumn, sortingFunc){
      /* TODO : Ахтунг! Говнокод!
       Эта функция-декодировщик, собирающая функцию-аргумент для array.sort(..)*/
    },
    columnSelected(eventCallback, column, idx){
      this.sortTrades(column, eventCallback)
      if(idx !== this.sortingColumnIndex) {
        this.columns[this.sortingColumnIndex].isActive = false
        this.sortingColumnIndex = idx
        column.isActive = true
      }
    },
  },
  created() {
    this.sortingColumnIndex = this.columns.findIndex((el)=>el.isActive)
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