<template>
  <div class="tree-graph">
    <div id="canvas">
      <div class="section-header">
        <router-link class="btn" :to="{ name: 'home' }">Home</router-link>
        <router-link
          v-if="parentRunId"
          class="btn"
          :to="{ name: 'tree', params: { runId: parentRunId } }"
        >Go to parent</router-link>
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
      <div class="event-info-btn" v-on:click="route" v-if="this.$store.getters.childBtn">{{btnText}}</div>
      <hr v-if="routeId" />
      <div class="event-info-content"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import { getNodeInfo } from "../eventFunctionMap.ts";
import router from "../router";
import store from "../store";
import Handlebars from "handlebars";
import Test from "@/components/Test.vue";
import $ from "jquery";
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
      graph: {},
      parentArray: [],
      parentRunId: null,
      btnText: null,
      routeId: null,
      clickedId: null,
      workflowName: null,
    };
  },
  components: {
    Test,
  },
  watch: {
    runId: function () {
      this.clearData();
      this.setWorkFlow();
      //this.createGraph();
    },
    //Watch for changes in the store for child route
    "$store.getters.childRouteId": function () {
      this.routeId = this.$store.getters.childRouteId.route;
      this.btnText = "Show child workflow";
    },
    "$store.getters.newExecutionId": function () {
      this.routeId = this.$store.getters.newExecutionId.route;
      this.btnText = "Show next execution";
    },
  },
  mounted() {
    this.setWorkFlow();
    //this.createGraph();
  },
  methods: {
    delayedShow() {
      let delay = 1000;
      setTimeout(() => {
        this.workflowLoading = true;
      }, delay);
    },
    createGraph() {
      this.setGraph();
      this.loadWorkflow().then((workflow) => {
        this.workflow = workflow;
        this.workflowName =
          workflow[0].workflowExecutionStartedEventAttributes.workflowType.name;
        this.buildTree();
      });
    },
    clearData() {
      this.parentArray = [];
      this.workflowLoading = false;
      this.routeId = "";
      this.parentRunId = "";
      d3.select(".event-info-content").html("");
    },
    route() {
      router.push({ name: "tree", params: { runId: this.routeId } });
    },
    setGraph() {
      this.graph = new dagreD3.graphlib.Graph()
        .setGraph({ align: "UL" }) //one option is also: {compound:true}
        .setDefaultEdgeLabel(function () {
          return {}; //Neccessary to display arrows between nodes
        });
    },
    setWorkFlow() {
      this.loadWorkflow().then((workflow) => {
        //console.log(workflow);
        this.workflow = workflow;
        console.log(1, this.workflow);
        //this.workflowLoading = true;
        this.workflowName =
          workflow[0].workflowExecutionStartedEventAttributes.workflowType.name;
        this.delayedShow();
        // this.buildTree();
      });
    },
    async loadWorkflow() {
      let workflow = require("../demo-data/" + this.runId + ".js");
      return workflow;
    },
    buildTree() {
      var nodeTemplate = Handlebars.compile($("#node-template").html());
      //Create nodes to render with Dagre D3
      this.workflow.forEach((node) => {
        let { hoverText, childRunId, parentWorkflow } = getNodeInfo(
            node,
            this.workflow
          ),
          hovertext;

        //We have a child workflow, show parent btn
        if (parentWorkflow) {
          this.parentRunId = parentWorkflow.runId;
        }

        if (hoverText !== undefined) {
          hovertext = nodeTemplate({ hoverText: hoverText });
        } else {
          hovertext = nodeTemplate({
            hoverText: {
              test: "TODO",
            },
          });
        }
        this.graph.setNode(node.eventId, {
          label: node.eventType,
          class: node.eventType,
          eventInfo: hoverText,
          id: node.eventId,
          hovertext: hovertext,
          id: "event-" + node.eventId,
        });
      });
      //Set the direct and inferred relationships
      this.workflow.forEach((node) => {
        this.setDirectAndInferred(node);
      });

      //Set the chronological relationships.
      //If the node is not referred to as a parent it should be connected back to the graph with a chron child
      this.workflow.forEach((node) => {
        if (!this.parentArray.includes(node.eventId)) {
          this.setChron(node);
        }
      });
      //this.renderGraph();
    },
    setDirectAndInferred(node) {
      let nodeId = node.eventId,
        { parent, inferredChild } = getNodeInfo(node, this.workflow);
      if (parent) {
        this.parentArray.push(parent);
        this.graph.setEdge(parent, nodeId, {
          class: "edge-direct",
          arrowheadClass: "arrowhead-direct",
        });
      }
      if (inferredChild) {
        this.parentArray.push(nodeId);
        this.graph.setEdge(nodeId, inferredChild, {
          class: "edge-inferred",
          arrowheadClass: "arrowhead-inferred",
        });
      }
    },
    setChron(node) {
      let nodeId = node.eventId,
        { chronologicalChild } = getNodeInfo(node, this.workflow);
      if (chronologicalChild) {
        this.graph.setEdge(nodeId, chronologicalChild, {
          class: "edge-chronological",
          arrowheadClass: "arrowhead-chronological",
        });
      }
    },
    // A function that finishes to draw the chart for a specific device size.
    drawChart(svg) {
      // get the current width of the div where the graph appear, and attribute it to svg
      let currentWidth = parseInt(d3.select("#canvas").style("width"), 10);
      svg.attr("width", currentWidth);
    },

    toggleSelectedNode(id, context) {
      if (d3.select(context).classed("selected")) {
        d3.select(context).classed("selected", false);

        //Remove content from information box
        d3.select(".event-info-content").html("");
        self.clickedId = null;
      } else {
        //Deselect previous node
        d3.select("#event-" + self.clickedId).classed("selected", false);
        //Select current
        d3.select("#event-" + id).classed("selected", true);
        self.clickedId = id;
        //Add the hover content to the info box
        d3.select(".event-info-content").html(context.dataset.hovertext);
      }
    },
  },
  computed: {},
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

