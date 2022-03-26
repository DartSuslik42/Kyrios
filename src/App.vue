<template>
  <div id="app">
    <header id="app-header">
      <ul>
        <li>
          <router-link tag="li" :to="{ path : '/lp_store'}" class="router-link-content">
              <label>LP-Store</label>
          </router-link>
        </li>
        <li>
          <router-link tag="li" :to="{ path : '/bp_store'}" class="router-link-content">
              <label>BP-Store</label>
          </router-link>
        </li>
        <li>
          <router-link tag="li" :to="{ path : '/home'}" class="router-link-content">
            <label>About us</label>
          </router-link>
        </li>
      </ul>
    </header>
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
  display: flex;
  align-self: stretch;
  width: 100%;
}
#app{
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
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
  background-color: var(--main-bg-color-default);
  border-bottom: 1px solid var(--main-brdr-color-default);
  color: var(--main-txt-color-default);
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
  align-items: center;
  justify-content: center;
  height: max-content;
}
li.router-link-active{
  background-color: var(--main-brdr-color-default);
}
.router-link-content{
  width: 100%;
  height: 100%;
  margin: 0 1px 0 0;
  padding: 7px 6px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

