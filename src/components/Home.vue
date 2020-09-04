<template>
  <div id="home">
    <div id="nav">
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '957bad90-9c99-4afb-8ccc-0e550a439a60' }}"
      >Parent workflow</router-link>
      <router-link
        :to="{ name: 'tree', params: { runId: 'afc9e3d9-cba6-4df1-b212-919c34addf5b' }}"
      >Failed workflow</router-link>
      <router-link
        :to="{ name: 'tree', params: { runId: '524629a5-f63e-47b0-a7b1-5e74304d9da3' }}"
      >HelloActivity</router-link>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "home",
};
</script>
<!-- styling for the component -->
<style>
#about {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#nav {
  display: flex;
  flex-direction: column;
}
</style>