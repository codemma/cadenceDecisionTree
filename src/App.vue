<template>
  <div id="app">
    <input v-model="runId" placeholder="Enter run ID" />
    <p>Hint: 957bad90-9c99-4afb-8ccc-0e550a439a60</p>
    <button v-on:click="onClick">Build Tree</button>
    <div id="nav">
      <router-link
        :to="{ name: 'tree', params: { runId: '957bad90-9c99-4afb-8ccc-0e550a439a60' }}"
      >Parent workflow</router-link>
      <router-link
        :to="{ name: 'tree', params: { runId: 'afc9e3d9-cba6-4df1-b212-919c34addf5b' }}"
      >Failed workflow</router-link>

      <!-- <router-link to="/tree" params: { runId: 957bad90-9c99-4afb-8ccc-0e550a439a60 }>Tree</router-link> -->
    </div>
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
      router.push({ name: "tree", params: { runId: this.runId } });
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
