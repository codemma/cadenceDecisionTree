<template>
  <div id="view">
    <button v-on:click="addNode">Add node test</button>
    <div id="cy"></div>
  </div>
</template>

<script>
import dagre from "cytoscape-dagre";
import { getNodeInfo } from "../eventFunctionMap.ts";
var cytoscape = require("cytoscape");
import store from "../store";

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
      cy: null,
    };
  },
  methods: {
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
    addNode() {
      let dagreLayout = {
        name: "dagre",
      };
      console.log("hello");
      window.cy.add({
        group: "nodes",
        data: { id: 4670, name: "test" },
      });
      window.cy.add({
        group: "edges",
        data: { id: "y", source: 4669, target: 4670 },
      });
      window.cy.layout(dagreLayout).run();
    },
    async view_init() {
      let cy = (window.cy = cytoscape({
        autoungrabify: true,
        styleEnabled: true,
        container: document.getElementById("cy"),
        headless: true,
        style: cytoscape
          .stylesheet()
          .selector("node")
          .css({
            height: 80,
            width: 200,
            "min-zoomed-font-size": 30,
            "background-fit": "cover",
            "border-color": "#000",
            "border-width": 3,
            "border-opacity": 0.5,
            content: "data(name)",
            "text-valign": "center",
          })
          .selector("edge")
          .css({
            width: 3,
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
      }));

      //Register click event
      cy.on("tap", "node", function (evt) {
        console.log(evt.target.id());
      });

      cy.on("zoom", function (evt) {
        console.log("zoom", cy.zoom());
        let ext = cy.extent();
        let nodesInView = cy.nodes().filter((n) => {
          let bb = n.boundingBox();
          return (
            bb.x1 > ext.x1 && bb.x2 < ext.x2 && bb.y1 > ext.y1 && bb.y2 < ext.y2
          );
        });
        console.log("in view", nodesInView);
      });

      cy.on("pan", function (evt) {
        console.log("pan");
      });

      return cy;
    },
  },
  computed: {},
  mounted() {
    let container = document.getElementById("cy");
    this.buildTree();
    this.view_init().then((graph) => {
      graph.mount(container);
    });
  },
};
</script>
<style scoped>
button {
  width: 100px;
  height: 20px;
}
#cy {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 90px;
  left: 0px;
  text-align: left;
}
</style>