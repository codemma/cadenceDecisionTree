import { nodeInfo, node, workflow } from "./nodeInterface";

function getNodeInfo(node: node, workflow: workflow) {
  return eventTypeMap[node.eventType](node, workflow)
}
let eventTypeMap = {
  'WorkflowExecutionStarted': function (node: node) {
    return 0
  },
  'ActivityTaskCanceled': function (node: node) {
    return node.eventId;
  },
  'ActivityTaskCancelRequested': function (node: node) {
    return node.eventId;
  },
  'ActivityTaskCompleted': function (node: node) {
    let childId = node.eventId + 1;

    const nodeInfo: nodeInfo = {
      parent: node.activityTaskCompletedEventAttributes.startedEventId,
      child: childId
    }
    return nodeInfo
  },

  'ActivityTaskFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskFailedEventAttributes.startedEventId
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
  'ActivityTaskTimedOut': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskTimedOutEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'CancelTimerFailed': function (node: node) {
    return node.eventId
  },
  'ChildWorkflowExecutionCanceled': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionCanceledEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionCompleted': function (node: node) {
    const nodeInfo: nodeInfo = {
      inferredParents: [node.childWorkflowExecutionCompletedEventAttributes.startedEventId]
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionFailed': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionFailedEventAttributes.startedEventId
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionStarted': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionStartedEventAttributes.initiatedEventId
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionTerminated': function (node: node) {
    return node.eventId
  },
  'ChildWorkflowExecutionTimedOut': function (node: node) {
    return node.eventId
  },
  'DecisionTaskCompleted': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.decisionTaskCompletedEventAttributes.startedEventId,
    }
    return nodeInfo
  },
  'DecisionTaskFailed': function (node: node) {
    return node.eventId
  },
  'DecisionTaskScheduled': function (node: node, workflow: workflow) {
    //Special case: Decision task is started by an event before it, we call findInferredParents to find the parents
    let parentIds = findinferredParents(node, workflow)
    let chronologicalParent;
    if (parentIds) {
      console.log('chron parent', node.eventId, findChronolicalParents(node, workflow, parentIds))
      chronologicalParent = findChronolicalParents(node, workflow, parentIds)
    }

    const nodeInfo: nodeInfo = {
      inferredParents: parentIds,
      chronologicalParent: chronologicalParent
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
    return node.eventId
  },
  'ExternalWorkflowExecutionCancelRequested': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.externalWorkflowExecutionCancelRequestedEventAttributes.initiatedEventId
    }
    return nodeInfo
  },
  'ExternalWorkflowExecutionSignaled': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.externalWorkflowExecutionSignaledEventAttributes.initiatedEventId
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
    return node.eventId
  },
  'RequestCancelExternalWorkflowExecutionFailed': function (node: node) {
    return node.eventId
  },
  'RequestCancelExternalWorkflowExecutionInitiated': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.requestCancelExternalWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'SignalExternalWorkflowExecutionFailed': function (node: node) {
    return node.eventId
  },
  'SignalExternalWorkflowExecutionInitiated': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.signalExternalWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'StartChildWorkflowExecutionFailed': function (node: node) {
    return node.eventId
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
  'TimerFired': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.timerFiredEventAttributes.startedEventId
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
  'WorkflowExecutionCancelRequested': function (node: node) {
    const nodeInfo: nodeInfo = {}
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
  'WorkflowExecutionSignaled': function (node: node) {
    //This node has no parent nor child
    const nodeInfo: nodeInfo = {}
    return nodeInfo
  },
  'WorkflowExecutionTerminated': function (node: node) {
    return node.eventId
  },
  'WorkflowExecutionTimedOut': function (node: node) {
    return node.eventId
  },
}

function findChronolicalParents(node: node, workflow: workflow, inferredParents: any): number {
  let parentId;
  //We only want to search the parents of the workflow, in reversed order to find the closests parents
  let slicedWorkflow = workflow.slice(0, node.eventId - 1)
  let reversedWorkflow = slicedWorkflow.reverse()

  let targetNode: node;
  for (targetNode of reversedWorkflow) {
    if (!inferredParents.includes(targetNode.eventId)) {
      return targetNode.eventId
    }
  }
  return parentId
}


function findinferredParents(node: node, workflow: workflow): number[] {
  let nonsignalParent = false
  let parentIds = [];

  //We only want to search the parents of the workflow, in reversed order to find the closests parents
  let slicedWorkflow = workflow.slice(0, node.eventId)
  let reversedWorkflow = slicedWorkflow.reverse()

  let targetNode: node;
  for (targetNode of reversedWorkflow) {
    let eventType = targetNode.eventType
    switch (eventType) {
      case 'WorkflowExecutionSignaled':
        parentIds.push(targetNode.eventId)
        break
      case 'TimerFired':
      case 'DecisionTaskCompleted':
      case 'ActivityTaskCompleted':
      case 'WorkflowExecutionStarted':
      case 'ActivityTaskTimedOut':
      case 'ActivityTaskFailed':
      case 'ActivityTaskCompleted':
      case 'ChildWorkflowExecutionStarted':
      case 'ChildWorkflowExecutionCompleted':
      case 'ChildWorkflowExecutionFailed':
      case 'WorkflowExecutionCancelRequested':
        parentIds.push(targetNode.eventId)
        return parentIds
    }
  }
  return parentIds
}

// Exporting variables and functions
export { getNodeInfo };