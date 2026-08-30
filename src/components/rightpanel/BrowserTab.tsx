import React, { useState, useRef } from "react"
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
  Terminal,
  Code2,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Maximize2,
  ZoomIn,
} from "lucide-react"

export interface BrowserTabProps {
  initialUrl?: string
  workspaceName?: string
}

export const BrowserTab: React.FC<BrowserTabProps> = ({
  initialUrl = "http://localhost:8443",
  workspaceName = "Tokmon Preview",
}) => {
  const [url, setUrl] = useState<string>(initialUrl)
  const [inputUrl, setInputUrl] = useState<string>(initialUrl)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [showDevTools, setShowDevTools] = useState<boolean>(false)
  const [devToolsTab, setDevToolsTab] = useState<"console" | "network">("console")
  const [iframeKey, setIframeKey] = useState<number>(0)

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault()
    let formatted = inputUrl.trim()
    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      formatted = `http://${formatted}`
    }
    setUrl(formatted)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }

  const handleReload = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
    setTimeout(() => setIsLoading(false), 400)
  }

  const handleHome = () => {
    setUrl(initialUrl)
    setInputUrl(initialUrl)
    handleReload()
  }

  const handleOpenExternal = () => {
    window.open(url, "_blank")
  }

  // Simulated Console Logs
  const consoleLogs = [
    { type: "info", text: "[Vite] connected.", time: "10:24:01" },
    { type: "info", text: "[HMR] active on ws://localhost:8443", time: "10:24:02" },
    { type: "log", text: "React 19 loaded in development mode.", time: "10:24:02" },
    { type: "log", text: "Tokmon UI mounted successfully.", time: "10:24:03" },
    { type: "info", text: "[HMR] hot updated: /src/App.tsx", time: "10:24:18" },
  ]

  // Simulated Network Requests
  const networkLogs = [
    { method: "GET", path: "/", status: 200, type: "document", time: "12ms" },
    { method: "GET", path: "/src/main.tsx", status: 200, type: "script", time: "8ms" },
    { method: "GET", path: "/src/index.css", status: 200, type: "stylesheet", time: "5ms" },
    { method: "GET", path: "/src/App.tsx", status: 200, type: "script", time: "16ms" },
    { method: "GET", path: "/api/session/state", status: 200, type: "xhr", time: "22ms" },
  ]

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#ffffff] select-text overflow-hidden">
      {/* 1. Omnibox Navigation Header */}
      <div className="h-10 px-3 bg-[#faf9f6] border-b border-[#eae6dc] flex items-center justify-between gap-2 select-none shrink-0 text-[11.5px]">
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-1 shrink-0 text-[#747f78]">
          <button
            type="button"
            title="后退"
            className="p-1 hover:bg-black/[0.05] rounded text-[#949e97] hover:text-[#1a211c] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="前进"
            className="p-1 hover:bg-black/[0.05] rounded text-[#949e97] hover:text-[#1a211c] cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleReload}
            title="刷新页面"
            className={`p-1 hover:bg-black/[0.05] rounded text-[#747f78] hover:text-[#1a211c] cursor-pointer ${
              isLoading ? "animate-spin text-[#2d5a43]" : ""
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleHome}
            title="返回主页"
            className="p-1 hover:bg-black/[0.05] rounded text-[#747f78] hover:text-[#1a211c] cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Input Omnibox */}
        <form onSubmit={handleNavigate} className="flex-1 max-w-[480px] min-w-0">
          <div className="relative flex items-center bg-white border border-[#eae6dc] focus-within:border-[#2d5a43] rounded-lg px-2 py-1 text-[11px] shadow-2xs transition-all">
            <Lock className="w-3 h-3 text-[#16a34a] mr-1.5 shrink-0" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 bg-transparent border-0 font-mono text-[#1a211c] focus:outline-none p-0 text-[11px]"
              placeholder="输入预览地址..."
            />
            <span className="text-[9.5px] font-mono text-[#2d5a43] bg-[#edf4ec] px-1 py-0.2 rounded border border-[#cddcd0] shrink-0 ml-1">
              Localhost
            </span>
          </div>
        </form>

        {/* Right Viewport Controls */}
        <div className="flex items-center space-x-1 shrink-0 text-[#747f78]">
          {/* Viewport Mode Switcher */}
          <div className="flex items-center bg-white border border-[#eae6dc] rounded p-0.5 space-x-0.5">
            <button
              type="button"
              onClick={() => setViewportMode("desktop")}
              title="桌面全屏 (100%)"
              className={`p-1 rounded cursor-pointer transition-colors ${
                viewportMode === "desktop"
                  ? "bg-[#edf4ec] text-[#2d5a43] font-semibold"
                  : "hover:bg-black/[0.04] text-[#747f78]"
              }`}
            >
              <Monitor className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setViewportMode("tablet")}
              title="平板视口 (768px)"
              className={`p-1 rounded cursor-pointer transition-colors ${
                viewportMode === "tablet"
                  ? "bg-[#edf4ec] text-[#2d5a43] font-semibold"
                  : "hover:bg-black/[0.04] text-[#747f78]"
              }`}
            >
              <Tablet className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => setViewportMode("mobile")}
              title="手机视口 (375px)"
              className={`p-1 rounded cursor-pointer transition-colors ${
                viewportMode === "mobile"
                  ? "bg-[#edf4ec] text-[#2d5a43] font-semibold"
                  : "hover:bg-black/[0.04] text-[#747f78]"
              }`}
            >
              <Smartphone className="w-3 h-3" />
            </button>
          </div>

          {/* DevTools Drawer Toggle */}
          <button
            type="button"
            onClick={() => setShowDevTools(!showDevTools)}
            title={showDevTools ? "关闭控制台" : "打开控制台"}
            className={`p-1 px-1.5 rounded border text-[10.5px] flex items-center space-x-1 transition-colors cursor-pointer ${
              showDevTools
                ? "bg-[#edf4ec] text-[#2d5a43] border-[#cddcd0] font-semibold"
                : "bg-white text-[#747f78] border-[#eae6dc] hover:bg-black/[0.04]"
            }`}
          >
            <Terminal className="w-3 h-3" />
            <span className="hidden sm:inline">控制台</span>
          </button>

          {/* External Window */}
          <button
            type="button"
            onClick={handleOpenExternal}
            title="在新标签页中打开"
            className="p-1 hover:bg-black/[0.05] rounded text-[#747f78] hover:text-[#1a211c] cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Browser Content Viewport */}
      <div className="flex-1 min-h-0 bg-[#f4f2ec] overflow-auto flex items-center justify-center p-2 relative">
        <div
          className={`h-full transition-all duration-200 flex flex-col bg-white overflow-hidden ${
            viewportMode === "desktop"
              ? "w-full rounded-none shadow-none"
              : viewportMode === "tablet"
              ? "w-[768px] max-w-full rounded-xl border border-[#eae6dc] shadow-md"
              : "w-[375px] max-w-full rounded-2xl border-4 border-[#1a211c] shadow-xl"
          }`}
        >
          {/* Mobile Notch bar when mobile */}
          {viewportMode === "mobile" && (
            <div className="h-4 bg-[#1a211c] flex items-center justify-center shrink-0">
              <div className="w-16 h-2 bg-black rounded-full" />
            </div>
          )}

          {/* Actual Web Preview Iframe */}
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={url}
            title={workspaceName}
            className="flex-1 w-full h-full border-0 bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </div>

      {/* 3. Collapsible DevTools Drawer */}
      {showDevTools && (
        <div className="h-48 border-t border-[#eae6dc] bg-[#111613] text-[#e6ede7] font-mono flex flex-col min-h-0 shrink-0 select-text">
          {/* DevTools Header Tabs */}
          <div className="h-7 px-3 bg-[#161c18] border-b border-white/[0.08] flex items-center justify-between text-[11px] select-none">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setDevToolsTab("console")}
                className={`h-full flex items-center space-x-1 cursor-pointer ${
                  devToolsTab === "console"
                    ? "text-[#72b890] font-bold border-b-2 border-[#72b890]"
                    : "text-[#7f9485] hover:text-[#e6ede7]"
                }`}
              >
                <span>Console</span>
                <span className="text-[9px] bg-white/[0.1] px-1 rounded-full">
                  {consoleLogs.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDevToolsTab("network")}
                className={`h-full flex items-center space-x-1 cursor-pointer ${
                  devToolsTab === "network"
                    ? "text-[#72b890] font-bold border-b-2 border-[#72b890]"
                    : "text-[#7f9485] hover:text-[#e6ede7]"
                }`}
              >
                <span>Network</span>
                <span className="text-[9px] bg-white/[0.1] px-1 rounded-full">
                  {networkLogs.length}
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowDevTools(false)}
              className="text-[#7f9485] hover:text-[#e6ede7]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* DevTools Tab Content */}
          <div className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1 text-[10.5px] leading-relaxed custom-scrollbar">
            {devToolsTab === "console" ? (
              consoleLogs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2 py-0.5 border-b border-white/[0.03]">
                  <span className="text-[#627568] shrink-0">{log.time}</span>
                  <span
                    className={
                      log.type === "info"
                        ? "text-[#38bdf8]"
                        : log.type === "warn"
                        ? "text-[#facc15]"
                        : "text-[#d6e0d7]"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))
            ) : (
              <div className="space-y-1">
                <div className="grid grid-cols-12 text-[#627568] text-[10px] pb-1 border-b border-white/[0.06] font-semibold">
                  <span className="col-span-2">Method</span>
                  <span className="col-span-6">Path</span>
                  <span className="col-span-2">Status</span>
                  <span className="col-span-2 text-right">Time</span>
                </div>
                {networkLogs.map((net, idx) => (
                  <div key={idx} className="grid grid-cols-12 text-[#d6e0d7] py-0.5 text-[10px]">
                    <span className="col-span-2 text-[#72b890] font-semibold">{net.method}</span>
                    <span className="col-span-6 truncate font-mono">{net.path}</span>
                    <span className="col-span-2 text-emerald-400">{net.status}</span>
                    <span className="col-span-2 text-right text-[#7f9485]">{net.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default BrowserTab
