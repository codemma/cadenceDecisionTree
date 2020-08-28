<template>
  <div id="app">
    <input v-model="runId" placeholder="Enter run ID" />
    <button v-on:click="onClick">Build Tree</button>
    <!--  <div id="nav">
      <router-link to="/tree">Tree</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
import router from "./router";
export default {
  mounted() {},
  data() {
    return {
      runId: "",
    };
  },
  methods: {
    onClick() {
      router.push({ name: "Tree", params: { runId: this.runId } });
    },
  },
};
</script>

<style lang="stylus">
button, input {
  margin-bottom: 20px;
}

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
  margin-top: 60px;
  height: 100vh;
}
</style>
