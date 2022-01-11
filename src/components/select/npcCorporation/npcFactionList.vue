<template>
  <tr class="list">
    <td v-for="(faction, idx) in factions"
        :key="idx"
    >
      <npc-faction-option
          @selected="factionSelected"
          class="list-item"
          :faction="faction"
          :is-selected="isSelectedFaction(faction.id)"
      />
    </td>
  </tr>
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
}
.list-item{
  width: 100%;
  align-self: stretch;
}
tr {
  display: table-cell;
  height: 100%;
  overflow-y: auto;
}
tr td {
  display: block;
  width: 100%;
}
</style>