.list-item {
  margin: 16px 24px;

  &-header {
    font-weight: 600;
    padding-bottom: 2px;
  }

  &-content {
    color: #7b7b7b;
    font-weight: 500;
  }
}

.edge {
  &-direct {
    stroke: #000000;
    stroke-width: 2px;
  }

  &-inferred {
    stroke: #ECAB20;
    stroke-width: 2px;
  }

  &-chronological {
    stroke-dasharray: 5, 5;
    stroke: #5879DA;
    stroke-width: 2px;
  }
}

.arrowhead {
  &-direct {
    stroke: #2c3e50;
    fill: #2c3e50;
    stroke-width: 1.5px;
  }

  &-inferred {
    stroke: #ECAB20;
    fill: #ECAB20;
    stroke-width: 1.5px;
  }

  &-chronological {
    fill: #5879DA;
    stroke: #5879DA;
    stroke-width: 1.5px;
  }
}

node-color(color, border = color, stroke = 1) {
  > rect {
    stroke-width: stroke;
    fill: color;
    stroke: border;
  }
}

failed-node() {
  node-color: #ffcccc #ff6c6c;

  &.selected {
    node-color: #ffcccc #ff6c6c 2.5;
  }
}

completed-node() {
  node-color: #dcffe6 #26bd77;

  &.selected {
    node-color: #dcffe6 #26bd77 2.5;
  }
}

.node {
  &.ChildWorkflowExecutionFailed {
    failed-node();
  }

  &.WorkflowExecutionFailed {
    failed-node();
  }

  &.ActivityTaskFailed {
    failed-node();
  }

  &.WorkflowExecutionCompleted {
    completed-node();
  }
}

text {
  font-weight: 400;
  font-size: 16px;
  cursor: none;

  &:hover {
    cursor: pointer;
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
  /* Center vertically and horizontally */
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px; /* apply negative top and left margins to truly center the element */
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

.node.selected rect {
  stroke: #11939a;
  stroke-width: 2px;
}

.node rect {
  stroke: #b7b4b4;
  fill: #fff;
  stroke-width: 1px;
  cursor: none;

  &:hover {
    cursor: pointer;
  }
}
</style>