module.exports = [
  {
    "eventId": 1,
    "timestamp": 1597157957384948100,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048576,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingWorkflow::getGreeting"
      },
      "taskList": {
        "name": "HelloChild"
      },
      "input": "IldvcmxkIg==",
      "executionStartToCloseTimeoutSeconds": 10,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "af79ac01-95b4-4f86-9d9e-97aa7a0faad2",
      "identity": "",
      "firstExecutionRunId": "af79ac01-95b4-4f86-9d9e-97aa7a0faad2",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1597157957385049000,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048577,
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
    "timestamp": 1597157957410848100,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048582,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "18749@etysk-C02ZH2TXLVDQ",
      "requestId": "2fce47b2-8883-474e-8fdf-1dc73606ea5c"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1597157957570062600,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048585,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "18749@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1597157957570192400,
    "eventType": "StartChildWorkflowExecutionInitiated",
    "version": -24,
    "taskId": 1048586,
    "startChildWorkflowExecutionInitiatedEventAttributes": {
      "domain": "sample",
      "workflowId": "577ee9e9-0079-35c9-a9c2-eee65a123577",
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      },
      "taskList": {
        "name": "HelloChild"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "executionStartToCloseTimeoutSeconds": 10,
      "taskStartToCloseTimeoutSeconds": 10,
      "parentClosePolicy": "TERMINATE",
      "decisionTaskCompletedEventId": 4,
      "workflowIdReusePolicy": "AllowDuplicateFailedOnly"
    }
  },
  {
    "eventId": 6,
    "timestamp": 1597157957601780900,
    "eventType": "ChildWorkflowExecutionStarted",
    "version": -24,
    "taskId": 1048589,
    "childWorkflowExecutionStartedEventAttributes": {
      "domain": "sample",
      "initiatedEventId": 5,
      "workflowExecution": {
        "workflowId": "577ee9e9-0079-35c9-a9c2-eee65a123577",
        "runId": "c18c7335-94e9-4d05-ac7f-06292af3b92c"
      },
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      }
    }
  },
  {
    "eventId": 7,
    "timestamp": 1597157957601840800,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048591,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:46d63d22-0e61-4d38-a3a8-e9f25ed701db"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 8,
    "timestamp": 1597157957637537900,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048595,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 7,
      "identity": "46d63d22-0e61-4d38-a3a8-e9f25ed701db",
      "requestId": "0546eca5-3e2f-4005-acc9-c9efdfecf30e"
    }
  },
  {
    "eventId": 9,
    "timestamp": 1597157957679041900,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048598,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 7,
      "startedEventId": 8,
      "identity": "18749@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1597157957702733800,
    "eventType": "ChildWorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1048600,
    "childWorkflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "domain": "sample",
      "workflowExecution": {
        "workflowId": "577ee9e9-0079-35c9-a9c2-eee65a123577",
        "runId": "c18c7335-94e9-4d05-ac7f-06292af3b92c"
      },
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      },
      "initiatedEventId": 5,
      "startedEventId": 6
    }
  },
  {
    "eventId": 11,
    "timestamp": 1597157957702799700,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1048602,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:46d63d22-0e61-4d38-a3a8-e9f25ed701db"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 12,
    "timestamp": 1597157957727458100,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1048606,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 11,
      "identity": "46d63d22-0e61-4d38-a3a8-e9f25ed701db",
      "requestId": "d11170ca-8d76-4058-9390-c36c5fae16a5"
    }
  },
  {
    "eventId": 13,
    "timestamp": 1597157957755341800,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1048609,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 11,
      "startedEventId": 12,
      "identity": "18749@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 14,
    "timestamp": 1597157957755398000,
    "eventType": "WorkflowExecutionCompleted",
    "version": -24,
    "taskId": 1048610,
    "workflowExecutionCompletedEventAttributes": {
      "result": "IkhlbGxvIFdvcmxkISI=",
      "decisionTaskCompletedEventId": 13
    }
  }
]