import * as workflow from '../data/single_activity.json';

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
    return; // Special cases which always occur
  }

  let parentId;

  //get all keys for each node
  var getAllKeys = Object.keys(node);

  //Find the object which contains the EventAttributes (and such the parent ID)
  let objRes = getAllKeys.filter(cls => cls.includes('EventAttributes'))

  //Create a list of strings which contains 'eventID', ie the parent ID
  var getEventAttributeKeys = Object.keys(node[objRes]);
  let parentID = getEventAttributeKeys.filter(cls => cls.includes('EventId'))

  console.log('Found eventIds ' + parentID)

  let maxA = -1;
  if (parentID != 0) {
    maxA = parentID.reduce((max, p) => node[objRes][p] > max ? node[objRes][p] : max, node[objRes][parentID[0]]);
    //maxA = parentID.reduce((a, b) => node[objRes][a] > node[objRes][b] ? a : b).y;
  }

  console.log('MAX ' + maxA)

  if (maxA = -1) {

  }

  /* let searchTerms = ['started', 'scheduled', 'decision'];
  let result = [];
  searchTerms.forEach((searchTerm, i) => {
    result[i] = parentID.filter(cls => cls.includes(searchTerm))
  })

  console.log("result" + result) */


  //If we have started ID it is the latest, scheduled comes second.
  //Found started ID
  let started = parentID.filter(cls => cls.includes('started'))
  //Found scheduled ID
  let scheduled = parentID.filter(cls => cls.includes('scheduled'))
  //Found decisionTaskCompletedEventId
  let decision = parentID.filter(cls => cls.includes('decision'))

  //if (started.length != 0) console.log('found started' + node[objRes][started[0]], parentID = node[objRes][started[0]])
  //else if (scheduled.length != 0) console.log('found scheduled' + node[objRes][scheduled[0]], parentID = node[objRes][started[0]])

  //let parentID = node[objRes].filter(cls => cls.includes('scheduledEventId'))
  //console.log("FOUND STARTED, SCHEDULED ", started[0], scheduled)


  //console.log('EXISTS' + scheduled, started)
  /*  //If we have started ID it is the latest, scheduled comes second.
   if (Object.values(parentID).includes('started')) {
     console.log('found started ID')
   } */

  //let string = getAllKeys.includes('EventAttributes')
  //console.log("found key" + string)
  map.set(node.eventId, node.eventType);

})

console.log(map)


/* const arrayOfObject = [{
  name: 'Paul',
  country: 'Canada',
}, {
  name: 'Lea',
  country: 'Italy',
}, {
  name: 'John',
  country: 'Italy',
},]; */

/* let lea = workflow[0].entries(function (obj) {
  //loop through each object
  for (key in obj) {
    //check if object value contains value you are looking for
    if (obj[key].includes('eventAttributes')) {
      //add this object to the filtered array
      return obj;
    }
  }
}); */
/*
var resultObj = {};
// get all the keys from the object
var getAllKeys = Object.keys(workflow[0]);
arr.forEach(function (item) {
  // looping through first object
  getAllKeys.forEach(function (keyName) {
    // using index of to check if the object key name have a matched string
    if (keyName.indexOf(item) !== -1) {
      resultObj[keyName] = obj_arr[keyName];
    }
  })
})

console.log(workflow[0]); */


let keys = Object.keys(workflow[0])

//let obj = workflow[0].find(o => o.name.contains('event'));
//console.log(keys);

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