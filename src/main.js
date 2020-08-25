import * as workflow from '../data/signal-and-children';
import { getNodeInfo } from './eventFunctionMap.ts';

var nodeTemplate = Handlebars.compile($('#node-template').html());

import CustomArticle from './CustomArticle.vue';
new Vue({
  el: '#vue-test',
  render: h => h(CustomArticle),
})

var g = new dagreD3.graphlib.Graph()
  .setGraph({ align: 'UL' })
  .setDefaultEdgeLabel(function () { return {}; }); //Neccessary to display arrows between nodes

let parentArray = [];

buildTree()

function buildTree() {
  //Create nodes to render with Dagre D3
  workflow.forEach(function (node) {
    g.setNode(node.eventId, {
      label: nodeTemplate({ label: node.eventType }),
      labelType: "html",
      id: node.eventId,
      class: [node.type],
      hovertext: node.eventId
    });
  });

  //Set the direct and chronological parent relationships
  workflow.forEach(function (node) {
    setParents(node)
  })

  //Set the chronological and inferred child relationships
  workflow.forEach(function (node) {
    if (!parentArray.includes(node.eventId)) {
      setChildren(node)
    }
  })
}

function setParents(node) {
  let nodeId = node.eventId,
    { parent, chronologicalParent } = getNodeInfo(node, workflow)
  if (parent) {
    parentArray.push(parent)
    g.setEdge(parent, nodeId)
  }
  if (chronologicalParent) {
    parentArray.push(chronologicalParent)
    g.setEdge(chronologicalParent, nodeId, {
      style: "stroke: #00B2EE; stroke-width: 3px; stroke-dasharray: 5, 5;",
      arrowheadStyle: "fill: #00B2EE"
    })
  }
}

function setChildren(node) {
  let nodeId = node.eventId,
    { inferredChild, chronologicalChild } = getNodeInfo(node, workflow)

  if (inferredChild) {
    g.setEdge(nodeId, inferredChild, {
      style: "stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;",
      arrowheadStyle: "fill: #f66"
    })
  }
  if (chronologicalChild) {
    g.setEdge(nodeId, chronologicalChild, {
      style: "stroke: #00B2EE; stroke-width: 3px; stroke-dasharray: 5, 5;",
      arrowheadStyle: "fill: #00B2EE"
    })
  }
}

g.nodes().forEach(function (v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
  inner = svg.select("g"),
  innerInner = inner.selectAll(".node");
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
inner.selectAll('g.node')
  //To access the node hovertext
  .attr("data-hovertext", function (v) {
    return g.node(v).hovertext
  })
  .on("click", function () {
    //Show tooltip
    d3.select("#tooltip").classed("hidden", false);
  })
  .on('mousemove', function (d) {
    d3.select("#tooltip")
      .style("left", (event.pageX - 10) + "px")
      .style("top", (event.pageY + 10) + "px")
      .select("#info")
      .text(this.dataset.hovertext);
  })
  .on("mouseout", function () {
    d3.select("#tooltip").classed("hidden", true);
  });

//svg.attr("height", g.graph().height + 50);