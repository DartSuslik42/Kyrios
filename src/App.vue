<template>
  <div id="app">
    <div v-if="!this.loading">
      <select-npc-corporation :corps="FactionsCorps" v-model="selected" class="selector"/>
    </div>
  </div>
</template>

<script>
import SelectNpcCorporation from "components/select/npcCorporation/select-npcCorporation.vue"
import {mapState, mapActions} from "vuex"
export default {
  name: 'App',
  components: {SelectNpcCorporation},
  data(){
    return{
      selected : null,
      loading : true
    }
  },
  methods:{
    ...mapActions({
      fetchFactionsCorps : "npcCorporationsModule/fetchData"
    }),
  },
  computed:{
    ...mapState({
      FactionsCorps : "npcCorporationsModule/FactionsCorps"
    })
  },
  async created(){
    await this.fetchFactionsCorps()
    this.loading = false
  }
}
</script>

<style>
#app{
  margin: 0 0;
  width: 100%;
  height: 100%;
  background-color: #030303;
}
.selector{
  width: 0;
  height: 0;
}
</style>
