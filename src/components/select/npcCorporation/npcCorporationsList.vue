<template>
  <div class="list">
    <npc-corporation-option
        @selected="corpSelected"
        class="list-item"
        v-for="(corp, idx) in corps"
        :key="idx"
        :corp="corp"
        :is-selected="isSelectedCorp(corp.id)"
    ></npc-corporation-option>
  </div>
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
.list{
  width: 100%;
  align-items: flex-start;
  overflow-y: auto;
  min-width: 300px;
  height: 100%;
}
.list::-webkit-scrollbar{
  width: 6px;
  background-color: #090909;
}
.list::-webkit-scrollbar-thumb{
  background-color: #484848;
}
.list-item{
  width: 100%;
  align-self: stretch;
}
</style>