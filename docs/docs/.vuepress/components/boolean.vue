<template>
  <div :id="`string${y}`" :style="`height: ${height}; overflow: hidden`">
    <iframe
      :style="{
       border: 'none',
       width: '100%',
       height: '500px',
      }"
      src="/vue-form-render/dist/#/docs/boolean"
    />
  </div>
</template>
<script>

export default {
  name: 'boolean',
  props: {
    y: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: '30px'
    }
  },
  mounted() {
    document.getElementById(`string${this.y}`).scrollTop = this.y;
  }
}
</script>