interface nodeInfo {
  parent?: number;
  child?: number;
  inferredParents?: number[];
}
function getNodeInfo(node, workflow) {
  return eventTypeMap[node.eventType](node, workflow)
}
let eventTypeMap = {
  'WorkflowExecutionStarted': function (node) {
    return 0
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
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskTimedOutEventAttributes.startedEventId
    }
    return nodeInfo
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
  'DecisionTaskCompleted': function (node, workflow) {
    const nodeInfo: nodeInfo = {
      parent: node.decisionTaskCompletedEventAttributes.startedEventId,
    }
    return nodeInfo
  },
  'DecisionTaskFailed': function (node) {
    return node.eventId
  },
  'DecisionTaskScheduled': function (node, workflow) {
    //Special case: Decision task is started by an event before it, we call findInferredParents to find the parents
    let parentIds = findinferredParents(node, workflow)
    const nodeInfo: nodeInfo = {
      inferredParents: parentIds
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
    const nodeInfo: nodeInfo = {
      parent: node.upsertWorkflowSearchAttributesEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'WorkflowExecutionCanceled': function (node) {
    return node.eventId
  },
  'WorkflowExecutionCancelRequested': function (node) {
    return node.eventId
  },
  'WorkflowExecutionCompleted': function (node) {
    const nodeInfo: nodeInfo = {
      inferredParents: [node.eventId - 1]
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
    const nodeInfo: nodeInfo = {
      parent: node.workflowExecutionFailedEventAttributes.decisionTaskCompletedEventId
    }
    return nodeInfo
  },
  'WorkflowExecutionSignaled': function (node) {
    const nodeInfo: nodeInfo = {}
    return nodeInfo
  },
  'WorkflowExecutionTerminated': function (node) {
    return node.eventId
  },
  'WorkflowExecutionTimedOut': function (node) {
    return node.eventId
  },
}

function findinferredParents(node: object, workflow: object[]): number[] {
  let parentIds = [];

  //We only want to search the parents of the workflow, in reversed order to find the closests parents
  let slicedWorkflow = workflow.slice(0, node.eventId)
  let reversedWorkflow = slicedWorkflow.reverse()

  for (let targetNode of reversedWorkflow) {
    let eventType = targetNode.eventType
    switch (eventType) {
      case 'WorkflowExecutionSignaled':
        parentIds.push(targetNode.eventId)
        break
      case 'DecisionTaskCompleted':
      case 'ActivityTaskCompleted':
      case 'WorkflowExecutionStarted':
      case 'TimerFired':
      case 'ActivityTaskTimedOut':
        parentIds.push(targetNode.eventId)
        return parentIds
    }
  }
  return parentIds
}

// Exporting variables and functions
export { getNodeInfo };