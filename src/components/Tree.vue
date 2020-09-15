<template>
  <div class="tree-graph">
    <div id="canvas">
      <div class="section-header">
        <router-link class="btn" :to="{ name: 'home' }">Home</router-link>
        <div class="btn" v-on:click="route(parentRoute)" v-if="parentRoute">Go to parent</div>
        <div class="section-header-text">{{workflowName}}</div>
      </div>
      <hr />
      <div v-if="!workflowLoading" id="loading"></div>
      <Test v-if="workflowLoading" :workflow="workflow"></Test>
    </div>
    <div class="event-info">
      <div class="section-header">
        <div class="section-header-text">Event information</div>
      </div>
      <hr />
      <div v-if="hasChildBtn" class="event-info-btn" v-on:click="route(childRouteId)">{{btnText}}</div>
      <hr v-if="hasChildBtn" />
      <div ref="eventInfo" class="event-info-content"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import router from "../router";
import store from "../store";
import Test from "@/components/Test.vue";
export default {
  props: {
    runId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      workflow: null,
      workflowLoading: false,
      clickedId: null,
      workflowName: null,
    };
  },
  components: {
    Test,
  },
  watch: {
    //We want to load a new workflow everytime we get a new runId
    runId: function () {
      this.resetData();
      this.setWorkFlow();
    },
  },
  mounted() {
    this.setWorkFlow();
  },
  methods: {
    route(runId) {
      router.push({ name: "tree", params: { runId: runId } });
    },
    resetData() {
      store.commit("resetState"); //We reset the state every time we load a new workflow
      this.$refs.eventInfo.innerHTML = ""; //Empty the event-info container
      this.workflowLoading = false;
    },
    setWorkFlow() {
      this.loadWorkflow().then((workflow) => {
        this.workflow = workflow;
        this.workflowName =
          workflow[0].workflowExecutionStartedEventAttributes.workflowType.name;
        this.delayedShow();
      });
    },
    delayedShow() {
      let delay = 500;
      setTimeout(() => {
        this.workflowLoading = true;
      }, delay);
    },
    async loadWorkflow() {
      let workflow = require("../demo-data/" + this.runId + ".js");
      return workflow;
    },
  },
  computed: {
    parentRoute() {
      return this.$store.getters.parentRoute;
    },
    hasChildBtn() {
      return this.$store.getters.childBtn;
    },
    btnText() {
      return this.$store.getters.btnText;
    },
    childRouteId() {
      return this.$store.getters.childRouteId;
    },
  },
};
</script>

<style lang="stylus">
.tree-graph {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 24px;
}

#graph {
  height: 100%;
}

#canvas {
  flex: 3;
  background-color: white;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  border: 1px solid #eaeaea;
  overflow: hidden;
  position: relative;
}

hr {
  border: 0;
  border-top: 1px solid #eaeaea;
  width: 100%;
  padding: 0;
}

.btn {
  margin-left: 20px;
  color: white;
  background-color: #11939A;
  font-weight: 600;
  text-decoration: none;
  border-radius: 2px;
  padding: 6px;
}

.section-header {
  height: 62px;
  display: flex;
  align-items: center;
  position: relative;

  &-text {
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
}

.event-info {
  flex: 1;
  background-color: white;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  border-radius: 2px;
  border: 1px solid #eaeaea;
  overflow-wrap: break-word;
  overflow-y: scroll;
  margin-left: 24px;

  &-btn {
    margin: 16px 20px;
    color: white;
    background-color: #11939A;
    font-weight: 600;
    border-radius: 2px;
    padding: 6px 0;

    &:hover {
      cursor: pointer;
    }
  }
}

.event-information-list {
  text-align: left;

  > hr {
    &:last-child {
      display: none;
    }
  }
}

#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #11939A;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>