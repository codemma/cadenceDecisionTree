interface nodeInfo {
  parent?: number;
  child?: number;
}
function getNodeInfo(node, workflow) {
  return eventTypeMap[node.eventType](node, workflow)
}
let eventTypeMap = {
  'WorkflowExecutionStarted': function (node) {
    const nodeInfo: nodeInfo = {
      child: node.eventId + 1
    }
    return nodeInfo
  },
  'ActivityTaskCanceled': function (node) {
    return node.eventId;
  },
  'ActivityTaskCancelRequested': function (node) {
    return node.eventId;
  },
  'ActivityTaskCompleted': function (node) {
    let childId = node.eventId + 1;

    const nodeInfo: nodeInfo = {
      parent: node.activityTaskCompletedEventAttributes.startedEventId,
      child: childId
    }
    return nodeInfo
  },

  'ActivityTaskFailed': function (node) {
    return node.eventId;
  },
  'ActivityTaskScheduled': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskScheduledEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'ActivityTaskStarted': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskStartedEventAttributes.scheduledEventId
    }
    return nodeInfo
  },
  'ActivityTaskTimedOut': function (node) {
    return node.eventId
  },
  'CancelTimerFailed': function (node) {
    return node.eventId
  },
  'ChildWorkflowExecutionCanceled': function (node) {
    return node.eventId
  },
  'ChildWorkflowExecutionCompleted': function (node) {
    return node.eventId
  },
  'ChildWorkflowExecutionFailed': function (node) {
    return node.eventId
  },
  'ChildWorkflowExecutionStarted': function (node) {
    return node.eventId
  },
  'ChildWorkflowExecutionTerminated': function (node) {
    return node.eventId
  },
  'ChildWorkflowExecutionTimedOut': function (node) {
    return node.eventId
  },
  'DecisionTaskCompleted': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.decisionTaskCompletedEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'DecisionTaskFailed': function (node) {
    return node.eventId
  },
  'DecisionTaskScheduled': function (node) {
    //Special case: Decision task is started by an event before it, use it as parent
    const nodeInfo: nodeInfo = {
      parent: node.eventId - 1
    }
    return nodeInfo
  },
  'DecisionTaskStarted': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.decisionTaskStartedEventAttributes.scheduledEventId
    }
    return nodeInfo
  },
  'DecisionTaskTimedOut': function (node) {
    return node.eventId
  },
  'ExternalWorkflowExecutionCancelRequested': function (node) {
    return node.eventId
  },
  'ExternalWorkflowExecutionSignaled': function (node) {
    return node.eventId
  },
  'MarkerRecorded': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.markerRecordedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'RequestCancelActivityTaskFailed': function (node) {
    return node.eventId
  },
  'RequestCancelExternalWorkflowExecutionFailed': function (node) {
    return node.eventId
  },
  'RequestCancelExternalWorkflowExecutionInitiated': function (node) {
    return node.eventId
  },
  'SignalExternalWorkflowExecutionFailed': function (node) {
    return node.eventId
  },
  'SignalExternalWorkflowExecutionInitiated': function (node) {
    return node.eventId
  },
  'StartChildWorkflowExecutionFailed': function (node) {
    return node.eventId
  },
  'StartChildWorkflowExecutionInitiated': function (node) {
    return node.eventId
  },
  'TimerCanceled': function (node) {
    //TODO
    const nodeInfo: nodeInfo = {
      parent: node.timerStartedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'TimerFired': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.timerFiredEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'TimerStarted': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.timerStartedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'UpsertWorkflowSearchAttributes': function (node) {
    return node.eventId
  },
  'WorkflowExecutionCanceled': function (node) {
    return node.eventId
  },
  'WorkflowExecutionCancelRequested': function (node) {
    return node.eventId
  },
  'WorkflowExecutionCompleted': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.eventId - 1
    }
    return nodeInfo
  },
  'WorkflowExecutionContinuedAsNew': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node.workflowExecutionContinuedAsNewEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'WorkflowExecutionFailed': function (node) {
    return node.eventId
  },
  'WorkflowExecutionSignaled': function (node, workflow) {
    console.log('get next ' + getNextNode(node, workflow, 'WorkflowExecutionSignaled'), node.eventId)
    const nodeInfo: nodeInfo = {
      child: getNextNode(node, workflow, 'WorkflowExecutionSignaled')
    }
    return nodeInfo
  },
  'WorkflowExecutionTerminated': function (node) {
    return node.eventId
  },
  'WorkflowExecutionTimedOut': function (node) {
    return node.eventId
  },
}
function getNextNode(node, workflow, string): number {
  console.log('workflow in event' + workflow.slice(node.eventId)[3].eventType)
  let childId = 0;

  let newWorkflow = workflow.slice(node.eventId)

  for (let targetNode of newWorkflow) {
    if (targetNode.eventType !== string && index > node.eventId) {
      console.log('found child' + targetNode.eventType)
      childId = targetNode.eventId
      break
    }
  }
  return childId;
}

var data = [{ "name": "placeHolder", "section": "right" }, { "name": "Overview", "section": "left" }, { "name": "ByFunction", "section": "left" }, { "name": "Time", "section": "left" }, { "name": "allFit", "section": "left" }, { "name": "allbMatches", "section": "left" }, { "name": "allOffers", "section": "left" }, { "name": "allInterests", "section": "left" }, { "name": "allResponses", "section": "left" }, { "name": "divChanged", "section": "right" }];
var index = -1;
var val = "allInterests"
var filteredObj = data.find(function (item, i) {
  if (item.name === val) {
    index = i;
    return i;
  }
});
console.log(index, filteredObj);



// Exporting variables and functions
export { getNodeInfo };