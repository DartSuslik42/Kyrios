<template>
  <span class="block">
    <a class="name">{{name}}</a>
    <a class="amount" >{{quantity}}</a>
  </span>
</template>

<script>
import axiosESI from "../../../store/axiosESI.js";
export default {
  name: "Item_Amount_Element",
  props: {
    type_id : {
      required : true
    },
    quantity : {
      required : true
    },
  },
  data(){
    return{
      name : "",
    }
  },
  async created() {
    const typeInfo = await axiosESI.getTypeInformation(this.type_id)
    this.name = typeInfo.name
    console.debug({
      source : "Item_Amount_Element",
      type_id: this.type_id,
      name: typeInfo.name,
    })
  }
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