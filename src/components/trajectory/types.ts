export type TrajectoryCellKind =
  | "system"
  | "user"
  | "context"
  | "compacted"
  | "assistant"
  | "tool"
  | "subtool"

export type TrajectoryStatus = "complete" | "running" | "error"

export interface AssistantTimingMetrics {
  stepStartTime: number
  firstTokenTime: number | null
  completedTime: number | null
  ttftMs?: number
  decodingMs?: number
  throughputToksPerSec?: number
}

export interface TrajectoryTokenUsage {
  input?: number
  cacheRead?: number
  cacheWrite?: number
  output?: number
  reasoning?: number
  total?: number
}

export interface ToolOutputBlock {
  type: "text" | "json" | "image" | "diff" | "file"
  content?: string
  imageSrc?: string
  diffBefore?: string
  diffAfter?: string
  filePath?: string
  language?: string
}

export interface TrajectoryEvent {
  id: number
  turn: number
  step: number
  group: string // e.g. "Step 1", "Step 2", "Message"
  kind: TrajectoryCellKind
  role: string
  title: string
  content: string
  rawContent?: string
  thinkingContent?: string
  toolName?: string
  toolArgs?: Record<string, any>
  toolArgsRaw?: string
  toolResult?: any
  toolResultRaw?: string
  toolSchema?: {
    name: string
    description: string
    parameters: Record<string, any>
  }
  outputBlocks?: ToolOutputBlock[]
  status: TrajectoryStatus
  isError?: boolean
  errorMessage?: string
  startedAt: number
  completedAt: number | null
  durationMs?: number
  usage?: TrajectoryTokenUsage
  timing?: AssistantTimingMetrics
  requestId?: number
  parentAssistantId?: number
  parentToolId?: number
  promptDetail?: {
    system: string
    tools: Array<{ name: string; description: string; parameters: any }>
  }
  previousPromptDetail?: {
    system: string
    tools: Array<{ name: string; description: string; parameters: any }>
  }
}

export interface TrajectoryRequest {
  id: number
  turn: number
  step: number
  group: string
  requestNumber: number
  purpose?: "assistant" | "compaction"
  status: TrajectoryStatus
  startedAt: number
  completedAt: number | null
  durationMs?: number
  error?: string
  retry?: number
  maxRetries?: number
  retryDelayMs?: number
  provider: string
  model: string
  requestConfig?: {
    provider?: string
    model?: string
    temperature?: number
    topP?: number
    maxTokens?: number
    stream?: boolean
    stopSequences?: string[]
  }
  usage?: TrajectoryTokenUsage
  cumulativeUsage?: TrajectoryTokenUsage
  resultEventId?: number
  toolCallsCount?: number
  subtoolCallsCount?: number
}

export interface TrajectoryMetrics {
  durationMs: number
  turnsCount: number
  toolCallsCount: number
  totalTokens: number
  promptTokens: number
  completionTokens: number
  reasoningTokens: number
  avgTtftMs: number
  avgThroughput: number
}

export interface TimelineSpan {
  id: number
  eventId: number
  turn: number
  step: number
  kind: TrajectoryCellKind
  lane: "Input" | "Model" | "Tools"
  startMs: number
  durationMs: number
  endMs: number
  ttftMs?: number
  decodingMs?: number
  label: string
  isError?: boolean
  status: TrajectoryStatus
}

export interface TrajectoryTimeRange {
  startMs: number
  endMs: number
}
