<template>
  <div id="cytoscape">
    <Legend />
    Last node in view: {{lastNodeInView }},
    Last node rendered: {{ lastNodeRendered}}
    <br />
    <!--   <button v-on:click="addNode">Add node test</button> -->
    <div ref="cy" id="cy"></div>
  </div>
</template>

<script>
import dagre from "cytoscape-dagre";
import { getNodeInfo } from "../eventFunctionMap.ts";
import store from "../store";
import cytoscape from "cytoscape";
import Legend from "@/components/Legend.vue";

cytoscape.use(dagre);

export default {
  name: "Cytoscape",
  components: {
    Legend,
  },
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
      completedNode: {
        "border-color": "#26bd77",
        "border-width": 2,
        "background-color": "#dcffe6",
      },
      failedNode: {
        "border-color": "#ff6c6c",
        "border-width": 2,
        "background-color": "#ffcccc",
      },
      lastNodeInView: "",
      lastNodeRendered: "",
      slicedWorkflow: null,
      workflowChunk: 0,
      parentArray: [],
      cy: null,
    };
  },
  watch: {
    lastNodeInView() {
      if (this.lastNodeRendered - 100 < this.lastNodeInView) {
        console.log("close to edge");
        // window.cy.destroy();
      }
    },
  },
  methods: {
    //  Function which will be used to divide the workflow in chunks to be rendered
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
    async buildTree() {
      this.slicedWorkflow.forEach((node) => {
        let { clickInfo, childRunId, parentWorkflow } = getNodeInfo(
          node,
          this.slicedWorkflow
        );

        if (!clickInfo) {
          clickInfo = { todo: "Todo" };
        }

        //We have a child workflow, show parent btn
        if (parentWorkflow) {
          store.commit("parentRoute", parentWorkflow.runId);
        }
        this.nodes.push({
          data: { id: node.eventId, name: node.eventType, nodeInfo: clickInfo },
        });
      });
      //Set the direct and inferred relationships
      this.slicedWorkflow.forEach((node) => {
        this.setDirectAndInferred(node);
      });

      //Set the chronological relationships.
      //If the node is not referred to as a parent it should be connected back to the graph with a chron child
      this.slicedWorkflow.forEach((node) => {
        if (!this.parentArray.includes(node.eventId)) {
          this.setChron(node);
        }
      });
    },
    setDirectAndInferred(node) {
      let nodeId = node.eventId,
        { parent, inferredChild } = getNodeInfo(node, this.slicedWorkflow);
      if (parent) {
        this.parentArray.push(parent);
        this.edges.push({
          data: { source: parent, target: nodeId, type: "direct" },
        });
      }
      if (inferredChild) {
        this.parentArray.push(nodeId);
        this.edges.push({
          data: { source: nodeId, target: inferredChild, type: "inferred" },
        });
      }
    },
    setChron(node) {
      let nodeId = node.eventId,
        { chronologicalChild } = getNodeInfo(node, this.slicedWorkflow);
      if (chronologicalChild) {
        this.edges.push({
          data: {
            source: nodeId,
            target: chronologicalChild,
            type: "chronological",
          },
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
    async viewInit() {
      let cy = (window.cy = cytoscape({
        autoungrabify: true,
        styleEnabled: true,
        container: document.getElementById("cy"),
        headless: true,
        hideEdgesOnViewport: true,
        //Uncomment the two lines below for better performance
        //textureOnViewport: true,
        //pixelRatio: 1,
        style: cytoscape
          .stylesheet()
          .selector("node")
          .css({
            height: "label",
            width: "label",
            padding: "10px",
            "font-weight": "200",
            "font-family": "Avenir, Helvetica, Arial, sans-serif",
            "background-color": "white",
            "border-radius": 5,
            "min-zoomed-font-size": 8,
            shape: "round-rectangle",
            "border-color": "#d1d1d1",
            "border-width": 1.6,
            label: "data(name)",
            "text-valign": "center",
            "text-halign": "center",
          })
          .selector("node[name = 'WorkflowExecutionCompleted']")
          .css(this.completedNode)
          .selector("node[name = 'WorkflowExecutionFailed']")
          .css(this.failedNode)
          .selector(":selected")
          .css({
            "border-color": "#11939A",
            "border-width": 2,
          })
          .selector("edge")
          .css({
            "target-arrow-shape": "triangle",
            "target-arrow-color": "#2c3e50",
            "line-color": "#2c3e50",
            width: 1.5,
            "curve-style": "bezier", //'hay-stack' <- set to improve perfomance
          })
          .selector("edge[type = 'inferred']")
          .css({
            "target-arrow-color": "#ECAB20",
            "line-color": "#ECAB20",
          })
          .selector("edge[type = 'chronological']")
          .css({
            "target-arrow-color": "#5879DA",
            "line-color": "#5879DA",
          }),

        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },
        layout: {
          name: "dagre",
          nodeDimensionsIncludeLabels: true,
          spacingFactor: 1.2, // to avoid node collision
          nodeSep: 230,
          edgeSep: 100,
          rankSep: 70,
        },
      }));
      let container = this.$refs.cy;
      cy.on("mouseover", "node", function (e) {
        container.style.cursor = "pointer";
      });
      cy.on("mouseout", "node", function (e) {
        container.style.cursor = "default";
      });

      //Register click event
      cy.on("tap", function (evt) {
        // target holds a reference to the originator
        // of the event (core or element)
        let evtTarget = evt.target;

        //Tap on background
        if (evtTarget === cy) {
          store.commit("displayNodeInformation", {});
          //Tap on a node
        } else if (evtTarget.isNode()) {
          store.commit("displayNodeInformation", evt.target.data().nodeInfo);

          //Access the node information to display on click
          let nodeInfo = evt.target.data().nodeInfo;

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
        }
      });

      return cy;
    },
    mountGraph(cy) {
      //Get root node
      var pos = cy.nodes("[id = " + 1 + "]").position();
      cy.center();
      cy.zoom({
        // Zoom to the specified position of root node
        level: 1,
        position: pos,
      });

      let self = this;
      cy.on("pan", function (evt) {
        let ext = cy.extent();
        let nodesInView = cy.nodes().filter((n) => {
          let bb = n.position();
          return (
            bb.x > ext.x1 && bb.x < ext.x2 && bb.y > ext.y1 && bb.y < ext.y2
          );
        });
        if (nodesInView.length != 0) {
          let amountNodesInView = nodesInView.length;
          self.lastNodeInView = nodesInView[amountNodesInView - 1].id();
        }
      });

      const t2 = performance.now();
      let container = document.getElementById("cy");
      cy.mount(container);
      const t3 = performance.now();
      console.log(`Call to graph mount took ${t3 - t2} milliseconds.`);
    },
  },
  mounted() {
    this.chunkWorkflow();
    this.buildTree();
    const t0 = performance.now();
    this.viewInit().then((cy) => {
      const t1 = performance.now();
      console.log(`Call to view_init took ${t1 - t0} milliseconds.`);
      this.mountGraph(cy);
    });
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