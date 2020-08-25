import { nodeInfo, node, workflow } from "./nodeInterface";

var triggerActivities: string[] = [
  'TimerFired',
  'ActivityTaskCompleted',
  'WorkflowExecutionStarted',
  'ActivityTaskTimedOut',
  'ActivityTaskFailed',
  'ActivityTaskCompleted',
  'ChildWorkflowExecutionStarted',
  'ChildWorkflowExecutionCompleted',
  'ChildWorkflowExecutionFailed',
  'WorkflowExecutionCancelRequested'
]

function getNodeInfo(node: node, workflow: workflow) {
  return eventTypeMap[node.eventType](node, workflow)
}
let eventTypeMap = {
  'WorkflowExecutionStarted': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      chronologicalChild: childId
    }
    return nodeInfo
  },
  'ActivityTaskCanceled': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskCanceledEventAttributes.startedEventId,
    }
    return nodeInfo
  },
  'ActivityTaskCancelRequested': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskCancelRequestedEventAttributes.decisionTaskCompletedEventId,
    }
    return nodeInfo
  },
  'ActivityTaskCompleted': function (node: node, workflow: workflow) {
    let childId = findChronChild(node, workflow)
    //console.log('chron child' + findChronChild(node, workflow))
    /*  let childId = findChild(node, workflow)
     if (!childId) {
       childId = node.eventId + 1;
     } */
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskCompletedEventAttributes.startedEventId,
      chronologicalChild: childId
    }
    return nodeInfo
  },

  'ActivityTaskFailed': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskFailedEventAttributes.startedEventId,
      chronologicalChild: childId
    }
    return nodeInfo
  },
  'ActivityTaskScheduled': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskScheduledEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'ActivityTaskStarted': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskStartedEventAttributes.scheduledEventId
    }
    return nodeInfo
  },
  'ActivityTaskTimedOut': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskTimedOutEventAttributes.startedEventId,
      chronologicalChild: childId
    }
    return nodeInfo
  },
  'CancelTimerFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.cancelTimerFailedEventAttributes.decisionTaskCompletedEventId,
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionCanceled': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionCanceledEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionCompleted': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionCompletedEventAttributes.startedEventId,
      inferredChild: childId
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionFailed': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionFailedEventAttributes.startedEventId,
      inferredChild: childId
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionStarted': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionStartedEventAttributes.initiatedEventId,
      inferredChild: childId
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionTerminated': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionTerminatedEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionTimedOut': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionTimedOutEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'DecisionTaskCompleted': function (node: node, workflow: workflow) {
    let childId = findChronChild(node, workflow)
    const nodeInfo: nodeInfo = {
      parent: node.decisionTaskCompletedEventAttributes.startedEventId,
      chronologicalChild: childId
    }
    return nodeInfo
  },
  'DecisionTaskFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.decisionTaskFailedEventAttributes.startedEventId,
    }
    return nodeInfo
  },
  'DecisionTaskScheduled': function (node: node, workflow: workflow) {
    //Special case: Decision task is always started by an event before it, we call findChronParents to find the parent
    let parentId = findChronParent(node, workflow)
    const nodeInfo: nodeInfo = {
      chronologicalParent: parentId,
    }
    return nodeInfo
  },
  'DecisionTaskStarted': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.decisionTaskStartedEventAttributes.scheduledEventId
    }
    return nodeInfo
  },
  'DecisionTaskTimedOut': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.decisionTaskTimedOutEventAttributes.scheduledEventId
    }
    return nodeInfo
  },
  'ExternalWorkflowExecutionCancelRequested': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    const nodeInfo: nodeInfo = {
      parent: node.externalWorkflowExecutionCancelRequestedEventAttributes.initiatedEventId,
      inferredChild: childId
    }
    return nodeInfo
  },
  'ExternalWorkflowExecutionSignaled': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: node.externalWorkflowExecutionSignaledEventAttributes.initiatedEventId,
      inferredChild: childId
    }
    return nodeInfo
  },
  'MarkerRecorded': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.markerRecordedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'RequestCancelActivityTaskFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.requestCancelActivityTaskFailedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'RequestCancelExternalWorkflowExecutionFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.requestCancelExternalWorkflowExecutionFailed.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'RequestCancelExternalWorkflowExecutionInitiated': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.requestCancelExternalWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'SignalExternalWorkflowExecutionFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.signalExternalWorkflowExecutionFailedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'SignalExternalWorkflowExecutionInitiated': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.signalExternalWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'StartChildWorkflowExecutionFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.startChildWorkflowExecutionFailedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'StartChildWorkflowExecutionInitiated': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.startChildWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'TimerCanceled': function (node: node) {
    //TODO
    const nodeInfo: nodeInfo = {
      parent: node.timerCanceledEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'TimerFired': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    const nodeInfo: nodeInfo = {
      parent: node.timerFiredEventAttributes.startedEventId,
      inferredChild: childId
    }
    return nodeInfo
  },
  'TimerStarted': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.timerStartedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'UpsertWorkflowSearchAttributes': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.upsertWorkflowSearchAttributesEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'WorkflowExecutionCanceled': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.workflowExecutionCanceledEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'WorkflowExecutionCancelRequested': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    //This node has no parent nor child
    const nodeInfo: nodeInfo = {
      inferredChild: childId
    }
    return nodeInfo
  },
  'WorkflowExecutionCompleted': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.workflowExecutionCompletedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'WorkflowExecutionContinuedAsNew': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.workflowExecutionContinuedAsNewEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'WorkflowExecutionFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.workflowExecutionFailedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'WorkflowExecutionSignaled': function (node: node, workflow: workflow) {
    let childId = findChild(node, workflow)
    const nodeInfo: nodeInfo = {
      inferredChild: childId
    }
    return nodeInfo
  },
  'WorkflowExecutionTerminated': function (node: node) {
    //TODO - not sure how to implement.
    const nodeInfo: nodeInfo = {
      parent: node.eventId - 1
    }
    return nodeInfo
  },
  'WorkflowExecutionTimedOut': function (node: node) {
    //TODO - not sure how to implement.
    const nodeInfo: nodeInfo = {
      parent: node.eventId - 1
    }
    return nodeInfo
  },
}
function findChronChild(node: node, workflow: workflow): number {
  let targetNodeId,
    slicedWorkflow = workflow.slice(node.eventId),
    targetNode: node;
  for (targetNode of slicedWorkflow) {
    switch (targetNode.eventType) {
      case 'WorkflowExecutionSignaled':
      case 'WorkflowExecutionCancelRequested':
        break
      default:
        return targetNode.eventId
    }
  }
  return targetNodeId
}

