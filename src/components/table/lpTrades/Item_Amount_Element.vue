<template>
  <span class="block">
    <a class="name">{{item.name}}</a>
    <a class="amount" >{{item.quantity}}</a>
  </span>
</template>

<script>
export default {
  name: "Item_Amount_Element",
  props: {
    item : {
      required : true,
    },
  },
}
</script>

<style scoped>
*{
  background-color: inherit;
}
.block{
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.name{
  text-align: left;
  text-overflow: fade;
  min-width: 0;
  overflow: hidden;
  flex: 1 1 10px
}
.amount{
  text-align: right;
  flex: 0 0 50px
}
</style>