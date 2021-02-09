<template>
  <div :id="`string${y}`" :style="`height: ${height}; overflow: hidden`">
    <iframe
      :style="{
       border: 'none',
       width: '100%',
       height: '1000px',
      }"
      src="/vue-form-render/dist/#/docs/array"
    />
  </div>
</template>
<script>

export default {
  name: 'number',
  props: {
    y: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: '80px'
    }
  },
  mounted() {
    document.getElementById(`string${this.y}`).scrollTop = this.y;
  }
}
</script>