<template>
  <div class="tree">
    <svg id="canvas" width="100%" height="100%" style="border: 1px solid black;">
      <g />
    </svg>
    <div class="event-info">
      <h3>Event information</h3>
      <div class="event-info-btn" v-on:click="route" v-if="showRouteButton">Route to child</div>
      <div class="event-info-text-container"></div>
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
      showRouteButton: true,
      routeId: "",
    };
  },
  watch: {
    runId: function () {
      this.parentArray = [];
      this.createGraph();
    },
  },
  mounted() {
    this.createGraph();
  },

  methods: {
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
    route() {
      router.push({ name: "tree", params: { runId: this.routeId } });
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

        if (runId) {
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
          style: "stroke: #000000; stroke-width: 2px;",
          arrowheadStyle: "fill: #000000",
        });
      }
      if (inferredChild) {
        this.parentArray.push(nodeId);
        this.graph.setEdge(nodeId, inferredChild, {
          style: "stroke: #f66; stroke-width: 2px;",
          arrowheadStyle: "fill: #f66",
        });
      }
    },
    setChron(node) {
      let nodeId = node.eventId,
        { chronologicalChild } = getNodeInfo(node, this.workflow);
      if (chronologicalChild) {
        this.graph.setEdge(nodeId, chronologicalChild, {
          style: "stroke: #00B2EE; stroke-width: 2px; stroke-dasharray: 5, 5;",
          arrowheadStyle: "fill: #00B2EE",
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

      // Set up an SVG group so that we can translate the final graph.
      var svg = d3.select("#canvas"),
        inner = svg.select("g");
      // Create the renderer
      var render = new dagreD3.render();

      // Set up zoom
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
          d3.select(".event-info-text-container").html(this.dataset.hovertext);

          //Show button if node has a runID ref TODO: improve this solution
          if (self.graph.node(d).runId) {
            self.showRouteButton = true;
            self.routeId = self.graph.node(d).runId;
          } else {
            self.showRouteButton = false;
          }
        });

      // TODO: Try to center the graph
      /*   var svg = d3.select("svg");

      console.log(this.graph.graph().width);
      console.log(svg.attr("width"));

      // Center the graph
      var xCenterOffset = this.graph.graph().width / 2;
      // console.log(xCenterOffset);
      inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
      svg.attr("height", this.graph.graph().height + 40); */
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
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 1px;
  margin-top: 20px;
}

#canvas {
  flex: 3;
}

g.Decision-Task>rect {
  fill: #00ffd0;
}

#tooltip {
  font-size: 14px;
  position: absolute;
  border: 2px solid black;
  width: fit-content;
  max-width: 400px;
  overflow-wrap: break-word;
  text-align: left;
  height: auto;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 4px 33px 0px rgba(240, 240, 240, 1);
  pointer-events: none;
}

.event-info {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  overflow-wrap: break-word;
  overflow-y: scroll;
  margin: 20px;

  &-text {
    > p {
      overflow-wrap: break-word;
      margin: 8px 20px;
    }
  }

  &-text-container {
    text-align: left;
    width: 100%;
  }

  &-btn {
    color: white;
    background-color: #809fff;
    font-weight: bold;
    border-radius: 2px;
    padding: 8px;
    width: fit-content;
  }
}

#tooltip p {
  margin: 0;
  font-family: sans-serif;
  line-height: 20px;
}

#info-text-area {
  margin: 20px;
}

#tooltip.hidden {
  display: none;
}

text {
  font-weight: 300;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serf;
  font-size: 14px;
}

.node rect {
  stroke: #999;
  fill: #fff;
  stroke-width: 1.5px;
}

.node.tooltip {
  stroke: rgb(196, 141, 141);
  fill: #fff;
  stroke-width: 1.5px;
}

.edgePath path.path {
  stroke: #333;
  stroke-width: 1.5px;
  fill: none;
}

/* #tooltip_template {
  position: "absolute";
  background-color: "white";
  border: "solid";
  border-width: "2px";
  border-radius: "5px";
  padding: "5px";
  z-index: "1000";
} */
</style>