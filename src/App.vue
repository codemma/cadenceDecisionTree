<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import router from "./router";
export default {};
</script>

<style lang="stylus">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
</style>
