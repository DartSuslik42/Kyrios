<template>
  <div class="npc-corporation-selector">
    <npc-corporation-selected class="content"
        :corp="modelValue"
        @click="()=>{this.showTable = true}"
    ></npc-corporation-selected>
    <table class="content-list"
           v-if="showTable"
    >
      <npc-faction-list
          :factions="factions"
          :selected="selectedFaction"
          @selected="factionSelected"
      />
      <npc-corporations-list
          v-if="selectedFaction"
          :corps="getCorps"
          :selected="modelValue"
          @selected="corpSelected"
      />
    </table>
  </div>
</template>
<script>
import NpcCorporationsList from "./npcCorporationsList.vue";
import NpcFactionList from "./npcFactionList.vue";
import NpcCorporationSelected from "./npcCorporation-selected.vue";
import {mapGetters} from "vuex"
export default {
  name: "select-npcCorporation",
  components: {NpcCorporationSelected, NpcFactionList, NpcCorporationsList},
  props:{
    corps : {
      required : true
    },
    // v-model value bind for selected corp in corps
    modelValue :{
      default : null
    }
  },
  methods:{
    factionSelected(fact){
      this.selectedFaction = fact;
    },
    corpSelected(corp){
      this.selectedCorp = corp
      this.showTable = false
      this.$emit("update:modelValue", corp)
    },
  },
  computed:{
    ...mapGetters({
      factions : "npcCorporationsModule/getFactions",
      getFactionCorporations : "npcCorporationsModule/getCorporations",
      getCorpFaction : "npcCorporationsModule/getCorpFaction",
    }),
    getCorps(){
      return this.getFactionCorporations(this.selectedFaction.id)
    },
  },
  data(){
    return {
      selectedCorp : null,
      selectedFaction : null,
      showTable : false,
    }
  },
  created() {
    if(this.modelValue){
      this.selectedCorp = this.modelValue
      this.selectedFaction = this.getCorpFaction(this.modelValue.id)
    }
  },
}
</script>

<style>
.npc-corporation-selector button{
  color: inherit;
  background-color: inherit;
}
</style>
<style scoped>
.content{
  position: relative;
  top: 0;
  left: 0;
}
.content-list{
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}
.npc-corporation-selector{
  position: relative;
  top: 0;
  left: 0;
  width: min-content;
}
table{
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  border-collapse: collapse;
  background-color: var(--main-bg-color-content);
  border-right: 1px solid var(--main-brdr-color-default);
  border-spacing: 0;
  height: 100%;
}
</style>