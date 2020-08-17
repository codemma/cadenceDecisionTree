interface nodeInfo {
  parent?: number;
  child?: number;
}
let parentMap = new Map();
parentMap.set(1, 0)

function printMap() {
  console.log(...parentMap)
}

//Helper function to check if map contains a value
let mapContainsValue = (map, val) => [...map.values()].includes(val)

/* function setParent(node) {
  // Skip first workflow node
  if (node.eventId === 1) return;
  let parentId = findParentId(node)
  if (parentId) parentMap.set(node.eventId, parentId)
  //No parent ID => linked event to the one before it.
  else parentMap.set(node.eventId, node.eventId - 1)
}

function findParentId(node) {
  let parentId;
  //Get the object which contains 'EventAttributes' - has information about parent node
  let nodeKeys = Object.keys(node)
  let eventAttrKey = nodeKeys.filter(cls => cls.includes('EventAttributes'))
  let eventAttrObj = node[eventAttrKey]
  //Get an array of all  keys to object which contains 'EventID' (can be several)
  let eventKeys = Object.keys(eventAttrObj)
  let relativeKeys = eventKeys.filter(cls => cls.includes('EventId'))

  if (relativeKeys.length != 0) {
    parentId = relativeKeys.reduce((max, p) =>
      eventAttrObj[p] > max ? eventAttrObj[p]
        : max, eventAttrObj[relativeKeys[0]]);
  }
  if (relativeKeys == 0) console.log('parent not found ' + node.eventType)
  return parentId
} */



let nodeMap = {
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

function callNodeMap(node) {
  return nodeMap[node.eventType](node)
}


// Exporting variables and functions
export { callNodeMap, printMap };