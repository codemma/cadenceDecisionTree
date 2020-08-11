import * as workflow from '../data.json';

var g = new dagreD3.graphlib.Graph()
  .setGraph({ align: 'DR' })
  .setDefaultEdgeLabel(function () { return {}; });

//Create nodes
workflow.forEach(function (node) {
  g.setNode(node.eventId, {
    label: node.eventType,
    shape: "rect",
    class: [node.type],
    hovertext: node.eventType
  });
});

//Set edges
//This method is just a test to get a simple tree working, should definitely be improved
//TODO: implement child workflow
workflow.forEach(function (node) {
  var eventType = node.eventType

  if (node.eventId === 1) {
    return; // Special cases which always occur
  }
  //If we have a scheduled activity
  if (node.activityTaskScheduledEventAttributes !== undefined) {
    let schedEventId = node.activityTaskScheduledEventAttributes.decisionTaskCompletedEventId
    g.setEdge(schedEventId, node.eventId)
  }
  //If we have a started activity
  else if (node.activityTaskStartedEventAttributes !== undefined) {
    let startedEventId = node.activityTaskStartedEventAttributes.scheduledEventId
    g.setEdge(startedEventId, node.eventId);
  }
  // Completed activity
  else if (node.activityTaskCompletedEventAttributes !== undefined) {
    let schedEventId = node.activityTaskCompletedEventAttributes.startedEventId
    g.setEdge(schedEventId, node.eventId);
    g.setEdge(node.eventId, node.eventId + 1);
  }
  //If we have a scheduled decision
  if (eventType === 'DecisionTaskScheduled') {
    g.setEdge(node.eventId - 1, node.eventId)
  }
  //If we have a started decision
  else if (node.decisionTaskStartedEventAttributes !== undefined) {
    let startedEventId = node.decisionTaskStartedEventAttributes.scheduledEventId
    g.setEdge(startedEventId, node.eventId);
  }
  // Completed decision
  else if (node.decisionTaskCompletedEventAttributes !== undefined) {
    let schedEventId = node.decisionTaskCompletedEventAttributes.startedEventId
    g.setEdge(schedEventId, node.eventId);
  }
});

g.nodes().forEach(function (v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});

var svg = d3.select("svg"),
  inner = svg.select("g");
// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var zoom = d3.zoom().on("zoom", function () {
  inner.attr("transform", d3.event.transform);
  inner.attr("transform", d3.event.transform);
});
svg.call(zoom);

// Run the renderer. This is what draws the final graph.
render(inner, g);

// Define the div for the tooltip
/* var tooltip = d3.select("body")
  .append("div").attr("class", "tooltip") */

/* d3.select("body")
  .append("div")
  .attr('id', 'tooltip')
  .attr('style', 'position: absolute; opacity: 0;'); */
/*  .style("background-color", "white")
 .style("border", "solid")
 .style("border-width", "2px")
 .style("border-radius", "5px")
 .style("padding", "5px")
 .style("z-index", "10")
 .style("visibility", "hidden")
 .text("Simple Tooltip..."); */

function tooltipText(d) {
  return 'Color base: ' + Math.round(d[2] * 100) / 100 + ', Position: ' + Math.round(d[0] * 100) / 100 + ';' + Math.round(d[1] * 100) / 100;
}

//Select all nodes and add click event
//ALso trying out mouseover and mouseout
inner.selectAll('g.node')
  .attr("data-hovertext", function (v) {
    return g.node(v).hovertext
  })
  /* .on("click", function () {
    tooltip.text(this.dataset.hovertext)
      .style("top", (event.pageY - 10) + "px")
      .style("left", (event.pageX + 10) + "px");
    return tooltip.style("visibility", "visible");
  }) */
  /* .on('mousemove', function () {
    d3.select('#tooltip')
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px')
  }) */
  .on("click", function () {
    d3.select("#tooltip").classed("hidden", false);
  })
  .on('mousemove', function (d) {
    let coordinates = d3.mouse(this);
    d3.select("#tooltip")
      .style("left", (event.pageX - 10) + "px")
      .style("top", (event.pageY + 10) + "px")
      .select("#info")
      .text(this.dataset.hovertext);
  })
  //.on("mouseout", function () { return tooltip.style("visibility", "hidden"); });

//svg.attr("height", g.graph().height + 50);