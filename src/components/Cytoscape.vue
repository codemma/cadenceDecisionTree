<template>
  <div id="view">
    <div id="cy"></div>
  </div>
</template>

<script>
import dagre from "cytoscape-dagre";
import { getNodeInfo } from "../eventFunctionMap.ts";
var cytoscape = require("cytoscape");

cytoscape.use(dagre);

export default {
  name: "Cytoscape",
  components: {},
  props: {
    workflow: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      nodes: [],
      edges: [],
      parentArray: [],
      cy: "",
    };
  },
  methods: {
    createNodes() {
      console.log("in crate nodes");
      var i;
      let nodes = [];
      let edges = [];
      let target;
      let name = "";
      for (i = 0; i < 5; i++) {
        name = "n" + i;
        target = i + 1;
        // console.log(name);
        nodes.push({ data: { id: i, name: name } });
      }
      for (i = 0; i < 4; i++) {
        target = i + 1;
        edges.push({ data: { source: i, target: target } });
      }
      this.nodes = nodes;
      this.edges = edges;
    },
    async buildTree() {
      this.workflow.forEach((node) => {
        let { hoverText, childRunId, parentWorkflow } = getNodeInfo(
            node,
            this.workflow
          ),
          hovertext;

        //We have a child workflow, show parent btn
        if (parentWorkflow) {
          store.commit("parentRoute", parentWorkflow.runId);
        }

        /*   if (hoverText !== undefined) {
          hovertext = nodeTemplate({ hoverText: hoverText });
        } else {
          hovertext = nodeTemplate({
            hoverText: {
              test: "TODO",
            },
          });
        } */
        this.nodes.push({ data: { id: node.eventId, name: node.eventType } });
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
        this.edges.push({ data: { source: parent, target: nodeId } });
        /*  this.graph.setEdge(parent, nodeId, {
          class: "edge-direct",
          arrowheadClass: "arrowhead-direct",
        }); */
      }
      if (inferredChild) {
        this.parentArray.push(nodeId);
        this.edges.push({ data: { source: nodeId, target: inferredChild } });
        //this.edges.add({ from: nodeId, to: inferredChild });
        /*  this.graph.setEdge(nodeId, inferredChild, {
          class: "edge-inferred",
          arrowheadClass: "arrowhead-inferred",
        }); */
      }
    },
    setChron(node) {
      let nodeId = node.eventId,
        { chronologicalChild } = getNodeInfo(node, this.workflow);
      if (chronologicalChild) {
        this.edges.push({
          data: { source: nodeId, target: chronologicalChild },
        });
        /*  this.edges.add({ from: nodeId, to: chronologicalChild }); */
        /*  this.graph.setEdge(nodeId, chronologicalChild, {
          class: "edge-chronological",
          arrowheadClass: "arrowhead-chronological",
        }); */
      }
    },
    /*  addNode: function () {
      console.info("hello" + this.cy);
      this.cy.add([
        {
          group: "nodes",
          data: { id: "node" + this.count },
          position: { x: 300, y: 200 },
        },
        {
          group: "edges",
          data: {
            id: "edge" + this.count,
            source: "node" + this.count,
            target: "cat",
          },
        },
      ]);
    }, */
    view_init: function () {
      cytoscape({
        autoungrabify: true,
        container: document.getElementById("cy"),
        //boxSelectionEnabled: false,
        //autounselectify: true,
        //autolock: true,
        /*  style: [
          // what a node looks like?
          {
            selector: "node",
            style: {
              content: "data(name)",
              "text-valign": "center",
              "background-color": "#ededed",
            },
          },
          // what an edge looks like?
          {
            selector: "edge",
            style: {
              "curve-style": "bezier",
              width: 1,
              "target-arrow-shape": "triangle",
              "line-color": "#333333",
              "target-arrow-color": "#333333",
            },
          },
        ], */
        style: cytoscape
          .stylesheet()
          .selector("node")
          .css({
            height: 80,
            width: 200,
            "background-fit": "cover",
            "border-color": "#000",
            "border-width": 3,
            "border-opacity": 0.5,
            content: "data(name)",
            "text-valign": "center",
          })
          .selector("edge")
          .css({
            width: 6,
            "target-arrow-shape": "triangle",
            "line-color": "#ffaaaa",
            "target-arrow-color": "#ffaaaa",
            "curve-style": "bezier",
          }),
        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },
        layout: {
          name: "dagre",
        },
      });
    },
  },
  computed: {},
  mounted() {
    const t0 = performance.now();
    this.buildTree().then(() => {
      this.view_init();
    });
    console.log(this.edges);
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
  },
};
</script>
<style scoped>
#cy {
  width: 100%;
  height: 80%;
  position: absolute;
  top: 50px;
  left: 0px;
  text-align: left;
}

body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>