function findChild(node: node, workflow: workflow): number {
  let targetNodeId
  let slicedWorkflow = workflow.slice(node.eventId)
  let targetNode: node;
  for (targetNode of slicedWorkflow) {
    if (triggerActivities.includes(targetNode.eventType)) {
      targetNodeId = targetNode.eventId
      return targetNodeId
    }
    else if (targetNode.eventType === 'DecisionTaskScheduled') {
      targetNodeId = targetNode.eventId
      return targetNodeId
    }
  }
  return targetNodeId
}



function findChronParent(node: node, workflow: workflow): number {
  let parentIds;
  //We only want to search the parents of the workflow, in reversed order to find the closests parents
  let slicedWorkflow = workflow.slice(0, node.eventId - 1)
  let reversedWorkflow = slicedWorkflow.reverse()

  //Signals are not chronological parents, skip them!
  let targetNode: node;
  for (targetNode of reversedWorkflow) {
    let eventType = targetNode.eventType
    switch (eventType) {
      case 'WorkflowExecutionSignaled':
      case 'ExternalWorkflowExecutionSignaled':
      case 'WorkflowExecutionCancelRequested':
        break
      default:
        return targetNode.eventId
    }
  }
  return parentIds
}

// Exporting variables and functions
export { getNodeInfo };