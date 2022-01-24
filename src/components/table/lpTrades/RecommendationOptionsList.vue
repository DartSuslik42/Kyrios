<template>
  <div id="main">
    <ul>
      <li>
        <label for="MinDailyTradeVolume">MinDailyTradeVolume</label>
        <input v-model="MinDailyTradeVolume" type="number" min="0" id="MinDailyTradeVolume"/>
      </li>
      <li>
        <label for="MinIskPerLP">MinIskPerLP</label>
        <input v-model="MinIskPerLP" type="number" id="MinIskPerLP"/>
      </li>
      <li>
        <label for="TakenMarketVolume">TakenMarketVolume</label>
        <input v-model="TakenMarketVolume" type="number" min="0" id="TakenMarketVolume"/>
      </li>
    </ul>
    <button @click.prevent="recommend()">Recommend</button>
    <button @click.prevent="filter()">Filter</button>
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
  methods:{
    filter(){
    },
    recommend(){
    },
  }
}
</script>

<style scoped>
*{
  background: none;
}
input, button{
  background-color: var(--main-bg-color-content);
}
ul{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}
li{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
}
</style>