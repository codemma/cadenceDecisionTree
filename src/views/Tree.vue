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
import * as workflow from "../data/data";
import { getNodeInfo } from "./eventFunctionMap.ts";
export default {
  mounted() {
    this.render();
  },
  data() {
    return {
      workflow,
    };
  },
  methods: {
    render() {
      // var nodeTemplate = Handlebars.compile($("#node-template").html());
      var g = new dagreD3.graphlib.Graph()
        .setGraph({ align: "UL" })
        .setDefaultEdgeLabel(function () {
          return {};
        }); //Neccessary to display arrows between nodes

      let parentArray = [];

      buildTree();

      function buildTree() {
        //Create nodes to render with Dagre D3
        workflow.forEach(function (node) {
          g.setNode(node.eventId, {
            label: node.eventType,
            class: [node.type],
            id: node.eventId,
            class: [node.type],
            hovertext: node.eventId,
          });
        });

        //Set the direct and chronological parent relationships
        workflow.forEach(function (node) {
          setParents(node);
        });

        //Set the chronological and inferred child relationships
        workflow.forEach(function (node) {
          if (!parentArray.includes(node.eventId)) {
            setChildren(node);
          }
        });
      }

      function setParents(node) {
        let nodeId = node.eventId,
          { parent, chronologicalParent } = getNodeInfo(node, workflow);
        if (parent) {
          parentArray.push(parent);
          g.setEdge(parent, nodeId);
        }
        if (chronologicalParent) {
          parentArray.push(chronologicalParent);
          g.setEdge(chronologicalParent, nodeId, {
            style:
              "stroke: #00B2EE; stroke-width: 3px; stroke-dasharray: 5, 5;",
            arrowheadStyle: "fill: #00B2EE",
          });
        }
      }

      function setChildren(node) {
        let nodeId = node.eventId,
          { inferredChild, chronologicalChild } = getNodeInfo(node, workflow);

        if (inferredChild) {
          g.setEdge(nodeId, inferredChild, {
            style: "stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;",
            arrowheadStyle: "fill: #f66",
          });
        }
        if (chronologicalChild) {
          g.setEdge(nodeId, chronologicalChild, {
            style:
              "stroke: #00B2EE; stroke-width: 3px; stroke-dasharray: 5, 5;",
            arrowheadStyle: "fill: #00B2EE",
          });
        }
      }

      g.nodes().forEach(function (v) {
        var node = g.node(v);
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
      render(inner, g);

      //Select all nodes and add click event
      //ALso trying out mouseover and mouseout
      inner
        .selectAll("g.node")
        //To access the node hovertext
        .attr("data-hovertext", function (v) {
          return g.node(v).hovertext;
        })
        .on("click", function () {
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

      //svg.attr("height", g.graph().height + 50);
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