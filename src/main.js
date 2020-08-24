import * as workflow from '../data/signal-and-children';
import { getNodeInfo } from './eventFunctionMap.ts';

var nodeTemplate = Handlebars.compile($('#node-template').html());

var g = new dagreD3.graphlib.Graph()
  .setGraph({ align: 'UR' })
  .setDefaultEdgeLabel(function () { return {}; }); //Neccessary to display arrows between nodes

let workFlowMap = new Map(),
  parentArray = [];

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
  //Set the strict parent child relationships.
  workflow.forEach(function (node) {
    setParentChildMap(node)
  })
  // const iterator1 = workFlowMap.entries();
  console.log('finished parent array' + parentArray)
  for (let [child, parent] of workFlowMap.entries()) {
    // g.setEdge(parent, child)
  }
  workflow.forEach(function (node) {
    setDanglingNodes(node)
  })
}


function setDanglingNodes(node) {
  //The nodes is NOT referenced as a direct or chron parent - it is dangling.
  if (!parentArray.includes(node.eventId)) {
    setEdge(node)
  }
}

function setParentChildMap(node) {
  let { parent, chronologicalParent } = getNodeInfo(node, workflow)
  if (parent) {
    parentArray.push(parent)
    workFlowMap.set(node.eventId, parent)

    g.setEdge(parent, node.eventId)
  }
  if (chronologicalParent) {
    parentArray.push(chronologicalParent)
    workFlowMap.set(node.eventId, chronologicalParent)

    g.setEdge(chronologicalParent, node.eventId, {
      style: "stroke: #00B2EE; stroke-width: 3px; stroke-dasharray: 5, 5;",
      arrowheadStyle: "fill: #00B2EE"
    })
  }
}

function setEdge(node) {
  let nodeId = node.eventId
  //if (nodeId == 1) return // always skip first node

  let { parent, inferredChild, chronologicalChild, chronologicalParent } = getNodeInfo(node, workflow)

  /*  if (parent) {
     g.setEdge(parent, nodeId)
   } */
  /*  if (inferredParents) {
     console.log(inferredParents)
     inferredParents.forEach(parentID =>
       g.setEdge(parentID, nodeId, {
         style: "stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;",
         arrowheadStyle: "fill: #f66"
       })
     )
   } */
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
  if (chronologicalParent) {
    console.log('hello')
    g.setEdge(chronologicalParent, nodeId, {
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