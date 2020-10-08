<template>
  <div>
    <Legend />
    <svg id="graph">
      <g />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import { getEventInfo } from "../eventFunctionMap.ts";
import router from "../router";
import Handlebars from "handlebars";
import store from "../store";
import $ from "jquery";
import Legend from "@/components/Legend.vue";
export default {
  props: {
    workflow: {
      type: Array,
      required: true,
    },
  },
  components: {
    Legend,
  },
  data() {
    return {
      graph: {},
      parentArray: [],
      clickedId: null,
      slicedWorkflow: null,
      workflowChunk: 0,
    };
  },
  mounted() {
    this.createGraph();
  },
  methods: {
    chunkWorkflow() {
      let chunkSize = 300;
      let groups = this.workflow
        .map((e, i) => {
          return i % chunkSize === 0
            ? this.workflow.slice(i, i + chunkSize)
            : null;
        })
        .filter((e) => {
          return e;
        });
      this.slicedWorkflow = groups[this.workflowChunk];
      this.lastNodeRendered = this.slicedWorkflow[
        this.slicedWorkflow.length - 1
      ].eventId;
    },
    createGraph() {
      this.chunkWorkflow();
      this.setGraph();
      this.buildTree();
    },
    setGraph() {
      this.graph = new dagreD3.graphlib.Graph()
        .setGraph({ align: "UL" }) //one option is also: {compound:true}
        .setDefaultEdgeLabel(function () {
          return {}; //Neccessary to display arrows between nodes
        });
    },
    buildTree() {
      //var nodeTemplate = Handlebars.compile($("#node-template").html());

      //Create nodes to render with Dagre D3
      this.slicedWorkflow.forEach((event) => {
        let { clickInfo, childRunId, parentWorkflow,  } = getEventInfo(
          event,
          this.slicedWorkflow
        );
        if (!clickInfo) {
          clickInfo = { todo: "Todo" };
        }

        //We have a child workflow, show parent btn
        if (parentWorkflow) {
          store.commit("parentRoute", parentWorkflow.runId);
        }

        let label =
          "<p class='main-heading'>" +
          event.eventType +
          "</p>" +
          "<p class='sub-heading'>" +
          event.eventId +
          "</p>";

        this.graph.setNode(event.eventId, {
          label: label,
          labelType: "html",
          class: event.eventType,
          eventInfo: clickInfo,
          id: "event-" + event.eventId,
        });
      });
      //Set the direct and inferred relationships
      this.slicedWorkflow.forEach((event) => {
        this.setDirectAndInferred(event);
      });

      //Set the chronological relationships.
      //If the node is not referred to as a parent it should be connected back to the graph with a chron child
      this.slicedWorkflow.forEach((event) => {
        if (!this.parentArray.includes(event.eventId)) {
          this.setChron(event);
        }
      });
      this.renderGraph();
    },
    setDirectAndInferred(event) {
      let eventId = event.eventId,
        { parent, inferredChild } = getEventInfo(event, this.slicedWorkflow);
      if (parent) {
        this.parentArray.push(parent);
        this.graph.setEdge(parent, eventId, {
          class: "edge-direct",
          arrowheadClass: "arrowhead-direct",
        });
      }
      if (inferredChild) {
        this.parentArray.push(eventId);
        this.graph.setEdge(eventId, inferredChild, {
          class: "edge-inferred",
          arrowheadClass: "arrowhead-inferred",
        });
      }
    },
    setChron(event) {
      let eventId = event.eventId,
        { chronologicalChild } = getEventInfo(event, this.slicedWorkflow);
      if (chronologicalChild) {
        this.graph.setEdge(eventId, chronologicalChild, {
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

      svg.on("mousedown", function (event) {
        d3.selectAll("g.node").classed("selected", false);
        store.commit("displayNodeInformation", "");
      });

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

          let nodeInfo = self.graph.node(id).eventInfo;

          store.commit("displayNodeInformation", nodeInfo);

          if (nodeInfo.childRunId) {
            store.commit("childRoute", {
              routeId: nodeInfo.childRunId,
              btnText: "Show child workflow",
            });
          } else if (nodeInfo.newExecutionRunId) {
            store.commit("childRoute", {
              routeId: nodeInfo.newExecutionRunId,
              btnText: "Show next execution",
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