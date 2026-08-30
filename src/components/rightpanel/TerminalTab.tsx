import React, { useState, useRef, useEffect } from "react"
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Zap,
  ChevronDown,
  Play,
  X,
} from "lucide-react"

interface TerminalSession {
  id: string
  title: string
  type: "bash" | "node" | "powershell"
  status: "running" | "idle" | "exited"
  history: Array<{ type: "input" | "output" | "system" | "error"; text: string; time?: string }>
}

export interface TerminalTabProps {
  workspaceName?: string
  workspacePath?: string
}

const INITIAL_SESSIONS: TerminalSession[] = [
  {
    id: "term-1",
    title: "bash (dev)",
    type: "bash",
    status: "running",
    history: [
      {
        type: "system",
        text: "Tokmon Terminal Environment v1.0.0 [x86_64-pc-windows-msvc]",
      },
      {
        type: "system",
        text: "Workspace: e:\\cc\\AI\\tokmon\\Tokmon UI (branch: main)",
      },
      {
        type: "input",
        text: "pnpm dev --host 0.0.0.0 --port 8443",
      },
      {
        type: "output",
        text: "  VITE v8.2.2  ready in 284 ms\n\n  ➜  Local:   http://localhost:8443/\n  ➜  Network: http://192.168.1.108:8443/\n  ➜  press h + enter to show help",
      },
      {
        type: "system",
        text: "  [HMR] connected and watching for file changes...",
      },
    ],
  },
  {
    id: "term-2",
    title: "node (build)",
    type: "node",
    status: "idle",
    history: [
      {
        type: "system",
        text: "Node.js Interactive Subshell v22.14.0",
      },
      {
        type: "input",
        text: "pnpm build",
      },
      {
        type: "output",
        text: "vite v8.2.2 building client environment for production...\n✓ 1809 modules transformed.\nrendering chunks...\ndist/index.html   0.93 kB\ndist/assets/index.js   469.17 kB\n✓ built in 438ms",
      },
    ],
  },
]

