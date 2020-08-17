interface nodeInfo {
  parent?: number;
  child?: number;
}
function getNodeInfo(node) {
  return eventTypeMap[node.eventType](node)
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
      parent: node['activityTaskCompletedEventAttributes']['startedEventId'],
      child: childId
    }
    return nodeInfo
  },

  'ActivityTaskFailed': function (node) {
    return node.eventId;
  },
  'ActivityTaskScheduled': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node['activityTaskScheduledEventAttributes']['decisionTaskCompletedEventId']
    }
    return nodeInfo
  },
  'ActivityTaskStarted': function (node) {
    const nodeInfo: nodeInfo = {
      parent: node['activityTaskStartedEventAttributes']['scheduledEventId']
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
      parent: node['decisionTaskCompletedEventAttributes']['startedEventId']
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
      parent: node['decisionTaskStartedEventAttributes']['scheduledEventId']
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
    return node.eventId
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
    return node.eventId
  },
  'TimerFired': function (node) {
    return node.eventId
  },
  'TimerStarted': function (node) {
    return node.eventId
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
    return node.eventId
  },
  'WorkflowExecutionFailed': function (node) {
    return node.eventId
  },
  'WorkflowExecutionSignaled': function (node) {
    return node.eventId
  },
  'WorkflowExecutionTerminated': function (node) {
    return node.eventId
  },
  'WorkflowExecutionTimedOut': function (node) {
    return node.eventId
  },
}

// Exporting variables and functions
export { getNodeInfo };