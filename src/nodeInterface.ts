interface nodeInfo {
  parent?: number;
  inferredChild?: number;
  chronologicalChild?: number;
  chronologicalParent?: number;
  inferredParents?: number[];
  clickInfo?: object;
  parentWorkflow?: object;
  status?: string
}

interface workflow {
  [index: number]: node
}

interface eventTypeMap {
  [key: string]: any;
}

interface node {
  eventType: string;
  eventId: number;
  [key: string]: any;
}

interface workflow extends Array<node> { }

export { nodeInfo, node, workflow, eventTypeMap };