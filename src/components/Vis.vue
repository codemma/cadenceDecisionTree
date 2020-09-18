<template>
  <div>
    <!--   <script
      type="text/javascript"
      src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"
    ></script>-->
    <div id="mynetwork"></div>
  </div>
</template>

<script>
import { DataSet, Network } from "vis-network/standalone";
//var vis = require("vis-network");
//import { Network } from "vis/index-network";
//import "vis/dist/vis-network.min.css";

export default {
  name: "Vis",
  components: {},
  data() {
    return {
      nodes: "",
      edges: "",
      /*  nodes: [
        { id: 0, label: 0 },
        { id: 1, label: 1 },
        { id: 2, label: 2 },
        { id: 3, label: 3 },
        { id: 4, label: 4 },
      ],
      edges: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
      ], */
      options: {
        interaction: {
          dragNodes: false,
        },
        physics: {
          forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
            avoidOverlap: 1.5,
          },
          maxVelocity: 146,
          solver: "forceAtlas2Based",
          timestep: 0.35,
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 25,
          },
        },
        manipulation: {
          enabled: false,
        },
        layout: {
          improvedLayout: false,
          hierarchical: {
            enabled: true,
            direction: "UD",
            sortMethod: "directed",
            nodeSpacing: 10,
          },
        },
        nodes: {
          physics: false,
          shapeProperties: {
            interpolation: false, // 'true' for intensive zooming
          },
        },
        edges: {
          physics: false,
        },
      },
      container: "",
    };
  },

  methods: {
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

      console.log("hello2", this.edges);
      /*  this.nodes = nodes;
      this.edges = edges; */
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
    this.container = document.getElementById("mynetwork");
    this.createNodes();
    let network = new Network(this.container, this.graph_data, this.options);

    var self = this;

    network.on("click", function (properties) {
      var ids = properties.nodes;
      var clickedNodes = self.nodes.get(ids);
      console.log("clicked nodes:", clickedNodes[0].id);
    });
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