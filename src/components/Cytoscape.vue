<template>
  <div id="view">
    <!--    {{nodes}}
    <span style="{padding-top:" 5em}>{{edges}}</span>-->

    <div id="cy"></div>
  </div>
</template>

<script>
import dagre from "cytoscape-dagre";
var cytoscape = require("cytoscape");

cytoscape.use(dagre);

export default {
  name: "Cytoscape",
  components: {},
  data() {
    return {
      nodes: [],
      edges: [],
      cy,
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
      this.cy = cytoscape({
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
            width: 80,
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
    this.createNodes();
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

    this.view_init();
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