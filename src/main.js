import * as workflow from '../data/data.json';

var g = new dagreD3.graphlib.Graph()
  .setGraph({ align: 'DR' })
  .setDefaultEdgeLabel(function () { return {}; }); //Neccessary to display arrows between nodes

//Create nodes
workflow.forEach(function (node) {
  g.setNode(node.eventId, {
    label: node.eventType,
    shape: "rect",
    class: [node.type],
    hovertext: node.eventType
  });
});

let map = new Map();

workflow.forEach(function (node) {
  let parentId = -1;

  if (node.eventId === 1) {
    return; // The first workflow node, will always have a child
  }
  //Edge case when no node has this as a parent, TODO: find a better way to solve this.
  //Perhaps a function which scans for children ?
  if (node.eventType === 'ActivityTaskCompleted') {
    g.setEdge(node.eventId, node.eventId + 1)
  }
  if (node.eventType === 'ChildWorkflowExecutionCompleted') {
    console.log('edge set')
    g.setEdge(node.eventId - 1, node.eventId)
  }

  //Get the object which contains 'EventAttributes' - has information about parent node
  let eventAttrObj = Object.keys(node).filter(cls => cls.includes('EventAttributes'))

  //Get an array of all  keys to object which contains 'EventID' (can be several)
  let parentsKeyList = Object.keys(node[eventAttrObj]).filter(cls => cls.includes('EventId'))

  //TODO: ParenID should be renamed and check as a non empty list
  if (parentsKeyList.length != 0) {
    parentId = parentsKeyList.reduce((max, p) => node[eventAttrObj][p] > max ? node[eventAttrObj][p] : max, node[eventAttrObj][parentsKeyList[0]]);
  }
  if (parentId == -1) {
    g.setEdge(node.eventId - 1, node.eventId)
  }

  else {
    g.setEdge(parentId, node.eventId)
  }
})

let keys = Object.keys(workflow[0])


g.nodes().forEach(function (v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
  inner = svg.select("g");
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
    //Update coordinates for the tooltip
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