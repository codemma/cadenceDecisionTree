<template>
  <div id="cytoscape">
    <!--   <button v-on:click="addNode">Add node test</button> -->
    <div id="cy"></div>
  </div>
</template>

<script>
import dagre from "cytoscape-dagre";
import { getNodeInfo } from "../eventFunctionMap.ts";
import store from "../store";
import cytoscape from "cytoscape";

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
    /*  Function which will be used to divide the workflow in chunks to be rendered */
    divideWorkflow() {
      let maxIndex = this.workflow.length;
      let firstHalf = this.workflow.slice(0, maxIndex / 2);
      console.log("half", firstHalf);
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
        this.nodes.push({ data: { id: node.eventId, name: node.eventId } });
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
      }
      if (inferredChild) {
        this.parentArray.push(nodeId);
        this.edges.push({ data: { source: nodeId, target: inferredChild } });
      }
    },
    setChron(node) {
      let nodeId = node.eventId,
        { chronologicalChild } = getNodeInfo(node, this.workflow);
      if (chronologicalChild) {
        this.edges.push({
          data: { source: nodeId, target: chronologicalChild },
        });
      }
    },
    //Function to test adding node
    addNode() {
      let dagreLayout = {
        name: "dagre",
      };
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
        pixelRatio: 1,
        zoom: 1,
        hideEdgesOnViewport: true,
        //textureOnViewport: true,
        style: cytoscape
          .stylesheet()
          .selector("node")
          .css({
            height: 80,
            width: 200,
            "min-zoomed-font-size": 100,
            /*  "background-fit": "cover",
            "border-color": "#000",
            "border-width": 3,
            "border-opacity": 0.5, */
            content: "data(name)",
            "text-valign": "center",
          })
          .selector("edge")
          .css({
            width: 2,
            /*    "target-arrow-shape": "triangle", */
            "line-color": "#000000",
            /*  "target-arrow-color": "#ffaaaa", */
            "curve-style": "haystack",
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

      //Register listener to zoom and panning

      /*   cy.on("zoom", function (evt) {
        console.log("zoom", cy.zoom());
        let ext = cy.extent();
        let nodesInView = cy.nodes().filter((n) => {
          let bb = n.boundingBox();
          return (
            bb.x1 > ext.x1 && bb.x2 < ext.x2 && bb.y1 > ext.y1 && bb.y2 < ext.y2
          );
        });
        console.log("in view", nodesInView);
      }); */

      /* cy.on("pan", function (evt) {
        console.log("pan");
        let ext = cy.extent();
        let nodesInView = cy.nodes().filter((n) => {
          let bb = n.boundingBox();
          return (
            bb.x1 > ext.x1 && bb.x2 < ext.x2 && bb.y1 > ext.y1 && bb.y2 < ext.y2
          );
        });
        console.log("in view", nodesInView);
      }); */

      return cy;
    },
  },
  computed: {},
  mounted() {
    this.divideWorkflow();
    let container = document.getElementById("cy");
    this.buildTree();
    const t0 = performance.now();
    this.view_init().then((graph) => {
      console.log("graph built");
      graph.mount(container);
    });
    const t1 = performance.now();
    console.log(`Call to view_init took ${t1 - t0} milliseconds.`);
  },
};
</script>
<style scoped>
button {
  width: 100px;
  height: 20px;
}
#cytoscape {
  width: 100%;
  height: 100%;
}
#cy {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>