import React, { useState, useMemo } from "react"
import {
  INITIAL_TRAJECTORY_EVENTS,
  INITIAL_TRAJECTORY_METRICS,
  INITIAL_TRAJECTORY_REQUESTS,
  INITIAL_TIMELINE_SPANS,
} from "./mockData"
import type {
  TrajectoryCellKind,
  TrajectoryEvent,
  TrajectoryRequest,
  TimelineSpan,
  TrajectoryTimeRange,
} from "./types"
import { TrajectoryToolbar } from "./TrajectoryToolbar"
import { TrajectoryTimeline } from "./TrajectoryTimeline"
import { TrajectoryTable } from "./TrajectoryTable"
import { TrajectoryInspector } from "./TrajectoryInspector"

export interface TrajectoryViewProps {
  events?: TrajectoryEvent[]
  requests?: TrajectoryRequest[]
  spans?: TimelineSpan[]
}

export const TrajectoryView: React.FC<TrajectoryViewProps> = ({
  events: initialEvents = INITIAL_TRAJECTORY_EVENTS,
  requests: initialRequests = INITIAL_TRAJECTORY_REQUESTS,
  spans: initialSpans = INITIAL_TIMELINE_SPANS,
}) => {
  // Trajectory View States
  const [actualDuration, setActualDuration] = useState<boolean>(true)
  const [allTurnsCollapsed, setAllTurnsCollapsed] = useState<boolean>(false)
  const [allCallsCollapsed, setAllCallsCollapsed] = useState<boolean>(false)
  const [collapsedTurns, setCollapsedTurns] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeKindFilter, setActiveKindFilter] = useState<TrajectoryCellKind | "all">("all")
  const [timeRange, setTimeRange] = useState<TrajectoryTimeRange | null>(null)

  // Selection states
  const [selectedEventId, setSelectedEventId] = useState<number | null>(4)
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null)

  const handleToggleTurn = (turnNum: number) => {
    setCollapsedTurns((prev) => {
      const next = new Set(prev)
      if (next.has(turnNum)) {
        next.delete(turnNum)
      } else {
        next.add(turnNum)
      }
      return next
    })
  }

  const handleToggleAllTurns = () => {
    if (allTurnsCollapsed) {
      setCollapsedTurns(new Set())
      setAllTurnsCollapsed(false)
    } else {
      const allTurnNums = new Set(initialEvents.map((e) => e.turn))
      setCollapsedTurns(allTurnNums)
      setAllTurnsCollapsed(true)
    }
  }

  const handleToggleAllCalls = () => {
    setAllCallsCollapsed((prev) => !prev)
  }

  // Filter events
  const filteredEvents = useMemo(() => {
    return initialEvents.filter((event) => {
      if (activeKindFilter !== "all" && event.kind !== activeKindFilter) {
        return false
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = event.title.toLowerCase().includes(q)
        const matchContent = event.content.toLowerCase().includes(q)
        const matchTool = event.toolName ? event.toolName.toLowerCase().includes(q) : false
        const matchRole = event.role.toLowerCase().includes(q)
        if (!matchTitle && !matchContent && !matchTool && !matchRole) {
          return false
        }
      }

      return true
    })
  }, [initialEvents, activeKindFilter, searchQuery])

  // Filter spans
  const filteredSpans = useMemo(() => {
    return initialSpans.filter((span) => {
      if (activeKindFilter !== "all" && span.kind !== activeKindFilter) {
        return false
      }
      return true
    })
  }, [initialSpans, activeKindFilter])

  // Selected event & request objects
  const selectedEvent = useMemo(() => {
    if (selectedEventId === null) return null
    return initialEvents.find((e) => e.id === selectedEventId) || null
  }, [initialEvents, selectedEventId])

  const selectedRequest = useMemo(() => {
    if (selectedRequestId === null) return null
    return initialRequests.find((r) => r.id === selectedRequestId) || null
  }, [initialRequests, selectedRequestId])

  const handleSelectEvent = (eventId: number) => {
    setSelectedEventId(eventId)
    setSelectedRequestId(null)
  }

  const handleSelectRequest = (requestId: number) => {
    setSelectedRequestId(requestId)
  }

  const handleCloseInspector = () => {
    setSelectedEventId(null)
    setSelectedRequestId(null)
  }

  const handleExportJson = () => {
    const data = {
      metrics: INITIAL_TRAJECTORY_METRICS,
      requests: initialRequests,
      events: initialEvents,
    }
    const jsonStr = JSON.stringify(data, null, 2)
    navigator.clipboard.writeText(jsonStr)
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-white select-text">
      {/* 1. Sleek Integrated Toolbar (Single-line 36px) */}
      <TrajectoryToolbar
        metrics={INITIAL_TRAJECTORY_METRICS}
        actualDuration={actualDuration}
        onActualDurationChange={setActualDuration}
        allTurnsCollapsed={allTurnsCollapsed}
        onToggleAllTurns={handleToggleAllTurns}
        allCallsCollapsed={allCallsCollapsed}
        onToggleAllCalls={handleToggleAllCalls}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        activeKindFilter={activeKindFilter}
        onKindFilterChange={setActiveKindFilter}
        filteredCount={filteredEvents.length}
        totalCount={initialEvents.length}
        onExportJson={handleExportJson}
      />

      {/* 2. Docked Compact Waterfall Timeline (46px) */}
      <TrajectoryTimeline
        spans={filteredSpans}
        actualDuration={actualDuration}
        selectedEventId={selectedEventId}
        onSelectEvent={handleSelectEvent}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      {/* 3. Integrated Split: Table Ledger (Left) + Inspector Pane (Right) */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left: Table Pane */}
        <div className="flex-1 min-w-0 h-full overflow-hidden">
          <TrajectoryTable
            events={filteredEvents}
            requests={initialRequests}
            selectedEventId={selectedEventId}
            onSelectEvent={handleSelectEvent}
            selectedRequestId={selectedRequestId}
            onSelectRequest={handleSelectRequest}
            collapsedTurns={collapsedTurns}
            onToggleTurn={handleToggleTurn}
            collapsedCalls={allCallsCollapsed}
            timeRange={timeRange}
          />
        </div>

        {/* Right: Docked Inspector Drawer */}
        {(selectedEvent !== null || selectedRequest !== null) && (
          <div className="w-[310px] sm:w-[350px] lg:w-[380px] shrink-0 border-l border-[#eae6dc] h-full overflow-hidden bg-white">
            <TrajectoryInspector
              selectedEvent={selectedEvent}
              selectedRequest={selectedRequest}
              onClose={handleCloseInspector}
              onSelectEvent={handleSelectEvent}
              onSelectRequest={handleSelectRequest}
              allEvents={initialEvents}
              allRequests={initialRequests}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default TrajectoryView
