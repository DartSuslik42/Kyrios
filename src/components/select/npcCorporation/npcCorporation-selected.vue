<template>
  <div @click="$emit('click', true)">
    <button v-if="corp" class="default text">
      <img-evetech :category="'corporations'" :id="corp.iconID" class="image"/>
      <span>{{corp.name}}</span>
    </button>

    <button v-else class="default text">
      <img-evetech :category="'corporations'" class="image"/>
      <span id="content">Chose NPC Corporation</span>
    </button>
  </div>
</template>

<script>
import ImgEvetech from "components/img/img-evetech.vue";
export default {
  name: "npcCorporation-selected",
  components: {ImgEvetech},
  props: {
    corp : {
      required : true
    },
  },
}
</script>

<style scoped>
.default{
  padding: 3px 7px 1px 3px;
  display: flex;
  align-items: center;
  border-width: 0;
  min-width: 170px;
  min-height: 32px;
}
.image{
  padding: 2px 7px 2px 2px;
  width: 25px;
  height: 25px;
}
</style>