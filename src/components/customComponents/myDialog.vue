<template>
  <div v-if="value" id="dialogBody" @click="clickEvent">
    <div @click.stop id="dialogContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "myDialog",
  props:{
    value : {
      type : Boolean,
      default : false,
    },
  },
  methods:{
    clickEvent(){
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped>
#dialogBody{
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-blend-mode: darken;
  position: fixed;
  display: flex;
}
#dialogContent{
  margin: 0 0;
  height: 0;
  width: 0;
}
</style>