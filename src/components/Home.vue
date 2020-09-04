<template>
  <div id="home">
    <div id="nav">
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '957bad90-9c99-4afb-8ccc-0e550a439a60' }}"
      >Parent workflow</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: 'afc9e3d9-cba6-4df1-b212-919c34addf5b' }}"
      >Failed workflow</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '524629a5-f63e-47b0-a7b1-5e74304d9da3' }}"
      >HelloActivity</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '3432067e-fed0-4c4d-9a16-a3395e1eb1d8' }}"
      >HelloActivityRetry</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '6b03969b-06fa-4325-9c07-9b6b038ccde5' }}"
      >HelloAsync</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '18546f28-b06f-4fd2-a5b8-dfeeca5dd195' }}"
      >HelloAsyncActivityCompletion</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '4502a990-339f-4d58-b193-b672b2b79f11' }}"
      >HelloAsyncLambda</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '4502a990-339f-4d58-b193-b672b2b79f11' }}"
      >HelloAsyncLambda</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '1f229f6c-aa12-44e7-8846-a62878691977' }}"
      >HelloException</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '657b7334-6f4d-4ad7-ba1d-517178b57963' }}"
      >HelloPeriodic</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: 'd4f2f2f2-5db7-4fae-aa77-46ab93bc44ca' }}"
      >HelloQuery</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: '05538fc1-7c7e-4a0b-99a9-3e86e6feca03' }}"
      >HelloSignal</router-link>
      <router-link
        class="router-link"
        :to="{ name: 'tree', params: { runId: 'fe80f571-639d-471b-b7a0-2fd49bc052cf' }}"
      >HelloSearchAttributes</router-link>
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