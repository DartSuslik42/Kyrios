<template>
  <div>
    <div>
      <label>Select Filter</label>
      <select v-model="selectedFilter">
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
          {{filter}}
          <button @click.prevent="removeFilter(filter)">Remove Filter</button>
        </li>
      </ul>
    </div>
    <div v-if="this.selectedFilters.length">
      <button>Filter</button>
    </div>
  </div>
</template>

<script>
const filters = Object.freeze({
  isk_per_lp : {
    title : "ISK/LP",
    fields : {
      min_isk : {
        type : "number",
        title : "MIN ISK/LP",
        value : "0",
      },
    },
    filter_function : function(isk_per_lp){
      return isk_per_lp >= this.fields.min_isk.value
    },
  },
  volume : {
    title : "Daily Volume",
    fields : {
      min_volume : {
        type : "number",
        title : "MIN volume",
        value : "0",
      },
      min_taken_volume : {
        type : "number",
        title : "MIN taken daily volume",
        value : "1",
      },
    },
    filter_function : function(volume){
      if(volume < this.fields.min_volume.value){
        return false
      }
      return volume * (this.fields.min_taken_volume.value) >= 1
    },
  },
  total_isk : {
    title : "Total ISK",
    fields : {
      isk_owned : {
        type : "number",
        title : "Total owned ISK",
        value : "0",
      },
    },
    filter_function : function(isk_amount){
      return isk_amount <= this.fields.isk_owned.value
    },
  },
  total_lp : {
    title : "Total LP",
    fields : {
      min_lp : {
        type: "number",
        title: "Total owned LP",
        value: "0",
      },
    },
    filter_function : function(lp_amount){
      return lp_amount <= this.fields.min_lp.value
    },
  },
  other_requirements : {
    title : "Other Requirements",
    fields : {
      hasOtherRequirements : {
        type : "checkbox",
        title : "Has other Requirements",
        value : true,
      },
    },
    filter_function : function(other_requirements_array_length){
      const num = Number(other_requirements_array_length)
      if(this.fields.hasOtherRequirements.value){
          return num > 0
      }else{
          return num <= 0
      }
    },
  },
})
export default {
  name: "content-filtration-block",
  data(){
    return{
      selectedFilters : [],
      selectedFilter : null,
    }
  },
  methods:{
    available_filters(){
      return JSON.parse(JSON.stringify(filters))
    },
    addFilter(){
      this.selectedFilters.push(this.selectedFilter)
      this.selectedFilter = null
    },
    removeFilter(filter){
      this.selectedFilters = this.selectedFilters.filter((obj)=>{
        return obj !== filter
      })
    },
  }
}
</script>

<style scoped>

</style>