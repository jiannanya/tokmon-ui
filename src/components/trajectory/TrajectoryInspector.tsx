import React, { useState } from "react"
import {
  X,
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  Activity,
} from "lucide-react"
import type {
  TrajectoryEvent,
  TrajectoryRequest,
} from "./types"

export interface TrajectoryInspectorProps {
  selectedEvent: TrajectoryEvent | null
  selectedRequest: TrajectoryRequest | null
  onClose: () => void
  onSelectEvent: (eventId: number) => void
  onSelectRequest: (requestId: number) => void
  allEvents: TrajectoryEvent[]
  allRequests: TrajectoryRequest[]
}

export const TrajectoryInspector: React.FC<TrajectoryInspectorProps> = ({
  selectedEvent,
  selectedRequest,
  onClose,
  onSelectEvent,
  onSelectRequest,
  allEvents,
  allRequests,
}) => {
  const [eventTab, setEventTab] = useState<
    "Summary" | "Payload" | "Result" | "Schema" | "Timing"
  >("Summary")

  const [requestTab, setRequestTab] = useState<
    "Summary" | "Options" | "Usage" | "Timing"
  >("Summary")

  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // Empty state
  if (!selectedEvent && !selectedRequest) {
    return (
      <div className="h-full bg-[#faf9f6]/40 p-4 text-center text-[#747f78] text-[11.5px] flex flex-col items-center justify-center select-none">
        <Activity className="w-6 h-6 text-[#949e97] mb-1.5 stroke-[1.5]" />
        <h4 className="font-semibold text-[#1a211c] mb-0.5">未选中记录</h4>
        <p className="text-[10.5px] max-w-[180px] text-[#949e97]">
          点击左侧事件或 LLM 请求圆钉可在此检视载荷与耗时。
        </p>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MODE 1: LLM REQUEST INSPECTOR
  // -------------------------------------------------------------
  if (selectedRequest) {
    const parentAssistantEvent = allEvents.find(
      (e) => e.id === selectedRequest.resultEventId,
    )

    return (
      <div className="h-full flex flex-col bg-white overflow-hidden text-[11.5px] select-none">
        {/* Header */}
        <div className="h-9 px-3 border-b border-[#eae6dc] bg-[#faf9f6] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-[#2d5a43] animate-pulse shrink-0" />
            <span className="font-bold text-[#1a211c] text-[12px] truncate">
              LLM Request #{selectedRequest.requestNumber}
            </span>
            <span className="text-[10px] font-mono text-[#5c6760] bg-[#edf4ec] text-[#2d5a43] px-1 py-0.2 rounded border border-[#cddcd0]">
              T{selectedRequest.turn}·S{selectedRequest.step}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#949e97] hover:text-[#1a211c] hover:bg-black/[0.04] rounded transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Model Bar */}
        <div className="px-3 py-1.5 bg-[#fcfbfa] border-b border-[#eae6dc] flex items-center justify-between text-[11px] shrink-0">
          <span className="font-mono font-bold text-[#1a211c] truncate">
            {selectedRequest.model}
          </span>
          <span className="text-[10px] font-mono text-[#747f78] bg-[#f0eee6] px-1 rounded">
            {selectedRequest.provider}
          </span>
        </div>

        {/* Tabs Bar */}
        <div className="h-7 px-3 border-b border-[#eae6dc] bg-white flex items-center space-x-3 text-[11px] font-medium text-[#747f78] shrink-0">
          {(["Summary", "Options", "Usage", "Timing"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setRequestTab(tab)}
              className={`h-full flex items-center transition-colors cursor-pointer relative ${
                requestTab === tab
                  ? "text-[#2d5a43] font-bold"
                  : "hover:text-[#1a211c]"
              }`}
            >
              {tab === "Summary" && "概览"}
              {tab === "Options" && "参数"}
              {tab === "Usage" && "用量"}
              {tab === "Timing" && "耗时"}
              {requestTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2d5a43] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content Pane */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
          {requestTab === "Summary" && (
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                <span className="text-[#747f78]">状态</span>
                <span className="px-1.5 py-0.2 bg-[#dcfce7] text-[#166534] font-semibold rounded text-[10.5px]">
                  ✓ Completed
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                <span className="text-[#747f78]">耗时</span>
                <span className="font-mono text-[#1a211c]">
                  {selectedRequest.durationMs ? `${selectedRequest.durationMs}ms` : "-"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                <span className="text-[#747f78]">工具调用</span>
                <span className="font-mono text-[#1a211c]">
                  {selectedRequest.toolCallsCount || 0} 次
                </span>
              </div>

              {parentAssistantEvent && (
                <button
                  type="button"
                  onClick={() => onSelectEvent(parentAssistantEvent.id)}
                  className="w-full mt-2 flex justify-between items-center p-2 rounded-lg bg-[#edf4ec] hover:bg-[#e2ece0] text-[#2d5a43] cursor-pointer transition-colors border border-[#cddcd0] text-[11px]"
                >
                  <span className="font-medium flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>查看生成的 Assistant 响应</span>
                  </span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {requestTab === "Options" && (
            <div className="bg-[#faf9f6] border border-[#eae6dc] rounded-lg p-2.5 font-mono text-[10.5px] text-[#252d27] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#747f78]">temperature:</span>
                <span className="font-bold">{selectedRequest.requestConfig?.temperature ?? 0.2}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#747f78]">top_p:</span>
                <span className="font-bold">{selectedRequest.requestConfig?.topP ?? 0.95}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#747f78]">max_tokens:</span>
                <span className="font-bold">{selectedRequest.requestConfig?.maxTokens ?? 4096}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#747f78]">stream:</span>
                <span className="font-bold">true</span>
              </div>
            </div>
          )}

          {requestTab === "Usage" && (
            <div className="space-y-2 text-[11px]">
              <div>
                <div className="flex justify-between text-[#747f78] mb-0.5">
                  <span>Prompt Tokens</span>
                  <span className="font-mono font-bold text-[#1a211c]">
                    {selectedRequest.usage?.input?.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#eae6dc] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#2d5a43] h-full rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#747f78] mb-0.5">
                  <span>Cache Read</span>
                  <span className="font-mono font-bold text-[#166534]">
                    {selectedRequest.usage?.cacheRead?.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#eae6dc] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#16a34a] h-full rounded-full" style={{ width: "70%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#747f78] mb-0.5">
                  <span>Completion Tokens</span>
                  <span className="font-mono font-bold text-[#1a211c]">
                    {selectedRequest.usage?.output?.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#eae6dc] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#d97706] h-full rounded-full" style={{ width: "35%" }} />
                </div>
              </div>
            </div>
          )}

          {requestTab === "Timing" && (
            <div className="space-y-1.5 text-[11.5px]">
              <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                <span className="text-[#747f78]">TTFT (首字)</span>
                <span className="font-mono text-[#1a211c]">380 ms</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                <span className="text-[#747f78]">解码耗时</span>
                <span className="font-mono text-[#1a211c]">1,270 ms</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                <span className="text-[#747f78]">速率</span>
                <span className="font-mono font-bold text-[#2d5a43]">78.5 tok/s</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MODE 2: EVENT RECORD INSPECTOR
  // -------------------------------------------------------------
  const event = selectedEvent!
  const hasParentAssistant = event.parentAssistantId
    ? allEvents.find((e) => e.id === event.parentAssistantId)
    : null
  const hasRequest = event.requestId
    ? allRequests.find((r) => r.id === event.requestId)
    : null

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden text-[11.5px] select-none">
      {/* Header */}
      <div className="h-9 px-3 border-b border-[#eae6dc] bg-[#faf9f6] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1.5 truncate">
          <span className="font-mono font-bold text-[#1a211c] text-[12px]">
            #{event.id}
          </span>
          <span className="px-1.5 py-0.2 bg-white text-[#1a211c] text-[10px] rounded font-mono font-semibold border border-[#eae6dc]">
            {event.kind.toUpperCase()}
          </span>
          <span className="text-[#949e97] text-[10.5px] font-mono">
            T{event.turn}·S{event.step}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 text-[#949e97] hover:text-[#1a211c] hover:bg-black/[0.04] rounded transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Title Bar */}
      <div className="px-3 py-1.5 bg-[#fcfbfa] border-b border-[#eae6dc] shrink-0">
        <h4 className="font-bold text-[#1a211c] text-[12px] truncate leading-tight">
          {event.title}
        </h4>
        <span className="text-[10.5px] text-[#747f78]">
          Role: <strong className="text-[#1a211c] font-medium">{event.role}</strong>
        </span>
      </div>

      {/* Hierarchy Links */}
      {(hasRequest || hasParentAssistant) && (
        <div className="px-3 py-1 bg-white border-b border-[#f7f5ef] flex flex-wrap gap-1 shrink-0">
          {hasRequest && (
            <button
              type="button"
              onClick={() => onSelectRequest(hasRequest.id)}
              className="inline-flex items-center space-x-0.5 px-1.5 py-0.2 rounded bg-[#edf4ec] hover:bg-[#2d5a43] text-[#2d5a43] hover:text-white text-[10px] font-mono transition-colors cursor-pointer border border-[#cddcd0]"
            >
              <span>🔗 Req #{hasRequest.requestNumber}</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          )}

          {hasParentAssistant && (
            <button
              type="button"
              onClick={() => onSelectEvent(hasParentAssistant.id)}
              className="inline-flex items-center space-x-0.5 px-1.5 py-0.2 rounded bg-[#faf9f6] hover:bg-[#f0eee6] text-[#4a534c] text-[10px] transition-colors cursor-pointer border border-[#eae6dc]"
            >
              <span>🔗 Assistant (#{hasParentAssistant.id})</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="h-7 px-3 border-b border-[#eae6dc] bg-white flex items-center space-x-3 text-[11px] font-medium text-[#747f78] shrink-0 overflow-x-auto">
        {(["Summary", "Payload", "Result", "Schema", "Timing"] as const).map((tab) => {
          if (tab === "Schema" && !event.toolSchema) return null
          if (tab === "Result" && !event.toolResult && !event.outputBlocks) return null

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setEventTab(tab)}
              className={`h-full flex items-center transition-colors cursor-pointer relative shrink-0 ${
                eventTab === tab
                  ? "text-[#2d5a43] font-bold"
                  : "hover:text-[#1a211c]"
              }`}
            >
              {tab === "Summary" && "概览"}
              {tab === "Payload" && "载荷"}
              {tab === "Result" && "结果"}
              {tab === "Schema" && "Schema"}
              {tab === "Timing" && "耗时"}
              {eventTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2d5a43] rounded-t-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
        {eventTab === "Summary" && (
          <div className="space-y-2 text-[11.5px]">
            <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
              <span className="text-[#747f78]">状态</span>
              <span className="px-1.5 py-0.2 bg-[#dcfce7] text-[#166534] font-semibold rounded text-[10.5px]">
                ✓ Completed
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
              <span className="text-[#747f78]">耗时</span>
              <span className="font-mono text-[#1a211c]">
                {event.durationMs ? `${event.durationMs}ms` : "-"}
              </span>
            </div>

            {event.usage && (
              <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                <span className="text-[#747f78]">Tokens</span>
                <span className="font-mono text-[#1a211c]">
                  {event.usage.total?.toLocaleString() ?? "-"}
                </span>
              </div>
            )}

            {event.thinkingContent && (
              <div className="bg-[#faf9f6] border border-[#eae6dc] rounded-lg p-2.5 space-y-1">
                <span className="font-semibold text-[#2d5a43] text-[10.5px]">
                  思考过程 (Reasoning)
                </span>
                <p className="text-[#5c6760] font-mono text-[10.5px] whitespace-pre-wrap leading-relaxed">
                  {event.thinkingContent}
                </p>
              </div>
            )}

            <div className="bg-[#faf9f6] border border-[#eae6dc] rounded-lg p-2.5 space-y-1">
              <div className="flex justify-between items-center text-[10.5px]">
                <span className="font-semibold text-[#1a211c]">内容</span>
                <button
                  type="button"
                  onClick={() => handleCopy(event.content, "content")}
                  className="text-[#2d5a43] hover:underline"
                >
                  {copiedKey === "content" ? "已复制" : "复制"}
                </button>
              </div>
              <p className="text-[#4a534c] whitespace-pre-wrap leading-relaxed text-[11px]">
                {event.content}
              </p>
            </div>
          </div>
        )}

        {eventTab === "Payload" && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10.5px]">
              <span className="text-[#747f78]">参数 JSON</span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    event.toolArgsRaw || JSON.stringify(event.toolArgs || {}, null, 2),
                    "payload",
                  )
                }
                className="text-[#2d5a43] hover:underline"
              >
                {copiedKey === "payload" ? "已复制" : "复制"}
              </button>
            </div>
            <pre className="bg-[#faf9f6] border border-[#eae6dc] rounded-lg p-2.5 text-[10.5px] font-mono text-[#1a211c] overflow-x-auto max-h-[260px] custom-scrollbar">
              {event.toolArgsRaw || JSON.stringify(event.toolArgs || {}, null, 2)}
            </pre>
          </div>
        )}

        {eventTab === "Result" && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10.5px]">
              <span className="text-[#747f78]">输出结果</span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    event.toolResultRaw || JSON.stringify(event.toolResult || {}, null, 2),
                    "result",
                  )
                }
                className="text-[#2d5a43] hover:underline"
              >
                {copiedKey === "result" ? "已复制" : "复制"}
              </button>
            </div>
            <pre className="bg-[#faf9f6] border border-[#eae6dc] rounded-lg p-2.5 text-[10.5px] font-mono text-[#1a211c] overflow-x-auto max-h-[260px] custom-scrollbar">
              {event.toolResultRaw || JSON.stringify(event.toolResult || {}, null, 2)}
            </pre>
          </div>
        )}

        {eventTab === "Schema" && event.toolSchema && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold text-[#1a211c]">
              {event.toolSchema.name}
            </div>
            <p className="text-[10.5px] text-[#747f78]">
              {event.toolSchema.description}
            </p>
            <pre className="bg-[#faf9f6] border border-[#eae6dc] rounded-lg p-2.5 text-[10.5px] font-mono text-[#1a211c] overflow-x-auto max-h-[240px] custom-scrollbar">
              {JSON.stringify(event.toolSchema.parameters, null, 2)}
            </pre>
          </div>
        )}

        {eventTab === "Timing" && (
          <div className="space-y-1.5 text-[11.5px]">
            <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
              <span className="text-[#747f78]">总耗时</span>
              <span className="font-mono font-bold text-[#1a211c]">
                {event.durationMs ? `${event.durationMs}ms` : "0ms"}
              </span>
            </div>
            {event.timing && (
              <>
                <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                  <span className="text-[#747f78]">TTFT</span>
                  <span className="font-mono text-[#1a211c]">
                    {event.timing.ttftMs}ms
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                  <span className="text-[#747f78]">解码时长</span>
                  <span className="font-mono text-[#1a211c]">
                    {event.timing.decodingMs}ms
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f7f5ef]">
                  <span className="text-[#747f78]">生成吞吐率</span>
                  <span className="font-mono font-bold text-[#2d5a43]">
                    {event.timing.throughputToksPerSec} tok/s
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default TrajectoryInspector
