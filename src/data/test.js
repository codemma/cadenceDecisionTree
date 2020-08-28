module.exports = [
  {
    "eventId": 1,
    "timestamp": 1597824724756263015,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 913418262,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "workflow.cancellation"
      },
      "parentWorkflowDomain": "cadence-canary",
      "parentWorkflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-19T08:12:04Z",
        "runId": "979068a3-082c-4d7a-b373-5fce75140a74"
      },
      "parentInitiatedEventId": 16,
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNDQyNzM5NjQ3MgoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "952f1beb-a6bb-4785-84a9-66893509b08d",
      "identity": "",
      "firstExecutionRunId": "952f1beb-a6bb-4785-84a9-66893509b08d",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0,
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 2,
    "timestamp": 1597824724773497544,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418266,
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
    "timestamp": 1597824724787401970,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418269,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "0d7d0b11-a779-4094-8029-6b735b3f3a05"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1597824724795022704,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418272,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1597824724795112311,
    "eventType": "MarkerRecorded",
    "version": -24,
    "taskId": 913418273,
    "markerRecordedEventAttributes": {
      "markerName": "Version",
      "details": "ImluaXRpYWwgdmVyc2lvbiIKMwo=",
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1597824724795239981,
    "eventType": "UpsertWorkflowSearchAttributes",
    "version": -24,
    "taskId": 913418274,
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
    "timestamp": 1597824724795258000,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 913418275,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "activity.cancellation.CancelNonChild"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNDc4NzQwMTk3MAo=",
      "scheduleToCloseTimeoutSeconds": 360,
      "scheduleToStartTimeoutSeconds": 180,
      "startToCloseTimeoutSeconds": 180,
      "heartbeatTimeoutSeconds": 0,
      "decisionTaskCompletedEventId": 4,
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 8,
    "timestamp": 1597824724802377483,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 913418281,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 7,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "f81ac2ed-43e8-4561-8d03-869572e35a52",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 9,
    "timestamp": 1597824724902312010,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 913418284,
    "activityTaskCompletedEventAttributes": {
      "scheduledEventId": 7,
      "startedEventId": 8,
      "identity": "80@compute6823-dca1@canary-task-queue"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1597824724902340645,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418286,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 11,
    "timestamp": 1597824724922700712,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418290,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 10,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "6dc4a4f4-70df-4506-8385-1f9720ddde48"
    }
  },
  {
    "eventId": 12,
    "timestamp": 1597824724930551294,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418293,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 10,
      "startedEventId": 11,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 13,
    "timestamp": 1597824724930645021,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 913418294,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "workflow.cancellation.external-child",
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNDkyMjcwMDcxMgoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 12,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 14,
    "timestamp": 1597824724930687136,
    "eventType": "TimerStarted",
    "version": -24,
    "taskId": 913418295,
    "timerStartedEventAttributes": {
      "timerId": "1",
      "startToFireTimeoutSeconds": 1,
      "decisionTaskCompletedEventId": 12
    }
  },
  {
    "eventId": 15,
    "timestamp": 1597824724967770913,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 913418299,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 13,
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-child",
        "runId": "d2f807f7-7c38-497d-931c-1cf9f7d10856"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 16,
    "timestamp": 1597824724967822735,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418301,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 17,
    "timestamp": 1597824724979537707,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418305,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 16,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "f7dc5d93-5b50-46a3-b29d-56483482f843"
    }
  },
  {
    "eventId": 18,
    "timestamp": 1597824724987364193,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418308,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 16,
      "startedEventId": 17,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 19,
    "timestamp": 1597824725939862502,
    "eventType": "TimerFired",
    "version": -24,
    "taskId": 913418310,
    "timerFiredEventAttributes": {
      "timerId": "1",
      "startedEventId": 14
    }
  },
  {
    "eventId": 20,
    "timestamp": 1597824725939886877,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418312,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 21,
    "timestamp": 1597824725949753428,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418316,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 20,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "4397fe55-c48d-4efe-8fae-677db50be86f"
    }
  },
  {
    "eventId": 22,
    "timestamp": 1597824725957371997,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418319,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 20,
      "startedEventId": 21,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 23,
    "timestamp": 1597824725957426054,
    "eventType": "RequestCancelExternalWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 913418320,
    "requestCancelExternalWorkflowExecutionInitiatedEventAttributes": {
      "decisionTaskCompletedEventId": 22,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-child"
      },
      "childWorkflowOnly": true
    }
  },
  {
    "eventId": 24,
    "timestamp": 1597824725992708695,
    "eventType": "ExternalWorkflowExecutionCancelRequested",
    "version": -24,
    "taskId": 913418323,
    "externalWorkflowExecutionCancelRequestedEventAttributes": {
      "initiatedEventId": 23,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-child",
        "runId": ""
      }
    }
  },
  {
    "eventId": 25,
    "timestamp": 1597824725992730485,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418325,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 26,
    "timestamp": 1597824725999937479,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418329,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 25,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "74b415f8-1179-49ed-82bf-f34ef59fd84f"
    }
  },
  {
    "eventId": 27,
    "timestamp": 1597824726007335629,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418332,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 25,
      "startedEventId": 26,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 28,
    "timestamp": 1597824726011536374,
    "eventType": "ChildWorkflowExecutionCanceled",
    "version": -24,
    "taskId": 913418334,
    "childWorkflowExecutionCanceledEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-child",
        "runId": "d2f807f7-7c38-497d-931c-1cf9f7d10856"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "initiatedEventId": 13,
      "startedEventId": 15
    }
  },
  {
    "eventId": 29,
    "timestamp": 1597824726011560330,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418336,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 30,
    "timestamp": 1597824726018264187,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418340,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 29,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "1f767285-e112-4f2c-bd97-b1321ef2202f"
    }
  },
  {
    "eventId": 31,
    "timestamp": 1597824726025888832,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418343,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 29,
      "startedEventId": 30,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 32,
    "timestamp": 1597824726025995969,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 913418344,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "workflow.cancellation.external-child-outside",
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNjAxODI2NDE4NwoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 31,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 33,
    "timestamp": 1597824726059011351,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 913418347,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 32,
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-child-outside",
        "runId": "8ca66364-7a04-41c2-b995-dbe679b287a9"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 34,
    "timestamp": 1597824726059056049,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418349,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 35,
    "timestamp": 1597824726083354747,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418353,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 34,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "e5fb2f74-6095-4834-9034-ab8216beb408"
    }
  },
  {
    "eventId": 36,
    "timestamp": 1597824726091122986,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418356,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 34,
      "startedEventId": 35,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 37,
    "timestamp": 1597824726091173062,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 913418357,
    "activityTaskScheduledEventAttributes": {
      "activityId": "2",
      "activityType": {
        "name": "activity.cancellation.CancelChild"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNjA4MzM1NDc0Nwp7IklEIjoid29ya2Zsb3cuY2FuY2VsbGF0aW9uLmV4dGVybmFsLWNoaWxkLW91dHNpZGUiLCJSdW5JRCI6IiJ9Cg==",
      "scheduleToCloseTimeoutSeconds": 360,
      "scheduleToStartTimeoutSeconds": 180,
      "startToCloseTimeoutSeconds": 180,
      "heartbeatTimeoutSeconds": 0,
      "decisionTaskCompletedEventId": 36,
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 38,
    "timestamp": 1597824726103045875,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 913418361,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 37,
      "identity": "81@agent3684-dca1@canary-task-queue",
      "requestId": "627bd0a7-3c38-4b80-8f82-d21734a145dc",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 39,
    "timestamp": 1597824726117077831,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 913418364,
    "activityTaskCompletedEventAttributes": {
      "scheduledEventId": 37,
      "startedEventId": 38,
      "identity": "81@agent3684-dca1@canary-task-queue"
    }
  },
  {
    "eventId": 40,
    "timestamp": 1597824726117102276,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418366,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 41,
    "timestamp": 1597824726126770408,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418370,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 40,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "92b147db-663f-4fac-802b-8f69656c1cdb"
    }
  },
  {
    "eventId": 42,
    "timestamp": 1597824726194436087,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418373,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 40,
      "startedEventId": 41,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 43,
    "timestamp": 1597824726183910513,
    "eventType": "ChildWorkflowExecutionCanceled",
    "version": -24,
    "taskId": 913418374,
    "childWorkflowExecutionCanceledEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-child-outside",
        "runId": "8ca66364-7a04-41c2-b995-dbe679b287a9"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "initiatedEventId": 32,
      "startedEventId": 33
    }
  },
  {
    "eventId": 44,
    "timestamp": 1597824726194489306,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418377,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 45,
    "timestamp": 1597824726194512214,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418378,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 44,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "request-from-RespondDecisionTaskCompleted"
    }
  },
  {
    "eventId": 46,
    "timestamp": 1597824726201831303,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418381,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 44,
      "startedEventId": 45,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 47,
    "timestamp": 1597824726201911970,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 913418382,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "workflow.cancellation.external-child-outside",
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNjE5NDUxMjIxNAoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 46,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 48,
    "timestamp": 1597824726253968466,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 913418385,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 47,
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-child-outside",
        "runId": "7eb7ece8-4c5d-4549-a39d-d38c47a4c309"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 49,
    "timestamp": 1597824726253992701,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418387,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 50,
    "timestamp": 1597824726265409171,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418391,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 49,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "b0465d18-74c2-42a4-8db6-04d81443131f"
    }
  },
  {
    "eventId": 51,
    "timestamp": 1597824726275969246,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418394,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 49,
      "startedEventId": 50,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 52,
    "timestamp": 1597824726276046141,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 913418395,
    "activityTaskScheduledEventAttributes": {
      "activityId": "3",
      "activityType": {
        "name": "activity.cancellation.CancelChild"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNjI2NTQwOTE3MQp7IklEIjoid29ya2Zsb3cuY2FuY2VsbGF0aW9uLmV4dGVybmFsLWNoaWxkLW91dHNpZGUiLCJSdW5JRCI6IjdlYjdlY2U4LTRjNWQtNDU0OS1hMzlkLWQzOGM0N2E0YzMwOSJ9Cg==",
      "scheduleToCloseTimeoutSeconds": 360,
      "scheduleToStartTimeoutSeconds": 180,
      "startToCloseTimeoutSeconds": 180,
      "heartbeatTimeoutSeconds": 0,
      "decisionTaskCompletedEventId": 51,
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 53,
    "timestamp": 1597824726310303301,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 913418399,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 52,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "0575ae8e-567e-4cef-9c0c-39279db29cfc",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 54,
    "timestamp": 1597824726322956241,
    "eventType": "ActivityTaskCompleted",
    "version": -24,
    "taskId": 913418402,
    "activityTaskCompletedEventAttributes": {
      "scheduledEventId": 52,
      "startedEventId": 53,
      "identity": "80@compute6823-dca1@canary-task-queue"
    }
  },
  {
    "eventId": 55,
    "timestamp": 1597824726322980476,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418404,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 56,
    "timestamp": 1597824726329903565,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418408,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 55,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "13779ba9-a57a-47be-bb96-e779e9c49634"
    }
  },
  {
    "eventId": 57,
    "timestamp": 1597824726340543469,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418411,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 55,
      "startedEventId": 56,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 58,
    "timestamp": 1597824726336607423,
    "eventType": "ChildWorkflowExecutionCanceled",
    "version": -24,
    "taskId": 913418412,
    "childWorkflowExecutionCanceledEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-child-outside",
        "runId": "7eb7ece8-4c5d-4549-a39d-d38c47a4c309"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "initiatedEventId": 47,
      "startedEventId": 48
    }
  },
  {
    "eventId": 59,
    "timestamp": 1597824726340613660,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418415,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 60,
    "timestamp": 1597824726340656054,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418416,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 59,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "request-from-RespondDecisionTaskCompleted"
    }
  },
  {
    "eventId": 61,
    "timestamp": 1597824726348082489,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418419,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 59,
      "startedEventId": 60,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 62,
    "timestamp": 1597824726348220146,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 913418420,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "workflow.cancellation.external-without-run-ID",
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNjM0MDY1NjA1NAoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 61,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 63,
    "timestamp": 1597824726398176305,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 913418423,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 62,
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-without-run-ID",
        "runId": "e3e25b2f-ed86-4893-8979-819039601ff6"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 64,
    "timestamp": 1597824726398217092,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418425,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 65,
    "timestamp": 1597824726408411758,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418429,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 64,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "ebf036b9-3f53-4adc-8dea-ec30023458d4"
    }
  },
  {
    "eventId": 66,
    "timestamp": 1597824726415998060,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418432,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 64,
      "startedEventId": 65,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 67,
    "timestamp": 1597824726416083616,
    "eventType": "RequestCancelExternalWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 913418433,
    "requestCancelExternalWorkflowExecutionInitiatedEventAttributes": {
      "decisionTaskCompletedEventId": 66,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-without-run-ID",
        "runId": ""
      },
      "control": "NA==",
      "childWorkflowOnly": false
    }
  },
  {
    "eventId": 68,
    "timestamp": 1597824726428182994,
    "eventType": "ExternalWorkflowExecutionCancelRequested",
    "version": -24,
    "taskId": 913418436,
    "externalWorkflowExecutionCancelRequestedEventAttributes": {
      "initiatedEventId": 67,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-without-run-ID",
        "runId": ""
      }
    }
  },
  {
    "eventId": 69,
    "timestamp": 1597824726428207648,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418438,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 70,
    "timestamp": 1597824726438169951,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418442,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 69,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "728ef3b9-5f06-45eb-bbba-f5480e2f5364"
    }
  },
  {
    "eventId": 71,
    "timestamp": 1597824726448795118,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418445,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 69,
      "startedEventId": 70,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 72,
    "timestamp": 1597824726444207173,
    "eventType": "ChildWorkflowExecutionCanceled",
    "version": -24,
    "taskId": 913418446,
    "childWorkflowExecutionCanceledEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-without-run-ID",
        "runId": "e3e25b2f-ed86-4893-8979-819039601ff6"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "initiatedEventId": 62,
      "startedEventId": 63
    }
  },
  {
    "eventId": 73,
    "timestamp": 1597824726448899950,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418449,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 74,
    "timestamp": 1597824726448933195,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418450,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 73,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "request-from-RespondDecisionTaskCompleted"
    }
  },
  {
    "eventId": 75,
    "timestamp": 1597824726463831463,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418453,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 73,
      "startedEventId": 74,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 76,
    "timestamp": 1597824726463955082,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 913418454,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "workflow.cancellation.external-with-run-ID",
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5NzgyNDcyNjQ0ODkzMzE5NQoxMDAwMDAwMDAwMAo=",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 75,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 77,
    "timestamp": 1597824726489516022,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 913418457,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 76,
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-with-run-ID",
        "runId": "c03c2905-9afe-43b8-b62d-b4af0a93886d"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "header": {
        "fields": {
          "uber-trace-id": "MmU2Y2E1YTY1ODkzYTk5ODo3MTVlODE4ZDVmOTNkNjY1OjJlNmNhNWE2NTg5M2E5OTg6MA=="
        }
      }
    }
  },
  {
    "eventId": 78,
    "timestamp": 1597824726489552968,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418459,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 79,
    "timestamp": 1597824726500317189,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418463,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 78,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "815933d1-3cac-434f-bbec-26fccdbc140f"
    }
  },
  {
    "eventId": 80,
    "timestamp": 1597824726507768069,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418466,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 78,
      "startedEventId": 79,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 81,
    "timestamp": 1597824726507831066,
    "eventType": "RequestCancelExternalWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 913418467,
    "requestCancelExternalWorkflowExecutionInitiatedEventAttributes": {
      "decisionTaskCompletedEventId": 80,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-with-run-ID",
        "runId": "c03c2905-9afe-43b8-b62d-b4af0a93886d"
      },
      "control": "NQ==",
      "childWorkflowOnly": false
    }
  },
  {
    "eventId": 82,
    "timestamp": 1597824726519136208,
    "eventType": "ExternalWorkflowExecutionCancelRequested",
    "version": -24,
    "taskId": 913418470,
    "externalWorkflowExecutionCancelRequestedEventAttributes": {
      "initiatedEventId": 81,
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-with-run-ID",
        "runId": "c03c2905-9afe-43b8-b62d-b4af0a93886d"
      }
    }
  },
  {
    "eventId": 83,
    "timestamp": 1597824726519162399,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418472,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 84,
    "timestamp": 1597824726525887907,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418476,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 83,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "bf693e07-fb57-4ad4-bea3-612655aad67f"
    }
  },
  {
    "eventId": 85,
    "timestamp": 1597824726532988742,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418479,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 83,
      "startedEventId": 84,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 86,
    "timestamp": 1597824726537030459,
    "eventType": "ChildWorkflowExecutionCanceled",
    "version": -24,
    "taskId": 913418481,
    "childWorkflowExecutionCanceledEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "workflow.cancellation.external-with-run-ID",
        "runId": "c03c2905-9afe-43b8-b62d-b4af0a93886d"
      },
      "workflowType": {
        "name": "workflow.cancellation.external"
      },
      "initiatedEventId": 76,
      "startedEventId": 77
    }
  },
  {
    "eventId": 87,
    "timestamp": 1597824726537056929,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 913418483,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 88,
    "timestamp": 1597824726544010259,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 913418487,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 87,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "2ef770ca-dbc3-462f-b46f-6d2a75ed7aa2"
    }
  },
  {
    "eventId": 89,
    "timestamp": 1597824726598530687,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 913418490,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 87,
      "startedEventId": 88,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 90,
    "timestamp": 1597824726598581322,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 913418491,
    "workflowExecutionCompletedEventAttributes": {
      "decisionTaskCompletedEventId": 89
    }
  }
]