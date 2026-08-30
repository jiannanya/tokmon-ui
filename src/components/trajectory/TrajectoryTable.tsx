import React from "react"
import {
  ChevronDown,
  ChevronRight,
  Sparkles,
  Wrench,
  User,
  Info,
  Settings,
  Minimize2,
  CornerDownRight,
} from "lucide-react"
import type {
  TrajectoryEvent,
  TrajectoryRequest,
  TrajectoryCellKind,
  TrajectoryTimeRange,
} from "./types"

export interface TrajectoryTableProps {
  events: TrajectoryEvent[]
  requests: TrajectoryRequest[]
  selectedEventId: number | null
  onSelectEvent: (eventId: number) => void
  selectedRequestId: number | null
  onSelectRequest: (requestId: number) => void
  collapsedTurns: Set<number>
  onToggleTurn: (turn: number) => void
  collapsedCalls: boolean
  timeRange: TrajectoryTimeRange | null
}

export const TrajectoryTable: React.FC<TrajectoryTableProps> = ({
  events,
  requests,
  selectedEventId,
  onSelectEvent,
  selectedRequestId,
  onSelectRequest,
  collapsedTurns,
  onToggleTurn,
  collapsedCalls,
  timeRange,
}) => {
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000)
    const minutes = String(Math.floor(totalSec / 60)).padStart(2, "0")
    const seconds = String(totalSec % 60).padStart(2, "0")
    const millis = String(ms % 1000).padStart(3, "0")
    return `${minutes}:${seconds}.${millis}`
  }

  const renderKindTag = (kind: TrajectoryCellKind) => {
    switch (kind) {
      case "user":
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.2 rounded text-[10px] font-semibold font-mono bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]/60 leading-tight">
            <User className="w-2.5 h-2.5" />
            <span>USER</span>
          </span>
        )
      case "context":
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.2 rounded text-[10px] font-semibold font-mono bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]/60 leading-tight">
            <Info className="w-2.5 h-2.5" />
            <span>CONTEXT</span>
          </span>
        )
      case "system":
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.2 rounded text-[10px] font-semibold font-mono bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]/60 leading-tight">
            <Settings className="w-2.5 h-2.5" />
            <span>SYSTEM</span>
          </span>
        )
      case "assistant":
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.2 rounded text-[10px] font-semibold font-mono bg-[#edf4ec] text-[#2d5a43] border border-[#cddcd0] leading-tight">
            <Sparkles className="w-2.5 h-2.5" />
            <span>ASSISTANT</span>
          </span>
        )
      case "tool":
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.2 rounded text-[10px] font-semibold font-mono bg-[#fef3c7] text-[#b45309] border border-[#fde68a]/60 leading-tight">
            <Wrench className="w-2.5 h-2.5" />
            <span>TOOL</span>
          </span>
        )
      case "subtool":
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.2 rounded text-[10px] font-semibold font-mono bg-[#ffedd5] text-[#c2410c] border border-[#fed7aa]/60 leading-tight">
            <CornerDownRight className="w-2.5 h-2.5" />
            <span>SUBTOOL</span>
          </span>
        )
      case "compacted":
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.2 rounded text-[10px] font-semibold font-mono bg-[#f3e8ff] text-[#7e22ce] border border-[#e9d5ff]/60 leading-tight">
            <Minimize2 className="w-2.5 h-2.5" />
            <span>COMPACTED</span>
          </span>
        )
      default:
        return null
    }
  }

  const turns = Array.from(new Set(events.map((e) => e.turn))).sort((a, b) => a - b)

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden bg-white select-none">
      {/* Scrollable Table View */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left text-[11.5px] border-collapse table-fixed">
          <thead>
            <tr className="sticky top-0 z-20 bg-[#faf9f6] border-b border-[#eae6dc] text-[#747f78] font-medium text-[10.5px]">
              <th className="py-1 px-2 w-[42px]">#</th>
              <th className="py-1 px-2 w-[72px]">时间</th>
              <th className="py-1 px-2 w-[92px]">类型</th>
              <th className="py-1 px-2 w-[105px]">角色/工具</th>
              <th className="py-1 px-2">事件内容与调用参数</th>
              <th className="py-1 px-2 w-[65px] text-right">耗时</th>
              <th className="py-1 px-2 w-[65px] text-right">Tokens</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f7f5ef]">
            {turns.map((turnNum) => {
              const turnEvents = events.filter((e) => e.turn === turnNum)
              const isTurnCollapsed = collapsedTurns.has(turnNum)

              const turnDuration = turnEvents.reduce((acc, e) => acc + (e.durationMs || 0), 0)
              const turnTokens = turnEvents.reduce((acc, e) => acc + (e.usage?.total || 0), 0)
              const turnCalls = turnEvents.filter(
                (e) => e.kind === "tool" || e.kind === "subtool",
              ).length

              return (
                <React.Fragment key={`turn-${turnNum}`}>
                  {/* Turn Header Bar */}
                  <tr
                    onClick={() => onToggleTurn(turnNum)}
                    className="bg-[#fcfbfa] hover:bg-[#f6f3eb] cursor-pointer border-t border-b border-[#eae6dc] transition-colors select-none text-[11px]"
                  >
                    <td colSpan={7} className="py-1 px-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[#2d5a43]">
                            {isTurnCollapsed ? (
                              <ChevronRight className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </span>
                          <span className="font-bold text-[#1a211c]">
                            Turn {turnNum}
                          </span>
                          <span className="text-[#949e97] font-mono text-[10.5px]">
                            ({turnEvents.length} 事件 · {turnCalls} 调用)
                          </span>
                        </div>

                        <div className="flex items-center space-x-3 text-[10.5px] text-[#747f78] font-mono">
                          <span>
                            {(turnDuration / 1000).toFixed(2)}s
                          </span>
                          <span>·</span>
                          <span>
                            {turnTokens.toLocaleString()} tok
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Turn Events */}
                  {isTurnCollapsed ? (
                    <tr
                      onClick={() => onToggleTurn(turnNum)}
                      className="hover:bg-[#faf9f6] cursor-pointer text-[#949e97] italic text-[10.5px]"
                    >
                      <td colSpan={7} className="py-1.5 px-6">
                        ··· 折叠 {turnEvents.length} 条记录，点击展开
                      </td>
                    </tr>
                  ) : (
                    turnEvents.map((item, idx) => {
                      const isSelected = selectedEventId === item.id && selectedRequestId === null
                      const matchingReq = requests.find((r) => r.id === item.requestId)
                      const showRequestAnchor =
                        item.step > 0 &&
                        (idx === 0 || turnEvents[idx - 1]?.step !== item.step) &&
                        matchingReq

                      const isOutsideTimeRange =
                        timeRange &&
                        ((item.durationMs &&
                          item.startedAt + item.durationMs < timeRange.startMs) ||
                          item.startedAt > timeRange.endMs)

                      if (collapsedCalls && item.kind === "subtool") {
                        return null
                      }

                      return (
                        <tr
                          key={item.id}
                          onClick={() => onSelectEvent(item.id)}
                          className={`relative cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-[#edf4ec] font-medium"
                              : "hover:bg-[#faf9f6]"
                          } ${isOutsideTimeRange ? "opacity-25" : ""}`}
                        >
                          {/* Left Index with Selection Rail */}
                          <td className="py-1.5 px-2 text-[#747f78] font-mono text-[10.5px] relative">
                            {isSelected && (
                              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2d5a43]" />
                            )}
                            <div className="flex items-center pl-0.5">
                              <span>{item.id}</span>
                            </div>
                          </td>

                          {/* Timestamp */}
                          <td className="py-1.5 px-2 text-[#747f78] font-mono text-[10.5px]">
                            {formatTime(item.startedAt % 600000)}
                          </td>

                          {/* Kind Badge */}
                          <td className="py-1.5 px-2">{renderKindTag(item.kind)}</td>

                          {/* Role / Tool Name */}
                          <td className="py-1.5 px-2 truncate">
                            {item.toolName ? (
                              <span className="font-mono text-[11px] text-[#1a211c] font-semibold bg-[#faf9f6] px-1 py-0.2 rounded border border-[#eae6dc]">
                                {item.toolName}
                              </span>
                            ) : (
                              <span className="text-[#4a534c] text-[11px]">
                                {item.role}
                              </span>
                            )}
                          </td>

                          {/* Content / Parameters */}
                          <td className="py-1.5 px-2 truncate">
                            <div className="flex items-center space-x-1.5 truncate">
                              {showRequestAnchor && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onSelectRequest(matchingReq.id)
                                  }}
                                  title={`LLM Request #${matchingReq.requestNumber}`}
                                  className={`shrink-0 inline-flex items-center space-x-0.5 px-1 py-0.2 rounded-full text-[9.5px] font-mono font-semibold transition-all cursor-pointer ${
                                    selectedRequestId === matchingReq.id
                                      ? "bg-[#2d5a43] text-white"
                                      : "bg-[#edf4ec] text-[#2d5a43] hover:bg-[#2d5a43] hover:text-white border border-[#cddcd0]"
                                  }`}
                                >
                                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                  <span>R#{matchingReq.requestNumber}</span>
                                </button>
                              )}
                              <span
                                className={`truncate ${
                                  item.toolName
                                    ? "font-mono text-[#2d5a43] text-[11px]"
                                    : "text-[#252d27]"
                                }`}
                              >
                                {item.content}
                              </span>
                            </div>
                          </td>

                          {/* Duration */}
                          <td className="py-1.5 px-2 text-right font-mono text-[#747f78] text-[11px]">
                            {item.durationMs ? `${item.durationMs}ms` : "-"}
                          </td>

                          {/* Tokens */}
                          <td className="py-1.5 px-2 text-right font-mono text-[#747f78] text-[11px]">
                            {item.usage?.total ? (
                              <span className="text-[#1a211c] font-medium">
                                {item.usage.total}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Compact Status Footer */}
      <div className="h-6 px-3 border-t border-[#eae6dc] bg-[#faf9f6] flex items-center justify-between text-[10.5px] text-[#747f78] shrink-0">
        <span>
          共 {events.length} 条记录
        </span>
        <span className="text-[#949e97]">就绪</span>
      </div>
    </div>
  )
}
export default TrajectoryTable
