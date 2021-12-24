<template>
  <div class="list">
    <npc-faction-option
        @selected="factionSelected"
        class="list-item"
        v-for="(faction, idx) in factions"
        :key="idx"
        :faction="faction"
        :is-selected="isSelectedFaction(faction.id)"
    ></npc-faction-option>
  </div>
</template>

<script>
import NpcFactionOption from "./npcFactionOption.vue";
export default {
  name: "npcFactionList",
  components: {NpcFactionOption},
  props: {
    factions: {
      required : true
    },
    selected: {
      default : []
    }
  },
  methods : {
    factionSelected(faction) {
      this.$emit("selected", faction)
    },
    isSelectedFaction(factionID){
      return factionID === this.selected?.id
    }
  },
}
</script>

<style scoped>
.list{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 170px;
  overflow: auto;
}
.list-item{
  width: 100%;
  align-self: stretch;
}
</style>