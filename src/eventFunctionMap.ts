import { nodeInfo, node, workflow, eventTypeMap } from "./nodeInterface";

function getNodeInfo(node: node, workflow: workflow) {
  return eventTypeMap[node.eventType](node, workflow)
}

let eventTypeMap: eventTypeMap = {
  'WorkflowExecutionStarted': function (node: node, workflow: workflow) {
    let attributesObj = node.workflowExecutionStartedEventAttributes,
      { inferredChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      inferredChild: inferredChild,
      hoverText: {
        id: node.eventId,
        workflowType: attributesObj.workflowType.name,
        taskList: attributesObj.taskList.name,
        input: attributesObj.input,
      },
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
    let attributesObj = node.activityTaskCompletedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: attributesObj.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild,
      hoverText: {
        id: node.eventId,
        startedEventId: attributesObj.startedEventId,
        scheduledEventId: attributesObj.scheduledEventId,
        result: attributesObj.result
      },
    }
    return nodeInfo
  },

  'ActivityTaskFailed': function (node: node, workflow: workflow) {
    let attributesObj = node.activityTaskFailedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskFailedEventAttributes.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild,
      hoverText: {
        id: node.eventId,
        reason: attributesObj.reason,
        details: attributesObj.details,
        scheduledEventId: attributesObj.scheduledEventId,
        startedEventId: attributesObj.startedEventId,
      },
    }
    return nodeInfo
  },
  'ActivityTaskScheduled': function (node: node) {
    let attributesObj = node.activityTaskScheduledEventAttributes;
    const nodeInfo: nodeInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      hoverText: {
        id: node.eventId,
        input: attributesObj.input,
        activityType: attributesObj.activityType.name,
        taskList: attributesObj.taskList.name,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
      },
    }
    return nodeInfo
  },
  'ActivityTaskStarted': function (node: node) {
    let attributesObj = node.activityTaskStartedEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.scheduledEventId,
      hoverText: {
        id: node.eventId,
        requestId: attributesObj.requestId,
        attempt: attributesObj.attempt,
        lastFailureReason: attributesObj.lastFailureReason,
        scheduledEventId: attributesObj.scheduledEventId,
      },
    }
    return nodeInfo
  },
  'ActivityTaskTimedOut': function (node: node, workflow: workflow) {
    let { inferredChild, chronologicalChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: node.activityTaskTimedOutEventAttributes.startedEventId,
      chronologicalChild: chronologicalChild,
      inferredChild: inferredChild
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
    let attributesObj = node.childWorkflowExecutionCompletedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: attributesObj.startedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      hoverText: {
        id: node.eventId,
        result: attributesObj.result,
        workflowType: attributesObj.workflowType.name,
      },
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionFailed': function (node: node, workflow: workflow) {
    let { inferredChild, chronologicalChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: node.childWorkflowExecutionFailedEventAttributes.startedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild
    }
    return nodeInfo
  },
  'ChildWorkflowExecutionStarted': function (node: node, workflow: workflow) {
    let attributesObj = node.childWorkflowExecutionStartedEventAttributes,
      { inferredChild, chronologicalChild } = findChild(node, workflow);

    /*   if (inferredChild) {
        console.log('inf', node.eventId, inferredChild)
      }
      if (chronologicalChild) {
        console.log('cron', node.eventId, chronologicalChild)
      } */

    const nodeInfo: nodeInfo = {
      parent: attributesObj.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild,
      hoverText: {
        id: node.eventId,
        domain: attributesObj.domain,
        workflowType: attributesObj.workflowType.name,
        initiatedEventId: attributesObj.initiatedEventId,
        workflowId: attributesObj.workflowExecution.workflowId,
        runId: attributesObj.workflowExecution.runId
      }
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
    let attributesObj = node.decisionTaskCompletedEventAttributes
    let { chronologicalChild } = findChild(node, workflow);

    if (chronologicalChild) {
      console.log('cron', node.eventId, chronologicalChild)
    }
    const nodeInfo: nodeInfo = {
      parent: attributesObj.startedEventId,
      chronologicalChild: chronologicalChild,
      hoverText: {
        id: node.eventId,
        scheduledEventId: attributesObj.scheduledEventId,
        startedEventId: attributesObj.startedEventId,
      },
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
    let attributesObj = node.decisionTaskScheduledEventAttributes
    //Special case: Decision task is always started by an event before it, we call findChronParents to find the parent
    let parentId = findChronParent(node, workflow)
    const nodeInfo: nodeInfo = {
      //chronologicalParent: parentId,
      hoverText: {
        id: node.eventId,
        taskList: attributesObj.taskList.name,
        attempt: attributesObj.attempt,
      },
    }
    return nodeInfo
  },
  'DecisionTaskStarted': function (node: node) {
    let attributesObj = node.decisionTaskStartedEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.scheduledEventId,
      hoverText: {
        id: node.eventId,
        scheduledEventId: attributesObj.scheduledEventId,
      },
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
    let { inferredChild, chronologicalChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: node.externalWorkflowExecutionCancelRequestedEventAttributes.initiatedEventId,
      inferredChild: inferredChild,
      chronologicalChild: chronologicalChild
    }
    return nodeInfo
  },
  'ExternalWorkflowExecutionSignaled': function (node: node, workflow: workflow) {
    let { inferredChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: node.externalWorkflowExecutionSignaledEventAttributes.initiatedEventId,
      inferredChild: inferredChild
    }
    return nodeInfo
  },
  'MarkerRecorded': function (node: node) {
    let attributesObj = node.markerRecordedEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      hoverText: {
        id: node.eventId,
        markerName: attributesObj.markerName,
        details: attributesObj.details,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId
      },
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
      parent: node.signalExternalWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId,
    }
    return nodeInfo
  },
  'StartChildWorkflowExecutionFailed': function (node: node) {
    let attributesObj = node.startChildWorkflowExecutionFailedEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
    }
    return nodeInfo
  },
  'StartChildWorkflowExecutionInitiated': function (node: node) {
    let attributesObj = node.startChildWorkflowExecutionInitiatedEventAttributes
    const nodeInfo: nodeInfo = {
      parent: node.startChildWorkflowExecutionInitiatedEventAttributes.decisionTaskCompletedEventId,
      hoverText: {
        domain: attributesObj.domain,
        input: attributesObj.input,
        workflowId: attributesObj.workflowId,
        workflowType: attributesObj.workflowType.name,
        taskList: attributesObj.taskList,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId
      }
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
    let attributesObj = node.timerFiredEventAttributes,
      { inferredChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      parent: attributesObj.startedEventId,
      inferredChild: inferredChild,
      hoverText: {
        id: node.eventId,
        timerId: attributesObj.timerId,
        startedEventId: attributesObj.startedEventId
      }
    }
    return nodeInfo
  },
  'TimerStarted': function (node: node) {
    let attributesObj = node.timerStartedEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      hoverText: {
        id: node.eventId,
        timerId: attributesObj.timerId,
        startToFireTimeoutSeconds: attributesObj.startToFireTimeoutSeconds,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId
      }
    }
    return nodeInfo
  },
  'UpsertWorkflowSearchAttributes': function (node: node) {
    //TODO: not sure about what is important to display here
    let attributesObj = node.upsertWorkflowSearchAttributesEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      hoverText: {
        searchAttributes: attributesObj.searchAttributes.indexedFields.CadenceChangeVersion,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
      }
    }
    return nodeInfo
  },
  'WorkflowExecutionCanceled': function (node: node) {
    const nodeInfo: nodeInfo = {
      parent: node.workflowExecutionCanceledEventAttributes.decisionTaskCompletedEventId,
    }
    return nodeInfo
  },
  'WorkflowExecutionCancelRequested': function (node: node, workflow: workflow) {
    let { inferredChild, chronologicalChild } = findChild(node, workflow);
    //This node has no parent nor child
    const nodeInfo: nodeInfo = {
      inferredChild: inferredChild
    }
    return nodeInfo
  },
  'WorkflowExecutionCompleted': function (node: node) {
    let attributesObj = node.workflowExecutionCompletedEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      hoverText: {
        id: node.eventId,
        result: attributesObj.result,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
      }
    }
    return nodeInfo
  },
  'WorkflowExecutionContinuedAsNew': function (node: node) {
    let attributesObj = node.workflowExecutionContinuedAsNewEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      hoverText: {
        id: node.eventId,
        input: attributesObj.input,
        initiator: attributesObj.initiator,
        newExecutionRunId: attributesObj.newExecutionRunId,
        workflowType: attributesObj.workflowType.name,
        taskList: attributesObj.taskList,
      }
    }
    return nodeInfo
  },
  'WorkflowExecutionFailed': function (node: node) {
    let attributesObj = node.workflowExecutionFailedEventAttributes
    const nodeInfo: nodeInfo = {
      parent: attributesObj.decisionTaskCompletedEventId,
      hoverText: {
        reason: attributesObj.reason,
        decisionTaskCompletedEventId: attributesObj.decisionTaskCompletedEventId,
        details: attributesObj.details,
      }
    }
    return nodeInfo
  },
  'WorkflowExecutionSignaled': function (node: node, workflow: workflow) {
    let { inferredChild } = findChild(node, workflow);
    const nodeInfo: nodeInfo = {
      inferredChild: inferredChild
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


//Looks for a chronological or inferred child
//It is inferred if a DecisionTaskScheduled, otherwise its chronological
//External signals are not children and therefore they are skipped
function findChild(node: node, workflow: workflow): nodeInfo {
  let
    slicedWorkflow = workflow.slice(node.eventId),
    nodeInformation: nodeInfo = {},
    targetNode: node;

  console.log('in findchild', node.eventType + node.eventId, slicedWorkflow[0].eventType + slicedWorkflow[0].eventId)
  if (slicedWorkflow[0].eventType === 'DecisionTaskScheduled') {
    nodeInformation = {
      inferredChild: slicedWorkflow[0].eventId
    }
    return nodeInformation
  }

  else {
    for (targetNode of slicedWorkflow) {
      switch (targetNode.eventType) {
        case 'WorkflowExecutionSignaled':
        case 'WorkflowExecutionCancelRequested':
          break
        default:
          nodeInformation = {
            chronologicalChild: targetNode.eventId
          }
          return nodeInformation
      }
    }

  }
  return nodeInformation
}

function findChronParent(node: node, workflow: workflow): number | undefined {
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