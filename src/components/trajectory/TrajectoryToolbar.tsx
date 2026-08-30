import React from "react"
import {
  Clock,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Wrench,
  Sparkles,
  User,
  Info,
  Download,
  Check,
  Zap,
  Activity,
  X,
  Filter,
} from "lucide-react"
import type { TrajectoryMetrics, TrajectoryCellKind } from "./types"

export interface TrajectoryToolbarProps {
  metrics: TrajectoryMetrics
  actualDuration: boolean
  onActualDurationChange: (val: boolean) => void
  allTurnsCollapsed: boolean
  onToggleAllTurns: () => void
  allCallsCollapsed: boolean
  onToggleAllCalls: () => void
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  activeKindFilter: TrajectoryCellKind | "all"
  onKindFilterChange: (kind: TrajectoryCellKind | "all") => void
  filteredCount: number
  totalCount: number
  onExportJson?: () => void
}

export const TrajectoryToolbar: React.FC<TrajectoryToolbarProps> = ({
  metrics,
  actualDuration,
  onActualDurationChange,
  allTurnsCollapsed,
  onToggleAllTurns,
  allCallsCollapsed,
  onToggleAllCalls,
  searchQuery,
  onSearchQueryChange,
  activeKindFilter,
  onKindFilterChange,
  filteredCount,
  totalCount,
  onExportJson,
}) => {
  const [copied, setCopied] = React.useState(false)

  const handleExport = () => {
    if (onExportJson) {
      onExportJson()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDuration = (ms: number) => {
    const totalSec = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSec / 60)
    const seconds = (totalSec % 60) + (ms % 1000) / 1000
    if (minutes > 0) {
      return `${minutes}m ${seconds.toFixed(1)}s`
    }
    return `${seconds.toFixed(1)}s`
  }

  const filterOptions: Array<{ id: TrajectoryCellKind | "all"; label: string }> = [
    { id: "all", label: "全部类型" },
    { id: "assistant", label: "Model" },
    { id: "tool", label: "Tool" },
    { id: "user", label: "User" },
    { id: "context", label: "Context" },
  ]

  return (
    <div className="h-9 px-3 bg-[#faf9f6] border-b border-[#eae6dc] flex items-center justify-between gap-3 text-[11.5px] text-[#5c6760] select-none shrink-0">
      {/* Left: Quick Controls & Filter */}
      <div className="flex items-center space-x-1.5 shrink-0">
        {/* Mode Toggle: Actual vs Equal */}
        <button
          type="button"
          onClick={() => onActualDurationChange(!actualDuration)}
          className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
            actualDuration
              ? "bg-[#edf4ec] text-[#2d5a43] border border-[#cddcd0] font-semibold"
              : "text-[#747f78] hover:text-[#1a211c] hover:bg-black/[0.04]"
          }`}
          title={actualDuration ? "按真实物理耗时显示时间块" : "按等宽步进显示时间块"}
        >
          <Clock className={`w-3 h-3 ${actualDuration ? "text-[#2d5a43]" : "text-[#949e97]"}`} />
          <span>{actualDuration ? "实际时长" : "等宽"}</span>
        </button>

        <span className="w-px h-3 bg-[#eae6dc] mx-0.5" />

        {/* Turns Collapsed Toggle */}
        <button
          type="button"
          onClick={onToggleAllTurns}
          className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
            allTurnsCollapsed
              ? "bg-[#f3efe6] text-[#1a211c] font-semibold"
              : "text-[#5c6760] hover:text-[#1a211c] hover:bg-black/[0.04]"
          }`}
          title={allTurnsCollapsed ? "展开全部轮次" : "折叠全部轮次"}
        >
          <span className="font-mono text-[10px] text-[#747f78]">
            {allTurnsCollapsed ? "⊞" : "⊟"}
          </span>
          <span>轮次</span>
        </button>

        {/* Calls Collapsed Toggle */}
        <button
          type="button"
          onClick={onToggleAllCalls}
          className={`inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
            allCallsCollapsed
              ? "bg-[#f3efe6] text-[#1a211c] font-semibold"
              : "text-[#5c6760] hover:text-[#1a211c] hover:bg-black/[0.04]"
          }`}
          title={allCallsCollapsed ? "展开全部调用" : "折叠全部调用"}
        >
          <span className="font-mono text-[10px] text-[#747f78]">
            {allCallsCollapsed ? "⊞" : "⊟"}
          </span>
          <span>调用</span>
        </button>

        <span className="w-px h-3 bg-[#eae6dc] mx-0.5" />

        {/* Compact Kind Filter Selector */}
        <div className="flex items-center bg-white border border-[#eae6dc] rounded px-1.5 py-0.5">
          <Filter className="w-2.5 h-2.5 text-[#949e97] mr-1" />
          <select
            value={activeKindFilter}
            onChange={(e) => onKindFilterChange(e.target.value as any)}
            className="bg-transparent text-[11px] text-[#1a211c] font-medium focus:outline-none cursor-pointer pr-1"
          >
            {filterOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Middle: Integrated Concise Telemetry Summary */}
      <div className="hidden md:flex items-center space-x-3 text-[11px] text-[#747f78] overflow-hidden truncate">
        <span>
          时长:{" "}
          <strong className="text-[#1a211c] font-mono font-medium">
            {formatDuration(metrics.durationMs)}
          </strong>
        </span>
        <span>·</span>
        <span>
          轮次:{" "}
          <strong className="text-[#1a211c] font-mono font-medium">
            {metrics.turnsCount}
          </strong>
        </span>
        <span>·</span>
        <span>
          调用:{" "}
          <strong className="text-[#1a211c] font-mono font-medium">
            {metrics.toolCallsCount}
          </strong>
        </span>
        <span>·</span>
        <span>
          Tokens:{" "}
          <strong className="text-[#1a211c] font-mono font-medium">
            {metrics.totalTokens.toLocaleString()}
          </strong>{" "}
          <span className="text-[#949e97] text-[10px]">
            (P:{metrics.promptTokens} / C:{metrics.completionTokens})
          </span>
        </span>
        <span>·</span>
        <span className="hidden xl:inline">
          TTFT:{" "}
          <strong className="text-[#1a211c] font-mono font-medium">
            {metrics.avgTtftMs}ms
          </strong>{" "}
          ({metrics.avgThroughput} tok/s)
        </span>
      </div>

      {/* Right: Compact Search & Export */}
      <div className="flex items-center space-x-1.5 shrink-0">
        <div className="relative w-[150px] sm:w-[180px]">
          <Search className="w-3 h-3 text-[#949e97] absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="搜索轨迹..."
            className="w-full bg-white border border-[#eae6dc] focus:border-[#2d5a43] rounded pl-6 pr-5 py-0.5 text-[11px] text-[#1a211c] placeholder-[#949e97] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchQueryChange("")}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-[#949e97] hover:text-[#1a211c]"
            >
              ✕
            </button>
          )}
        </div>

        {searchQuery && (
          <span className="text-[10px] text-[#2d5a43] font-mono bg-[#edf4ec] px-1 py-0.5 rounded border border-[#cddcd0]">
            {filteredCount}/{totalCount}
          </span>
        )}

        <button
          type="button"
          onClick={handleExport}
          title="导出 JSON 轨迹"
          className="p-1 px-1.5 bg-white hover:bg-[#f7f5ef] border border-[#eae6dc] rounded text-[11px] text-[#5c6760] hover:text-[#1a211c] transition-colors cursor-pointer flex items-center space-x-1"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Download className="w-3 h-3 text-[#747f78]" />}
          <span className="hidden sm:inline">{copied ? "已复制" : "导出"}</span>
        </button>
      </div>
    </div>
  )
}
export default TrajectoryToolbar
