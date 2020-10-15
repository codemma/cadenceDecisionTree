<template>
  <div id="home">
    <h2>Demo routes</h2>
    <div id="nav">
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '957bad90-9c99-4afb-8ccc-0e550a439a60' },
        }"
        >HelloChild</router-link
      >
      <div class="explanation">workflow with child</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '524629a5-f63e-47b0-a7b1-5e74304d9da3' },
        }"
        >HelloActivity</router-link
      >
      <div class="explanation">a single activity workflow</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '3432067e-fed0-4c4d-9a16-a3395e1eb1d8' },
        }"
        >HelloActivityRetry</router-link
      >
      <div class="explanation">retrying an activity</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '6b03969b-06fa-4325-9c07-9b6b038ccde5' },
        }"
        >HelloAsync</router-link
      >
      <div class="explanation">
        how to call activities asynchronously and wait for them using Promises
      </div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '18546f28-b06f-4fd2-a5b8-dfeeca5dd195' },
        }"
        >HelloAsyncActivityCompletion</router-link
      >
      <div class="explanation">an asynchronous activity implementation</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '4502a990-339f-4d58-b193-b672b2b79f11' },
        }"
        >HelloAsyncLambda</router-link
      >
      <div class="explanation">
        how to run part of a workflow asynchronously in a separate task (thread)
      </div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '1f229f6c-aa12-44e7-8846-a62878691977' },
        }"
        >HelloException</router-link
      >
      <div class="explanation">exception propagation and wrapping</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '657b7334-6f4d-4ad7-ba1d-517178b57963' },
        }"
        >HelloPeriodic</router-link
      >
      <div class="explanation">
        a sample workflow that executes an activity periodically forever
      </div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: 'd4f2f2f2-5db7-4fae-aa77-46ab93bc44ca' },
        }"
        >HelloQuery</router-link
      >
      <div class="explanation">a query</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: '05538fc1-7c7e-4a0b-99a9-3e86e6feca03' },
        }"
        >HelloSignal</router-link
      >
      <div class="explanation">sending and handling a signal</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: 'fe80f571-639d-471b-b7a0-2fd49bc052cf' },
        }"
        >HelloSearchAttributes</router-link
      >
      <div class="explanation">how to use search attributes</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: 'a57bb2c9-1f78-4cf8-b0b4-063932953deb' },
        }"
        >HelloCron</router-link
      >
      <div class="explanation">a cron workflow</div>
      <router-link
        class="router-link"
        :to="{
          name: 'graphcontainer',
          params: { runId: 'signal-and-children' },
        }"
        >Large workflow</router-link
      >
      <div class="explanation">A larger workflow with signals</div>
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
<style scoped lang="stylus">
#home {
  text-align: center;
  color: #2c3e50;
  overflow-y: scroll;
  height: 100%;
  width: 100%;

  h2 {
    margin: 1em 0;
  }
}

.explanation {
  margin-bottom: 20px;
  color: #6b6969;
}

.router-link {
  color: black;
  font-weight: 500;
}

#nav {
  display: flex;
  flex-direction: column;
}
</style>