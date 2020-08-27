module.exports = [
  {
    "eventId": 1,
    "timestamp": 1597312631648600400,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1107648,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::createGreeting"
      },
      "taskList": {
        "name": "HelloQuery"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 30,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "307e3984-adfc-4953-a239-1c6ae827ace7",
      "identity": "",
      "firstExecutionRunId": "307e3984-adfc-4953-a239-1c6ae827ace7",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1597312631648711800,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1107649,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloQuery"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1597312631670985600,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1107654,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "48085@etysk-C02ZH2TXLVDQ",
      "requestId": "553002fa-04b5-47e0-abdf-08f8e4b95e9e"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1597312631819901000,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1107657,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "48085@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1597312631819927000,
    "eventType": "TimerStarted",
    "version": -24,
    "taskId": 1107658,
    "timerStartedEventAttributes": {
      "timerId": "0",
      "startToFireTimeoutSeconds": 2,
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1597312633828932400,
    "eventType": "TimerFired",
    "version": -24,
    "taskId": 1107661,
    "timerFiredEventAttributes": {
      "timerId": "0",
      "startedEventId": 5
    }
  },
  {
    "eventId": 7,
    "timestamp": 1597312633829005000,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1107663,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:9ef5b233-83c6-439f-87dc-e83d57f0d030"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 8,
    "timestamp": 1597312633842299000,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1107667,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 7,
      "identity": "9ef5b233-83c6-439f-87dc-e83d57f0d030",
      "requestId": "9f3f01da-0327-40a7-a160-b168843811e6"
    }
  },
  {
    "eventId": 9,
    "timestamp": 1597312633868331300,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1107670,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 7,
      "startedEventId": 8,
      "identity": "48085@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1597312633868375400,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1107671,
    "workflowExecutionCompletedEventAttributes": {
      "result": "",
      "decisionTaskCompletedEventId": 9
    }
  }
]