<template>
  <div id="main">
    MinDailyTradeVolume <input v-model="MinDailyTradeVolume" type="number"/>
    MinIskPerLP <input v-model="MinIskPerLP" type="number"/>
    TakenMarketVolume <input v-model="TakenMarketVolume" type="number"/>
    <button>Recommend</button>
    <button>Filter</button>
  </div>
</template>

<script>
export default {
  name: "RecommendationOptionsList",
  data(){
    return{
      MinDailyTradeVolume : 100,
      MinIskPerLP : 300,
      TakenMarketVolume : 20,
    }
  },
}
</script>

<style scoped>
*, input{
  background-color: var(--main-bg-color-content);
}
#main{
  border: 1px solid var(--main-brdr-color-default);
}
</style>