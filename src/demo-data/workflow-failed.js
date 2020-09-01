module.exports = [
  {
    "eventId": 1,
    "timestamp": 1597216317934668700,
    "eventType": "WorkflowExecutionStarted",
    "version": -24,
    "taskId": 1056735,
    "workflowExecutionStartedEventAttributes": {
      "workflowType": {
        "name": "GreetingChild::composeGreeting"
      },
      "parentWorkflowDomain": "sample",
      "parentWorkflowExecution": {
        "workflowId": "b082921f-ef7a-4b7a-aac6-6502306b8ad4",
        "runId": "afc9e3d9-cba6-4df1-b212-919c34addf5b"
      },
      "parentInitiatedEventId": 5,
      "taskList": {
        "name": "HelloException"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "executionStartToCloseTimeoutSeconds": 30,
      "taskStartToCloseTimeoutSeconds": 10,
      "originalExecutionRunId": "b2d0a9ee-a047-4102-9c95-097093d779ad",
      "identity": "",
      "firstExecutionRunId": "b2d0a9ee-a047-4102-9c95-097093d779ad",
      "attempt": 0,
      "firstDecisionTaskBackoffSeconds": 0
    }
  },
  {
    "eventId": 2,
    "timestamp": 1597216317956798700,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1056739,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "HelloException"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 3,
    "timestamp": 1597216317968350200,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1056742,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 2,
      "identity": "42111@etysk-C02ZH2TXLVDQ",
      "requestId": "10e22432-a3d9-46aa-8f07-796a51cca50c"
    }
  },
  {
    "eventId": 4,
    "timestamp": 1597216317993644100,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1056745,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 2,
      "startedEventId": 3,
      "identity": "42111@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 5,
    "timestamp": 1597216317993686100,
    "eventType": "ActivityTaskScheduled",
    "version": -24,
    "taskId": 1056746,
    "activityTaskScheduledEventAttributes": {
      "activityId": "0",
      "activityType": {
        "name": "GreetingActivities::composeGreeting"
      },
      "taskList": {
        "name": "HelloException"
      },
      "input": "WyJIZWxsbyIsIldvcmxkIl0=",
      "scheduleToCloseTimeoutSeconds": 10,
      "scheduleToStartTimeoutSeconds": 10,
      "startToCloseTimeoutSeconds": 10,
      "heartbeatTimeoutSeconds": 10,
      "decisionTaskCompletedEventId": 4
    }
  },
  {
    "eventId": 6,
    "timestamp": 1597216318005501000,
    "eventType": "ActivityTaskStarted",
    "version": -24,
    "taskId": 1056750,
    "activityTaskStartedEventAttributes": {
      "scheduledEventId": 5,
      "identity": "42111@etysk-C02ZH2TXLVDQ",
      "requestId": "9c768bde-c1fd-4011-bc86-30ca18596817",
      "attempt": 0,
      "lastFailureReason": ""
    }
  },
  {
    "eventId": 7,
    "timestamp": 1597216318039779700,
    "eventType": "ActivityTaskFailed",
    "version": -24,
    "taskId": 1056753,
    "activityTaskFailedEventAttributes": {
      "reason": "java.io.IOException",
      "details": "eyJkZXRhaWxNZXNzYWdlIjoiSGVsbG8gV29ybGQhIiwic3RhY2tUcmFjZSI6ImNvbS51YmVyLmNhZGVuY2Uuc2FtcGxlcy5oZWxsby5IZWxsb0V4Y2VwdGlvbiRHcmVldGluZ0FjdGl2aXRpZXNJbXBsLmNvbXBvc2VHcmVldGluZyhIZWxsb0V4Y2VwdGlvbi5qYXZhOjE1MSlcbnN1bi5yZWZsZWN0Lk5hdGl2ZU1ldGhvZEFjY2Vzc29ySW1wbC5pbnZva2UwKE5hdGl2ZSBNZXRob2QpXG5zdW4ucmVmbGVjdC5OYXRpdmVNZXRob2RBY2Nlc3NvckltcGwuaW52b2tlKE5hdGl2ZU1ldGhvZEFjY2Vzc29ySW1wbC5qYXZhOjYyKVxuc3VuLnJlZmxlY3QuRGVsZWdhdGluZ01ldGhvZEFjY2Vzc29ySW1wbC5pbnZva2UoRGVsZWdhdGluZ01ldGhvZEFjY2Vzc29ySW1wbC5qYXZhOjQzKVxuamF2YS5sYW5nLnJlZmxlY3QuTWV0aG9kLmludm9rZShNZXRob2QuamF2YTo0OTgpXG5jb20udWJlci5jYWRlbmNlLmludGVybmFsLnN5bmMuUE9KT0FjdGl2aXR5VGFza0hhbmRsZXIkUE9KT0FjdGl2aXR5SW1wbGVtZW50YXRpb24uZXhlY3V0ZShQT0pPQWN0aXZpdHlUYXNrSGFuZGxlci5qYXZhOjIxNClcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwuc3luYy5QT0pPQWN0aXZpdHlUYXNrSGFuZGxlci5oYW5kbGUoUE9KT0FjdGl2aXR5VGFza0hhbmRsZXIuamF2YToxOTApXG5jb20udWJlci5jYWRlbmNlLmludGVybmFsLndvcmtlci5BY3Rpdml0eVdvcmtlciRUYXNrSGFuZGxlckltcGwuaGFuZGxlKEFjdGl2aXR5V29ya2VyLmphdmE6MTc1KVxuY29tLnViZXIuY2FkZW5jZS5pbnRlcm5hbC53b3JrZXIuQWN0aXZpdHlXb3JrZXIkVGFza0hhbmRsZXJJbXBsLmhhbmRsZShBY3Rpdml0eVdvcmtlci5qYXZhOjE0NilcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwud29ya2VyLlBvbGxUYXNrRXhlY3V0b3IubGFtYmRhJHByb2Nlc3MkMChQb2xsVGFza0V4ZWN1dG9yLmphdmE6NzEpXG5qYXZhLnV0aWwuY29uY3VycmVudC5UaHJlYWRQb29sRXhlY3V0b3IucnVuV29ya2VyKFRocmVhZFBvb2xFeGVjdXRvci5qYXZhOjExNDkpXG5qYXZhLnV0aWwuY29uY3VycmVudC5UaHJlYWRQb29sRXhlY3V0b3IkV29ya2VyLnJ1bihUaHJlYWRQb29sRXhlY3V0b3IuamF2YTo2MjQpXG5qYXZhLmxhbmcuVGhyZWFkLnJ1bihUaHJlYWQuamF2YTo3NDgpXG4iLCJzdXBwcmVzc2VkRXhjZXB0aW9ucyI6W10sImNsYXNzIjoiamF2YS5pby5JT0V4Y2VwdGlvbiJ9",
      "scheduledEventId": 5,
      "startedEventId": 6,
      "identity": "42111@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 8,
    "timestamp": 1597216318039834300,
    "eventType": "DecisionTaskScheduled",
    "version": -24,
    "taskId": 1056755,
    "decisionTaskScheduledEventAttributes": {
      "taskList": {
        "name": "etysk-C02ZH2TXLVDQ:39a3d355-bcbc-4dfe-884d-d8df3ee223ca"
      },
      "startToCloseTimeoutSeconds": 10,
      "attempt": 0
    }
  },
  {
    "eventId": 9,
    "timestamp": 1597216318054001700,
    "eventType": "DecisionTaskStarted",
    "version": -24,
    "taskId": 1056759,
    "decisionTaskStartedEventAttributes": {
      "scheduledEventId": 8,
      "identity": "39a3d355-bcbc-4dfe-884d-d8df3ee223ca",
      "requestId": "7812625c-aaa0-4626-b503-6ea198270527"
    }
  },
  {
    "eventId": 10,
    "timestamp": 1597216318088693200,
    "eventType": "DecisionTaskCompleted",
    "version": -24,
    "taskId": 1056762,
    "decisionTaskCompletedEventAttributes": {
      "scheduledEventId": 8,
      "startedEventId": 9,
      "identity": "42111@etysk-C02ZH2TXLVDQ"
    }
  },
  {
    "eventId": 11,
    "timestamp": 1597216318088750800,
    "eventType": "WorkflowExecutionFailed",
    "version": -24,
    "taskId": 1056763,
    "workflowExecutionFailedEventAttributes": {
      "reason": "com.uber.cadence.workflow.ActivityFailureException",
      "details": "eyJhdHRlbXB0IjowLCJiYWNrb2ZmIjpudWxsLCJhY3Rpdml0eVR5cGUiOiJ7XCIxMFwiOntcInN0clwiOlwiR3JlZXRpbmdBY3Rpdml0aWVzOjpjb21wb3NlR3JlZXRpbmdcIn19IiwiYWN0aXZpdHlJZCI6bnVsbCwiZXZlbnRJZCI6NywiZGV0YWlsTWVzc2FnZSI6IkFjdGl2aXR5RmFpbHVyZUV4Y2VwdGlvbiwgQWN0aXZpdHlUeXBlXHUwMDNkXCJHcmVldGluZ0FjdGl2aXRpZXM6OmNvbXBvc2VHcmVldGluZ1wiLCBBY3Rpdml0eUlEXHUwMDNkXCJudWxsXCIsIEV2ZW50SURcdTAwM2Q3IiwiY2F1c2UiOnsiZGV0YWlsTWVzc2FnZSI6IkhlbGxvIFdvcmxkISIsInN0YWNrVHJhY2UiOiJjb20udWJlci5jYWRlbmNlLnNhbXBsZXMuaGVsbG8uSGVsbG9FeGNlcHRpb24kR3JlZXRpbmdBY3Rpdml0aWVzSW1wbC5jb21wb3NlR3JlZXRpbmcoSGVsbG9FeGNlcHRpb24uamF2YToxNTEpXG5zdW4ucmVmbGVjdC5OYXRpdmVNZXRob2RBY2Nlc3NvckltcGwuaW52b2tlMChOYXRpdmUgTWV0aG9kOjApXG5zdW4ucmVmbGVjdC5OYXRpdmVNZXRob2RBY2Nlc3NvckltcGwuaW52b2tlKE5hdGl2ZU1ldGhvZEFjY2Vzc29ySW1wbC5qYXZhOjYyKVxuc3VuLnJlZmxlY3QuRGVsZWdhdGluZ01ldGhvZEFjY2Vzc29ySW1wbC5pbnZva2UoRGVsZWdhdGluZ01ldGhvZEFjY2Vzc29ySW1wbC5qYXZhOjQzKVxuamF2YS5sYW5nLnJlZmxlY3QuTWV0aG9kLmludm9rZShNZXRob2QuamF2YTo0OTgpXG5jb20udWJlci5jYWRlbmNlLmludGVybmFsLnN5bmMuUE9KT0FjdGl2aXR5VGFza0hhbmRsZXIkUE9KT0FjdGl2aXR5SW1wbGVtZW50YXRpb24uZXhlY3V0ZShQT0pPQWN0aXZpdHlUYXNrSGFuZGxlci5qYXZhOjIxNClcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwuc3luYy5QT0pPQWN0aXZpdHlUYXNrSGFuZGxlci5oYW5kbGUoUE9KT0FjdGl2aXR5VGFza0hhbmRsZXIuamF2YToxOTApXG5jb20udWJlci5jYWRlbmNlLmludGVybmFsLndvcmtlci5BY3Rpdml0eVdvcmtlciRUYXNrSGFuZGxlckltcGwuaGFuZGxlKEFjdGl2aXR5V29ya2VyLmphdmE6MTc1KVxuY29tLnViZXIuY2FkZW5jZS5pbnRlcm5hbC53b3JrZXIuQWN0aXZpdHlXb3JrZXIkVGFza0hhbmRsZXJJbXBsLmhhbmRsZShBY3Rpdml0eVdvcmtlci5qYXZhOjE0NilcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwud29ya2VyLlBvbGxUYXNrRXhlY3V0b3IubGFtYmRhJHByb2Nlc3MkMChQb2xsVGFza0V4ZWN1dG9yLmphdmE6NzEpXG5qYXZhLnV0aWwuY29uY3VycmVudC5UaHJlYWRQb29sRXhlY3V0b3IucnVuV29ya2VyKFRocmVhZFBvb2xFeGVjdXRvci5qYXZhOjExNDkpXG5qYXZhLnV0aWwuY29uY3VycmVudC5UaHJlYWRQb29sRXhlY3V0b3IkV29ya2VyLnJ1bihUaHJlYWRQb29sRXhlY3V0b3IuamF2YTo2MjQpXG5qYXZhLmxhbmcuVGhyZWFkLnJ1bihUaHJlYWQuamF2YTo3NDgpXG4iLCJzdXBwcmVzc2VkRXhjZXB0aW9ucyI6W10sImNsYXNzIjoiamF2YS5pby5JT0V4Y2VwdGlvbiJ9LCJzdGFja1RyYWNlIjoiamF2YS5sYW5nLlRocmVhZC5nZXRTdGFja1RyYWNlKFRocmVhZC5qYXZhOjE1NTkpXG5jb20udWJlci5jYWRlbmNlLmludGVybmFsLnN5bmMuQWN0aXZpdHlTdHViQmFzZS5leGVjdXRlKEFjdGl2aXR5U3R1YkJhc2UuamF2YTo0NilcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwuc3luYy5BY3Rpdml0eVN0dWJJbXBsLmV4ZWN1dGUoQWN0aXZpdHlTdHViSW1wbC5qYXZhOjI2KVxuY29tLnViZXIuY2FkZW5jZS5pbnRlcm5hbC5zeW5jLkFjdGl2aXR5SW52b2NhdGlvbkhhbmRsZXIubGFtYmRhJGdldEFjdGl2aXR5RnVuYyQwKEFjdGl2aXR5SW52b2NhdGlvbkhhbmRsZXIuamF2YTo1MSlcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwuc3luYy5BY3Rpdml0eUludm9jYXRpb25IYW5kbGVyQmFzZS5pbnZva2UoQWN0aXZpdHlJbnZvY2F0aW9uSGFuZGxlckJhc2UuamF2YTo3NilcbmNvbS5zdW4ucHJveHkuJFByb3h5Ni5jb21wb3NlR3JlZXRpbmcoVW5rbm93biBTb3VyY2UpXG5jb20udWJlci5jYWRlbmNlLnNhbXBsZXMuaGVsbG8uSGVsbG9FeGNlcHRpb24kR3JlZXRpbmdDaGlsZEltcGwuY29tcG9zZUdyZWV0aW5nKEhlbGxvRXhjZXB0aW9uLmphdmE6MTQzKVxuc3VuLnJlZmxlY3QuTmF0aXZlTWV0aG9kQWNjZXNzb3JJbXBsLmludm9rZTAoTmF0aXZlIE1ldGhvZClcbnN1bi5yZWZsZWN0Lk5hdGl2ZU1ldGhvZEFjY2Vzc29ySW1wbC5pbnZva2UoTmF0aXZlTWV0aG9kQWNjZXNzb3JJbXBsLmphdmE6NjIpXG5zdW4ucmVmbGVjdC5EZWxlZ2F0aW5nTWV0aG9kQWNjZXNzb3JJbXBsLmludm9rZShEZWxlZ2F0aW5nTWV0aG9kQWNjZXNzb3JJbXBsLmphdmE6NDMpXG5qYXZhLmxhbmcucmVmbGVjdC5NZXRob2QuaW52b2tlKE1ldGhvZC5qYXZhOjQ5OClcbmNvbS51YmVyLmNhZGVuY2UuaW50ZXJuYWwuc3luYy5QT0pPV29ya2Zsb3dJbXBsZW1lbnRhdGlvbkZhY3RvcnkkUE9KT1dvcmtmbG93SW1wbGVtZW50YXRpb24uZXhlY3V0ZShQT0pPV29ya2Zsb3dJbXBsZW1lbnRhdGlvbkZhY3RvcnkuamF2YToyMzMpXG5jb20udWJlci5jYWRlbmNlLmludGVybmFsLnN5bmMuV29ya2Zsb3dSdW5uYWJsZS5ydW4oV29ya2Zsb3dSdW5uYWJsZS5qYXZhOjQ2KVxuY29tLnViZXIuY2FkZW5jZS5pbnRlcm5hbC5zeW5jLkNhbmNlbGxhdGlvblNjb3BlSW1wbC5ydW4oQ2FuY2VsbGF0aW9uU2NvcGVJbXBsLmphdmE6MTAyKVxuY29tLnViZXIuY2FkZW5jZS5pbnRlcm5hbC5zeW5jLldvcmtmbG93VGhyZWFkSW1wbCRSdW5uYWJsZVdyYXBwZXIucnVuKFdvcmtmbG93VGhyZWFkSW1wbC5qYXZhOjg1KVxuamF2YS51dGlsLmNvbmN1cnJlbnQuRXhlY3V0b3JzJFJ1bm5hYmxlQWRhcHRlci5jYWxsKEV4ZWN1dG9ycy5qYXZhOjUxMSlcbmphdmEudXRpbC5jb25jdXJyZW50LkZ1dHVyZVRhc2sucnVuKEZ1dHVyZVRhc2suamF2YToyNjYpXG5qYXZhLnV0aWwuY29uY3VycmVudC5UaHJlYWRQb29sRXhlY3V0b3IucnVuV29ya2VyKFRocmVhZFBvb2xFeGVjdXRvci5qYXZhOjExNDkpXG5qYXZhLnV0aWwuY29uY3VycmVudC5UaHJlYWRQb29sRXhlY3V0b3IkV29ya2VyLnJ1bihUaHJlYWRQb29sRXhlY3V0b3IuamF2YTo2MjQpXG5qYXZhLmxhbmcuVGhyZWFkLnJ1bihUaHJlYWQuamF2YTo3NDgpXG4iLCJzdXBwcmVzc2VkRXhjZXB0aW9ucyI6W10sImNsYXNzIjoiY29tLnViZXIuY2FkZW5jZS53b3JrZmxvdy5BY3Rpdml0eUZhaWx1cmVFeGNlcHRpb24ifQ==",
      "decisionTaskCompletedEventId": 10
    }
  }
]