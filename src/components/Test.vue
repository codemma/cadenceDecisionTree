<template>
  <div>
    <svg id="graph">
      <g />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import { getNodeInfo } from "../eventFunctionMap.ts";
import router from "../router";
import Handlebars from "handlebars";
import store from "../store";
import $ from "jquery";
export default {
  props: {
    workflow: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      //workflow: {},
      graph: {},
      parentArray: [],
      parentRunId: null,
      btnText: null,
      routeId: null,
      clickedId: null,
      workflowName: null,
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
    createGraph() {
      this.setGraph().then(() => {
        this.buildTree();
      });
      /*    this.loadWorkflow().then((workflow) => {
        this.workflow = workflow;
        this.workflowName =
          workflow[0].workflowExecutionStartedEventAttributes.workflowType.name;
        this.buildTree();
      }); */
    },
    clearData() {
      this.parentArray = [];
      this.routeId = "";
      this.parentRunId = "";
      d3.select(".event-info-content").html("");
    },
    async setGraph() {
      this.graph = new dagreD3.graphlib.Graph()
        .setGraph({ align: "UL" }) //one option is also: {compound:true}
        .setDefaultEdgeLabel(function () {
          return {}; //Neccessary to display arrows between nodes
        });
    },
    buildTree() {
      var nodeTemplate = Handlebars.compile($("#node-template").html());
      //Create nodes to render with Dagre D3
      console.log(3, this.workflow);
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
        console.log("graph", this.graph, node.eventType);
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

      /*  d3.selectAll("g.node").each(function (i) {
        if (i != d) {
          d3.select(this).classed("selected", false);
        }
      }); */
    },
    renderGraph() {
      var self = this;

      this.graph.nodes().forEach(function (v) {
        var node = self.graph.node(v);
        // Round the corners of the nodes
        node.rx = node.ry = 5;
      });

      // Set up an SVG group so that we can translate the final graph.
      var svg = d3.select("#graph").attr("height", "100%");
      var inner = svg.select("g");

      this.drawChart(svg);

      // Add an event listener that run the function when dimension change
      window.addEventListener("resize", this.drawChart(svg));

      // Set up zoom support
      var zoom = d3.zoom().on("zoom", function () {
        inner.attr("transform", d3.event.transform);
      });
      svg.call(zoom);

      // Create and run the renderer
      var render = new dagreD3.render();
      render(inner, this.graph);

      //Select all nodes and add click event
      inner
        .selectAll("g.node")
        //To access the node hovertext
        .attr("data-hovertext", function (v) {
          return self.graph.node(v).hovertext;
        })
        .on("mousedown", function (id) {
          d3.event.stopPropagation();
          self.toggleSelectedNode(id, this);

          let event = self.graph.node(id).eventInfo;

          if (event.childRunId) {
            store.commit("childRoute", {
              route: event.childRunId,
            });
          } else if (event.newExecutionRunId) {
            store.commit("newExecutionRoute", {
              route: event.newExecutionRunId,
            });
          } else {
            store.commit("toggleChildBtn");
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
  -webkit-animation: spin 1s ease-in-out infinite;
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