export const TerminalTab: React.FC<TerminalTabProps> = ({
  workspaceName = "Tokmon UI",
  workspacePath = "e:\\cc\\AI\\tokmon\\Tokmon UI",
}) => {
  const [sessions, setSessions] = useState<TerminalSession[]>(INITIAL_SESSIONS)
  const [activeSessionId, setActiveSessionId] = useState<string>("term-1")
  const [inputValue, setInputValue] = useState<string>("")
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "pnpm dev",
    "pnpm build",
    "git status",
  ])
  const [showQuickCommands, setShowQuickCommands] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0]
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom when output arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [activeSession?.history])

  // Focus input when clicking terminal background
  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  // Execute terminal command
  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim()
    if (!trimmed) return

    setCommandHistory((prev) => [trimmed, ...prev.filter((c) => c !== trimmed)])
    setHistoryIndex(-1)

    // Add input line
    const now = new Date().toLocaleTimeString()
    const inputEntry = { type: "input" as const, text: trimmed, time: now }

    let outputEntry: { type: "output" | "system" | "error"; text: string; time?: string } | null =
      null

    const lower = trimmed.toLowerCase()
    if (lower === "clear" || lower === "cls") {
      setSessions((prev) =>
        prev.map((s) => (s.id === activeSessionId ? { ...s, history: [] } : s)),
      )
      setInputValue("")
      return
    } else if (lower === "help") {
      outputEntry = {
        type: "system",
        text: "支持的内置命令:\n  pnpm dev       - 启动 Vite 开发服务器\n  pnpm build     - 构建生产产物\n  pnpm test      - 运行单元测试套件\n  git status     - 查看工作区 Git 状态\n  git log        - 查看最近提交记录\n  ls / dir       - 列出当前目录文件\n  pwd            - 打印当前工作路径\n  clear          - 清空终端屏幕\n  echo [msg]     - 打印消息",
      }
    } else if (lower.startsWith("pnpm dev") || lower.startsWith("npm run dev")) {
      outputEntry = {
        type: "output",
        text: "  VITE v8.2.2  ready in 189 ms\n\n  ➜  Local:   http://localhost:8443/\n  ➜  Network: http://192.168.1.108:8443/\n  ➜  press h + enter to show help",
      }
    } else if (lower.startsWith("pnpm build")) {
      outputEntry = {
        type: "output",
        text: "vite v8.2.2 building client environment for production...\n✓ 1809 modules transformed.\nrendering chunks...\ndist/index.html                0.93 kB │ gzip: 0.42 kB\ndist/assets/index.js         469.17 kB │ gzip: 119.59 kB\n✓ built in 438ms",
      }
    } else if (lower.startsWith("git status")) {
      outputEntry = {
        type: "output",
        text: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use \"git add <file>...\" to update what will be committed)\n\tmodified:   src/App.tsx\n\tmodified:   src/components/trajectory/TrajectoryView.tsx\n\nno changes added to commit (use \"git add\")",
      }
    } else if (lower === "ls" || lower === "dir") {
      outputEntry = {
        type: "output",
        text: "AGENTS.md  index.html  package.json  pnpm-lock.yaml  src/  tsconfig.json  vite.config.ts",
      }
    } else if (lower === "pwd") {
      outputEntry = {
        type: "output",
        text: workspacePath,
      }
    } else if (lower === "node -v") {
      outputEntry = {
        type: "output",
        text: "v22.14.0",
      }
    } else if (lower.startsWith("echo ")) {
      outputEntry = {
        type: "output",
        text: trimmed.slice(5),
      }
    } else {
      outputEntry = {
        type: "output",
        text: `[Process executed with exit code 0]: ${trimmed}`,
      }
    }

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== activeSessionId) return s
        const nextHistory = [...s.history, inputEntry]
        if (outputEntry) nextHistory.push(outputEntry)
        return { ...s, history: nextHistory }
      }),
    )

    setInputValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      executeCommand(inputValue)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const nextIdx = Math.min(historyIndex + 1, commandHistory.length - 1)
        setHistoryIndex(nextIdx)
        setInputValue(commandHistory[nextIdx])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInputValue(commandHistory[nextIdx])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputValue("")
      }
    }
  }

  // Clear current terminal screen
  const handleClear = () => {
    setSessions((prev) =>
      prev.map((s) => (s.id === activeSessionId ? { ...s, history: [] } : s)),
    )
  }

  // Copy all terminal content
  const handleCopyAll = () => {
    if (!activeSession) return
    const text = activeSession.history.map((h) => `${h.type === "input" ? "$ " : ""}${h.text}`).join("\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Add new session
  const handleAddSession = () => {
    const nextNum = sessions.length + 1
    const newSession: TerminalSession = {
      id: `term-${Date.now()}`,
      title: `bash (${nextNum})`,
      type: "bash",
      status: "idle",
      history: [
        {
          type: "system",
          text: `Tokmon Terminal Session #${nextNum} started in ${workspacePath}`,
        },
      ],
    }
    setSessions((prev) => [...prev, newSession])
    setActiveSessionId(newSession.id)
  }

  // Close session
  const handleCloseSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (sessions.length <= 1) return
    const next = sessions.filter((s) => s.id !== id)
    setSessions(next)
    if (activeSessionId === id) {
      setActiveSessionId(next[0].id)
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#ffffff] dark:bg-[#161c18] text-[#1a211c] dark:text-[#e6ede7] font-mono select-text overflow-hidden">
      {/* 1. Terminal Top Control Bar */}
      <div className="h-9 px-3 bg-[#faf9f6] dark:bg-[#111613] border-b border-[#eae6dc] dark:border-white/[0.08] flex items-center justify-between text-[11.5px] select-none shrink-0">
        {/* Left: Terminal Sessions Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
          {sessions.map((sess) => {
            const isActive = sess.id === activeSessionId
            return (
              <div
                key={sess.id}
                onClick={() => setActiveSessionId(sess.id)}
                className={`h-6 px-2.5 rounded-md flex items-center space-x-1.5 cursor-pointer text-[11px] transition-all ${
                  isActive
                    ? "bg-[#edf4ec] text-[#2d5a43] font-semibold border border-[#cddcd0] dark:bg-[#1c2c22] dark:text-[#72b890] dark:border-[#72b890]/30 shadow-2xs"
                    : "text-[#747f78] hover:text-[#1a211c] hover:bg-black/[0.04] dark:text-[#7f9485] dark:hover:text-[#e6ede7] dark:hover:bg-white/[0.04]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="truncate max-w-[100px]">{sess.title}</span>
                {sessions.length > 1 && (
                  <button
                    onClick={(e) => handleCloseSession(sess.id, e)}
                    className="p-0.5 hover:bg-black/[0.06] dark:hover:bg-white/[0.1] rounded-full text-[#949e97] hover:text-[#1a211c] dark:text-[#627568] dark:hover:text-[#e6ede7]"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            )
          })}

          <button
            type="button"
            onClick={handleAddSession}
            title="新建终端会话"
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-[#747f78] hover:text-[#1a211c] dark:text-[#7f9485] dark:hover:text-[#e6ede7] transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center space-x-1 shrink-0">
          {/* Quick Commands Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowQuickCommands(!showQuickCommands)}
              className="px-2 py-0.5 rounded bg-white hover:bg-[#f7f5ef] border border-[#eae6dc] text-[#2d5a43] dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:border-white/[0.06] dark:text-[#72b890] text-[10.5px] flex items-center space-x-1 transition-colors cursor-pointer shadow-2xs"
            >
              <Zap className="w-3 h-3" />
              <span>快捷命令</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </button>

            {showQuickCommands && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowQuickCommands(false)}
                />
                <div className="absolute right-0 top-7 w-44 bg-white dark:bg-[#1a221d] border border-[#eae6dc] dark:border-white/[0.1] rounded-xl shadow-2xl py-1 z-50 text-[11px] animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2.5 py-1 text-[10px] text-[#949e97] dark:text-[#627568] font-semibold border-b border-[#f7f5ef] dark:border-white/[0.06]">
                    常用指令
                  </div>
                  {[
                    { label: "pnpm dev", cmd: "pnpm dev" },
                    { label: "pnpm build", cmd: "pnpm build" },
                    { label: "git status", cmd: "git status" },
                    { label: "pnpm test", cmd: "pnpm test" },
                    { label: "clear", cmd: "clear" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setShowQuickCommands(false)
                        executeCommand(item.cmd)
                      }}
                      className="w-full text-left px-2.5 py-1.5 hover:bg-[#edf4ec] text-[#252d27] hover:text-[#2d5a43] dark:hover:bg-[#1c2c22] dark:text-[#d6e0d7] dark:hover:text-[#72b890] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>{item.label}</span>
                      <Play className="w-2.5 h-2.5 opacity-50" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleCopyAll}
            title="复制全部输出"
            className="p-1 rounded hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-[#747f78] hover:text-[#1a211c] dark:text-[#7f9485] dark:hover:text-[#e6ede7] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={handleClear}
            title="清空终端屏幕"
            className="p-1 rounded hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-[#747f78] hover:text-[#1a211c] dark:text-[#7f9485] dark:hover:text-[#e6ede7] transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Terminal Output Viewport */}
      <div
        ref={scrollRef}
        onClick={handleContainerClick}
        className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1.5 text-[11.5px] leading-relaxed custom-scrollbar cursor-text bg-[#ffffff] dark:bg-[#161c18]"
      >
        {activeSession?.history.map((entry, idx) => {
          if (entry.type === "system") {
            return (
              <div key={idx} className="text-[#747f78] dark:text-[#627568] text-[11px] italic">
                {entry.text}
              </div>
            )
          }

          if (entry.type === "input") {
            return (
              <div key={idx} className="flex items-start space-x-1.5 text-[#1a211c] dark:text-[#e6ede7] pt-1">
                <span className="text-[#2d5a43] dark:text-[#72b890] font-bold select-none">➜</span>
                <span className="text-[#5c6760] dark:text-[#7f9485] select-none text-[11px]">tokmon:</span>
                <span className="text-[#0284c7] dark:text-[#38bdf8] select-none text-[11px]">~</span>
                <span className="text-[#1a211c] dark:text-[#e6ede7] font-semibold">{entry.text}</span>
              </div>
            )
          }

          if (entry.type === "error") {
            return (
              <div key={idx} className="text-[#dc2626] dark:text-[#f87171] whitespace-pre-wrap pl-4">
                {entry.text}
              </div>
            )
          }

          return (
            <div key={idx} className="text-[#252d27] dark:text-[#b8c7bb] whitespace-pre-wrap pl-4 leading-normal font-mono">
              {entry.text}
            </div>
          )
        })}

        {/* Live Input Line */}
        <div className="flex items-center space-x-1.5 pt-1">
          <span className="text-[#2d5a43] dark:text-[#72b890] font-bold select-none">➜</span>
          <span className="text-[#5c6760] dark:text-[#7f9485] select-none text-[11px]">tokmon:</span>
          <span className="text-[#0284c7] dark:text-[#38bdf8] select-none text-[11px]">~</span>
          <div className="flex-1 flex items-center relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入命令 (例如 pnpm build, git status, help)..."
              className="w-full bg-transparent border-0 text-[#1a211c] dark:text-[#e6ede7] focus:outline-none p-0 text-[11.5px] font-mono placeholder-[#949e97] dark:placeholder-white/20"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* 3. Terminal Bottom Status Bar */}
      <div className="h-6 px-3 bg-[#faf9f6] dark:bg-[#111613] border-t border-[#eae6dc] dark:border-white/[0.06] flex items-center justify-between text-[10px] text-[#747f78] dark:text-[#627568] select-none shrink-0">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[#5c6760] dark:text-[#7f9485]">PowerShell / Bash</span>
          </span>
          <span>·</span>
          <span>UTF-8</span>
          <span>·</span>
          <span>{workspaceName}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[#2d5a43] bg-[#edf4ec] border border-[#cddcd0] dark:bg-[#1c2c22] dark:text-[#72b890] dark:border-transparent px-1.5 py-0.2 rounded font-mono font-medium">
            端口 :8443 就绪
          </span>
        </div>
      </div>
    </div>
  )
}
export default TerminalTab
