<template>
  <div class="demo">
    <div class="menu">
      <router-link to="simple">基本</router-link>
      <router-link to="all">所有组件</router-link>
      <router-link to="string">string</router-link>
      <router-link to="multi">multi</router-link>

      <router-link to="object">object</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {

}
</script>
<style>
  .menu {
    margin-bottom: 20px;
  }
  .demo {
    padding: 20px;
  }
  a {
    margin: 10px;
  }
</style>
