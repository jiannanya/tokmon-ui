import React, { useRef, useState, useCallback, useMemo } from "react"
import type { TimelineSpan, TrajectoryTimeRange } from "./types"

export interface TrajectoryTimelineProps {
  spans: TimelineSpan[]
  actualDuration: boolean
  selectedEventId: number | null
  onSelectEvent: (eventId: number) => void
  timeRange: TrajectoryTimeRange | null
  onTimeRangeChange: (range: TrajectoryTimeRange | null) => void
}

export const TrajectoryTimeline: React.FC<TrajectoryTimelineProps> = ({
  spans,
  actualDuration,
  selectedEventId,
  onSelectEvent,
  timeRange,
  onTimeRangeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartPercent, setDragStartPercent] = useState<number | null>(null)
  const [dragCurrentPercent, setDragCurrentPercent] = useState<number | null>(null)
  const [hoverState, setHoverState] = useState<{
    percent: number
    timeMs: number
    span?: TimelineSpan
  } | null>(null)

  // Derive total time domain
  const maxEndMs = useMemo(() => {
    if (spans.length === 0) return 10000
    const max = Math.max(...spans.map((s) => s.endMs))
    return Math.max(max, 9000)
  }, [spans])

  const totalSteps = spans.length

  // Calculate span position based on mode
  const getSpanGeometry = useCallback(
    (span: TimelineSpan, index: number) => {
      if (!actualDuration) {
        // Equal width mode
        const leftPercent = (index / totalSteps) * 100
        const widthPercent = (1 / totalSteps) * 100
        return {
          left: `${leftPercent}%`,
          width: `${Math.max(widthPercent - 0.3, 0.4)}%`,
        }
      }

      // Actual duration mode
      const leftPercent = (span.startMs / maxEndMs) * 100
      const widthPercent = (span.durationMs / maxEndMs) * 100
      return {
        left: `${leftPercent}%`,
        width: `${Math.max(widthPercent, 0.6)}%`,
      }
    },
    [actualDuration, totalSteps, maxEndMs],
  )

  // Helper to convert mouse clientX to fraction percentage [0, 100]
  const getPercentFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return 0
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    return percent
  }, [])

  // Mouse drag handlers for Range Scrubber
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const percent = getPercentFromClientX(e.clientX)
    setIsDragging(true)
    setDragStartPercent(percent)
    setDragCurrentPercent(percent)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const percent = getPercentFromClientX(e.clientX)
    const timeMs = (percent / 100) * maxEndMs

    // Find hovered span if any
    const foundSpan = spans.find((s) => {
      if (actualDuration) {
        return timeMs >= s.startMs && timeMs <= s.endMs
      }
      return false
    })

    setHoverState({
      percent,
      timeMs,
      span: foundSpan,
    })

    if (isDragging && dragStartPercent !== null) {
      setDragCurrentPercent(percent)
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartPercent === null) return
    const endPercent = getPercentFromClientX(e.clientX)
    setIsDragging(false)

    const left = Math.min(dragStartPercent, endPercent)
    const right = Math.max(dragStartPercent, endPercent)

    if (Math.abs(right - left) < 1.5) {
      // Single click
      if (hoverState?.span) {
        onSelectEvent(hoverState.span.eventId)
      }
      onTimeRangeChange(null)
    } else {
      // Committed time range
      const startMs = (left / 100) * maxEndMs
      const endMs = (right / 100) * maxEndMs
      onTimeRangeChange({ startMs, endMs })
    }

    setDragStartPercent(null)
    setDragCurrentPercent(null)
  }

  // Turn boundaries
  const turnBoundaries = useMemo(() => {
    const boundaries: Array<{ turn: number; percent: number; timeMs: number }> = []
    let currentTurn = 1
    spans.forEach((span, idx) => {
      if (span.turn > currentTurn) {
        const percent = actualDuration
          ? (span.startMs / maxEndMs) * 100
          : (idx / totalSteps) * 100
        boundaries.push({
          turn: span.turn,
          percent,
          timeMs: span.startMs,
        })
        currentTurn = span.turn
      }
    })
    return boundaries
  }, [spans, actualDuration, maxEndMs, totalSteps])

  // Active selection box coordinates
  const selectionStyle = useMemo(() => {
    if (isDragging && dragStartPercent !== null && dragCurrentPercent !== null) {
      const left = Math.min(dragStartPercent, dragCurrentPercent)
      const width = Math.abs(dragCurrentPercent - dragStartPercent)
      return { left: `${left}%`, width: `${width}%` }
    }
    if (timeRange) {
      const left = (timeRange.startMs / maxEndMs) * 100
      const width = ((timeRange.endMs - timeRange.startMs) / maxEndMs) * 100
      return { left: `${left}%`, width: `${width}%` }
    }
    return null
  }, [isDragging, dragStartPercent, dragCurrentPercent, timeRange, maxEndMs])

  // Filter spans into 3 lanes
  const inputSpans = spans.filter((s) => s.lane === "Input")
  const modelSpans = spans.filter((s) => s.lane === "Model")
  const toolSpans = spans.filter((s) => s.lane === "Tools")

  return (
    <div className="h-[46px] bg-[#f7f5ef] border-b border-[#eae6dc] flex items-stretch select-none relative overflow-hidden shrink-0">
      {/* Left 40px: Lane Labels */}
      <div className="w-10 border-r border-[#eae6dc] flex flex-col justify-between py-1 px-1 text-[9px] text-[#949e97] font-medium text-right shrink-0 bg-[#faf9f6]/70 leading-none">
        <span className="h-2.5 flex items-center justify-end">In</span>
        <span className="h-2.5 flex items-center justify-end">Model</span>
        <span className="h-2.5 flex items-center justify-end">Tool</span>
      </div>

      {/* Main Track Area */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={() => onTimeRangeChange(null)}
        className="flex-1 relative cursor-crosshair touch-none overflow-hidden flex flex-col justify-between py-1 px-1.5"
      >
        {/* Turn Boundary Vertical Lines */}
        {turnBoundaries.map((b) => (
          <div
            key={b.turn}
            className="absolute top-0 bottom-0 pointer-events-none z-10"
            style={{ left: `${b.percent}%` }}
          >
            <div className="w-px h-full bg-[#2d5a43]/40 border-l border-dashed border-[#2d5a43]" />
            <span className="absolute top-0.5 -translate-x-1/2 bg-[#2d5a43] text-white text-[8px] font-mono px-0.5 rounded-xs leading-none">
              T{b.turn}
            </span>
          </div>
        ))}

        {/* Hover Line */}
        {hoverState && !isDragging && (
          <div
            className="absolute top-0 bottom-0 w-px bg-[#2d5a43] pointer-events-none z-20"
            style={{ left: `${hoverState.percent}%` }}
          >
            <div className="absolute top-1 left-1 bg-[#1a211c] text-white text-[9px] font-mono px-1 py-0.2 rounded shadow-md whitespace-nowrap leading-tight">
              {(hoverState.timeMs / 1000).toFixed(2)}s
            </div>
          </div>
        )}

        {/* Range Selection Box */}
        {selectionStyle && (
          <div
            className="absolute top-0 bottom-0 bg-[#2d5a43]/15 border-x border-[#2d5a43] pointer-events-none z-15"
            style={{
              left: selectionStyle.left,
              width: selectionStyle.width,
            }}
          />
        )}

        {/* Lane 1: Input */}
        <div className="h-2.5 bg-black/[0.04] rounded-xs relative overflow-hidden">
          {inputSpans.map((span, idx) => {
            const geom = getSpanGeometry(span, idx)
            const isSelected = selectedEventId === span.eventId
            const isDimmed =
              timeRange && (span.endMs < timeRange.startMs || span.startMs > timeRange.endMs)

            let bgColor = "bg-[#0284c7]"
            if (span.kind === "context") bgColor = "bg-[#16a34a]"
            if (span.kind === "system") bgColor = "bg-[#64748b]"

            return (
              <div
                key={span.id}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectEvent(span.eventId)
                }}
                title={`${span.label} (${(span.durationMs / 1000).toFixed(2)}s)`}
                className={`absolute top-0 bottom-0 rounded-xs cursor-pointer transition-all ${bgColor} ${
                  isSelected ? "ring-1 ring-[#1a211c] z-10 brightness-110" : ""
                } ${isDimmed ? "opacity-25" : "hover:brightness-110"}`}
                style={{ left: geom.left, width: geom.width }}
              />
            )
          })}
        </div>

        {/* Lane 2: Model */}
        <div className="h-2.5 bg-black/[0.04] rounded-xs relative overflow-hidden">
          {modelSpans.map((span, idx) => {
            const geom = getSpanGeometry(span, idx)
            const isSelected = selectedEventId === span.eventId
            const isDimmed =
              timeRange && (span.endMs < timeRange.startMs || span.startMs > timeRange.endMs)

            const ttftRatio =
              span.ttftMs && span.decodingMs
                ? (span.ttftMs / (span.ttftMs + span.decodingMs)) * 100
                : 25

            return (
              <div
                key={span.id}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectEvent(span.eventId)
                }}
                title={`${span.label} · 耗时: ${(span.durationMs / 1000).toFixed(2)}s · TTFT: ${
                  span.ttftMs || 0
                }ms`}
                className={`absolute top-0 bottom-0 rounded-xs cursor-pointer transition-all ${
                  isSelected ? "ring-1 ring-[#1a211c] z-10" : ""
                } ${isDimmed ? "opacity-25" : "hover:brightness-110"}`}
                style={{
                  left: geom.left,
                  width: geom.width,
                  background: `linear-gradient(to right, #4a7860 0%, #4a7860 ${ttftRatio}%, #2d5a43 ${ttftRatio}%, #166534 100%)`,
                }}
              />
            )
          })}
        </div>

        {/* Lane 3: Tools */}
        <div className="h-2.5 bg-black/[0.04] rounded-xs relative overflow-hidden">
          {toolSpans.map((span, idx) => {
            const geom = getSpanGeometry(span, idx)
            const isSelected = selectedEventId === span.eventId
            const isDimmed =
              timeRange && (span.endMs < timeRange.startMs || span.startMs > timeRange.endMs)

            const isSubtool = span.kind === "subtool"
            const bgColor = isSubtool ? "bg-[#ea580c]" : "bg-[#d97706]"

            return (
              <div
                key={span.id}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectEvent(span.eventId)
                }}
                title={`${span.label} (${span.durationMs}ms)`}
                className={`absolute top-0 bottom-0 rounded-xs cursor-pointer transition-all ${bgColor} ${
                  isSelected ? "ring-1 ring-[#1a211c] z-10" : ""
                } ${isDimmed ? "opacity-25" : "hover:brightness-110"}`}
                style={{ left: geom.left, width: geom.width }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default TrajectoryTimeline
