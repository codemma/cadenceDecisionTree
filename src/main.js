import * as data from '../data.json';

var g = new dagreD3.graphlib.Graph()
  .setGraph({align: 'DR'})
  .setDefaultEdgeLabel(function() { return {}; });

//Create nodes
data.forEach(function(node) {
   g.setNode(node.eventId, { label: node.eventType, shape: "rect", class: [node.type], hovertext: node.eventType });  //style: 'fill: red'
});

data.forEach(function(node) {
   var eventType = node.eventType
   var firstChar =  eventType.charAt(0)

   if(node.eventId ===1) {
     return; // Special cases which always occur
   }
   if (firstChar=='A') {
    //If we have a scheduled event ID
    if(node.activityTaskScheduledEventAttributes !== undefined) {
      let schedEventId = node.activityTaskScheduledEventAttributes.decisionTaskCompletedEventId
      g.setEdge(schedEventId , node.eventId)
    }
    //If we have a started event ID
    else if (node.activityTaskStartedEventAttributes !== undefined){
      let startedEventId = node.activityTaskStartedEventAttributes.scheduledEventId
      g.setEdge(startedEventId, node.eventId);
    }
    // Completed event ID
    else if (node.activityTaskCompletedEventAttributes !== undefined){
      let schedEventId = node.activityTaskCompletedEventAttributes.startedEventId
      g.setEdge(schedEventId, node.eventId);
      g.setEdge(node.eventId,node.eventId+1);
    }
   }
   if (firstChar=='D') {
      //If we have a scheduled event ID
    if(eventType === 'DecisionTaskScheduled') {
      g.setEdge(node.eventId-1, node.eventId)
    }
    //If we have a started event ID
    else if (node.decisionTaskStartedEventAttributes !== undefined){
      let startedEventId = node.decisionTaskStartedEventAttributes.scheduledEventId
      g.setEdge(startedEventId, node.eventId);
    }
    // Completed event ID
    else if (node.decisionTaskCompletedEventAttributes !== undefined){
      let schedEventId = node.decisionTaskCompletedEventAttributes.startedEventId
      g.setEdge(schedEventId, node.eventId);
    }
  }

});

g.nodes().forEach(function(v) {
  var node = g.node(v);
  // Round the corners of the nodes
  node.rx = node.ry = 5;
});



var svg = d3.select("svg"),
    inner = svg.select("g");
// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
    zoom = d3.zoom().on("zoom", function() {
      inner.attr("transform", d3.event.transform);
      inner.attr("transform", d3.event.transform);
    });
svg.call(zoom);

var node = inner.selectAll('g.node');

node.on("click", function(){return tooltip.style("visibility", "visible");})

// Run the renderer. This is what draws the final graph.
render(inner, g);

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
	.style("z-index", "10")
	.style("visibility", "hidden")
  .text("Simple Tooltip...");

//Select all nodes and add click event
inner.selectAll('g.node')
  .attr("data-hovertext", function(v) {
 		return g.node(v).hovertext
	})
	.on("click", function(){return tooltip.style("visibility", "visible");})
	.on("mousemove", function(){
    tooltip.text( this.dataset.hovertext)
    	.style("top", (event.pageY-10)+"px")
    	.style("left",(event.pageX+10)+"px");
  })
	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});

//svg.attr("height", g.graph().height + 50);