module.exports = [
  {
    "eventId": 1,
    "timestamp": 1598342558231686423,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1709179973,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "workflow.timeout"
      },
      "parentWorkflowDomain": "cadence-canary",
      "parentWorkflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:02:37Z",
        "runId": "9fefcd44-28a0-4cc0-8c75-da7400b27189"
      },
      "parentInitiatedEventId": 14,
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0MjU1Nzk2NTU3MTk5MwoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "a9639f12-9775-447a-9305-f04ae5404c6a",
      "identity": "",
      "firstExecutionRunId": "a9639f12-9775-447a-9305-f04ae5404c6a",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0,
      "header": {
        "fields": {
          "uber-trace-id": "NTViOGM4ZjRjZDMzZDZhYzo3YzU0NGI0MjRiZmEwMDRmOjU1YjhjOGY0Y2QzM2Q2YWM6MA=="
        }
      }
    }
  },
  {
    "eventId": 2,
    "timestamp": 1598342558251149351,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1709179977,
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
    "timestamp": 1598342558258185948,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1709179980,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "81@agent3684-dca1@canary-task-queue",
      "requestId": "fec536d4-0cc7-4ad6-b967-0616f63d6ed9"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1598342558279714804,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1709179983,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "81@agent3684-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1598342558279841005,
    "eventType": "MarkerRecorded",
    "version": -24,
    "taskId": 1709179984,
    "markerRecordedEventAttributes": {
      "markerName": "Version",
      "details": "ImluaXRpYWwgdmVyc2lvbiIKMwo=",
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1598342558280276482,
    "eventType": "UpsertWorkflowSearchAttributes",
    "version": -24,
    "taskId": 1709179985,
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
    "timestamp": 1598342558280289882,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 1709179986,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "activity.timeout.Delay"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0MjU1ODI1ODE4NTk0OAo=",
      "scheduleToCloseTimeoutSeconds": 2,
      "scheduleToStartTimeoutSeconds": 1,
      "startToCloseTimeoutSeconds": 1,
      "heartbeatTimeoutSeconds": 0,
      "decisionTaskCompletedEventId": 4,
      "header": {
        "fields": {
          "uber-trace-id": "NTViOGM4ZjRjZDMzZDZhYzo3YzU0NGI0MjRiZmEwMDRmOjU1YjhjOGY0Y2QzM2Q2YWM6MA=="
        }
      }
    }
  },
  {
    "eventId": 8,
    "timestamp": 1598342558300129316,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 1709179992,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 7,
      "identity": "81@agent3684-dca1@canary-task-queue",
      "requestId": "599fe55d-0385-4471-9831-74a48086db44",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 9,
    "timestamp": 1598342559292719110,
    "eventType": "ActivityTaskTimedOut",
    "version": -24,
    "taskId": 1709180001,
    "activityTaskTimedOutEventAttributes": {
      "scheduledEventId": 7,
      "startedEventId": 8,
      "timeoutType": "START_TO_CLOSE",
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 10,
    "timestamp": 1598342559292749101,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1709180003,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "agent3684-dca1:d6c353a7-4b1c-4e92-9987-5d29ccad6c69"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 11,
    "timestamp": 1598342564310134875,
    "eventType": "DecisionTaskTimedOut",
    "version": -24,
    "taskId": 1709180042,
    "decisionTaskTimedOutEventAttributes": {
      "scheduledEventId": 10,
      "startedEventId": 0,
      "timeoutType": "SCHEDULE_TO_START"
    }
  },
  {
    "eventId": 12,
    "timestamp": 1598342564310153188,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1709180043,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "canary-task-queue"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 13,
    "timestamp": 1598342564332877702,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1709180046,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 12,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "requestId": "57506b3c-bc80-4460-9eb2-0c7821e72318"
    }
  },
  {
    "eventId": 14,
    "timestamp": 1598342564340351962,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1709180049,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 12,
      "startedEventId": 13,
      "identity": "80@compute6823-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 15,
    "timestamp": 1598342564340440687,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1709180050,
    "workflowExecutionCompletedEventAttributes": {
      "decisionTaskCompletedEventId": 14
    }
  }
]