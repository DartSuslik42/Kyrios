<template>
  <div id="app">
    <div id="app-header">
      <ul>
        <li>
          <router-link :to="{ path : 'lp_store'}" class="router-link-content">
              <label>LP-Store</label>
          </router-link>
        </li>
        <li>
          <router-link :to="{ path : 'foo'}" class="router-link-content">
              <label>Foo</label>
          </router-link>
        </li>
      </ul>
    </div>
    <div id="app-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
#app-body{
  width: 100%;
  height: calc(100% - 7vh);
}
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
#app-header{
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 7vh;
}
#app-header ul{
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  list-style-type: none;
}
#app-header li{
  display: flex;
  flex : 0 1 100px;
  align-items: center;
  justify-content: center;
}
.router-link-content{
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style>
#app-header, #app-header *{
  background-color: white;
}
</style>
