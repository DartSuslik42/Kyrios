<template>
  <div class="contentFiltrationBlock">
    <div>
      <label>Select Filter</label>
      <select v-model="selectedAvailableFilter">
        <option v-for="(filter, idx) in available_filters()" :key="idx" :value="filter">
          {{filter.title}}
        </option>
      </select>
      <div v-if="this.selectedFilter">
        <ul>
          <li v-for="(field, prop) in selectedFilter.fields" :key="prop">
            <label>{{field.title}}</label>
            <input v-model="field.value" :type="field.type"/>
          </li>
        </ul>
        <button @click="addFilter()">Add Filter</button>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="(filter, idx) in selectedFilters" :key="idx">
          <label>{{filter.title}}</label>
          <button @click.prevent="removeFilter(filter)">Remove Filter</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {filters} from "../../../model/LPTradesFilters";
import {mapMutations} from "vuex"
export default {
  name: "content-filtration-block",
  data(){
    return{
      selectedFilters : [],
      selectedFilter : null,
      selectedAvailableFilter : null,
    }
  },
  methods:{
    available_filters(){
      return filters
    },
    addFilter(){
      this.selectedFilters.push(this.selectedFilter)
      this.selectedFilter = null
      this.selectedAvailableFilter = null
    },
    removeFilter(filter){
      this.selectedFilters = this.selectedFilters.filter((obj)=>{
        return obj !== filter
      })
      this.emitFiltersUpdate()
    },
    emitFiltersUpdate(){
      this.setFilters(this.selectedFilters)
    },
    ...mapMutations({
      setFilters : "lpTradesModule/setFilters",
    }),
  },
  watch : {
    selectedAvailableFilter(newVal){
      if(newVal) {
        this.selectedFilter = newVal.clone()
      }
    },
  },
  mounted() {
    this.emitFiltersUpdate()
  },
}
</script>

<style>
.contentFiltrationBlock, .contentFiltrationBlock *{
  color: inherit;
  background-color: inherit;
}
</style>