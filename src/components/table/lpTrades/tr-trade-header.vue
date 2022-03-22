<template>
  <tr>
    <th class="col-1">Trade Item[s]</th>
    <th class="col-2">Trade Cost : LP</th>
    <th class="col-3">Trade Cost : ISK</th>
    <th class="col-4">Other Requirements</th>
    <th class="col-5">Other Cost</th>
    <th class="col-6">Sell Price per Item</th>
    <th class="col-7">Average Volume</th>
    <th class="col-8">ISK/LP</th>
  </tr>
</template>

<script>
export default {
  name: "tr-trade-header"
}
</script>

<style scoped>
*{
  background-color: inherit;
}
th{
  border-color: var(--main-bg-color-content);
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-spacing: 0;
  text-align: left;
  padding: 5px 5px 3px 5px;
  position: sticky;
  top: 0;
}
</style>