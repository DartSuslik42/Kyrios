<template>
  <div>
    <npc-corporation-selected
        :corp="value"
        @click="()=>{this.showTable = true}"
        v-if="!showTable"
    ></npc-corporation-selected>
    <my-dialog v-model="showTable">
      <table>
        <tr>
          <td class="factions">
            <npc-faction-list :factions="factions" :selected="selectedFaction" @selected="factionSelected"></npc-faction-list>
          </td>
          <td v-if="selectedFaction" class="corps">
            <npc-corporations-list
                :corps="this.corps[this.factions.findIndex((element)=>{
                if(element.id === this.selectedFaction.id){return true}
                })].Corporations"
                :selected="value"
                @selected="corpSelected"
            >
            </npc-corporations-list>
          </td>
        </tr>
      </table>
    </my-dialog>
  </div>
</template>
<script>
import NpcCorporationsList from "./npcCorporationsList.vue";
import NpcFactionList from "./npcFactionList.vue";
import MyDialog from "components/customComponents/myDialog.vue";
import NpcCorporationSelected from "./npcCorporation-selected.vue";
export default {
  name: "select-npcCorporation",
  components: {NpcCorporationSelected, MyDialog, NpcFactionList, NpcCorporationsList},
  props:{
    corps : {
      required : true
    },
    value :{
      default : null
    }
  },
  methods:{
    factionSelected(fact){
      this.selectedFaction = fact;
    },
    corpSelected(corp){
      // this.selectedCorp = corp
      this.showTable = false
      this.$emit("input", corp)
    },
  },
  data(){
    return {
      selectedCorp : null,
      selectedFaction : null,
      factions : [],
      showTable : false,
    }
  },
  created() {
    this.corps.forEach((p) => {
      this.factions.push(p.Faction)
    })
  },
}
</script>

<style>
table{
  background-color: #0C0C0C;
  border-collapse: collapse;
  height: 1px;
}
.corps {
  width: 70%;
  padding: 0 0;
  vertical-align: top;
  overflow-y: auto;
}
.factions{
  width: 30%;
  padding: 0 0;
  vertical-align: top;
}
</style>