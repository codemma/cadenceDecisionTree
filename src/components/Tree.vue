<template>
  <div class="graph-container">
    <router-link class="btn" :to="{ name: 'home' }">Home</router-link>
    <div class="tree">
      <div id="canvas">
        <svg id="canvas-graph" width="960">
          <g />
        </svg>
      </div>
      <div class="event-info">
        <h4>Event information</h4>
        <hr />
        <div class="event-info-btn" v-on:click="route" v-if="showRouteButton">Route to child</div>
        <div class="event-info-btn" v-on:click="route" v-if="newExecBtn">Route to new execution</div>
        <hr v-if="showRouteButton || newExecBtn" />
        <div class="event-info-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
//import * as workflow from "../data/marker-event";
import { getNodeInfo } from "../eventFunctionMap.ts";
import router from "../router";
import Handlebars from "handlebars";
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
      workflow: {},
      graph: {},
      parentArray: [],
      showRouteButton: false,
      btnName: "",
      newExecBtn: false,
      routeId: "",
    };
  },
  watch: {
    runId: function () {
      this.clearData();
      this.createGraph();
    },
  },
  mounted() {
    this.createGraph();
  },

  methods: {
    clearData() {
      this.parentArray = [];
      //We clear the info content html when we route to child
      d3.select(".event-info-content").html("");
    },
    route() {
      this.showRouteButton = false;
      this.newExecBtn = false;
      router.push({ name: "tree", params: { runId: this.routeId } });
    },
    setGraph() {
      this.graph = new dagreD3.graphlib.Graph()
        .setGraph({ align: "UL" }) //one option is also: {compound:true}
        .setDefaultEdgeLabel(function () {
          return {}; //Neccessary to display arrows between nodes
        });
    },
    async loadWorkflow() {
      let workflow = require("../demo-data/" + this.runId + ".js");
      return workflow;
    },
    createGraph() {
      this.setGraph();
      this.loadWorkflow().then((workflow) => {
        this.workflow = workflow;
        this.buildTree();
      });
    },
    buildTree() {
      var nodeTemplate = Handlebars.compile($("#node-template").html());
      //Create nodes to render with Dagre D3
      this.workflow.forEach((node) => {
        let { hoverText, runId } = getNodeInfo(node, this.workflow),
          hovertext;

        if (hoverText !== undefined) {
          hovertext = nodeTemplate({ hoverText: hoverText });
        } else {
          hovertext = nodeTemplate({
            hoverText: {
              test: "TODO",
            },
          });
        }
        //TODO: improve this
        if (hoverText !== undefined && hoverText.newExecutionRunId) {
          this.graph.setNode(node.eventId, {
            newExecutionRunId: hoverText.newExecutionRunId,
            label: node.eventType,
            class: node.eventType,
            id: node.eventId,
            hovertext: hovertext,
          });
        } else if (runId) {
          this.graph.setNode(node.eventId, {
            label: node.eventType,
            class: node.eventType,
            id: node.eventId,
            hovertext: hovertext,
            runId: runId,
          });
        } else {
          this.graph.setNode(node.eventId, {
            label: node.eventType,
            class: node.eventType,
            id: node.eventId,
            hovertext: hovertext,
          });
        }
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
      this.renderGraph();
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
    renderGraph() {
      var self = this;

      this.graph.nodes().forEach(function (v) {
        var node = self.graph.node(v);
        // Round the corners of the nodes
        node.rx = node.ry = 5;
      });

      /*  let heightValue = 300;
const widthValue = 600;

      d3.select("svg").attr("viewBox", `0 0 ${widthValue} ${heightValue}`);
 */
      // Set up an SVG group so that we can translate the final graph.
      var svg = d3.select("#canvas-graph"),
        inner = svg.select("g");
      // Create the renderer
      var render = new dagreD3.render();

      // Set up zoom support
      var zoom = d3.zoom().on("zoom", function () {
        inner.attr("transform", d3.event.transform);
      });
      svg.call(zoom);
      // Run the renderer. This is what draws the final graph.
      render(inner, this.graph);

      //Select all nodes and add click event
      //Also trying out mouseover and mouseout
      inner
        .selectAll("g.node")
        //To access the node hovertext
        .attr("data-hovertext", function (v) {
          return self.graph.node(v).hovertext;
        })
        .on("click", function (d) {
          d3.select(".event-info-content").html(this.dataset.hovertext);
          //Show button if node has a runID or newExecutionID ref
          //TODO: improve this solution
          if (self.graph.node(d).newExecutionRunId) {
            self.newExecBtn = true;
            self.routeId = self.graph.node(d).newExecutionRunId;
          } else if (self.graph.node(d).runId) {
            self.showRouteButton = true;
            self.routeId = self.graph.node(d).runId;
          } else {
            self.showRouteButton = false;
            self.newExecBtn = false;
          }
        });
      //Fix to put arrowheads over nodes
      svg
        .select(".output")
        .insert(() => d3.select(".nodes").remove().node(), ".edgePaths");

      // Center the graph
      var initialScale = 0.75;
      svg.call(
        zoom.transform,
        d3.zoomIdentity
          .translate(
            (svg.attr("width") - this.graph.graph().width * initialScale) / 2,
            20
          )
          .scale(initialScale)
      );

      svg.attr("height", this.graph.graph().height * initialScale + 40);
    },
  },
  computed: {},
};
</script>

<style lang="stylus">
div.tree {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}

.graph-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
  justify-content: center;
}

#canvas {
  flex: 3;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  border: 1px solid #eaeaea;

  &-graph {
    height: 100%;
  }
}

.btn {
  margin: 20px 20px 20px 0;
  color: white;
  background-color: #11939A;
  font-weight: bold;
  text-decoration: none;
  border-radius: 2px;
  padding: 6px;
}

.event-info {
  flex: 1;
  background-color: white;
  box-shadow: 0px 0px 9px 0px rgba(232, 232, 232, 1);
  border-radius: 2px;
  border: 1px solid #eaeaea;
  overflow-wrap: break-word;
  margin: 0 20px;
  padding: 20px 0;
  overflow-y: scroll;
  overflow-x: hidden;

  > hr {
    border: 0;
    border-top: 1px solid #eaeaea;
    margin: 20px 0;
    width: 100%;
    padding: 0;
    left: 0;
  }

  > h4 {
    width: 100%;
    text-align: left;
    margin: 0 24px;
  }

  &-btn {
    margin: 0 20px;
    color: white;
    background-color: #11939A;
    font-weight: bold;
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
    border: 0;
    border-top: 1px solid #eaeaea;
    margin: 16px 0;
    width: 100%;
    padding: 0;

    &:last-child {
      display: none;
    }
  }
}

.list-item {
  margin: 0 24px;
  overflow-wrap: break-word;

  &-header {
    font-weight: 600;
    padding-bottom: 2px;
  }

  &-content {
    color: #7b7b7b; // #94989c;
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

.node.ChildWorkflowExecutionFailed rect {
  fill: #ff6c6c;
  stroke: #ff6c6c;
}

.node.WorkflowExecutionFailed rect {
  fill: #ff6c6c;
  stroke: #ff6c6c;
}

.node.ActivityTaskFailed rect {
  fill: #ff6c6c;
  stroke: #ff6c6c;
}

text {
  font-weight: 300;
  font-size: 16px;
  cursor: none;

  &:hover {
    cursor: pointer;
  }
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