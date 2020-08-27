module.exports = [
  {
    "eventId": 1,
    "timestamp": 1597824696247328694,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 684743348217,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "parentWorkflowDomain": "cadence-canary",
      "parentWorkflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-19T08:11:34Z/workflow.cancellation",
        "runId": "b3348134-e117-4327-81c2-f9d48b4aa586"
      },
      "parentInitiatedEventId": 32,
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDY5NjIzMzg4NzA2NAoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "e49d4d61-31d1-4f9d-a561-345ebeba06a1",
      "identity": "",
      "firstExecutionRunId": "e49d4d61-31d1-4f9d-a561-345ebeba06a1",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0,
      "header": {
        "fields": {
          "uber-trace-id": "MmE2YTgzYzk0Y2RhOWM5YzowMmQ1ZGNhZmYzNDNjNjVlOjJhNmE4M2M5NGNkYTljOWM6MQ=="
        }
      }
    }
  },
  {
    "eventId": 2,
    "timestamp": 1597824696261120916,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 684743348223,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "canary-task-queue"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1597824696267527421,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 684743348226,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "6678b04e-94ad-46ce-ab00-21b40da6cca2"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1597824696275465720,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 684743348229,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1597824696275545846,
    "eventType": "MarkerRecorded",
    "version": -24,
    "taskId": 684743348230,
    "markerRecordedEventAttributes": {
      "markerName": "Version",
      "details": "ImluaXRpYWwgdmVyc2lvbiIKMwo=",
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1597824696275644436,
    "eventType": "UpsertWorkflowSearchAttributes",
    "version": -24,
    "taskId": 684743348231,
    "upsertWorkflowSearchAttributesEventAttributes": {
      "decisionTaskCompletedEventId": 4,
      "searchAttributes": {
        "indexedFields": {
          "CadenceChangeVersion": "WyJpbml0aWFsIHZlcnNpb24tMyJd"
        }
      }
    }
  },
  {
    "eventId": 7,
    "timestamp": 1597824696275649020,
    "eventType": "TimerStarted",
    "version": -24,
    "taskId": 684743348232,
    "timerStartedEventAttributes": {
      "timerId": "0",
      "startToFireTimeoutSeconds": 10,
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 8,
    "timestamp": 1597824696332914397,
    "eventType": "WorkflowExecutionCancelRequested",
    "version": -24,
    "taskId": 684743348237,
    "workflowExecutionCancelRequestedEventAttributes": {
      "cause": "",
      "identity": "81@agent3684-dca1@"
    }
  },
  {
    "eventId": 9,
    "timestamp": 1597824696332931065,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 684743348239,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 10,
    "timestamp": 1597824696339542418,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 684743348245,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 9,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "212cd0ae-d0db-4c82-90cf-669d557a3617"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1597824696349979479,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 684743348248,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 9,
      "startedEventId": 10,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 12,
    "timestamp": 1597824696350039425,
    "eventType": "TimerCanceled",
    "version": -24,
    "taskId": 684743348249,
    "timerCanceledEventAttributes": {
      "timerId": "0",
      "startedEventId": 7,
      "decisionTaskCompletedEventId": 11,
      "identity": "81@compute6391-dca1@canary-task-queue"
    }
  },
  {
    "eventId": 13,
    "timestamp": 1597824696350042811,
    "eventType": "WorkflowExecutionCanceled",
    "version": -24,
    "taskId": 684743348250,
    "workflowExecutionCanceledEventAttributes": {
      "decisionTaskCompletedEventId": 11
    }
  }
]