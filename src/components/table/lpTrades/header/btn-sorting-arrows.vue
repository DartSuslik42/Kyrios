<template>
  <div class="main"
      @click.stop="buttonClicked()">
    <button type="button" class="arrow"
            :class="{'arrow-notActive' : !this.isActive}"
            :style="{
              transform: `rotate(${this.states[this.stateIndex].options.deg}deg)`,
              webkitTransform : `rotate(${this.states[this.stateIndex].options.deg}deg)`,
    }">
    </button>
  </div>
</template>

<script>
export default {
  name: "btn-sorting-arrows",
  props:{
    states : {
      default: [],
      required : true,
    },
    isActive : {
      default : false,
    },
  },
  data(){
    return {
      stateIndex : 0,
    }
  },
  methods: {
    buttonClicked(){
      if(this.isActive) {
        this.incrementStateIndex()
      }
      this.emitClick()
    },
    emitClick() {
      this.$emit("click", this.states[this.stateIndex].callback)
    },
    incrementStateIndex(){
      if(this.stateIndex + 1 === this.states.length){
        this.stateIndex = 0
      }else {
        this.stateIndex++
      }
    }
  },
  watch : {
    isActive(){
      this.stateIndex = 0
    }
  }
}
</script>

<style scoped>
.arrow {
  width: 0;
  height: 0;
  border: solid 3px transparent;
  background: transparent;
  border-bottom: solid 5px var(--main-txt-color-isActive);
  border-top-width: 0;
}
.arrow-notActive {
  border-bottom-color: var(--main-txt-color-notActive);
}
.main{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
}
</style>