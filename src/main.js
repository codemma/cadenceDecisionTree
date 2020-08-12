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
  if (node.eventId === 1) {
    return; // The first workflow node, will always have a child
  }
  //Edge case when no node has this as a parent, TODO: find a better way to solve this
  if (node.eventType === 'ActivityTaskCompleted') {
    g.setEdge(node.eventId, node.eventId + 1)
  }
  let finalParentId = -1;

  //get all keys for each node
  var getAllKeys = Object.keys(node);

  //Find the object which contains the EventAttributes (and such the parent ID)
  let objRes = getAllKeys.filter(cls => cls.includes('EventAttributes'))

  //Create a list of strings which contains 'eventID', ie the parent ID
  var getEventAttributeKeys = Object.keys(node[objRes]);
  let parentID = getEventAttributeKeys.filter(cls => cls.includes('EventId'))

  //TODO: ParenID should be renamed and check as a non empty list
  if (parentID != 0) {
    finalParentId = parentID.reduce((max, p) => node[objRes][p] > max ? node[objRes][p] : max, node[objRes][parentID[0]]);
  }
  if (finalParentId == -1) g.setEdge(node.eventId - 1, node.eventId)

  else {
    g.setEdge(finalParentId, node.eventId)
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