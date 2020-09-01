module.exports =[
  {
    "eventId": 1,
    "timestamp": 1598344118945476590,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565112,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "workflow.sanity"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk0MzcyMTU3NwoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 540,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "0c055d5f-3fa4-43d8-b9bd-cebba0de85d9",
      "identity": "80@compute6823-dca1@",
      "firstExecutionRunId": "0c055d5f-3fa4-43d8-b9bd-cebba0de85d9",
      "attempt": 0,
      "cronSchedule": "",
      "firstDecisionTaskBackoffSeconds": 0,
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 2,
    "timestamp": 1598344118945490151,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565113,
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
    "timestamp": 1598344118962156930,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565118,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "25875953-7648-453c-8bea-c036c1eb0c3e"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1598344118970167356,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565121,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1598344118970277543,
    "eventType": "MarkerRecorded",
    "version": -24,
    "taskId": 980565122,
    "markerRecordedEventAttributes": {
      "markerName": "Version",
      "details": "ImluaXRpYWwgdmVyc2lvbiIKMwo=",
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1598344118970406531,
    "eventType": "UpsertWorkflowSearchAttributes",
    "version": -24,
    "taskId": 980565123,
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
    "timestamp": 1598344118970415047,
    "eventType": "MarkerRecorded",
    "version": -24,
    "taskId": 980565124,
    "markerRecordedEventAttributes": {
      "markerName": "SideEffect",
      "details": "MAoiV3lKM2IzSnJabXh2ZHk1bFkyaHZJaXdpZDI5eWEyWnNiM2N1YzJsbmJtRnNJaXdpZDI5eWEyWnNiM2N1ZG1semFXSnBiR2wwZVNJc0luZHZjbXRtYkc5M0xuTmxZWEpqYUVGMGRISnBZblYwWlhNaUxDSjNiM0pyWm14dmR5NWpiMjVqZFhKeVpXNTBMV1Y0WldOMWRHbHZiaUlzSW5kdmNtdG1iRzkzTG5GMVpYSjVJaXdpZDI5eWEyWnNiM2N1ZEdsdFpXOTFkQ0lzSW5kdmNtdG1iRzkzTG14dlkyRnNZV04wYVhacGRIa2lMQ0ozYjNKclpteHZkeTVqWVc1alpXeHNZWFJwYjI0aUxDSjNiM0pyWm14dmR5NXlaWFJ5ZVNJc0luZHZjbXRtYkc5M0xuSmxjMlYwSWl3aWQyOXlhMlpzYjNjdVlYSmphR2wyWVd3dWFHbHpkRzl5ZVNJc0luZHZjbXRtYkc5M0xtRnlZMmhwZG1Gc0xuWnBjMmxpYVd4cGRIa2lYUW89Igo=",
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 8,
    "timestamp": 1598344118970442023,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565125,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.echo",
      "workflowType": {
        "name": "workflow.echo"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 9,
    "timestamp": 1598344118970466839,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565126,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.signal",
      "workflowType": {
        "name": "workflow.signal"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 10,
    "timestamp": 1598344118970490724,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565127,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.visibility",
      "workflowType": {
        "name": "workflow.visibility"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 11,
    "timestamp": 1598344118970513960,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565128,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.searchAttributes",
      "workflowType": {
        "name": "workflow.searchAttributes"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 12,
    "timestamp": 1598344118970536606,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565129,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.concurrent-execution",
      "workflowType": {
        "name": "workflow.concurrent-execution"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 13,
    "timestamp": 1598344118970556540,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565130,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.query",
      "workflowType": {
        "name": "workflow.query"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 14,
    "timestamp": 1598344118970587092,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565131,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.timeout",
      "workflowType": {
        "name": "workflow.timeout"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 15,
    "timestamp": 1598344118970622007,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565132,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.localactivity",
      "workflowType": {
        "name": "workflow.localactivity"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 16,
    "timestamp": 1598344118970642574,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565133,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.cancellation",
      "workflowType": {
        "name": "workflow.cancellation"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 17,
    "timestamp": 1598344118970664164,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565134,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.retry",
      "workflowType": {
        "name": "workflow.retry"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 18,
    "timestamp": 1598344118970684410,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565135,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.reset",
      "workflowType": {
        "name": "workflow.reset"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 19,
    "timestamp": 1598344118970723423,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565136,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.archival.history",
      "workflowType": {
        "name": "workflow.archival.history"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 20,
    "timestamp": 1598344118970742424,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 980565137,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "cadence-canary",
      "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.archival.visibility",
      "workflowType": {
        "name": "workflow.archival.visibility"
      },
      "taskList": {
        "name": "canary-task-queue"
      },
      "input": "MTU5ODM0NDExODk2MjE1NjkzMAoiY2FkZW5jZS1jYW5hcnkiCg==",
      "executionStartToCloseTimeoutSeconds": 360,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "ABANDON",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicate",
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 21,
    "timestamp": 1598344118992658405,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565154,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 11,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.searchAttributes",
        "runId": "c86b0cb0-fedc-405e-8793-21d1e87f8c09"
      },
      "workflowType": {
        "name": "workflow.searchAttributes"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 22,
    "timestamp": 1598344118992709899,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565156,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 23,
    "timestamp": 1598344119029393580,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565160,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 15,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.localactivity",
        "runId": "5c381c80-414e-4b5e-b4d4-d29b31d719b1"
      },
      "workflowType": {
        "name": "workflow.localactivity"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 24,
    "timestamp": 1598344119059320664,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565162,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 12,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.concurrent-execution",
        "runId": "bd0fb71b-1db2-4d72-a043-861f654fe87d"
      },
      "workflowType": {
        "name": "workflow.concurrent-execution"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 25,
    "timestamp": 1598344119081488153,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565164,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 13,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.query",
        "runId": "8e6e7bf7-a39a-42f2-a53b-633fb45d6d8c"
      },
      "workflowType": {
        "name": "workflow.query"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 26,
    "timestamp": 1598344119104213973,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565166,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 14,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.timeout",
        "runId": "a3049eda-d92d-44da-942a-9b22b341d725"
      },
      "workflowType": {
        "name": "workflow.timeout"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 27,
    "timestamp": 1598344119204870730,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565168,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 17,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.retry",
        "runId": "d0ee18b6-c5e4-47c8-9996-c4826bdc9d8c"
      },
      "workflowType": {
        "name": "workflow.retry"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 28,
    "timestamp": 1598344119242675602,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565170,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 8,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.echo",
        "runId": "e752beaa-8732-4867-b6e6-7196e922b8b3"
      },
      "workflowType": {
        "name": "workflow.echo"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 29,
    "timestamp": 1598344119278951124,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565172,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 16,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.cancellation",
        "runId": "7a8d152a-29a5-47de-a132-5c38ab30378e"
      },
      "workflowType": {
        "name": "workflow.cancellation"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 30,
    "timestamp": 1598344119292392945,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565174,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 9,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.signal",
        "runId": "6ff963d8-061f-4910-8847-5809b3891e2b"
      },
      "workflowType": {
        "name": "workflow.signal"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 31,
    "timestamp": 1598344119316140016,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565176,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 10,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.visibility",
        "runId": "c5bafcf6-af89-4ce6-bd04-7fe981fad873"
      },
      "workflowType": {
        "name": "workflow.visibility"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 32,
    "timestamp": 1598344119347338484,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565178,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 18,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.reset",
        "runId": "4adcd05f-0c98-4d4c-b864-66fe35a21167"
      },
      "workflowType": {
        "name": "workflow.reset"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 33,
    "timestamp": 1598344119391030742,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565180,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 19,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.archival.history",
        "runId": "bab6e715-4329-43fc-8f40-e726077ae2cf"
      },
      "workflowType": {
        "name": "workflow.archival.history"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 34,
    "timestamp": 1598344119415853141,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 980565182,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "cadence-canary",
      "initiatedEventId": 20,
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.archival.visibility",
        "runId": "666e35ed-7ed3-489e-9094-b05c7e018105"
      },
      "workflowType": {
        "name": "workflow.archival.visibility"
      },
      "header": {
        "fields": {
          "uber-trace-id": "NDc1YTY4YmRhYThiMTRkMDo1ZjI5ZmRiNDM2NDAyOWFiOjQ3NWE2OGJkYWE4YjE0ZDA6MA=="
        }
      }
    }
  },
  {
    "eventId": 35,
    "timestamp": 1598344119424478107,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565184,
    "childWorkflowExecutionCompletedEventAttributes": {
      "result": "ImRhdGElMyA9PSAwIgo=",
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.localactivity",
        "runId": "5c381c80-414e-4b5e-b4d4-d29b31d719b1"
      },
      "workflowType": {
        "name": "workflow.localactivity"
      },
      "initiatedEventId": 15,
      "startedEventId": 23
    }
  },
  {
    "eventId": 36,
    "timestamp": 1598344119428373285,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565186,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.echo",
        "runId": "e752beaa-8732-4867-b6e6-7196e922b8b3"
      },
      "workflowType": {
        "name": "workflow.echo"
      },
      "initiatedEventId": 8,
      "startedEventId": 28
    }
  },
  {
    "eventId": 37,
    "timestamp": 1598344119432178581,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565188,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.query",
        "runId": "8e6e7bf7-a39a-42f2-a53b-633fb45d6d8c"
      },
      "workflowType": {
        "name": "workflow.query"
      },
      "initiatedEventId": 13,
      "startedEventId": 25
    }
  },
  {
    "eventId": 38,
    "timestamp": 1598344119435828719,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565190,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 22,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "50655fea-a040-4de4-8c44-a31afb841ce9"
    }
  },
  {
    "eventId": 39,
    "timestamp": 1598344119443947892,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565193,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 22,
      "startedEventId": 38,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 40,
    "timestamp": 1598344119529068099,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565195,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.archival.visibility",
        "runId": "666e35ed-7ed3-489e-9094-b05c7e018105"
      },
      "workflowType": {
        "name": "workflow.archival.visibility"
      },
      "initiatedEventId": 20,
      "startedEventId": 34
    }
  },
  {
    "eventId": 41,
    "timestamp": 1598344119529094229,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565197,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 42,
    "timestamp": 1598344119536185731,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565201,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 41,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "d1a1b822-848b-4c47-8f5f-be1ae23e7614"
    }
  },
  {
    "eventId": 43,
    "timestamp": 1598344119542805719,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565204,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 41,
      "startedEventId": 42,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 44,
    "timestamp": 1598344119670513483,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565206,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.signal",
        "runId": "6ff963d8-061f-4910-8847-5809b3891e2b"
      },
      "workflowType": {
        "name": "workflow.signal"
      },
      "initiatedEventId": 9,
      "startedEventId": 30
    }
  },
  {
    "eventId": 45,
    "timestamp": 1598344119670545866,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565208,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 46,
    "timestamp": 1598344119687476225,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565212,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 45,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "6f5f1176-a292-4277-98c4-4325218e1353"
    }
  },
  {
    "eventId": 47,
    "timestamp": 1598344119706728672,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565215,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 45,
      "startedEventId": 46,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 48,
    "timestamp": 1598344120167620842,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565217,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.timeout",
        "runId": "a3049eda-d92d-44da-942a-9b22b341d725"
      },
      "workflowType": {
        "name": "workflow.timeout"
      },
      "initiatedEventId": 14,
      "startedEventId": 26
    }
  },
  {
    "eventId": 49,
    "timestamp": 1598344120167664811,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565219,
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
    "timestamp": 1598344120187745339,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565223,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 49,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "1de17720-bfa7-40f7-92fb-2082a8855cac"
    }
  },
  {
    "eventId": 51,
    "timestamp": 1598344120199239493,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565226,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 49,
      "startedEventId": 50,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 52,
    "timestamp": 1598344121067843376,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565228,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.cancellation",
        "runId": "7a8d152a-29a5-47de-a132-5c38ab30378e"
      },
      "workflowType": {
        "name": "workflow.cancellation"
      },
      "initiatedEventId": 16,
      "startedEventId": 29
    }
  },
  {
    "eventId": 53,
    "timestamp": 1598344121067903980,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565230,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 54,
    "timestamp": 1598344121138672598,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565234,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 53,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "5bd48660-3eb9-4dee-a43a-07c4f407a3fd"
    }
  },
  {
    "eventId": 55,
    "timestamp": 1598344121146027988,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565237,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 53,
      "startedEventId": 54,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 56,
    "timestamp": 1598344121449667184,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565239,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.visibility",
        "runId": "c5bafcf6-af89-4ce6-bd04-7fe981fad873"
      },
      "workflowType": {
        "name": "workflow.visibility"
      },
      "initiatedEventId": 10,
      "startedEventId": 31
    }
  },
  {
    "eventId": 57,
    "timestamp": 1598344121449701966,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565241,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 58,
    "timestamp": 1598344121468165537,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565245,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.concurrent-execution",
        "runId": "bd0fb71b-1db2-4d72-a043-861f654fe87d"
      },
      "workflowType": {
        "name": "workflow.concurrent-execution"
      },
      "initiatedEventId": 12,
      "startedEventId": 24
    }
  },
  {
    "eventId": 59,
    "timestamp": 1598344121481946935,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565247,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 57,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "040e1d7f-bff7-4d41-a432-16d8b472b6e8"
    }
  },
  {
    "eventId": 60,
    "timestamp": 1598344121490071749,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565250,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 57,
      "startedEventId": 59,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 61,
    "timestamp": 1598344124864673098,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565287,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.archival.history",
        "runId": "bab6e715-4329-43fc-8f40-e726077ae2cf"
      },
      "workflowType": {
        "name": "workflow.archival.history"
      },
      "initiatedEventId": 19,
      "startedEventId": 33
    }
  },
  {
    "eventId": 62,
    "timestamp": 1598344124864710481,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565289,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 63,
    "timestamp": 1598344124883000993,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565293,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 62,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "08e79ee8-89d8-4e6c-941e-84f5c06dcd40"
    }
  },
  {
    "eventId": 64,
    "timestamp": 1598344124890251261,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565296,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 62,
      "startedEventId": 63,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 65,
    "timestamp": 1598344149428976741,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565323,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.searchAttributes",
        "runId": "c86b0cb0-fedc-405e-8793-21d1e87f8c09"
      },
      "workflowType": {
        "name": "workflow.searchAttributes"
      },
      "initiatedEventId": 11,
      "startedEventId": 21
    }
  },
  {
    "eventId": 66,
    "timestamp": 1598344149429050105,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565325,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 67,
    "timestamp": 1598344149492987089,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565329,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 66,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "5bf15dc7-0103-4a93-adeb-1680cf85e957"
    }
  },
  {
    "eventId": 68,
    "timestamp": 1598344149500697780,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565332,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 66,
      "startedEventId": 67,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 69,
    "timestamp": 1598344149544346606,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565334,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.retry",
        "runId": "d0ee18b6-c5e4-47c8-9996-c4826bdc9d8c"
      },
      "workflowType": {
        "name": "workflow.retry"
      },
      "initiatedEventId": 17,
      "startedEventId": 27
    }
  },
  {
    "eventId": 70,
    "timestamp": 1598344149544413288,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565336,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 71,
    "timestamp": 1598344149551685398,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565340,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 70,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "620f7563-04fd-4320-b7d6-3714bff80416"
    }
  },
  {
    "eventId": 72,
    "timestamp": 1598344149559533672,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565343,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 70,
      "startedEventId": 71,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 73,
    "timestamp": 1598344181735245017,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565351,
    "childWorkflowExecutionCompletedEventAttributes": {
      "domain": "cadence-canary",
      "workflowExecution": {
        "workflowId": "cadence.canary.cron-workflow.sanity-2020-08-25T08:28:38Z/workflow.reset",
        "runId": "4adcd05f-0c98-4d4c-b864-66fe35a21167"
      },
      "workflowType": {
        "name": "workflow.reset"
      },
      "initiatedEventId": 18,
      "startedEventId": 32
    }
  },
  {
    "eventId": 74,
    "timestamp": 1598344181735310002,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 980565353,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "compute6391-dca1:cdb2f1f9-fd78-4b1b-a303-3f74aaad7039"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 75,
    "timestamp": 1598344181742893038,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 980565357,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 74,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "requestId": "f074ee86-49f3-4ce2-9a5a-8017d27b1eb1"
    }
  },
  {
    "eventId": 76,
    "timestamp": 1598344181749836740,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 980565360,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 74,
      "startedEventId": 75,
      "identity": "81@compute6391-dca1@canary-task-queue",
      "binaryChecksum": "uDeploy:16c57db5e5e76fa33b6591d3f402a224e341d48c"
    }
  },
  {
    "eventId": 77,
    "timestamp": 1598344181749990695,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 980565361,
    "workflowExecutionCompletedEventAttributes": {
      "decisionTaskCompletedEventId": 76
    }
  }
]