<template>
  <img :src="dataSrc" :alt="'NotFound'">
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
      required : true,
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
    }
  },
  methods : {
    setDataSrc() {
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
      console.debug(this.dataSrc)
    },
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

</style>