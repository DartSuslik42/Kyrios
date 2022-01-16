<template>
  <button @click="selected" class="default text" :class="{ selected : this.isSelected }">
    <img-evetech :category="'corporations'" :id="corp.iconID" class="image"/>
    <span>{{corp.name}}</span>
  </button>
</template>

<script>
import ImgEvetech from "components/img/img-evetech.vue";
export default {
  name: "npcCorporationOption",
  components: {ImgEvetech},
  props: {
    corp : {
      type : Object,
      required : true
    },
    isSelected : {
      default : false
    }
  },
  methods : {
    selected(){
      this.$emit("selected", this.corp)
    },
  },
}
</script>

<style scoped>
*{
  background-color: inherit;
}
.default{
  padding: 3px 7px 1px 3px;
  display: flex;
  align-items: center;
  border-width: 0;
}
.default:hover{
  background-color: #202020;
}
.selected {
  background-color: #202020;
}
.image{
  padding: 2px 7px 2px 2px;
  width: 25px;
  height: 25px;
}
</style>