let NodeInfo = {
  edges: [],
  parendId: 0
}

let nodeMap = {
  'WorkflowExecutionStarted': function (node) {
    return node.eventId;
  },
  'ActivityTaskCanceled': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ActivityTaskCancelRequested': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ActivityTaskCompleted': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ActivityTaskFailed': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ActivityTaskScheduled': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ActivityTaskStarted': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ActivityTaskTimedOut': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'CancelTimerFailed': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ChildWorkflowExecutionCanceled': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ChildWorkflowExecutionCompleted': function (node) {
    console.log('helloheee')
    return node.eventId;
  },
  'ChildWorkflowExecutionFailed': function (node) {
    return node.eventId;
  },
  'ChildWorkflowExecutionStarted': function (node) {
    return node.eventId;
  },
  'ChildWorkflowExecutionTerminated': function (node) {
    return node.eventId;
  },
  'ChildWorkflowExecutionTimedOut': function (node) {
    return node.eventId;
  },
  'DecisionTaskCompleted': function (node) {
    return node.eventId;
  },
  'DecisionTaskFailed': function (node) {
    return node.eventId;
  },
  'DecisionTaskScheduled': function (node) {
    return node.eventId;
  },
  'DecisionTaskStarted': function (node) {
    return node.eventId;
  },
  'DecisionTaskTimedOut': function (node) {
    return node.eventId;
  },
  'ExternalWorkflowExecutionCancelRequested': function (node) {
    return node.eventId;
  },
  'ExternalWorkflowExecutionSignaled': function (node) {
    return node.eventId;
  },
  'MarkerRecorded': function (node) {
    return node.eventId;
  },
  'RequestCancelActivityTaskFailed': function (node) {
    return node.eventId;
  },
  'RequestCancelExternalWorkflowExecutionFailed': function (node) {
    return node.eventId;
  },
  'RequestCancelExternalWorkflowExecutionInitiated': function (node) {
    return node.eventId;
  },
  'SignalExternalWorkflowExecutionFailed': function (node) {
    return node.eventId;
  },
  'SignalExternalWorkflowExecutionInitiated': function (node) {
    return node.eventId;
  },
  'StartChildWorkflowExecutionFailed': function (node) {
    return node.eventId;
  },
  'StartChildWorkflowExecutionInitiated': function (node) {
    return node.eventId;
  },
  'TimerCanceled': function (node) {
    return node.eventId;
  },
  'TimerFired': function (node) {
    return node.eventId;
  },
  'TimerStarted': function (node) {
    return node.eventId;
  },
  'UpsertWorkflowSearchAttributes': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionCanceled': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionCancelRequested': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionCompleted': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionContinuedAsNew': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionFailed': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionSignaled': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionStarted': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionTerminated': function (node) {
    return node.eventId;
  },
  'WorkflowExecutionTimedOut': function (node) {
    return node.eventId;
  },
}

function callNodeMap(node) {
  console.log('nodeMap' + nodeMap[node.eventType](node))
}


// Exporting variables and functions
export { callNodeMap };