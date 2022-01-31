<template>
  <div id="app">
    <LPStore/>
  </div>
</template>

<script>
import LPStore from "./components/pages/LP-Store.vue";
export default {
  name: 'App',
  components: {LPStore},
}
</script>

<style scoped>
#app{
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  cursor:  default;
}
</style>
