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
  }
}
</script>

<style scoped>
.block{
  width: 100%;
}
.name{
}
.amount{
}
</style>