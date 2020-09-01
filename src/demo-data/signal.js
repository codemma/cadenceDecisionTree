module.exports = [
  {
    "eventId": 1,
    "timestamp": 1597312379863689400,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1052920,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::getGreetings"
      },
      "taskList": {
        "name": "HelloSignal"
      },
      "executionStartToCloseTimeoutSeconds": 30,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "92dbaab3-00d6-4c43-bb51-53b3f0db22be",
      "identity": "",
      "firstExecutionRunId": "92dbaab3-00d6-4c43-bb51-53b3f0db22be",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1597312379863813700,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1052921,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloSignal"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1597312379890458600,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1052926,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "46238@etysk-C02ZH2TXLVDQ",
      "requestId": "623b6182-ba03-4483-ac7c-20e145bf625f"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1597312380025186200,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1052929,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "46238@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1597312379978019200,
    "eventType": "WorkflowExecutionSignaled",
    "version": -24,
    "taskId": 1052930,
    "workflowExecutionSignaledEventAttributes": {
      "signalName": "GreetingWorkflow::waitForName",
      "input": "IldvcmxkIg==",
      "identity": ""
    }
  },
  {
    "eventId": 6,
    "timestamp": 1597312379997140200,
    "eventType": "WorkflowExecutionSignaled",
    "version": -24,
    "taskId": 1052931,
    "workflowExecutionSignaledEventAttributes": {
      "signalName": "GreetingWorkflow::waitForName",
      "input": "IlVuaXZlcnNlIg==",
      "identity": ""
    }
  },
  {
    "eventId": 7,
    "timestamp": 1597312380013690500,
    "eventType": "WorkflowExecutionSignaled",
    "version": -24,
    "taskId": 1052932,
    "workflowExecutionSignaledEventAttributes": {
      "signalName": "GreetingWorkflow::exit",
      "identity": ""
    }
  },
  {
    "eventId": 8,
    "timestamp": 1597312380025264200,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1052937,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:54c26bdd-dabf-48bd-aaef-db43b1e98e57"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 9,
    "timestamp": 1597312380039140400,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1052941,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 8,
      "identity": "54c26bdd-dabf-48bd-aaef-db43b1e98e57",
      "requestId": "dce03f13-6a33-4b1e-b50d-755a729594ef"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1597312380080252500,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1052944,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 8,
      "startedEventId": 9,
      "identity": "46238@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1597312380080340100,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1052945,
    "workflowExecutionCompletedEventAttributes": {
      "result": "WyJIZWxsbyBXb3JsZCEiLCJIZWxsbyBVbml2ZXJzZSEiXQ==",
      "decisionTaskCompletedEventId": 10
    }
  }
]