import * as workflow from '../data/signal';
import { getNodeInfo } from './eventFunctionMap.ts';

var nodeTemplate = Handlebars.compile($('#node-template').html());

var g = new dagreD3.graphlib.Graph()
  .setGraph({ align: 'DR' })
  .setDefaultEdgeLabel(function () { return {}; }); //Neccessary to display arrows between nodes

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
  //Set edges between the nodes
  workflow.forEach(function (node) {
    setEdge(node)
  })
}

function setEdge(node) {
  console.log('mainjs workflow ' + typeof workflow)
  let nodeId = node.eventId

  let { parent, child } = getNodeInfo(node, workflow)

  if (parent) {
    g.setEdge(parent, nodeId)
  }
  if (child) {
    g.setEdge(nodeId, child)
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