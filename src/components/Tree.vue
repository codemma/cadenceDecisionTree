<template>
  <div class="tree">
    <svg id="canvas" width="100%" height="100%" style="border: 1px solid black;">
      <g />
    </svg>
    <div id="tooltip" class="hidden">
      <p>
        <strong>Event information</strong>
      </p>
      <p>
        <span id="info"></span>
      </p>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
//import * as workflow from "../data/marker-event";
import { getNodeInfo } from "../eventFunctionMap.ts";
import router from "../router";
export default {
  props: {
    runId: {
      type: String,
      required: true,
    },
  },
  watch: {
    runId: function (newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.loadWorkflow();
      this.createGraph();
      this.buildTree();
    },
  },
  mounted() {
    this.loadWorkflow();
    this.createGraph();
    this.buildTree();
  },
  data() {
    return {
      workflow: {},
      graph: {},
      parentArray: [],
    };
  },

  updated() {
    this.loadWorkflow();
    this.createGraph();
    this.buildTree();
  },

  methods: {
    createGraph() {
      this.graph = new dagreD3.graphlib.Graph()
        .setGraph({ align: "UL" })
        .setDefaultEdgeLabel(function () {
          return {}; //Neccessary to display arrows between nodes
        });
    },
    loadWorkflow(index) {
      this.workflow = require("../data/" + this.runId + ".js");
    },
    buildTree() {
      var self = this;
      //Create nodes to render with Dagre D3
      this.workflow.forEach(function (node) {
        self.graph.setNode(node.eventId, {
          label: node.eventType,
          class: node.eventType,
          id: node.eventId,
          hovertext: node.eventId,
        });
      });

      //Set the direct and chronological parent relationships
      this.workflow.forEach(function (node) {
        self.setParents(node);
      });

      //Set the chronological and inferred child relationships
      this.workflow.forEach(function (node) {
        if (!self.parentArray.includes(node.eventId)) {
          self.setChildren(node);
        }
      });

      this.renderGraph();
    },
    setParents(node) {
      let nodeId = node.eventId,
        { parent, chronologicalParent } = getNodeInfo(node, this.workflow);
      if (parent) {
        this.parentArray.push(parent);
        this.graph.setEdge(parent, nodeId);
      }
      if (chronologicalParent) {
        this.parentArray.push(chronologicalParent);
        this.graph.setEdge(chronologicalParent, nodeId, {
          style: "stroke: #00B2EE; stroke-width: 3px; stroke-dasharray: 5, 5;",
          arrowheadStyle: "fill: #00B2EE",
        });
      }
    },
    setChildren(node) {
      let nodeId = node.eventId,
        { inferredChild, chronologicalChild } = getNodeInfo(
          node,
          this.workflow
        );

      if (inferredChild) {
        this.graph.setEdge(nodeId, inferredChild, {
          style: "stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;",
          arrowheadStyle: "fill: #f66",
        });
      }
      if (chronologicalChild) {
        this.graph.setEdge(nodeId, chronologicalChild, {
          style: "stroke: #00B2EE; stroke-width: 3px; stroke-dasharray: 5, 5;",
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
        inner.attr("transform", d3.event.transform);
      });
      svg.call(zoom);

      // Run the renderer. This is what draws the final graph.
      render(inner, this.graph);

      //Add click on childNode
      inner
        .selectAll(".ChildWorkflowExecutionStarted")
        .on("click", function (d) {
          router.push({ path: "/tree/a783dad6-7225-4a0c-838d-65f6d6ba1472" });
          /* this.$route.push({
            name: "/",
            params: { runId: "a783dad6-7225-4a0c-838d-65f6d6ba1472" },
          }); */
          console.log("clicked" + d);
        });

      //Select all nodes and add click event
      //ALso trying out mouseover and mouseout
      inner
        .selectAll("g.node")
        //To access the node hovertext
        .attr("data-hovertext", function (v) {
          return self.graph.node(v).hovertext;
        })
        .on("dblclick", function () {
          //Show tooltip
          d3.select("#tooltip").classed("hidden", false);
        })
        .on("mousemove", function (d) {
          d3.select("#tooltip")
            .style("left", event.pageX - 10 + "px")
            .style("top", event.pageY + 10 + "px")
            .select("#info")
            .text(this.dataset.hovertext);
        })
        .on("mouseout", function () {
          d3.select("#tooltip").classed("hidden", true);
        });
    },
  },
  computed: {},
};
</script>

<style lang="stylus">
div.tree {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

g.Decision-Task>rect {
  fill: #00ffd0;
}

#tooltip {
  position: absolute;
  border: 2px solid #999;
  width: fit-content;
  height: auto;
  padding: 20px;
  background-color: #fff;
  border: 'solid';
  border-width: '2px';
  border-radius: '5px';
  padding: '5px';
  box-shadow: 4px 4px 10px rgba(156, 156, 156, 0.4);
  pointer-events: none;
}

#tooltip.hidden {
  display: none;
}

#tooltip p {
  margin: 0;
  font-family: sans-serif;
  font-size: 16px;
  line-height: 20px;
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