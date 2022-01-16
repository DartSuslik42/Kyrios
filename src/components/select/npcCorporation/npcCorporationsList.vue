<template>
  <tr class="list">
    <td v-for="(corp, idx) in corps"
        :key="idx"
    >
      <npc-corporation-option
          @selected="corpSelected"
          class="list-item"
          :corp="corp"
          :is-selected="isSelectedCorp(corp.id)"
      />
    </td>
  </tr>
</template>

<script>
import NpcCorporationOption from "./npcCorporationOption.vue";
export default {
  name: "npcCorporationsList",
  components: {NpcCorporationOption},
  props: {
    corps: {
      required : true
    },
    selected : {
      default : null,
    }
  },
  methods : {
    corpSelected(corp) {
      this.$emit("selected", corp)
    },
    isSelectedCorp(corpID){
      return corpID === this.selected?.id
    }
  },
}
</script>

<style scoped>
*{
  background-color: inherit;
}
.list{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 300px;
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