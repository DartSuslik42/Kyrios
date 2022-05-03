<template>
  <img :src="dataSrc" @error='error' :alt="''" @load="loaded">
</template>

<script>
export default {
  /**
   * The only true button.
   * @displayName Best Button
   */
  name: "img-evetech",
  props : {
    /**
     * category can take String values
     * @values alliances, corporations, characters, types
     */
    category : {
      type : String,
      validator : (p) => {
        return ["alliances","corporations","characters","types"].indexOf(p) !== -1
      },
      required : true,
    },
    id : {
      default : 1
    },
    variation : {
    },
    /**
     * size can take Number values
     * @values 32, 64, 128, 256, 512, 1024
     */
    size : {
      type : Number,
      default : 32
    }
    // tenant : '', // default : tranquility; also supports singularity
  },
  data(){
    return{
      dataSrc : null,
      dataVariation : null,
      isLoading : true,
    }
  },
  methods : {
    loaded() {
      this.isLoading = false
      this.$emit("load", true)
    },
    setDataSrc() {
      this.isLoading = true
      switch (this.category) {
        case "alliances" :
        case "corporations" :
          this.dataVariation = "logo"
          break
        case "characters":
          this.dataVariation = "portrait"
          break
        default :
          this.dataVariation = this.variation
      }
      this.dataSrc = "https://images.evetech.net/" + this.category + "/" + this.id + "/" + this.dataVariation + "?size=" + this.size
    },
    error(){
      this.dataSrc = "https://images.evetech.net/" + this.category + "/" + 1 + "/" + this.dataVariation + "?size=" + this.size
      this.$forceUpdate()
    }
  },
  watch : {
    id : 'setDataSrc'
  },
  created() {
    this.setDataSrc()
  }
}
</script>

<style scoped>
*{
  background-color: inherit;
}
</style>