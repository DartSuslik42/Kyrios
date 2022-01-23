<template>
  <div class="selector">
    <npc-corporation-selected class="content"
        :corp="value"
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
          :corps="getFactionCorporations(selectedFaction.id)"
          :selected="value"
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
    value :{
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
      this.$emit("input", corp)
    },
  },
  computed:{
    ...mapGetters({
      factions : "npcCorporationsModule/getFactions",
      getFactionCorporations : "npcCorporationsModule/getCorporations",
    })
  },
  data(){
    return {
      selectedCorp : null,
      selectedFaction : null,
      showTable : false,
    }
  },
}
</script>

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
.selector{
  position: relative;
  top: 0;
  left: 0;
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