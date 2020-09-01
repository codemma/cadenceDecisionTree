module.exports = [
  {
    "eventId": 1,
    "timestamp": 1597157957589742900,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048676,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      },
      "parentWorkflowDomain": "sample",
      "parentWorkflowExecution": {
        "workflowId": "1f711fa3-e8e6-446d-934f-4da119a866b7",
        "runId": "af79ac01-95b4-4f86-9d9e-97aa7a0faad2"
      },
      "parentInitiatedEventId": 5,
      "taskList": {
        "name": "HelloChild"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "executionStartToCloseTimeoutSeconds": 10,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "c18c7335-94e9-4d05-ac7f-06292af3b92c",
      "identity": "",
      "firstExecutionRunId": "c18c7335-94e9-4d05-ac7f-06292af3b92c",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1597157957622842800,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048680,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloChild"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1597157957639735700,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048683,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "18749@etysk-C02ZH2TXLVDQ",
      "requestId": "c579ce3c-2b4d-46b2-be89-7617758b274c"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1597157957674484900,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048686,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "18749@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1597157957674583300,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1048687,
    "workflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "decisionTaskCompletedEventId": 4
    }
  }
]