<template>
  <div>
    <!--   <script
      type="text/javascript"
      src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"
    ></script>-->
    <div id="mynetwork"></div>
    <div id="settings"></div>
  </div>
</template>

<script>
import { DataSet, Network } from "vis-network/standalone";
import { getNodeInfo } from "../eventFunctionMap.ts";
import router from "../router";
import store from "../store";
//var vis = require("vis-network");
//import { Network } from "vis/index-network";
//import "vis/dist/vis-network.min.css";

export default {
  name: "Vis",
  props: {
    workflow: {
      type: Array,
      required: false,
    },
  },
  components: {},
  data() {
    return {
      nodes: "",
      edges: "",
      btnContainer: "",
      parentArray: [],
      container: "",
      options: {},
    };
  },

  methods: {
    buildTree() {
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

        this.nodes.add({ id: node.eventId, label: node.eventType });
        /* this.graph.setNode(node.eventId, {
          label: node.eventType,
          class: node.eventType,
          eventInfo: hoverText,
          id: node.eventId,
          hovertext: hovertext,
          id: "event-" + node.eventId,
        }); */
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
        this.edges.add({ from: parent, to: nodeId });
        /*  this.graph.setEdge(parent, nodeId, {
          class: "edge-direct",
          arrowheadClass: "arrowhead-direct",
        }); */
      }
      if (inferredChild) {
        this.parentArray.push(nodeId);
        this.edges.add({ from: nodeId, to: inferredChild });
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
        this.edges.add({ from: nodeId, to: chronologicalChild });
        /*  this.graph.setEdge(nodeId, chronologicalChild, {
          class: "edge-chronological",
          arrowheadClass: "arrowhead-chronological",
        }); */
      }
    },
    setOptions() {
      this.btnContainer = document.getElementById("settings");
      this.options = {
        /*  configure: {
          enabled: true,
          filter: "physics",
          container: this.btnContainer,
          showButton: true,
        }, */
        interaction: {
          dragNodes: true,
        },
        physics: {
          enabled: false,
          hierarchicalRepulsion: {
            nodeDistance: 140,
          },
          /* barnesHut: {
            gravitationalConstant: -2000,
            centralGravity: 0.1,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09,
          },
          repulsion: {
            centralGravity: 0.1,
            springLength: 50,
            springConstant: 0.05,
            nodeDistance: 100,
            damping: 0.09,
          },
          hierarchicalRepulsion: {
            centralGravity: 0.5,
            springLength: 150,
            springConstant: 0.01,
            nodeDistance: 0,
            damping: 0.09,
          }, */
        },
        manipulation: {
          enabled: false,
        },
        layout: {
          improvedLayout: true,
          hierarchical: {
            enabled: true,
            levelSeparation: 50,
            nodeSpacing: 200,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            shakeTowards: "roots",
            direction: "UD", // UD, DU, LR, RL
            sortMethod: "directed", // hubsize, directed
          },
        },
        nodes: {
          shape: "box",
          physics: false,
          /*  shapeProperties: {
            interpolation: false, // 'true' for intensive zooming
          }, */
        },
        edges: {
          physics: false,
          smooth: {
            forceDirection: "none",
          },
        },
      };
    },
    createNodes() {
      var options = {};
      var i;
      this.nodes = new DataSet(options);
      this.edges = new DataSet(options);
      let target;
      let name = "";
      for (i = 0; i < 50; i++) {
        name = "n" + i;
        target = i + 1;
        // console.log(name);
        this.nodes.add({ id: i, label: i.toString() });
      }
      for (i = 0; i < 49; i++) {
        target = i + 1;
        this.edges.add({ from: i, to: target });
      }
    },
  },

  computed: {
    graph_data() {
      return {
        nodes: this.nodes,
        edges: this.edges,
      };
    },
  },

  mounted() {
    this.setOptions();
    this.container = document.getElementById("mynetwork");
    var options = {};
    this.nodes = new DataSet(options);
    this.edges = new DataSet(options);

    console.log(this.btnContainer);

    this.buildTree();

    const t0 = performance.now();
    let network = new Network(this.container, this.graph_data, this.options);
    const t1 = performance.now();
    console.log(`Call to new network took ${t1 - t0} milliseconds.`);

    var self = this;

    console.log(this.edges);

    network.on("click", function (properties) {
      var ids = properties.nodes;
      var clickedNodes = self.nodes.get(ids);
      console.log("clicked nodes:", clickedNodes[0]);
    });
  },
};
</script>
<style scoped>
#mynetwork {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 63px;
  right: 0px;
  text-align: left;
}

#settings {
  height: 400px;
  overflow-y: scroll;
}

body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>