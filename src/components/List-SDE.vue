<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>URL</th>
    </tr>
    <template v-if="listSDE.length">
      <tr v-for="(tableSDE, idx) in listSDE" :key="idx">
        <td>{{idx}}</td>
        <td>{{tableSDE.name}}</td>
        <td><a :href="tableSDE.href">{{tableSDE.href}}</a></td>
      </tr>
    </template>
  </table>
</template>

<script>
import axiosSDE from 'store/axiosSDE.js'
export default {
  name: "List-SDE",
  data(){
    return{
      listSDE : [],
      currentHREF: {},
      index: 0
    }
  },
  methods:{
  },
  mounted() {
    axiosSDE.getList_TableSDE()
        .then((p) => {
          this.listSDE = p.data
        })
        .catch(e => {
          console.log(e.responses);
        });
  }
}
</script>

<style scoped>

</style>