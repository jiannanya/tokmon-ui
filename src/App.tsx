import { useState, useRef, useEffect } from "react"

import tokmonBrandImg from "./imports/tokmon-brand-2048.png"

import {
  ChevronDown,
  ChevronRight,
  Plus,
  Settings,
  Folder,
  MessageSquare,
  ArrowLeft,
  Edit2,
  CheckCircle2,
  Terminal,
  FileText,
  Paperclip,
  Send,
  MoreVertical,
  Minus,
  Square,
  X,
  Bot,
  User,
  RotateCw,
  RotateCcw,
  Search,
  Sparkles,
  FileCode,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  PanelRight,
  Box,
  Copy,
  Lock,
  Bell,
  Palette,
  Keyboard,
  Sliders,
  Download,
  Cpu,
  ArrowUp,
  ShieldAlert,
  Brain,
  FolderOpen,
  GitBranch,
  ExternalLink,
  HardDrive,
  RefreshCw,
  ChevronUp,
  FolderPlus,
  Monitor,
  CircleDashed,
  Laptop,
  Globe,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  Link2,
  Image as ImageIcon,
} from "lucide-react"

// Custom Precise Icons matching Review & Git Toolbar (Screenshots 1, 2, 3)
function ReviewIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      className={className}
    >
      <rect x="2" y="2" width="12" height="12" rx="2.5" strokeWidth="1.35" />
      <path
        d="M5 5.5h6M8 2.5v6M5 11h6"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CommitPushIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      className={className}
    >
      <circle cx="8" cy="8" r="2.5" strokeWidth="1.35" />
      <path d="M1.5 8h4M10.5 8h4" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  )
}

function DiffSplitIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M2.5 5h8.5M8 2.5l3 2.5-3 2.5M13.5 11H5M8 8.5L5 11l3 2.5"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PanesIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      className={className}
    >
      <rect x="2" y="2.5" width="12" height="11" rx="2" strokeWidth="1.35" />
      <path d="M10 2.5v11" strokeWidth="1.35" />
    </svg>
  )
}

// Tokmon Brand Logo Image in Warm Terracotta/Sand (#2d5a43)

function TokmonLogo({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center flex-shrink-0"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 7V25"
          stroke="#2d5a43"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M9 16H20"
          stroke="#2d5a43"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="7" r="4" fill="#2d5a43" />
        <circle cx="9" cy="25" r="4" fill="#2d5a43" />
        <circle cx="20" cy="16" r="4" fill="#2d5a43" />
      </svg>
    </div>
  )
}

// Reusable Warm Sand Toggle Switch matching Tokmon's UI

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-[44px] h-[24px] flex items-center rounded-full p-[2px] cursor-pointer transition-colors duration-200 ease-in-out ${
        checked ? "bg-[#2d5a43]" : "bg-[#eae6dc]"
      }`}
    >
      <div
        className={`bg-white w-[20px] h-[20px] rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-[20px]" : "translate-x-0"
        }`}
      />
    </button>
  )
}

// Window Controls Component (Minimize, Maximize/Restore, Close)

function WindowControls({
  isMaximized,
  onToggleMaximize,
}: {
  isMaximized?: boolean
  onToggleMaximize?: () => void
}) {
  return (
    <div className="flex items-center space-x-0.5 text-[#747f78]">
      <button
        type="button"
        title="最小化"
        className="w-7 h-7 flex items-center justify-center hover:bg-[#eae6dc] rounded-md text-[#5c6760] transition-colors cursor-pointer"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={onToggleMaximize}
        title={isMaximized ? "向下还原" : "最大化"}
        className="w-7 h-7 flex items-center justify-center hover:bg-[#eae6dc] rounded-md text-[#5c6760] transition-colors cursor-pointer"
      >
        {isMaximized ? (
          <Copy className="w-3 h-3 rotate-180" />
        ) : (
          <Square className="w-3 h-3" />
        )}
      </button>
      <button
        type="button"
        title="关闭"
        className="w-7 h-7 flex items-center justify-center hover:bg-[#ef4444] hover:text-white rounded-md text-[#5c6760] transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

// Thought Process (Chain of Thought Reasoning) Component matching clean modern aesthetic
function ThoughtProcessCard({
  content,
  defaultExpanded = true,
  isThinking = false,
  thinkingSeconds = 0,
}: {
  content: string
  defaultExpanded?: boolean
  isThinking?: boolean
  thinkingSeconds?: number
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // When thinking is actively streaming, keep expanded
  useEffect(() => {
    if (isThinking) {
      setIsExpanded(true)
    }
  }, [isThinking])

  // Extract first non-empty line as preview snippet in collapsed state (matches screenshot 2)
  const firstLine =
    content
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s && !s.startsWith("#"))[0] ||
    (isThinking ? "正在思考..." : "思考过程")

  // Split content by paragraphs
  const paragraphs = content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="bg-[#faf9f5] rounded-xl transition-all select-text overflow-hidden shadow-2xs">
      {!isExpanded ? (
        /* Collapsed State: Slim single line bar with dot, truncated preview text and chevron down (matches screenshot 2) */
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between px-3.5 py-1 text-left cursor-pointer select-none group hover:bg-[#ededed] transition-colors focus:outline-none min-h-[26px]"
        >
          <div className="flex items-center space-x-2 min-w-0 flex-1 mr-2">
            {isThinking ? (
              <div className="w-2.5 h-2.5 rounded-full border-2 border-[#2d5a43]/30 border-t-[#2d5a43] animate-spin flex-shrink-0" />
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#747f78] flex-shrink-0" />
            )}
            <span className="text-[12px] sm:text-[12.5px] text-[#8c968f] truncate font-normal leading-tight flex items-center space-x-1.5">
              <span>{firstLine}</span>
              {isThinking && thinkingSeconds > 0 && (
                <span className="text-[11px] text-[#2d5a43] font-mono">
                  {thinkingSeconds}s
                </span>
              )}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#747f78] group-hover:text-[#1a211c] transition-colors flex-shrink-0 stroke-[1.8]" />
        </button>
      ) : (
        /* Expanded State: Header with "正在思考..." or "思考过程" and chevron up (matches screenshot 1 & user request) */
        <div className="p-4 sm:p-5">
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="w-full flex items-center justify-between text-left cursor-pointer select-none group focus:outline-none"
          >
            <div className="flex items-center space-x-2.5">
              {isThinking ? (
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border-2 border-[#2d5a43]/30 border-t-[#2d5a43] animate-spin" />
                </div>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-[#747f78] inline-block" />
              )}
              <div className="flex items-center space-x-2">
                <span
                  className={`text-[13.5px] font-medium transition-colors ${
                    isThinking
                      ? "text-[#2d5a43]"
                      : "text-[#262626] group-hover:text-[#000000]"
                  }`}
                >
                  {isThinking ? "正在思考..." : "思考过程"}
                </span>
                {isThinking && thinkingSeconds > 0 && (
                  <span className="text-[11px] font-mono text-[#2d5a43] bg-[#2d5a43]/10 px-1.5 py-0.2 rounded font-medium">
                    {thinkingSeconds}s
                  </span>
                )}
              </div>
            </div>
            <div className="text-[#747f78] group-hover:text-[#1a211c] transition-colors p-0.5">
              <ChevronUp className="w-4 h-4 stroke-[1.8]" />
            </div>
          </button>

          <div className="mt-3.5 space-y-3.5 text-[13px] sm:text-[13.5px] text-[#4b5563] leading-[1.7] font-normal animate-in fade-in duration-200">
            {paragraphs.length === 0 && isThinking && (
              <div className="flex items-center space-x-2 text-[#949e97] text-[12.5px] py-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2d5a43] animate-ping" />
                <span>分析任务意图与工作空间上下文...</span>
              </div>
            )}
            {paragraphs.map((para, pIdx) => {
              const lines = para.split("\n")

              const hasListItems = lines.some((l) => {
                const trimmed = l.trim()

                return (
                  trimmed.startsWith("•") ||
                  trimmed.startsWith("- ") ||
                  trimmed.startsWith("* ")
                )
              })

              if (hasListItems) {
                return (
                  <div key={pIdx} className="space-y-1.5">
                    {lines.map((line, lIdx) => {
                      const trimmed = line.trim()

                      if (
                        trimmed.startsWith("•") ||
                        trimmed.startsWith("- ") ||
                        trimmed.startsWith("* ")
                      ) {
                        const text = trimmed.replace(/^[•\-\*]\s*/, "")

                        return (
                          <div
                            key={lIdx}
                            className="flex items-start space-x-2 pl-0.5"
                          >
                            <span className="text-[#9ca3af] select-none text-[13px] leading-[1.7]">
                              •
                            </span>
                            <span className="flex-1 text-[#4b5563]">
                              {text}
                            </span>
                          </div>
                        )
                      }

                      if (trimmed.endsWith(":") || trimmed.endsWith("：")) {
                        return (
                          <p
                            key={lIdx}
                            className="text-[#374151] font-medium pt-1"
                          >
                            {line}
                          </p>
                        )
                      }

                      return (
                        <p key={lIdx} className="text-[#4b5563]">
                          {line}
                        </p>
                      )
                    })}
                  </div>
                )
              }

              return (
                <p key={pIdx} className="text-[#4b5563]">
                  {para}
                </p>
              )
            })}
            {isThinking && (
              <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-[#2d5a43] animate-pulse align-middle" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function generateThoughtForPrompt(
  prompt: string,
  agentName: string,
  workspaceName: string,
) {
  if (
    prompt.includes("架构") ||
    prompt.includes("探索") ||
    prompt.includes("梳理")
  ) {
    return `用户希望对当前工作空间（${workspaceName}）的代码架构、依赖关系与核心实现逻辑进行深度分析。

分析步骤与执行策略：

• 目录与模块扫描：遍历工作空间目录结构，构建代码组件依赖拓扑图
• 入口与流程追踪：定位核心入口文件，理清数据流向与状态管理机制
• 接口与依赖检查：检查核心 API 定义、第三方依赖库版本及调用规范
• 梳理分析报告：汇总模块职责划分、关键算法流程，输出结构化架构说明`
  }

  if (prompt.includes("构建") || prompt.includes("新功能")) {
    return `用户请求在工作空间（${workspaceName}）中构建新功能，需规划方案并编写代码。

需求拆解与实施方案：

• 需求规格明确：解析目标功能的使用场景、入参出参与边界约束
• 架构兼容性评估：评估对现有业务逻辑的兼容性，复用通用工具与类型定义
• 分阶段编码实现：
  • 步骤 1：定义核心数据结构与接口类型
  • 步骤 2：编写核心业务逻辑及辅助处理函数
  • 步骤 3：编写单元测试用例并进行完整性验证
• 交付与审查：整理改动文件清单并输出使用指引`
  }

  if (
    prompt.includes("审查") ||
    prompt.includes("质量") ||
    prompt.includes("重构")
  ) {
    return `用户请求对项目代码进行全面审查，识别质量风险并提供优化建议。

代码审查维度与核查清单：

• 代码规范性：检查命名约定、类型标注完整性及代码组织结构
• 健壮性与安全性：排查未处理的异常分支、边界越界及资源未释放隐患
• 性能与可维护性：识别高开销循环、冗余重复代码及可解耦的组件逻辑
• 优化实施建议：提供具体的代码重构方案及最佳实践补丁`
  }

  if (
    prompt.includes("修复") ||
    prompt.includes("报错") ||
    prompt.includes("诊断")
  ) {
    return `用户请求诊断并修复工作空间中的报错与异常。

故障排查与修复流程：

• 错误定位：解析报错日志与调用堆栈，确定错误发生的精确文件与行号
• 原因复盘：分析触发异常的边界条件与上下文环境状态
• 补丁编写：设计最小侵入式修复方案，避免引入次生问题
• 回归验证：验证修复补丁是否彻底解决异常并保持原有功能正常`
  }

  return `已接收到用户需求："${prompt}"。

任务理解与规划：

• 意图识别：提取核心诉求与输出约束，明确交付成果规格
• 上下文准备：核查智能体（${agentName}）的执行权限与工作空间上下文就绪状态
• 步骤调度：按任务优先级分步调用工具执行，并提供实时进度反馈`
}

export default function App() {
  // Navigation & Toggle states

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)

  const [rightPanelOpen, setRightPanelOpen] = useState(true)

  const [isMaximized, setIsMaximized] = useState(false)

  // Resizable Panel Widths & Dragging States

  const [leftSidebarWidth, setLeftSidebarWidth] = useState(240)

  const [mainWidth, setMainWidth] = useState(780)

  const [rightPanelWidth, setRightPanelWidth] = useState(440)

  const [isDraggingLeft, setIsDraggingLeft] = useState(false)

  const [isDraggingRight, setIsDraggingRight] = useState(false)

  const [isDraggingMainRight, setIsDraggingMainRight] = useState(false)

  const isDragging = isDraggingLeft || isDraggingRight || isDraggingMainRight

  // Dragging start references to preserve overall window width during split drag

  const dragRef = useRef<{
    startX: number

    startLeftWidth: number

    startMainWidth: number

    startRightWidth: number
  }>({
    startX: 0,
    startLeftWidth: 240,
    startMainWidth: 780,
    startRightWidth: 440,
  })

  // Mouse drag handler for sidebar resizers (resizes adjacent columns without shifting outer window)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()

      const deltaX = e.clientX - dragRef.current.startX

      if (isDraggingLeft) {
        // Dragging left divider: leftSidebarWidth changes, mainWidth absorbs the difference

        // Total (leftSidebarWidth + mainWidth) stays constant!

        const totalLM =
          dragRef.current.startLeftWidth + dragRef.current.startMainWidth

        const minLeft = 160

        const maxLeft = Math.min(420, totalLM - 450)

        const newLeft = Math.min(
          Math.max(dragRef.current.startLeftWidth + deltaX, minLeft),
          maxLeft,
        )

        const newMain = totalLM - newLeft

        setLeftSidebarWidth(newLeft)

        setMainWidth(newMain)
      } else if (isDraggingRight) {
        // Dragging right divider: mainWidth changes, rightPanelWidth absorbs the difference
        // Total (mainWidth + rightPanelWidth) stays constant!
        const totalMR =
          dragRef.current.startMainWidth + dragRef.current.startRightWidth
        const minMain = 450
        const minRight = 240
        const maxMain = Math.max(minMain, totalMR - minRight)
        const newMain = Math.min(
          Math.max(dragRef.current.startMainWidth + deltaX, minMain),
          maxMain,
        )
        const newRight = totalMR - newMain
        setMainWidth(newMain)
        setRightPanelWidth(newRight)
      } else if (isDraggingMainRight) {
        // Dragging right window border adjusts mainWidth dynamically with ample headroom (up to viewport width or 2600px+)
        const maxAllowedMain = Math.max(
          typeof window !== "undefined"
            ? window.innerWidth - (leftSidebarOpen ? leftSidebarWidth : 0) - (rightPanelOpen ? rightPanelWidth : 0) - 20
            : 2600,
          2600,
        )
        const newWidth = Math.min(
          Math.max(dragRef.current.startMainWidth + deltaX, 480),
          maxAllowedMain,
        )
        setMainWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDraggingLeft(false)

      setIsDraggingRight(false)

      setIsDraggingMainRight(false)

      document.body.style.cursor = "default"

      document.body.style.userSelect = "auto"
    }

    if (isDraggingLeft || isDraggingRight || isDraggingMainRight) {
      document.body.style.cursor = "col-resize"

      document.body.style.userSelect = "none"

      window.addEventListener("mousemove", handleMouseMove)

      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)

      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDraggingLeft, isDraggingRight, isDraggingMainRight])

  // RIGHT PANEL: Review (Diff), Workspace Tree & Launcher States
  const [rightPanelTab, setRightPanelTab] =
    useState<"launcher" | "review" | "openFile">("launcher")
  const [openTabs, setOpenTabs] = useState<Array<{
    id: "review" | "openFile"
    title: string
  }>>([])

  // Review (Diff) States
  const [selectedReviewFileId, setSelectedReviewFileId] =
    useState<string>("slint-session")
  const [reviewFileSearch, setReviewFileSearch] = useState("")
  const [diffViewMode, setDiffViewMode] = useState<"unified" | "split">(
    "unified",
  )
  const [showRightFileSidebar, setShowRightFileSidebar] = useState(true)
  const [isRightPanelFullscreen, setIsRightPanelFullscreen] = useState(false)
  const [currentBranch, setCurrentBranch] = useState("main")
  const [showBranchDropdown, setShowBranchDropdown] = useState(false)
  const [showMoreGitMenu, setShowMoreGitMenu] = useState(false)
  const [showCommitModal, setShowCommitModal] = useState(false)
  const [commitMessage, setCommitMessage] = useState("")
  const [pushImmediately, setPushImmediately] = useState(true)
  const [expandedBanners, setExpandedBanners] =
    useState<Record<string, boolean>>({})

  // Workspace Tree / Open File States
  const [workspaceTreeSearch, setWorkspaceTreeSearch] = useState("")
  const [showWorkspaceTreeSidebar, setShowWorkspaceTreeSidebar] = useState(true)
  const [selectedWorkspaceFile, setSelectedWorkspaceFile] =
    useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] =
    useState<Record<string, boolean>>({
      apps: true,
      nyxia: true,
    })

  // Global Toast Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const openReviewTab = () => {
    setOpenTabs((prev) => {
      if (prev.find((t) => t.id === "review")) return prev
      return [...prev, { id: "review", title: "审查" }]
    })
    setRightPanelTab("review")
  }

  const openWorkspaceFileTab = (fileName?: string) => {
    setOpenTabs((prev) => {
      if (prev.find((t) => t.id === "openFile")) return prev
      return [...prev, { id: "openFile", title: "打开文件" }]
    })
    setRightPanelTab("openFile")
    if (fileName) setSelectedWorkspaceFile(fileName)
  }

  const closeTab = (id: "review" | "openFile") => {
    const nextTabs = openTabs.filter((t) => t.id !== id)
    setOpenTabs(nextTabs)
    if (nextTabs.length === 0) {
      setRightPanelTab("launcher")
    } else if (rightPanelTab === id) {
      setRightPanelTab(nextTabs[nextTabs.length - 1].id)
    }
  }

  // Keyboard shortcut listener (Ctrl+Shift+G for Review, Ctrl+P for File)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "G" || e.key === "g")
      ) {
        e.preventDefault()
        if (!rightPanelOpen) setRightPanelOpen(true)
        openReviewTab()
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "p" || e.key === "P") &&
        !e.shiftKey
      ) {
        e.preventDefault()
        if (!rightPanelOpen) setRightPanelOpen(true)
        openWorkspaceFileTab()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [openTabs, rightPanelOpen])

  const [activeTab, setActiveTab] = useState<"code" | "preview">("code")

  // Main View Mode: Chat vs Trajectory Trace View

  const [mainViewMode, setMainViewMode] = useState<"chat" | "trajectory">(
    "chat",
  )

  const [selectedTrajectoryEvent, setSelectedTrajectoryEvent] =
    useState<number | null>(1)

  const [trajectorySearch, setTrajectorySearch] = useState("")

  const [trajectoryDetailTab, setTrajectoryDetailTab] =
    useState<"Summary" | "Options" | "Usage" | "Timing">("Summary")

  // Dynamic Conversation Title & List

  const [selectedConversation, setSelectedConversation] =
    useState("生成音频时间轴字幕")

  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const [conversationTitle, setConversationTitle] =
    useState("生成音频时间轴字幕")

  // Chat Messages & Input

  const [inputMessage, setInputMessage] = useState("")

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationPhase, setGenerationPhase] =
    useState<"thinking" | "streaming" | "idle">("idle")
  const [thinkingSeconds, setThinkingSeconds] = useState(0)
  const generationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const thinkingTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (generationTimerRef.current) clearInterval(generationTimerRef.current)
      if (thinkingTimerRef.current) clearInterval(thinkingTimerRef.current)
    }
  }, [])

  const [messages, setMessages] = useState<Array<{
    id: number

    sender: "user" | "bot"

    time: string

    text: string

    thought?: string

    isThinking?: boolean

    details?: {
      modelPath: string

      audioFile: string

      outputFile: string
    }
  }>>([
    {
      id: 1,

      sender: "user",

      time: "10:20",

      text: "使用 faster-whisper 模型对音频文件进行转录，输出带时间戳的字幕 (Segmentation 模式)。",

      details: {
        modelPath: "C:\\Models\\faster-whisper-large-v3-turbo",

        audioFile: "C:\\Data\\audio.mp3",

        outputFile: "UTF-8 编码的 .srt",
      },
    },

    {
      id: 2,

      sender: "bot",

      time: "10:20",

      thought: `用户希望使用 faster-whisper 模型对音频文件进行转录，输出带时间戳的字幕 (Segmentation 模式)。

任务拆解与技术要求：

• 核心目标：调用本地 faster-whisper-large-v3-turbo 模型，对音频 C:\\Data\\audio.mp3 进行高精度语音转录
• 输出格式：标准 UTF-8 编码的 .srt 字幕文件，包含毫秒级对齐的时间轴 (00:00:00,000 --> 00:00:00,000)
• 转录策略：
  • 采用 Segmentation 分段模式，结合 VAD (Voice Activity Detection) 过滤静音空白
  • 开启 word_timestamps 词级时间戳以实现平滑的字幕切分
  • 设置 beam_size=5 保证转录准确率
• 执行计划：检测 Python 环境 -> 读取 config.yaml 依赖 -> 运行 transcribe.py 脚本 -> 生成 output.srt`,

      text: "已理解你的需求，我将使用 faster-whisper 进行音频转录，并输出带时间戳的字幕文件。\n我会分步骤完成任务并实时向你汇报进度。",
    },
  ])

  // Workflow Panel Expand/Collapse State

  const [isWorkflowExpanded, setIsWorkflowExpanded] = useState(true)

  // Agent & Model Selection State in Bottom Input Bar

  const [selectedAgent, setSelectedAgent] = useState("代码助手")

  const [showAgentDropdown, setShowAgentDropdown] = useState(false)

  const [selectedChatModel, setSelectedChatModel] = useState(
    "faster-whisper-large-v3-turbo",
  )

  const [showModelDropdown, setShowModelDropdown] = useState(false)

  // File Dropdown State in Inspector

  const [selectedFile, setSelectedFile] =
    useState<"transcribe.py" | "config.yaml" | "output.srt">("transcribe.py")

  const [showFileDropdown, setShowFileDropdown] = useState(false)

  // Bottom Toolbar Dropdown & Popover States

  const [settingAccessLevel, setSettingAccessLevel] =
    useState<"完全访问" | "受信路径" | "按需确认">("完全访问")

  const [enableWebSearch, setEnableWebSearch] = useState(false)

  const [showAccessDropdown, setShowAccessDropdown] = useState(false)

  const [showContextPopover, setShowContextPopover] = useState(false)

  const [reasoningLevel, setReasoningLevel] = useState<"最高" | "标准" | "低">(
    "最高",
  )

  const [showReasoningDropdown, setShowReasoningDropdown] = useState(false)

  // Active Workspace & Project Space State (Agent Desktop Working Directory)

  const [activeWorkspace, setActiveWorkspace] = useState({
    group: "默认",

    name: "subtitle-agent",

    path: "C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent",

    shortPath: "~/Projects/subtitle-agent",

    branch: "main",

    indexedFiles: 142,

    totalTokens: "84.2k",
  })

  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false)

  const [copiedPathToast, setCopiedPathToast] = useState(false)

  // Environment Info Floating Panel & Apple AssistiveTouch State
  const effectiveMainWidth = leftSidebarOpen
    ? mainWidth
    : mainWidth + leftSidebarWidth + 6

  // Automatically expand into compact side-by-side layout when middle column can fit message stream (max 874px) + gap (24px) + panel (278px) = 1176px
  const isSideBySideWidth =
    effectiveMainWidth >= 1180 ||
    (isMaximized && (!rightPanelOpen || effectiveMainWidth >= 1140))

  const isWideColumn = isSideBySideWidth
  const prevIsWideRef = useRef(isWideColumn)
  const [manualOpenState, setManualOpenState] = useState<
    "pinned" | "collapsed" | null
  >(null)

  useEffect(() => {
    if (prevIsWideRef.current !== isWideColumn) {
      prevIsWideRef.current = isWideColumn
      setManualOpenState(null)
    }
  }, [isWideColumn])

  const isEnvPanelOpen =
    manualOpenState === "pinned"
      ? true
      : manualOpenState === "collapsed"
      ? false
      : isWideColumn

  const isSideBySide = isEnvPanelOpen && isSideBySideWidth

  const [envSources] = useState([
    {
      id: "clip-1",
      name: "codex-clipboard-3898a4b2-63b3-4a71...",
      fullId: "codex-clipboard-3898a4b2-63b3-4a71-9df9-c3d52368c12b",
      type: "file",
    },
    {
      id: "clip-2",
      name: "codex-clipboard-506c9f2d-3b7a-4de4...",
      fullId: "codex-clipboard-506c9f2d-3b7a-4de4-859a-302efd978a59",
      type: "image",
    },
  ])

  const [envDropdown, setEnvDropdown] =
    useState<"none" | "changes" | "local" | "branch" | "plus" | "sourcesPlus">("none")

  const [gitBranches, setGitBranches] = useState([
    "main",
    "dev",
    "feat/subtitle-v2",
    "release/v1.0",
  ])

  const [envToast, setEnvToast] = useState<string | null>(null)

  const [showNewBranchInput, setShowNewBranchInput] = useState(false)

  const [newBranchInput, setNewBranchInput] = useState("")

  const [envModifiedFiles] = useState([
    { name: "src/App.tsx", additions: 32, deletions: 6, status: "M" },

    { name: "transcribe.py", additions: 14, deletions: 2, status: "M" },

    { name: "config.yaml", additions: 4, deletions: 1, status: "M" },

    { name: "output.srt", additions: 96, deletions: 0, status: "A" },
  ])

  const envPanelRef = useRef<HTMLDivElement>(null)

  const showEnvToastMessage = (msg: string) => {
    setEnvToast(msg)

    setTimeout(() => {
      setEnvToast((current) => (current === msg ? null : current))
    }, 2400)
  }

  // Close env dropdown on click outside

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        envPanelRef.current &&
        !envPanelRef.current.contains(e.target as Node)
      ) {
        setEnvDropdown("none")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Settings Modal & Active Tab State

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [settingsToast, setSettingsToast] = useState<string | null>(null)

  const settingsTabNameMap: Record<string, string> = {
    general: "通用设置",
    agents: "智能体与模型",
    security: "权限与安全",
    workspace: "工作区设置",
    notifications: "通知与提醒",
    appearance: "外观与界面",
    shortcuts: "快捷键",
    account: "账户与同步",
  }

  const handleResetCurrentSettingsTabToDefault = () => {
    switch (activeSettingsTab) {
      case "general":
        setSettingLanguage("简体中文")
        setSettingStartupOption("首页")
        setSettingAutoSave("5 分钟")
        setSettingUpdateChannel("稳定版")
        break
      case "agents":
        setSettingDefaultAgent("代码助手")
        setSettingModelProvider("Tokmon 官方")
        setSettingMainModel("faster-whisper-large-v3-turbo")
        setSettingInferencePower("标准")
        break
      case "security":
        setSettingFileAccess("受信路径")
        setSettingCommandApproval("按需确认")
        setSettingNetworkAccess(true)
        setSettingHighRiskConfirmation(true)
        break
      case "workspace":
        setSettingWorkspacePath("C:\\Users\\User\\Tokmon\\Projects")
        setSettingIndexMode("标准")
        setSettingAutoSync(true)
        setSettingGitIntegration(true)
        break
      case "notifications":
        setSettingEnableNotifications(true)
        setSettingDesktopNotifications(true)
        setSettingMessageReminders(true)
        setSettingDoNotDisturb("22:00 - 08:00")
        break
      case "appearance":
        setSettingThemeMode("浅色")
        setSettingFontSize(100)
        break
      case "shortcuts":
        // Reset shortcuts
        break
      case "account":
        setSettingAccountName("Jiandong Chen")
        setSettingAccountEmail("jiandong.chen@tokmon.ai")
        setSettingAccountPlan("Pro")
        setSettingAccountCloudSync(true)
        break
    }

    const currentTabTitle = settingsTabNameMap[activeSettingsTab] || "当前页"
    setSettingsToast(`已恢复「${currentTabTitle}」为默认配置`)
    setTimeout(() => setSettingsToast(null), 2000)
  }

  const [activeSettingsTab, setActiveSettingsTab] =
    useState<"general" | "agents" | "security" | "workspace" | "notifications" | "appearance" | "shortcuts" | "account">(
      "general",
    )

  // 1. General Configs

  const [settingLanguage, setSettingLanguage] = useState("简体中文")

  const [settingStartupOption, setSettingStartupOption] =
    useState<"首页" | "上次打开的会话">("首页")

  const [settingAutoSave, setSettingAutoSave] = useState("5 分钟")

  const [settingUpdateChannel, setSettingUpdateChannel] =
    useState<"稳定版" | "测试版">("稳定版")

  // 2. Agents & Models Configs

  const [settingDefaultAgent, setSettingDefaultAgent] = useState("代码助手")

  const [settingModelProvider, setSettingModelProvider] =
    useState<"Tokmon 官方" | "自定义">("Tokmon 官方")

  const [settingMainModel, setSettingMainModel] = useState(
    "faster-whisper-large-v3-turbo",
  )

  const [settingInferencePower, setSettingInferencePower] =
    useState<"低" | "标准" | "高">("标准")

  // 3. Permissions & Security Configs

  const [settingFileAccess, setSettingFileAccess] = useState("受信路径")

  const [settingCommandApproval, setSettingCommandApproval] =
    useState<"自动执行" | "按需确认" | "禁止执行">("按需确认")

  const [settingNetworkAccess, setSettingNetworkAccess] = useState(true)

  const [settingHighRiskConfirmation, setSettingHighRiskConfirmation] =
    useState(true)

  // 4. Workspace Configs

  const [settingWorkspacePath, setSettingWorkspacePath] = useState(
    "C:\\Users\\User\\Tokmon\\Projects",
  )

  const [settingIndexMode, setSettingIndexMode] = useState("标准")

  const [settingAutoSync, setSettingAutoSync] = useState(true)

  const [settingGitIntegration, setSettingGitIntegration] = useState(true)

  // 5. Notifications Configs

  const [settingEnableNotifications, setSettingEnableNotifications] =
    useState(true)

  const [settingDesktopNotifications, setSettingDesktopNotifications] =
    useState(true)

  const [settingMessageReminders, setSettingMessageReminders] = useState(true)

  const [settingDoNotDisturb, setSettingDoNotDisturb] =
    useState("22:00 - 08:00")

  // 6. Appearance Configs

  const [settingThemeMode, setSettingThemeMode] = useState<"浅色" | "深色">(
    "浅色",
  )

  const [settingFontSize, setSettingFontSize] = useState(100)

  // 7. Account Configs

  const [settingAccountName, setSettingAccountName] = useState("Jiandong Chen")

  const [settingAccountEmail, setSettingAccountEmail] = useState(
    "jiandong.chen@tokmon.ai",
  )

  const [settingAccountPlan, setSettingAccountPlan] = useState("Pro")

  const [settingAccountCloudSync, setSettingAccountCloudSync] = useState(true)

  const [settingsSearchQuery, setSettingsSearchQuery] = useState("")

  // Subtitle Preview Search Query

  const [subtitleSearch, setSubtitleSearch] = useState("")

  const [copiedNotification, setCopiedNotification] = useState(false)

  // Dynamic 3-Level Conversation Tree Data (分组 Group -> 项目 Project -> 会话 Conversation)

  const [treeData, setTreeData] = useState([
    {
      id: "group-default",

      name: "默认",

      isOpen: true,

      projects: [
        {
          id: "proj-1-1",

          name: "subtitle-agent",

          workspacePath: "C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent",

          shortPath: "~/Projects/subtitle-agent",

          isOpen: true,

          conversations: [
            "生成音频时间轴字幕",
            "字幕校对优化",
            "批量字幕质检优化",
          ],
        },
      ],
    },

    {
      id: "group-1",

      name: "内容生产",

      isOpen: true,

      projects: [
        {
          id: "proj-1-2",

          name: "audio-slice",

          workspacePath: "C:\\Users\\User\\Tokmon\\Projects\\audio-slice",

          shortPath: "~/Projects/audio-slice",

          isOpen: false,

          conversations: ["自动长音频降噪"],
        },
      ],
    },

    {
      id: "group-2",

      name: "演示助手",

      isOpen: true,

      projects: [
        {
          id: "proj-2-1",

          name: "ppt-generator",

          workspacePath: "C:\\Users\\User\\Tokmon\\Projects\\ppt-generator",

          shortPath: "~/Projects/ppt-generator",

          isOpen: true,

          conversations: ["PPT 大纲生成", "演讲稿润色"],
        },
      ],
    },

    {
      id: "group-3",

      name: "旅行计划",

      isOpen: false,

      projects: [
        {
          id: "proj-3-1",

          name: "travel-planner",

          workspacePath: "C:\\Users\\User\\Tokmon\\Projects\\travel-planner",

          shortPath: "~/Projects/travel-planner",

          isOpen: true,

          conversations: ["行程规划助手"],
        },
      ],
    },
  ])

  // New Conversation Modal State

  const [showNewConvModal, setShowNewConvModal] = useState(false)

  const [newConvTitle, setNewConvTitle] = useState("")

  const [newConvGroup, setNewConvGroup] = useState("默认")

  const [newConvPath, setNewConvPath] = useState(
    "C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent",
  )

  // Helper to extract directory name from physical path

  const getProjectNameFromPath = (pathStr: string) => {
    const clean = pathStr.trim().replace(/[/\\]+$/, "")

    const parts = clean.split(/[/\\]/)

    return parts.pop() || "new-project"
  }

  // Change Workspace Path Modal State (for pre-dialogue customization)

  const [showChangeWorkspaceModal, setShowChangeWorkspaceModal] =
    useState(false)

  const [changeWorkspacePathInput, setChangeWorkspacePathInput] = useState("")

  // Native OS Directory Picker State & Handler

  const [folderPickerTarget, setFolderPickerTarget] =
    useState<"newConv" | "changeWorkspace">("newConv")

  const nativeFolderInputRef = useRef<HTMLInputElement>(null)

  // Direct Native Directory Picker Handler (Calls OS File System Dialog directly)

  const handleBrowseNativeDirectory = async (
    target: "newConv" | "changeWorkspace",
  ) => {
    setFolderPickerTarget(target)

    // 1. Try modern native File System Access API (window.showDirectoryPicker)

    if (typeof window !== "undefined" && "showDirectoryPicker" in window) {
      try {
        const dirHandle = await (window as any).showDirectoryPicker()

        const folderName = dirHandle.name

        const fullPath = `C:\\Users\\User\\Tokmon\\Projects\\${folderName}`

        if (target === "newConv") {
          setNewConvPath(fullPath)

          // Also check if this project already exists in a group and auto-align group

          for (const g of treeData) {
            if (
              g.projects.some(
                (p) =>
                  p.workspacePath.toLowerCase() === fullPath.toLowerCase() ||
                  p.name.toLowerCase() === folderName.toLowerCase(),
              )
            ) {
              setNewConvGroup(g.name)

              break
            }
          }
        } else {
          setChangeWorkspacePathInput(fullPath)
        }

        return
      } catch (err: any) {
        if (err.name === "AbortError") {
          return // User cancelled the native folder selection dialog
        }

        console.warn("showDirectoryPicker error, falling back to input:", err)
      }
    }

    // 2. Fallback: Trigger native file input with webkitdirectory

    if (nativeFolderInputRef.current) {
      nativeFolderInputRef.current.value = ""

      nativeFolderInputRef.current.click()
    }
  }

  // Handle native folder picker change from HTML input

  const handleNativeFolderInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const firstFile = e.target.files[0]

      const folderName =
        firstFile.webkitRelativePath?.split("/")[0] ||
        firstFile.name ||
        "custom-workspace"

      const fullPath = `C:\\Users\\User\\Tokmon\\Projects\\${folderName}`

      if (folderPickerTarget === "newConv") {
        setNewConvPath(fullPath)

        for (const g of treeData) {
          if (
            g.projects.some(
              (p) =>
                p.workspacePath.toLowerCase() === fullPath.toLowerCase() ||
                p.name.toLowerCase() === folderName.toLowerCase(),
            )
          ) {
            setNewConvGroup(g.name)

            break
          }
        }
      } else {
        setChangeWorkspacePathInput(fullPath)
      }
    }
  }

  // Search keyword state in sidebar

  const [searchQuery, setSearchQuery] = useState("")

  // Textarea Auto Height Ref & Handler

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleToggleRightPanel = () => {
    setRightPanelOpen((prev) => !prev)
  }

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"

      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 220)}px`
    }
  }

  // Send message action

  // Stop Generation Action
  const handleStopGeneration = () => {
    if (generationTimerRef.current) {
      clearInterval(generationTimerRef.current)
      generationTimerRef.current = null
    }
    if (thinkingTimerRef.current) {
      clearInterval(thinkingTimerRef.current)
      thinkingTimerRef.current = null
    }
    setIsGenerating(false)
    setGenerationPhase("idle")

    setMessages((prev) =>
      prev.map((m, idx) =>
        idx === prev.length - 1 && m.sender === "bot"
          ? {
              ...m,
              isThinking: false,
              text: m.text ? m.text : m.thought ? "（已停止生成）" : "已停止",
            }
          : m,
      ),
    )
  }

  // Send message action with realistic Thought Process & Text Streaming
  const handleSendMessage = () => {
    if (!inputMessage.trim() || isGenerating) return

    const currentInput = inputMessage

    const newMsg = {
      id: Date.now(),

      sender: "user" as const,

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      text: currentInput,
    }

    const botMsgId = Date.now() + 1
    const plannedThought = generateThoughtForPrompt(
      currentInput,
      selectedAgent,
      activeWorkspace.name,
    )
    const plannedText = `智能体（${selectedAgent}）已理解你的需求并完成任务规划，正在按步骤执行...`

    setMessages((prev) => [
      ...prev,
      newMsg,
      {
        id: botMsgId,
        sender: "bot" as const,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        thought: "",
        text: "",
        isThinking: true,
      },
    ])

    setInputMessage("")
    setIsGenerating(true)
    setGenerationPhase("thinking")
    setThinkingSeconds(0)

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    // Thinking seconds counter
    if (thinkingTimerRef.current) clearInterval(thinkingTimerRef.current)
    thinkingTimerRef.current = setInterval(() => {
      setThinkingSeconds((s) => s + 1)
    }, 1000)

    // Stream thought text first
    let currentThoughtIndex = 0
    const thoughtChars = plannedThought.split("")
    const streamThoughtInterval = setInterval(
      () => {
        currentThoughtIndex += 3
        if (currentThoughtIndex >= thoughtChars.length) {
          clearInterval(streamThoughtInterval)
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? { ...m, thought: plannedThought, isThinking: false }
                : m,
            ),
          )
          if (thinkingTimerRef.current) {
            clearInterval(thinkingTimerRef.current)
            thinkingTimerRef.current = null
          }
          setGenerationPhase("streaming")

          // Stream response text
          let currentTextIndex = 0
          const textChars = plannedText.split("")
          const streamTextInterval = setInterval(() => {
            currentTextIndex += 2
            if (currentTextIndex >= textChars.length) {
              clearInterval(streamTextInterval)
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMsgId
                    ? { ...m, text: plannedText, isThinking: false }
                    : m,
                ),
              )
              setIsGenerating(false)
              setGenerationPhase("idle")
              generationTimerRef.current = null
            } else {
              const partialText = textChars.slice(0, currentTextIndex).join("")
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMsgId
                    ? { ...m, text: partialText, isThinking: false }
                    : m,
                ),
              )
            }
          }, 30)
          generationTimerRef.current = streamTextInterval
        } else {
          const partialThought = thoughtChars
            .slice(0, currentThoughtIndex)
            .join("")
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? { ...m, thought: partialThought, isThinking: true }
                : m,
            ),
          )
        }
      },
      25,
    )

    generationTimerRef.current = streamThoughtInterval
  }

  // Open New Conversation Settings Modal

  const handleOpenNewConvModal = () => {
    const defaultName = `新会话 ${Date.now().toString().slice(-4)}`

    setNewConvTitle(defaultName)

    setNewConvGroup("默认")

    setNewConvPath(
      activeWorkspace.path ||
        "C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent",
    )

    setShowNewConvModal(true)
  }

  // Confirm Creating New Conversation from Modal (Auto-identify or create project)

  const handleConfirmCreateNewConv = () => {
    const title =
      newConvTitle.trim() || `新会话 ${Date.now().toString().slice(-4)}`

    const path =
      newConvPath.trim() || "C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent"

    const projName = getProjectNameFromPath(path)

    const shortPath = path
      .replace("C:\\Users\\User\\Tokmon", "~")
      .replace(/\\/g, "/")

    const targetGroup = newConvGroup.trim() || "默认"

    setTreeData((prev) => {
      const groupExists = prev.some((g) => g.name === targetGroup)

      if (groupExists) {
        return prev.map((g) => {
          if (g.name === targetGroup) {
            // Check if project with same path or name exists in this group

            const projectExists = g.projects.some(
              (p) =>
                p.workspacePath.toLowerCase() === path.toLowerCase() ||
                p.name.toLowerCase() === projName.toLowerCase(),
            )

            if (projectExists) {
              // Add conversation to existing project

              return {
                ...g,

                isOpen: true,

                projects: g.projects.map((p) => {
                  if (
                    p.workspacePath.toLowerCase() === path.toLowerCase() ||
                    p.name.toLowerCase() === projName.toLowerCase()
                  ) {
                    return {
                      ...p,

                      isOpen: true,

                      conversations: [title, ...p.conversations],
                    }
                  }

                  return p
                }),
              }
            } else {
              // Create new project under this group

              const newProject = {
                id: `proj-${Date.now()}`,

                name: projName,

                workspacePath: path,

                shortPath: shortPath,

                isOpen: true,

                conversations: [title],
              }

              return {
                ...g,

                isOpen: true,

                projects: [newProject, ...g.projects],
              }
            }
          }

          return g
        })
      } else {
        // Create new group and new project

        const newProject = {
          id: `proj-${Date.now()}`,

          name: projName,

          workspacePath: path,

          shortPath: shortPath,

          isOpen: true,

          conversations: [title],
        }

        const newGroup = {
          id: `group-${Date.now()}`,

          name: targetGroup,

          isOpen: true,

          projects: [newProject],
        }

        return [...prev, newGroup]
      }
    })

    setSelectedConversation(title)

    setConversationTitle(title)

    setMessages([])

    setActiveWorkspace({
      group: targetGroup,

      name: projName,

      path: path,

      shortPath: shortPath,

      branch: "main",

      indexedFiles: 142,

      totalTokens: "0",
    })

    setShowNewConvModal(false)
  }

  // Quick Create in Group

  const handleQuickCreateInGroup = (groupName: string) => {
    const group = treeData.find((g) => g.name === groupName)

    if (!group || group.projects.length === 0) return

    const defaultProj = group.projects[0]

    const title = `新会话 ${Date.now().toString().slice(-4)}`

    setTreeData((prev) =>
      prev.map((g) => {
        if (g.name === groupName) {
          return {
            ...g,

            isOpen: true,

            projects: g.projects.map((p, idx) => {
              if (idx === 0) {
                return {
                  ...p,

                  isOpen: true,

                  conversations: [title, ...p.conversations],
                }
              }

              return p
            }),
          }
        }

        return g
      }),
    )

    setSelectedConversation(title)

    setConversationTitle(title)

    setMessages([])

    setActiveWorkspace({
      group: groupName,

      name: defaultProj.name,

      path: defaultProj.workspacePath,

      shortPath: defaultProj.shortPath,

      branch: "main",

      indexedFiles: 142,

      totalTokens: "0",
    })
  }

  // Quick Create in Project

  const handleQuickCreateInProject = (
    groupName: string,
    projectName: string,
  ) => {
    const group = treeData.find((g) => g.name === groupName)

    const project = group?.projects.find((p) => p.name === projectName)

    if (!project) return

    const title = `新会话 ${Date.now().toString().slice(-4)}`

    setTreeData((prev) =>
      prev.map((g) => {
        if (g.name === groupName) {
          return {
            ...g,

            isOpen: true,

            projects: g.projects.map((p) => {
              if (p.name === projectName) {
                return {
                  ...p,

                  isOpen: true,

                  conversations: [title, ...p.conversations],
                }
              }

              return p
            }),
          }
        }

        return g
      }),
    )

    setSelectedConversation(title)

    setConversationTitle(title)

    setMessages([])

    setActiveWorkspace({
      group: groupName,

      name: projectName,

      path: project.workspacePath,

      shortPath: project.shortPath,

      branch: "main",

      indexedFiles: 142,

      totalTokens: "0",
    })
  }

  // Handle selecting a conversation

  const handleSelectConversationItem = (
    convName: string,
    groupName: string,
    project: any,
  ) => {
    setSelectedConversation(convName)

    setConversationTitle(convName)

    setActiveWorkspace({
      group: groupName,

      name: project.name,

      path: project.workspacePath,

      shortPath: project.shortPath,

      branch: "main",

      indexedFiles: 142,

      totalTokens: "84.2k",
    })

    if (convName === "生成音频时间轴字幕") {
      setMessages([
        {
          id: 1,

          sender: "user",

          time: "10:20",

          text: "使用 faster-whisper 模型对音频文件进行转录，输出带时间戳的字幕 (Segmentation 模式)。",

          details: {
            modelPath: "C:\\Models\\faster-whisper-large-v3-turbo",

            audioFile: "C:\\Data\\audio.mp3",

            outputFile: "UTF-8 编码的 .srt",
          },
        },

        {
          id: 2,

          sender: "bot" as const,

          time: "10:20",

          thought: `用户希望使用 faster-whisper 模型对音频文件进行转录，输出带时间戳的字幕 (Segmentation 模式)。

任务拆解与技术要求：

• 核心目标：调用本地 faster-whisper-large-v3-turbo 模型，对音频 C:\\Data\\audio.mp3 进行高精度语音转录
• 输出格式：标准 UTF-8 编码的 .srt 字幕文件，包含毫秒级对齐的时间轴 (00:00:00,000 --> 00:00:00,000)
• 转录策略：
  • 采用 Segmentation 分段模式，结合 VAD (Voice Activity Detection) 过滤静音空白
  • 开启 word_timestamps 词级时间戳以实现平滑的字幕切分
  • 设置 beam_size=5 保证转录准确率
• 执行计划：检测 Python 环境 -> 读取 config.yaml 依赖 -> 运行 transcribe.py 脚本 -> 生成 output.srt`,

          text: "已理解你的需求，我将使用 faster-whisper 进行音频转录，并输出带时间戳的字幕文件。\n我会分步骤完成任务并实时向你汇报进度。",
        },
      ])
    } else {
      setMessages([])
    }
  }

  // Handle Copy All Subtitles

  const handleCopySubtitles = () => {
    const subtitleItems = [
      {
        id: 1,
        start: "00:00:00.000",
        end: "00:00:02.340",
        text: "欢迎使用 faster-whisper 音频转录模型。",
      },

      {
        id: 2,
        start: "00:00:02.500",
        end: "00:00:05.800",
        text: "本视频将向您展示带时间轴字幕的自动生成过程。",
      },

      {
        id: 3,
        start: "00:00:06.100",
        end: "00:00:09.200",
        text: "任务已完成，共生成 96 条高精度时间轴字幕。",
      },
    ]

    const fullText = subtitleItems
      .map((s) => `${s.id}\n${s.start} --> ${s.end}\n${s.text}`)
      .join("\n\n")

    navigator.clipboard.writeText(fullText)

    setCopiedNotification(true)

    setTimeout(() => setCopiedNotification(false), 2000)
  }

  // Files data for Code Inspector

  const fileContents = {
    "transcribe.py": [
      { num: 1, text: "import os", type: "import" },

      { num: 2, text: "import json", type: "import" },

      { num: 3, text: "from pathlib import Path", type: "import" },

      {
        num: 4,
        text: "from faster_whisper import WhisperModel",
        type: "import",
      },

      { num: 5, text: "", type: "normal" },

      {
        num: 6,
        text: "def transcribe_audio(model_path: str, audio_path: str,",
        type: "def",
      },

      {
        num: 7,
        text: '                     output_srt: str, language: str = "zh",',
        type: "def-params",
      },

      {
        num: 8,
        text: "                     beam_size: int = 5, vad_filter: bool = True) -> dict:",
        type: "def-params",
      },

      {
        num: 9,
        text: '    """使用 faster-whisper 进行音频转录（分段模式）并输出 SRT。"""',
        type: "docstring",
      },

      {
        num: 10,
        text: '    model = WhisperModel(model_path, device="auto",',
        type: "normal",
      },

      {
        num: 11,
        text: '                         compute_type="int8")',
        type: "normal",
      },

      { num: 12, text: "", type: "normal" },

      {
        num: 13,
        text: "    segments, info = model.transcribe(",
        type: "normal",
      },

      { num: 14, text: "        audio_path,", type: "normal" },

      { num: 15, text: "        language=language,", type: "normal" },

      { num: 16, text: "        beam_size=beam_size,", type: "normal" },

      { num: 17, text: "        vad_filter=vad_filter,", type: "normal" },

      {
        num: 18,
        text: "        vad_parameters=dict(min_silence_duration_ms=400),",
        type: "normal",
      },

      { num: 19, text: "        word_timestamps=True,", type: "normal" },

      { num: 20, text: "    )", type: "normal" },

      { num: 21, text: "", type: "normal" },

      { num: 22, text: "    results = []", type: "normal" },

      {
        num: 23,
        text: "    for i, seg in enumerate(segments, start=1):",
        type: "for",
      },

      { num: 24, text: "        results.append({", type: "normal" },

      { num: 25, text: '            "index": i,', type: "dict-key" },

      {
        num: 26,
        text: '            "start": round(seg.start, 2),',
        type: "dict-key",
      },

      {
        num: 27,
        text: '            "end": round(seg.end, 2),',
        type: "dict-key",
      },

      {
        num: 28,
        text: '            "text": seg.text.strip(),',
        type: "dict-key",
      },

      { num: 29, text: "        })", type: "normal" },

      { num: 30, text: "", type: "normal" },

      { num: 31, text: "    # 写入 SRT 文件 (UTF-8)", type: "comment" },

      {
        num: 32,
        text: '    Path(output_srt).write_text(to_srt(results), encoding="utf-8")',
        type: "normal",
      },

      {
        num: 33,
        text: '    return {"segments": len(results), "language": info.language}',
        type: "return",
      },

      { num: 34, text: "", type: "normal" },
    ],

    "config.yaml": [
      { num: 1, text: "# Faster-Whisper Subtitle Config", type: "comment" },

      { num: 2, text: "model:", type: "def" },

      {
        num: 3,
        text: '  name: "faster-whisper-large-v3-turbo"',
        type: "normal",
      },

      {
        num: 4,
        text: '  path: "C:\\Models\\faster-whisper-large-v3-turbo"',
        type: "normal",
      },

      { num: 5, text: '  device: "auto"', type: "normal" },

      { num: 6, text: '  compute_type: "int8"', type: "normal" },

      { num: 7, text: "", type: "normal" },

      { num: 8, text: "transcribe:", type: "def" },

      { num: 9, text: '  language: "zh"', type: "normal" },

      { num: 10, text: "  beam_size: 5", type: "normal" },

      { num: 11, text: "  vad_filter: true", type: "normal" },

      { num: 12, text: "  min_silence_duration_ms: 400", type: "normal" },
    ],

    "output.srt": [
      { num: 1, text: "1", type: "def" },

      { num: 2, text: "00:00:00,000 --> 00:00:02,340", type: "docstring" },

      {
        num: 3,
        text: "欢迎使用 faster-whisper 音频转录模型。",
        type: "normal",
      },

      { num: 4, text: "", type: "normal" },

      { num: 5, text: "2", type: "def" },

      { num: 6, text: "00:00:02,500 --> 00:00:05,800", type: "docstring" },

      {
        num: 7,
        text: "本视频将向您展示带时间轴字幕的自动生成过程。",
        type: "normal",
      },

      { num: 8, text: "", type: "normal" },

      { num: 9, text: "3", type: "def" },

      { num: 10, text: "00:00:06,100 --> 00:00:09,200", type: "docstring" },

      {
        num: 11,
        text: "任务已完成，共生成 96 条高精度时间轴字幕。",
        type: "normal",
      },
    ],
  }

  // Sample SRT Subtitles for Preview Mode

  const subtitleItems = [
    {
      id: 1,
      start: "00:00:00.000",
      end: "00:00:02.340",
      text: "欢迎使用 faster-whisper 音频转录模型。",
    },

    {
      id: 2,
      start: "00:00:02.500",
      end: "00:00:05.800",
      text: "本视频将向您展示带时间轴字幕的自动生成过程。",
    },

    {
      id: 3,
      start: "00:00:06.100",
      end: "00:00:09.200",
      text: "任务已完成，共生成 96 条高精度时间轴字幕。",
    },

    {
      id: 4,
      start: "00:00:09.500",
      end: "00:00:12.800",
      text: "分段模式可自动检测说话停顿并精准对齐秒数。",
    },

    {
      id: 5,
      start: "00:00:13.100",
      end: "00:00:16.400",
      text: "您可以随时导出 UTF-8 编码的 .srt 字幕文件。",
    },
  ]

  const filteredSubtitles = subtitleItems.filter((item) =>
    item.text.toLowerCase().includes(subtitleSearch.toLowerCase()),
  )

  // REVIEW (GIT DIFF) FILES DATA MATCHING SCREENSHOT 1
  const reviewFiles = [
    {
      id: "slint-session",
      path: "apps/tokmon-desktop/ui/tokmon-session-initial.slint",
      folder: "apps/tokmon-desktop/ui",
      displayFolder: "ap.../tokmon-desk.../...",
      name: "tokmon-session-initial.slint",
      displayName: "tokmon-session...slint",
      status: "modified" as const,
      additions: 2,
      deletions: 2,
      diffLines: [
        {
          type: "banner" as const,
          bannerText: "91 unmodified lines",
          id: "b1",
        },
        {
          type: "context" as const,
          oldNum: 92,
          newNum: 92,
          text: "        alignment: center;",
        },
        {
          type: "context" as const,
          oldNum: 93,
          newNum: 93,
          text: "        spacing: 6px;",
        },
        {
          type: "context" as const,
          oldNum: 94,
          newNum: 94,
          text: "        Text {",
        },
        {
          type: "delete" as const,
          oldNum: 95,
          text: '            text: "你想让我们在";',
        },
        {
          type: "add" as const,
          newNum: 95,
          text: '            text: "你想在";',
        },
        {
          type: "context" as const,
          oldNum: 96,
          newNum: 96,
          text: "        font-size: 23px;",
        },
        {
          type: "context" as const,
          oldNum: 97,
          newNum: 97,
          text: "        font-weight: 650;",
        },
        {
          type: "context" as const,
          oldNum: 98,
          newNum: 98,
          text: "        letter-spacing: -0.35px;",
        },
        {
          type: "banner" as const,
          bannerText: "11 unmodified lines",
          id: "b2",
        },
        {
          type: "context" as const,
          oldNum: 110,
          newNum: 110,
          text: "        overflow: elide;",
        },
        {
          type: "context" as const,
          oldNum: 111,
          newNum: 111,
          text: "    }",
        },
        {
          type: "context" as const,
          oldNum: 112,
          newNum: 112,
          text: "    Text {",
        },
        {
          type: "delete" as const,
          oldNum: 113,
          text: '            text: "中构建什么？";',
        },
        {
          type: "add" as const,
          newNum: 113,
          text: '            text: "中创造什么？";',
        },
        {
          type: "context" as const,
          oldNum: 114,
          newNum: 114,
          text: "        font-size: 23px;",
        },
        {
          type: "context" as const,
          oldNum: 115,
          newNum: 115,
          text: "        font-weight: 650;",
        },
        {
          type: "context" as const,
          oldNum: 116,
          newNum: 116,
          text: "        letter-spacing: -0.35px;",
        },
      ],
    },
    {
      id: "app-tsx",
      path: "src/App.tsx",
      folder: "src",
      displayFolder: "src",
      name: "App.tsx",
      displayName: "App.tsx",
      status: "modified" as const,
      additions: 18,
      deletions: 6,
      diffLines: [
        {
          type: "banner" as const,
          bannerText: "155 unmodified lines",
          id: "b3",
        },
        {
          type: "context" as const,
          oldNum: 156,
          newNum: 156,
          text: "function ThoughtProcessCard({ content }: { content: string }) {",
        },
        {
          type: "delete" as const,
          oldNum: 157,
          text: "  const [isExpanded, setIsExpanded] = useState(false)",
        },
        {
          type: "add" as const,
          newNum: 157,
          text: "  const [isExpanded, setIsExpanded] = useState(true)",
        },
        {
          type: "context" as const,
          oldNum: 158,
          newNum: 158,
          text: '  const firstLine = content.split("\\n")[0]',
        },
        {
          type: "delete" as const,
          oldNum: 159,
          text: '  return <div className="bg-white border ...">',
        },
        {
          type: "add" as const,
          newNum: 159,
          text: '  return <div className="bg-[#faf9f5] border border-[#ece8df] rounded-xl ...">',
        },
        {
          type: "context" as const,
          oldNum: 160,
          newNum: 160,
          text: "    {!isExpanded ? (",
        },
      ],
    },
    {
      id: "transcribe-py",
      path: "scripts/transcribe.py",
      folder: "scripts",
      displayFolder: "scripts",
      name: "transcribe.py",
      displayName: "transcribe.py",
      status: "modified" as const,
      additions: 14,
      deletions: 2,
      diffLines: [
        {
          type: "banner" as const,
          bannerText: "32 unmodified lines",
          id: "b4",
        },
        {
          type: "context" as const,
          oldNum: 33,
          newNum: 33,
          text: 'def run_transcription(audio_path, model_size="large-v3-turbo"):',
        },
        {
          type: "delete" as const,
          oldNum: 34,
          text: '    model = WhisperModel("base", device="cpu")',
        },
        {
          type: "add" as const,
          newNum: 34,
          text: '    model = WhisperModel(model_size, device="cuda", compute_type="float16")',
        },
        {
          type: "delete" as const,
          oldNum: 35,
          text: "    segments, info = model.transcribe(audio_path, beam_size=1)",
        },
        {
          type: "add" as const,
          newNum: 35,
          text: "    segments, info = model.transcribe(audio_path, beam_size=5, vad_filter=True)",
        },
        {
          type: "context" as const,
          oldNum: 36,
          newNum: 36,
          text: "    return generate_srt_subtitles(segments)",
        },
      ],
    },
    {
      id: "config-yaml",
      path: "config.yaml",
      folder: "root",
      displayFolder: "config",
      name: "config.yaml",
      displayName: "config.yaml",
      status: "modified" as const,
      additions: 4,
      deletions: 1,
      diffLines: [
        {
          type: "banner" as const,
          bannerText: "12 unmodified lines",
          id: "b5",
        },
        {
          type: "context" as const,
          oldNum: 13,
          newNum: 13,
          text: "model_config:",
        },
        {
          type: "delete" as const,
          oldNum: 14,
          text: '  engine: "base"',
        },
        {
          type: "add" as const,
          newNum: 14,
          text: '  engine: "large-v3-turbo"',
        },
        {
          type: "add" as const,
          newNum: 15,
          text: '  language: "zh"',
        },
        {
          type: "add" as const,
          newNum: 16,
          text: '  timestamp_mode: "sentence_segmented"',
        },
        {
          type: "context" as const,
          oldNum: 17,
          newNum: 17,
          text: '  output_format: "srt"',
        },
      ],
    },
    {
      id: "output-srt",
      path: "output.srt",
      folder: "root",
      displayFolder: "dist",
      name: "output.srt",
      displayName: "output.srt",
      status: "added" as const,
      additions: 96,
      deletions: 0,
      diffLines: [
        { type: "add" as const, newNum: 1, text: "1" },
        {
          type: "add" as const,
          newNum: 2,
          text: "00:00:01,200 --> 00:00:04,500",
        },
        {
          type: "add" as const,
          newNum: 3,
          text: "欢迎使用 Tokmon 桌面端音频字幕生成器。",
        },
        { type: "add" as const, newNum: 4, text: "" },
        { type: "add" as const, newNum: 5, text: "2" },
        {
          type: "add" as const,
          newNum: 6,
          text: "00:00:04,800 --> 00:00:08,200",
        },
        {
          type: "add" as const,
          newNum: 7,
          text: "正在通过 faster-whisper 大模型进行高精度语音转写。",
        },
      ],
    },
  ]

  // WORKSPACE FILE TREE DATA MATCHING SCREENSHOT 2
  const workspaceTreeItems = [
    { name: ".deps", type: "folder", items: ["slint-cpp.lib", "whisper.dll"] },
    { name: ".git", type: "folder", items: ["config", "HEAD", "refs"] },
    {
      name: "apps",
      type: "folder",
      items: ["tokmon-desktop", "tokmon-cli", "tokmon-web"],
    },
    {
      name: "build",
      type: "folder",
      items: ["CMakeCache.txt", "ninja.build"],
    },
    {
      name: "cmake",
      type: "folder",
      items: ["FindSlint.cmake", "Utils.cmake"],
    },
    { name: "config", type: "folder", items: ["app.conf", "model.json"] },
    { name: "docs", type: "folder", items: ["README.md", "ARCHITECTURE.md"] },
    { name: "lenses", type: "folder", items: ["audio.lens", "subtitle.lens"] },
    { name: "nyxia", type: "folder", items: ["core.rs", "engine.rs"] },
    {
      name: "protocol",
      type: "folder",
      items: ["message.proto", "stream.proto"],
    },
    { name: "sdk", type: "folder", items: ["client.ts", "types.d.ts"] },
    {
      name: "tests",
      type: "folder",
      items: ["test_transcribe.py", "test_parser.py"],
    },
    {
      name: ".gitignore",
      type: "file",
      ext: "gitignore",
      content: `# Dependencies & Build\nnode_modules/\nbuild/\nbin/\n.deps/\n*.pyc\n*.log\n.DS_Store\ndist/\n`,
    },
    {
      name: "CMakeLists.txt",
      type: "file",
      ext: "cmake",
      content: `cmake_minimum_required(VERSION 3.20)\nproject(TokmonDesktop LANGUAGES CXX C)\n\nset(CMAKE_CXX_STANDARD 20)\nset(CMAKE_CXX_STANDARD_REQUIRED ON)\n\nfind_package(Slint REQUIRED)\n\nadd_subdirectory(apps)\nadd_subdirectory(nyxia)\n`,
    },
    {
      name: "CMakePresets.json",
      type: "file",
      ext: "json",
      content: `{\n  "version": 3,\n  "configurePresets": [\n    {\n      "name": "default",\n      "displayName": "Default Ninja Build",\n      "generator": "Ninja",\n      "binaryDir": "\${sourceDir}/build",\n      "cacheVariables": {\n        "CMAKE_BUILD_TYPE": "RelWithDebInfo"\n      }\n    }\n  ]\n}`,
    },
  ]

  // Render syntax highlighting for Python lines

  const renderCodeLine = (line: { num: number text: string type: string }) => {
    const text = line.text

    if (line.type === "comment") {
      return <span className="text-gray-400 opacity-90">{text}</span>
    }

    if (line.type === "docstring") {
      return <span className="text-amber-700 font-medium">{text}</span>
    }

    let formatted = text

      .replace(
        /\b(import|from|def|return|for|in|as|and|or|not|True|False|bool|str|int|dict|model|transcribe)\b/g,
        "<KW>$1</KW>",
      )

      .replace(/(".*?"|'.*? ')/g, "<STR>$1</STR>")

    const parts = formatted.split(/(<KW>.*?<\/KW>|<STR>.*?<\/STR>)/g)

    return (
      <span>
        {parts.map((part, idx) => {
          if (part.startsWith("<KW>")) {
            return (
              <span key={idx} className="text-purple-700 font-semibold">
                {part.replace(/<\/?KW>/g, "")}
              </span>
            )
          }

          if (part.startsWith("<STR>")) {
            return (
              <span key={idx} className="text-emerald-700">
                {part.replace(/<\/?STR>/g, "")}
              </span>
            )
          }

          return (
            <span key={idx} className="text-gray-800">
              {part}
            </span>
          )
        })}
      </span>
    )
  }

  // Settings Category List

  const settingsCategories = [
    { id: "general", label: "通用", icon: Settings },

    { id: "agents", label: "智能体与模型", icon: Bot },

    { id: "security", label: "权限与安全", icon: Lock },

    { id: "workspace", label: "工作区", icon: Folder },

    { id: "notifications", label: "通知", icon: Bell },

    { id: "appearance", label: "外观", icon: Palette },

    { id: "shortcuts", label: "快捷键", icon: Keyboard },

    { id: "account", label: "账户", icon: User },
  ] as const

  // Highlight search keyword in text helper

  const renderHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text

    const q = query.trim()

    const regex = new RegExp(
      `(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    )

    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-[#fed7aa] text-[#9a3412] font-semibold px-0.5 py-0 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  // Filtered Tree Data according to search query (supports searching Groups, Projects, and Conversations)

  const filteredTreeData = (() => {
    const q = searchQuery.trim().toLowerCase()

    if (!q) return treeData

    return treeData
      .map((group) => {
        const groupMatches = group.name.toLowerCase().includes(q)

        const filteredProjects = group.projects
          .map((proj) => {
            const projectMatches =
              proj.name.toLowerCase().includes(q) ||
              proj.workspacePath.toLowerCase().includes(q)

            const matchedConversations = proj.conversations.filter((conv) =>
              conv.toLowerCase().includes(q),
            )

            // If group or project matches, show all conversations in that project or matched ones

            if (groupMatches || projectMatches) {
              return {
                ...proj,

                isOpen: true,

                conversations:
                  projectMatches && matchedConversations.length === 0
                    ? proj.conversations
                    : matchedConversations.length > 0
                      ? matchedConversations
                      : proj.conversations,
              }
            }

            // If only conversation matched

            if (matchedConversations.length > 0) {
              return {
                ...proj,

                isOpen: true,

                conversations: matchedConversations,
              }
            }

            return null
          })
          .filter(Boolean) as typeof group.projects

        if (groupMatches || filteredProjects.length > 0) {
          return {
            ...group,

            isOpen: true,

            projects:
              groupMatches && filteredProjects.length === 0
                ? group.projects
                : filteredProjects,
          }
        }

        return null
      })
      .filter(Boolean) as typeof treeData
  })()

  const renderEnvCard = () => (
    <div className="w-[278px] bg-white/95 backdrop-blur-2xl rounded-2xl border border-[#ece8df] shadow-[0_16px_40px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] p-3 text-[#252d27] space-y-1 relative">
      {/* Card Section 1: 环境信息 Header */}
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="text-[13px] font-medium text-[#4a534c] tracking-tight">
          环境信息
        </span>
        <div className="flex items-center space-x-1">
          {/* Plus Quick Actions Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setEnvDropdown(
                  envDropdown === "plus" ? "none" : "plus",
                )
              }
              title="快捷操作"
              className={`w-6 h-6 rounded-md flex items-center justify-center text-[#747f78] hover:text-[#1a211c] hover:bg-[#f7f5ef] transition-colors cursor-pointer ${
                envDropdown === "plus"
                  ? "bg-[#f7f5ef] text-[#1a211c]"
                  : ""
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Plus Dropdown Menu */}
            {envDropdown === "plus" && (
              <div className="absolute right-0 top-7 w-48 bg-white border border-[#eae6dc] rounded-xl shadow-xl py-1.5 z-50 text-[12px] space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewBranchInput(true)
                    setEnvDropdown("branch")
                  }}
                  className="w-full px-3 py-1.5 text-left text-[#4a534c] hover:bg-[#edf4ec] hover:text-[#2d5a43] flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>新建 Git 分支</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEnvDropdown("none")
                    handleBrowseNativeDirectory("changeWorkspace")
                  }}
                  className="w-full px-3 py-1.5 text-left text-[#4a534c] hover:bg-[#edf4ec] hover:text-[#2d5a43] flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>浏览本地目录</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEnvDropdown("none")
                    showEnvToastMessage(
                      "已重新扫描工作空间 (142 文件就绪)",
                    )
                  }}
                  className="w-full px-3 py-1.5 text-left text-[#4a534c] hover:bg-[#edf4ec] hover:text-[#2d5a43] flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>重新扫描工作空间</span>
                </button>
                <div className="my-1 border-t border-[#eae6dc]" />
                <button
                  type="button"
                  onClick={() => {
                    setEnvDropdown("none")
                    setShowSettingsModal(true)
                    setActiveSettingsTab("workspace")
                  }}
                  className="w-full px-3 py-1.5 text-left text-[#4a534c] hover:bg-[#edf4ec] hover:text-[#2d5a43] flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>工作空间偏好设置</span>
                </button>
              </div>
            )}
          </div>

          {/* Collapse Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setManualOpenState("collapsed")
              setIsHovered(false)
              setEnvDropdown("none")
            }}
            title="收起为悬浮按钮"
            className="w-6 h-6 rounded-md flex items-center justify-center text-[#747f78] hover:text-[#2d5a43] hover:bg-[#edf4ec] transition-colors cursor-pointer group/min"
          >
            <svg
              className="w-3.5 h-3.5 text-[#747f78] group-hover/min:text-[#2d5a43] transition-colors"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8"
                cy="8"
                r="6.5"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="1.1"
              />
              <circle
                cx="8"
                cy="8"
                r="4"
                stroke="currentColor"
                strokeOpacity="0.7"
                strokeWidth="1.2"
              />
              <circle
                cx="8"
                cy="8"
                r="1.8"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Section 1 Rows List */}
      <div className="space-y-0.5 text-[12.5px]">
        {/* Row 1: 变更 (Diff / Changes) */}
        <div>
          <button
            type="button"
            onClick={() =>
              setEnvDropdown(
                envDropdown === "changes" ? "none" : "changes",
              )
            }
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#1a211c] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#5c6760]">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="2"
                    width="12"
                    height="12"
                    rx="2.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M8 5V9M6 7H10M6 11H10"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-normal text-[12.5px]">变更</span>
            </div>
          </button>

          {/* Changes Dropdown */}
          {envDropdown === "changes" && (
            <div className="mt-1 p-2 bg-[#ffffff] rounded-xl border border-[#eae6dc] text-[11.5px] space-y-1.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-[10.5px] text-[#949e97] px-1">
                <span>未提交的改动 ({envModifiedFiles.length} 个文件)</span>
                <span className="text-emerald-600 font-mono">
                  +146 -9
                </span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                {envModifiedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (file.name.includes(".py"))
                        setSelectedFile("transcribe.py")
                      else if (file.name.includes(".yaml"))
                        setSelectedFile("config.yaml")
                      else setSelectedFile("output.srt")

                      setActiveTab("code")
                      if (!rightPanelOpen) setRightPanelOpen(true)
                    }}
                    className="flex items-center justify-between px-2 py-1 rounded bg-white hover:bg-[#edf4ec] border border-[#eae5da]/60 text-[#4a534c] cursor-pointer transition-colors"
                  >
                    <span className="font-mono truncate max-w-[140px] text-[11px]">
                      {file.name}
                    </span>
                    <div className="flex items-center space-x-1 font-mono text-[9.5px]">
                      <span className="text-emerald-600">
                        +{file.additions}
                      </span>
                      <span className="text-rose-500">
                        -{file.deletions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Row 2: 本地 (Local Environment / Workspace) */}
        <div>
          <button
            type="button"
            onClick={() =>
              setEnvDropdown(
                envDropdown === "local" ? "none" : "local",
              )
            }
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#1a211c] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <Laptop className="w-4 h-4 text-[#5c6760] flex-shrink-0" />
              <span className="font-normal text-[12.5px]">本地</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#949e97] transition-transform ${
                envDropdown === "local" ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Local Workspace Dropdown */}
          {envDropdown === "local" && (
            <div className="mt-1 p-1.5 bg-[#ffffff] rounded-xl border border-[#eae6dc] text-[11.5px] space-y-1 animate-in fade-in duration-150">
              <div className="text-[10px] font-medium text-[#949e97] px-1.5 py-0.5">
                切换工作空间项目
              </div>
              <div className="space-y-0.5 max-h-32 overflow-y-auto custom-scrollbar">
                {treeData
                  .flatMap((g) => g.projects)
                  .map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setActiveWorkspace({
                          group:
                            treeData.find((g) =>
                              g.projects.some(
                                (proj) => proj.id === p.id,
                              ),
                            )?.name || "默认",
                          name: p.name,
                          path: p.workspacePath,
                          shortPath: p.shortPath,
                          branch: "main",
                          indexedFiles: 142,
                          totalTokens: "84.2k",
                        })
                        showEnvToastMessage(
                          `已切换至工作空间: ${p.name}`,
                        )
                        setEnvDropdown("none")
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-left transition-colors cursor-pointer ${
                        activeWorkspace.name === p.name
                          ? "bg-[#edf4ec] text-[#2d5a43] font-medium border border-[#cddcd0]"
                          : "hover:bg-white text-[#4a534c]"
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      {activeWorkspace.name === p.name && (
                        <Check className="w-3 h-3 text-[#2d5a43]" />
                      )}
                    </button>
                  ))}
              </div>
              <div className="border-t border-[#eae6dc] my-1" />
              <button
                type="button"
                onClick={() => {
                  setEnvDropdown("none")
                  setChangeWorkspacePathInput(activeWorkspace.path)
                  setShowChangeWorkspaceModal(true)
                }}
                className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-lg text-[10.5px] text-[#2d5a43] hover:bg-[#edf4ec] font-medium transition-colors cursor-pointer"
              >
                <FolderOpen className="w-3 h-3 text-[#2d5a43]" />
                <span>更换物理目录...</span>
              </button>
            </div>
          )}
        </div>

        {/* Row 3: main (Git Branch) */}
        <div>
          <button
            type="button"
            onClick={() =>
              setEnvDropdown(
                envDropdown === "branch" ? "none" : "branch",
              )
            }
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#1a211c] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <GitBranch className="w-4 h-4 text-[#5c6760] flex-shrink-0" />
              <span className="font-mono text-[12.5px]">
                {activeWorkspace.branch}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#949e97] transition-transform ${
                envDropdown === "branch" ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Git Branch Dropdown */}
          {envDropdown === "branch" && (
            <div className="mt-1 p-1.5 bg-[#ffffff] rounded-xl border border-[#eae6dc] text-[11.5px] space-y-1 animate-in fade-in duration-150">
              <div className="text-[10px] font-medium text-[#949e97] px-1.5 py-0.5">
                Git 分支列表
              </div>
              <div className="space-y-0.5">
                {gitBranches.map((br) => (
                  <button
                    key={br}
                    type="button"
                    onClick={() => {
                      setActiveWorkspace((prev) => ({
                        ...prev,
                        branch: br,
                      }))
                      showEnvToastMessage(`已切换至分支: ${br}`)
                      setEnvDropdown("none")
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-left font-mono text-[11.5px] transition-colors cursor-pointer ${
                      activeWorkspace.branch === br
                        ? "bg-[#edf4ec] text-[#2d5a43] font-medium border border-[#cddcd0]"
                        : "hover:bg-white text-[#4a534c]"
                    }`}
                  >
                    <span>{br}</span>
                    {activeWorkspace.branch === br && (
                      <Check className="w-3 h-3 text-[#2d5a43]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Create new branch input */}
              {showNewBranchInput ? (
                <div className="pt-1 flex items-center space-x-1">
                  <input
                    type="text"
                    value={newBranchInput}
                    onChange={(e) =>
                      setNewBranchInput(e.target.value)
                    }
                    placeholder="新分支名称..."
                    autoFocus
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        newBranchInput.trim()
                      ) {
                        const newBr = newBranchInput.trim()
                        setGitBranches((prev) => [...prev, newBr])
                        setActiveWorkspace((prev) => ({
                          ...prev,
                          branch: newBr,
                        }))
                        setNewBranchInput("")
                        setShowNewBranchInput(false)
                        setEnvDropdown("none")
                        showEnvToastMessage(
                          `已创建并切换至新分支: ${newBr}`,
                        )
                      }
                    }}
                    className="flex-1 px-1.5 py-0.5 text-[11px] font-mono bg-white border border-[#2d5a43] rounded-md focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newBranchInput.trim()) {
                        const newBr = newBranchInput.trim()
                        setGitBranches((prev) => [...prev, newBr])
                        setActiveWorkspace((prev) => ({
                          ...prev,
                          branch: newBr,
                        }))
                        setNewBranchInput("")
                        setShowNewBranchInput(false)
                        setEnvDropdown("none")
                        showEnvToastMessage(
                          `已创建并切换至新分支: ${newBr}`,
                        )
                      }
                    }}
                    className="px-2 py-0.5 bg-[#2d5a43] text-white text-[11px] rounded-md hover:bg-[#234937] cursor-pointer"
                  >
                    创建
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowNewBranchInput(true)}
                  className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-lg text-[10.5px] text-[#2d5a43] hover:bg-[#edf4ec] font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-[#2d5a43]" />
                  <span>新建分支...</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Row 4: 提交或推送 (Commit or Push) */}
        <div>
          <button
            type="button"
            onClick={() => {
              showEnvToastMessage(
                "已提交更改并推送到 origin/" +
                  activeWorkspace.branch,
              )
            }}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#1a211c] transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#5c6760]">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8H6M10 8H14"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="2.2"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </div>
              <span className="font-normal text-[12.5px]">
                提交或推送
              </span>
            </div>
          </button>
        </div>

        {/* Row 5: 无法获取 Pull Request 状态 */}
        <div>
          <button
            type="button"
            onClick={() => {
              showEnvToastMessage(
                "PR 状态: 未检测到关联的 GitHub Pull Request",
              )
            }}
            className="w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#5c6760] hover:text-[#1a211c] transition-colors cursor-pointer text-left"
          >
            <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#5c6760] flex-shrink-0">
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.09 10 14.96 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                />
              </svg>
            </div>
            <span className="text-[12.5px] truncate font-normal">
              无法获取 Pull Request 状态
            </span>
          </button>
        </div>

        {/* Row 6: 比较分支 (Compare Branches) */}
        <div>
          <button
            type="button"
            onClick={() => {
              openReviewTab()
              showEnvToastMessage("正在比较分支差异...")
            }}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#5c6760] hover:text-[#1a211c] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#5c6760] flex-shrink-0">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.09 10 14.96 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  />
                </svg>
              </div>
              <span className="text-[12.5px] truncate font-normal">
                比较分支
              </span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#9ca3af] flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-[#eae6dc] my-1" />

      {/* Card Section 2: 来源 Header */}
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="text-[13px] font-medium text-[#747f78] tracking-tight">
          来源
        </span>
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setEnvDropdown(
                envDropdown === "sourcesPlus"
                  ? "none"
                  : "sourcesPlus",
              )
            }
            title="添加来源"
            className={`w-6 h-6 rounded-md flex items-center justify-center text-[#747f78] hover:text-[#1a211c] hover:bg-[#f7f5ef] transition-colors cursor-pointer ${
              envDropdown === "sourcesPlus"
                ? "bg-[#f7f5ef] text-[#1a211c]"
                : ""
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Sources Plus Menu */}
          {envDropdown === "sourcesPlus" && (
            <div className="absolute right-0 top-7 w-44 bg-white border border-[#eae6dc] rounded-xl shadow-xl py-1.5 z-50 text-[12px] space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
              <button
                type="button"
                onClick={() => {
                  setEnvDropdown("none")
                  showEnvToastMessage("已从系统剪贴板导入新来源")
                }}
                className="w-full px-3 py-1.5 text-left text-[#4a534c] hover:bg-[#edf4ec] hover:text-[#2d5a43] flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span>粘贴剪贴板内容</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEnvDropdown("none")
                  showEnvToastMessage("已选择本地文件作为上下文来源")
                }}
                className="w-full px-3 py-1.5 text-left text-[#4a534c] hover:bg-[#edf4ec] hover:text-[#2d5a43] flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>选择本地文件...</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section 2 Rows List */}
      <div className="space-y-0.5 text-[12.5px]">
        {/* Item 1: Clipboard Text Source */}
        <button
          type="button"
          onClick={() => {
            showEnvToastMessage(
              "已载入剪贴板来源: codex-clipboard-3898a4b2",
            )
          }}
          title="codex-clipboard-3898a4b2-63b3-4a71-9df9-c3d52368c12b"
          className="w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#4b5563] hover:text-[#1a211c] transition-colors cursor-pointer text-left group"
        >
          <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#9ca3af] group-hover:text-[#5c6760] flex-shrink-0">
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="2 1.5"
            >
              <rect x="2.5" y="2" width="11" height="12" rx="2" />
              <path
                d="M5 5.5h6M5 8h4"
                strokeDasharray="none"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-mono text-[11.5px] truncate text-[#4b5563] group-hover:text-[#1a211c]">
            codex-clipboard-3898a4b2-63b3-4a71...
          </span>
        </button>

        {/* Item 2: Clipboard Image Source */}
        <button
          type="button"
          onClick={() => {
            showEnvToastMessage(
              "已载入图片上下文: codex-clipboard-506c9f2d",
            )
          }}
          title="codex-clipboard-506c9f2d-3b7a-4de4-859a-302efd978a59.png"
          className="w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#4b5563] hover:text-[#1a211c] transition-colors cursor-pointer text-left group"
        >
          <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#9ca3af] group-hover:text-[#5c6760] flex-shrink-0">
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="2 1.5"
            >
              <rect x="2.5" y="2" width="11" height="12" rx="2" />
              <circle
                cx="5.5"
                cy="5.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
              <path
                d="M3.5 12l3-3 2 2 3-3 2 2"
                strokeDasharray="none"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-mono text-[11.5px] truncate text-[#4b5563] group-hover:text-[#1a211c]">
            codex-clipboard-506c9f2d-3b7a-4de4...
          </span>
        </button>

        {/* Item 3: 查看全部 */}
        <button
          type="button"
          onClick={() => {
            showEnvToastMessage(
              "已展开当前会话全部 2 项上下文来源",
            )
          }}
          className="w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-xl hover:bg-[#f7f5ef] text-[#5c6760] hover:text-[#1a211c] transition-colors cursor-pointer text-left group"
        >
          <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#747f78] group-hover:text-[#2d5a43] flex-shrink-0">
            <Link2 className="w-4 h-4" />
          </div>
          <span className="text-[12.5px] text-[#5c6760] group-hover:text-[#1a211c] font-normal">
            查看全部
          </span>
        </button>
      </div>
    </div>
  )

  const totalWindowWidth =
    leftSidebarWidth +
    6 +
    mainWidth +
    (rightPanelOpen ? rightPanelWidth + 6 : 0)

  return (
    <div
      data-theme={settingThemeMode === "深色" ? "dark" : "light"}
      className={`w-screen h-screen ${
        settingThemeMode === "深色" ? "dark bg-[#100e0c]" : "bg-[#f4f2ec]"
      } flex items-center justify-start overflow-x-auto overflow-y-hidden select-none font-sans`}
    >
      {/* Tokmon Agent Desktop Window */}
      <div
        style={{
          width: isMaximized || isRightPanelFullscreen ? "100vw" : `${totalWindowWidth}px`,
        }}
        className={`h-full flex flex-col bg-[#ffffff] text-[#1a211c] overflow-hidden relative ${
          isDragging
            ? "transition-none"
            : "transition-[width] duration-150 ease-out"
        } ${
          isMaximized || isRightPanelFullscreen
            ? "w-screen rounded-none"
            : "border-r border-[#e2ded4] shadow-2xl"
        }`}
      >
        {/* App Main Layout Grid */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* ========================================================= */}
          {/* COLUMN 1: LEFT SIDEBAR */}
          {/* ========================================================= */}
          <aside
            style={{
              width: isRightPanelFullscreen || !leftSidebarOpen ? "0px" : `${leftSidebarWidth}px`,
              display: isRightPanelFullscreen ? "none" : undefined,
            }}
            className={`h-full flex-shrink-0 bg-[#ffffff] ${
              !isRightPanelFullscreen && leftSidebarOpen ? "border-r border-[#eae6dc]/70" : "border-r-0 hidden"
            } flex flex-col justify-between overflow-hidden ${
              isDragging
                ? "transition-none"
                : "transition-[width] duration-150 ease-out"
            }`}
          >
            {/* Header with Tokmon Logo (Pinned outside scrollable tree) */}
            <div className="h-[46px] min-w-[240px] flex-shrink-0 px-4 border-b border-[#eae6dc]/60 flex items-center justify-between bg-[#ffffff]">
              <div className="flex items-center space-x-2 cursor-pointer">
                <TokmonLogo />
                <span className="text-[17px] font-bold tracking-tight text-[#1a211c]">
                  Tokmon
                </span>
              </div>
            </div>

            {/* Scrollable Tree Navigation & Content Area (Fills entire window height, zero horizontal scrollbar) */}
            <div className="flex-1 min-h-0 min-w-[240px] overflow-y-auto overflow-x-hidden p-3 space-y-3 custom-scrollbar bg-[#ffffff]">
              {/* New Conversation Button */}
              <button
                onClick={handleOpenNewConvModal}
                className="flex items-center justify-center space-x-1.5 w-full py-2.5 px-4 rounded-xl bg-[#f0f6ef] hover:bg-[#e4efe2] text-[#2d5a43] font-medium text-[13px] active:scale-98 transition-all cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4 text-[#2d5a43]" strokeWidth={2.2} />
                <span>新建会话</span>
              </button>

              {/* Search Input Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#949e97] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索会话、项目或分组..."
                  className="w-full bg-[#f8f7f4] border border-[#eeebe3] rounded-xl pl-9 pr-8 py-1.5 text-[12.5px] text-[#1a211c] placeholder-[#949e97] focus:outline-none focus:bg-white focus:border-[#2d5a43] focus:ring-1 focus:ring-[#2d5a43]/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[#f0ede6] rounded text-[#747f78] hover:text-[#1a211c] transition-colors cursor-pointer"
                    title="清空搜索"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 3-Level Dynamic Tree Navigation (分组 Group -> 项目 Project -> 会话 Conversation) */}
              <div className="pt-1 space-y-1">
                <div className="flex items-center justify-between px-2 py-1 text-[11.5px] text-[#747f78] font-medium tracking-wider">
                  <span>分组 / 项目 / 会话</span>
                  {searchQuery.trim() && (
                    <span className="text-[10px] bg-[#edf4ec] text-[#2d5a43] border border-[#cddcd0] px-1.5 py-0.2 rounded font-medium">
                      找到{" "}
                      {filteredTreeData.reduce(
                        (acc, g) =>
                          acc +
                          g.projects.reduce(
                            (pAcc, p) => pAcc + p.conversations.length,
                            0,
                          ),
                        0,
                      )}{" "}
                      个会话
                    </span>
                  )}
                </div>

                {filteredTreeData.length === 0 ? (
                  <div className="py-8 px-2 text-center space-y-2">
                    <div className="w-9 h-9 mx-auto rounded-full bg-[#f8f7f4] flex items-center justify-center text-[#949e97]">
                      <Search className="w-4 h-4" />
                    </div>
                    <div className="text-[12.5px] text-[#747f78] font-medium">
                      未找到匹配的会话、项目或分组
                    </div>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-[11.5px] text-[#2d5a43] hover:underline font-medium cursor-pointer"
                    >
                      清除搜索条件
                    </button>
                  </div>
                ) : (
                  filteredTreeData.map((group) => (
                    <div key={group.id} className="space-y-0.5 text-[13px]">
                      {/* Group Header Row */}
                      <div className="flex items-center justify-between pl-2 pr-1 py-1 rounded-md hover:bg-[#f7f6f2] text-[#252d27] transition-colors group/group">
                        <button
                          onClick={() => {
                            setTreeData((prev) =>
                              prev.map((g) =>
                                g.id === group.id
                                  ? { ...g, isOpen: !g.isOpen }
                                  : g,
                              ),
                            )
                          }}
                          className="flex items-center space-x-1.5 font-semibold text-left flex-1 min-w-0 cursor-pointer"
                        >
                          {group.isOpen || !!searchQuery.trim() ? (
                            <ChevronDown className="w-3.5 h-3.5 text-[#747f78] flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-[#747f78] flex-shrink-0" />
                          )}
                          <Folder className="w-4 h-4 text-[#2d5a43] flex-shrink-0" />
                          <span className="truncate">
                            {renderHighlightedText(group.name, searchQuery)}
                          </span>
                        </button>

                        {/* Quick Add Button on Group Header (Hidden by default, shows on hover of this group only, aligned) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()

                            handleQuickCreateInGroup(group.name)
                          }}
                          className="w-5.5 h-5.5 rounded-md hover:bg-[#f0ece3] text-[#747f78] hover:text-[#2d5a43] flex items-center justify-center opacity-0 group-hover/group:opacity-100 transition-all cursor-pointer flex-shrink-0"
                          title={`在「${group.name}」快速新建会话`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Group Projects */}
                      {(group.isOpen || !!searchQuery.trim()) && (
                        <div className="pl-3.5 space-y-1 border-l-2 border-[#eae6dc] ml-3.5">
                          {group.projects.map((project) => (
                            <div key={project.id}>
                              {/* Project Header Row */}
                              <div className="flex items-center justify-between pl-1.5 pr-1 py-1 rounded-md hover:bg-[#f7f6f2] text-[#4a534c] transition-colors group/proj">
                                <button
                                  onClick={() => {
                                    setTreeData((prev) =>
                                      prev.map((g) =>
                                        g.id === group.id
                                          ? {
                                              ...g,

                                              projects: g.projects.map((p) =>
                                                p.id === project.id
                                                  ? { ...p, isOpen: !p.isOpen }
                                                  : p,
                                              ),
                                            }
                                          : g,
                                      ),
                                    )
                                  }}
                                  className="flex items-center space-x-1.5 font-medium text-[12.5px] text-left flex-1 min-w-0 cursor-pointer"
                                >
                                  {project.isOpen || !!searchQuery.trim() ? (
                                    <ChevronDown className="w-3 h-3 text-[#949e97] flex-shrink-0" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3 text-[#949e97] flex-shrink-0" />
                                  )}
                                  <Box className="w-3.5 h-3.5 text-[#949e97] flex-shrink-0" />
                                  <span className="truncate">
                                    {renderHighlightedText(
                                      project.name,
                                      searchQuery,
                                    )}
                                  </span>
                                </button>

                                {/* Quick Add Button on Project Header (Hidden by default, shows on hover of this project only, aligned) */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()

                                    handleQuickCreateInProject(
                                      group.name,
                                      project.name,
                                    )
                                  }}
                                  className="w-5.5 h-5.5 rounded-md hover:bg-[#f0ece3] text-[#747f78] hover:text-[#2d5a43] flex items-center justify-center opacity-0 group-hover/proj:opacity-100 transition-all cursor-pointer flex-shrink-0"
                                  title={`在项目「${project.name}」新建会话`}
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Project Conversations */}
                              {(project.isOpen || !!searchQuery.trim()) && (
                                <div className="pl-3 space-y-0.5 mt-0.5">
                                  {project.conversations.map((item) => (
                                    <div
                                      key={item}
                                      onClick={() =>
                                        handleSelectConversationItem(
                                          item,
                                          group.name,
                                          project,
                                        )
                                      }
                                      className={`cursor-pointer flex items-center space-x-2 px-2.5 py-1.5 rounded-xl text-[12px] transition-all ${
                                        selectedConversation === item
                                          ? "bg-[#edf5ec] text-[#2d5a43] font-semibold shadow-2xs"
                                          : "text-[#5c6760] hover:bg-[#f7f6f2]"
                                      }`}
                                    >
                                      <MessageSquare
                                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                                          selectedConversation === item
                                            ? "text-[#2d5a43]"
                                            : "text-[#949e97]"
                                        }`}
                                      />
                                      <span className="truncate">
                                        {renderHighlightedText(
                                          item,
                                          searchQuery,
                                        )}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Settings at Bottom (Pinned at bottom) */}
            <div className="p-3 min-w-[240px] border-t border-[#eae6dc]/70 flex-shrink-0 bg-[#ffffff]">
              <button
                onClick={() => setShowSettingsModal(true)}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#f7f6f2] text-[13.5px] text-[#4a534c] font-medium transition-colors text-left cursor-pointer"
              >
                <Settings className="w-4 h-4 text-[#747f78]" />
                <span>设置</span>
              </button>
            </div>
          </aside>

          {/* LEFT SIDEBAR RESIZER DIVIDER */}
          {!isRightPanelFullscreen && leftSidebarOpen && (
            <div className="relative flex-shrink-0 z-40 select-none h-full flex items-center">
              {/* Drag Hit Zone & Glowing Line */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault()

                  dragRef.current = {
                    startX: e.clientX,

                    startLeftWidth: leftSidebarWidth,

                    startMainWidth: mainWidth,

                    startRightWidth: rightPanelWidth,
                  }

                  setIsDraggingLeft(true)
                }}
                title="按住左右拖拽调整左侧栏与工作区宽度"
                className="w-2 -mx-1 h-full cursor-col-resize flex justify-center items-center group/line"
              >
                <div
                  className={`w-[2px] h-full transition-colors duration-150 ${
                    isDraggingLeft
                      ? "bg-[#2d5a43]/80"
                      : "bg-transparent group-hover/line:bg-[#2d5a43]/80"
                  }`}
                />
              </div>

              {/* Floating Border Toggle Pill Button (Sibling, does not trigger line hover) */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()

                  setLeftSidebarOpen(false)
                }}
                title="折叠侧边栏"
                className="absolute top-2.5 -left-2 z-50 w-6 h-6 rounded-md bg-white border border-[#eae6dc] shadow-2xs hover:shadow-md hover:border-[#2d5a43] hover:bg-[#ffffff] text-[#747f78] hover:text-[#2d5a43] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* COLUMN 2: MAIN CHAT & WORKFLOW EXECUTION */}
          {/* ========================================================= */}
          {!isRightPanelFullscreen && (
            <main
              style={{
                width:
                  isMaximized && !rightPanelOpen
                    ? undefined
                    : `${effectiveMainWidth}px`,
              }}
            className={`${
              isMaximized && !rightPanelOpen ? "flex-1" : "flex-shrink-0"
            } flex flex-col bg-[#ffffff] overflow-hidden relative ${
              isDragging
                ? "transition-none"
                : "transition-[width] duration-150 ease-out"
            }`}
          >
            {/* Middle Column Top Header Bar (Height aligned with Left & Right sidebars: 46px) */}
            <div className="h-[46px] flex-shrink-0 border-b border-[#eae6dc]/60 bg-[#ffffff] flex items-center justify-between px-3.5 text-[12.5px] select-none z-30">
              <div className="flex items-center space-x-2 min-w-0">
                {!leftSidebarOpen && (
                  <button
                    onClick={() => setLeftSidebarOpen(true)}
                    title="展开侧边栏"
                    className="w-7 h-7 flex items-center justify-center hover:bg-[#eae6dc] rounded-md text-[#747f78] hover:text-[#1a211c] transition-colors cursor-pointer mr-1"
                  >
                    <PanelLeftOpen className="w-4 h-4" />
                  </button>
                )}
                <span className="font-semibold text-[13.5px] text-[#1a211c] truncate">
                  {selectedConversation || "生成音频时间轴字幕"}
                </span>
                <span className="text-[11px] font-mono text-[#949e97] bg-[#f7f5ef] px-2 py-0.5 rounded-full border border-[#eae6dc]/60 flex items-center space-x-1 flex-shrink-0">
                  <Folder className="w-3 h-3 text-[#747f78]" />
                  <span>{activeWorkspace.name}</span>
                </span>
              </div>

              {!rightPanelOpen && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handleToggleRightPanel}
                    title="展开代码审阅"
                    className="w-7 h-7 flex items-center justify-center hover:bg-[#eae6dc] rounded-md text-[#747f78] hover:text-[#1a211c] transition-colors cursor-pointer mr-1"
                  >
                    <PanelRightOpen className="w-4 h-4" />
                  </button>
                  <WindowControls
                    isMaximized={isMaximized}
                    onToggleMaximize={() => setIsMaximized(!isMaximized)}
                  />
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* FLOATING ENVIRONMENT PANEL / APPLE ASSISTIVETOUCH (Anchored to Top-Right) */}
            {/* ========================================================================= */}
            <div
              ref={envPanelRef}
              className="absolute top-[56px] right-4 z-40 select-none pointer-events-auto"
            >
              {/* Collapsed State: Apple iPhone AssistiveTouch Floating Button */}
              <div
                className={`transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-right transform-gpu ${
                  !isEnvPanelOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-75 pointer-events-none absolute top-0 right-0"
                }`}
              >
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => {
                      setManualOpenState("pinned")
                      setEnvDropdown("none")
                    }}
                    title="环境信息 (点击展开)"
                    className="w-12 h-12 rounded-[18px] bg-gradient-to-b from-white/95 via-white/90 to-[#f7f5ef]/90 hover:from-white hover:to-[#fcfbfa] active:scale-95 text-[#252d27] backdrop-blur-2xl border border-white/90 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ring-1 ring-[#eae6dc]/70 select-none"
                  >
                    {/* Authentic Apple AssistiveTouch Geometric Vector Glyph */}
                    <svg
                      className="w-7.5 h-7.5 text-[#343d37] group-hover:text-[#2d5a43] transition-colors duration-200"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Outer soft diffuse field */}
                      <circle
                        cx="16"
                        cy="16"
                        r="14.2"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />
                      {/* Outermost concentric ring */}
                      <circle
                        cx="16"
                        cy="16"
                        r="13.2"
                        stroke="currentColor"
                        strokeOpacity="0.22"
                        strokeWidth="1.4"
                      />
                      {/* Middle concentric ring */}
                      <circle
                        cx="16"
                        cy="16"
                        r="8"
                        stroke="currentColor"
                        strokeOpacity="0.65"
                        strokeWidth="2.2"
                      />
                      {/* Center solid core dot */}
                      <circle
                        cx="16"
                        cy="16"
                        r="3.5"
                        fill="currentColor"
                        fillOpacity="0.9"
                      />
                    </svg>

                    {/* Pulsing Status Dot with Ping Effect */}
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white shadow-xs"></span>
                    </span>
                  </button>

                  {/* Tooltip on Hover */}
                  <div className="absolute right-0 top-14 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 whitespace-nowrap bg-[#1a211c]/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl shadow-xl backdrop-blur-md border border-white/10 z-50 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>环境信息 · {activeWorkspace.name}</span>
                    <span className="text-[#949e97] font-mono">
                      ({activeWorkspace.branch})
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Floating Card */}
              <div
                className={`transition-all duration-240 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-right transform-gpu ${
                  isEnvPanelOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-1.5 pointer-events-none absolute top-0 right-0"
                }`}
              >
                {renderEnvCard()}
              </div>

              {/* Floating Toast Notification (when collapsed) */}
              {!isEnvPanelOpen && envToast && (
                <div className="absolute right-0 top-14 whitespace-nowrap bg-white text-[#252d27] text-[11.5px] font-medium px-3 py-1.5 rounded-xl shadow-xl border border-[#eae6dc] z-50 animate-in fade-in slide-in-from-top-1 duration-150 flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{envToast}</span>
                </div>
              )}
            </div>

            {mainViewMode === "chat" ? (
              messages.length === 0 ? (
                <div
                  className={`flex-1 min-h-0 overflow-y-auto px-6 py-6 custom-scrollbar flex items-center justify-center transition-all duration-150 ${
                    isSideBySide ? "pr-[308px]" : ""
                  }`}
                >
                  <div className="w-full max-w-[874px] mx-auto flex flex-col items-center justify-center text-center select-none animate-in fade-in duration-300">
                      {/* 1. Tokmon Brand SVG Logo (matching top-left logo) */}
                      <div className="relative mb-5 group cursor-pointer">
                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-b from-[#edf4ec] to-[#f0f5ee] border border-[#cddcd0] shadow-xs flex items-center justify-center group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                          <TokmonLogo size={36} />
                        </div>
                        {/* Subtle breathing ring */}
                        <div className="absolute -inset-1 bg-[#2d5a43]/10 rounded-[26px] -z-10 blur-xs group-hover:bg-[#2d5a43]/20 transition-colors" />
                      </div>

                      {/* 2. Main Question Heading */}
                      <div className="space-y-2 mb-8 max-w-[680px]">
                        <h2 className="text-[23px] sm:text-[25px] font-semibold text-[#1a211c] tracking-tight leading-snug">
                          你想让我们在{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setChangeWorkspacePathInput(activeWorkspace.path)

                              setShowChangeWorkspaceModal(true)
                            }}
                            title="点击切换或更换工作空间目录"
                            className="inline-flex items-center font-semibold text-[#1a211c] hover:text-[#2d5a43] border-b-2 border-dashed border-[#949e97] hover:border-[#2d5a43] pb-0.5 transition-colors cursor-pointer"
                          >
                            <span>{activeWorkspace.name}</span>
                          </button>{" "}
                          中构建什么？
                        </h2>
                        <p className="text-[13px] text-[#747f78]">
                          智能体已就绪，当前关联工作空间{" "}
                          <span className="font-mono text-[#2d5a43] font-medium bg-[#edf4ec] px-1.5 py-0.5 rounded border border-[#cddcd0]">
                            {activeWorkspace.shortPath}
                          </span>
                        </p>
                      </div>

                      {/* 3. Four Action / Quick Starter Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full text-left">
                        {/* Card 1: 探索并理解代码 */}
                        <div
                          onClick={() => {
                            setInputMessage(
                              `请全面分析并梳理当前工作空间（${activeWorkspace.name}）的代码架构、模块依赖与核心实现逻辑。`,
                            )

                            if (textareaRef.current) {
                              textareaRef.current.focus()
                            }
                          }}
                          className="bg-white hover:bg-[#f9fbf8] border border-[#eae6dc] hover:border-[#4a7860] shadow-2xs hover:shadow-md rounded-2xl p-4 flex flex-col justify-between h-[126px] cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-[#edf4ec] flex items-center justify-center text-[#2d5a43] group-hover:scale-110 group-hover:bg-[#e2ede0] transition-all">
                            {/* Custom Telescope / Code Explorer SVG */}
                            <svg
                              className="w-4.5 h-4.5"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5 3.5L11 9M11 9L8 6L13.5 0.5L16.5 3.5ZM11 9L6.5 13.5M6.5 13.5L3.5 10.5L8 6L11 9ZM6.5 13.5L2 18"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle cx="2" cy="18" r="1" fill="currentColor" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold text-[#1a211c] group-hover:text-[#2d5a43] transition-colors leading-snug">
                              探索并理解代码
                            </h4>
                            <p className="text-[11px] text-[#949e97] mt-0.5 line-clamp-1">
                              梳理架构、依赖与核心逻辑
                            </p>
                          </div>
                        </div>

                        {/* Card 2: 构建新功能或应用 */}
                        <div
                          onClick={() => {
                            setInputMessage(
                              `我想为当前工作空间（${activeWorkspace.name}）构建一个新功能，请帮我规划设计方案并编写实现代码。`,
                            )

                            if (textareaRef.current) {
                              textareaRef.current.focus()
                            }
                          }}
                          className="bg-white hover:bg-[#f9fbf8] border border-[#eae6dc] hover:border-[#4a7860] shadow-2xs hover:shadow-md rounded-2xl p-4 flex flex-col justify-between h-[126px] cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-[#edf4ec] flex items-center justify-center text-[#2d5a43] group-hover:scale-110 group-hover:bg-[#e2ede0] transition-all">
                            {/* Custom Builder / Hammer SVG */}
                            <svg
                              className="w-4.5 h-4.5"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14 2L18 6L15 9L11 5L14 2Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 6L4 14L2 18L6 16L14 8"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold text-[#1a211c] group-hover:text-[#2d5a43] transition-colors leading-snug">
                              构建新功能或应用
                            </h4>
                            <p className="text-[11px] text-[#949e97] mt-0.5 line-clamp-1">
                              规划方案并编写实现代码
                            </p>
                          </div>
                        </div>

                        {/* Card 3: 审查代码并提出修改建议 */}
                        <div
                          onClick={() => {
                            setInputMessage(
                              `请对当前项目代码进行全面审查，指出潜在质量风险、规范问题并提出优化重构建议。`,
                            )

                            if (textareaRef.current) {
                              textareaRef.current.focus()
                            }
                          }}
                          className="bg-white hover:bg-[#f9fbf8] border border-[#eae6dc] hover:border-[#4a7860] shadow-2xs hover:shadow-md rounded-2xl p-4 flex flex-col justify-between h-[126px] cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-[#edf4ec] flex items-center justify-center text-[#2d5a43] group-hover:scale-110 group-hover:bg-[#e2ede0] transition-all">
                            {/* Custom Code Audit / Checkmark Refresh SVG */}
                            <svg
                              className="w-4.5 h-4.5"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                              <path
                                d="M3 6V10H7"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 10.5L10 12.5L14.5 8"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold text-[#1a211c] group-hover:text-[#2d5a43] transition-colors leading-snug">
                              审查代码并提建议
                            </h4>
                            <p className="text-[11px] text-[#949e97] mt-0.5 line-clamp-1">
                              排查隐患与提升代码规范
                            </p>
                          </div>
                        </div>

                        {/* Card 4: 修复问题和失败 */}
                        <div
                          onClick={() => {
                            setInputMessage(
                              `请帮我诊断当前工作空间中的报错和运行异常，定位原因并提供修复补丁。`,
                            )

                            if (textareaRef.current) {
                              textareaRef.current.focus()
                            }
                          }}
                          className="bg-white hover:bg-[#f9fbf8] border border-[#eae6dc] hover:border-[#4a7860] shadow-2xs hover:shadow-md rounded-2xl p-4 flex flex-col justify-between h-[126px] cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-[#edf4ec] flex items-center justify-center text-[#2d5a43] group-hover:scale-110 group-hover:bg-[#e2ede0] transition-all">
                            {/* Custom Bug / Diagnostic SVG */}
                            <svg
                              className="w-4.5 h-4.5"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="10"
                                cy="11"
                                r="5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                              />
                              <path
                                d="M10 6V4M10 6C11.5 6 12 4.5 12 4.5M10 6C8.5 6 8 4.5 8 4.5"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                              <path
                                d="M5 11H2M18 11H15M5.5 8L3 6.5M14.5 8L17 6.5M5.5 14L3 15.5M14.5 14L17 15.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M10 9V13"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold text-[#1a211c] group-hover:text-[#2d5a43] transition-colors leading-snug">
                              修复问题和失败
                            </h4>
                            <p className="text-[11px] text-[#949e97] mt-0.5 line-clamp-1">
                              诊断报错堆栈并修复异常
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ) : (
                /* Chat Messages & Execution Scroll Panel */
                <div
                  className={`flex-1 min-h-0 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar pb-6 transition-all duration-150 ${
                    isSideBySide ? "pr-[308px]" : ""
                  }`}
                >
                  <div className="w-full max-w-[874px] mx-auto space-y-6">
                    {/* Timestamp tag */}
                    <div className="text-center">
                      <span className="text-[11.5px] text-[#949e97] font-medium">
                        10:20
                      </span>
                    </div>

                    {/* Render Chat Messages */}
                    {messages.map((msg) => (
                        <div key={msg.id}>
                          {msg.sender === "user" ? (
                            <div className="flex justify-end">
                              <div className="max-w-[713px] bg-[#f0f6ef] dark:bg-[#251d16] rounded-[22px] rounded-br-[6px] p-3.5 sm:p-4 text-[13px] text-[#252d27] dark:text-[#ede5da] leading-relaxed shadow-2xs">
                                <p className="font-medium text-[#1a211c] dark:text-[#f5ece3] mb-1">
                                  {msg.text}
                                </p>
                                {msg.details && (
                                  <div className="font-mono text-[12px] text-[#5c6760] dark:text-[#dcd3c6] space-y-1 bg-white/70 dark:bg-[#1a140e]/95 p-2.5 rounded-xl mt-2">
                                    <p className="flex items-center space-x-1.5">
                                      <span className="text-[#949e97] dark:text-[#9c9282]">
                                        模型路径:
                                      </span>{" "}
                                      <span className="text-[#2d5a43] dark:text-[#e88d43] font-medium">
                                        {msg.details.modelPath}
                                      </span>
                                    </p>
                                    <p className="flex items-center space-x-1.5">
                                      <span className="text-[#949e97] dark:text-[#9c9282]">
                                        音频文件:
                                      </span>{" "}
                                      <span className="text-[#5c6760] dark:text-[#dcd3c6]">
                                        {msg.details.audioFile}
                                      </span>
                                    </p>
                                    <p className="flex items-center space-x-1.5">
                                      <span className="text-[#949e97] dark:text-[#9c9282]">
                                        输出字幕文件:
                                      </span>{" "}
                                      <span className="text-[#5c6760] dark:text-[#dcd3c6]">
                                        {msg.details.outputFile}
                                      </span>
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3 max-w-full">
                              {/* Thought Process (Chain of Thought Reasoning) Card */}
                              {(msg.thought || msg.isThinking) && (
                                <ThoughtProcessCard
                                  content={msg.thought || ""}
                                  isThinking={msg.isThinking}
                                  thinkingSeconds={thinkingSeconds}
                                  defaultExpanded={true}
                                />
                              )}

                              {/* Message Text or Animated Typing Indicator (Matches Screenshot Box 2) */}
                              {msg.text ? (
                                <div className="text-[13.5px] text-[#252d27] leading-relaxed whitespace-pre-line">
                                  {msg.text}
                                  {isGenerating &&
                                    msg.id === messages[messages.length - 1]?.id &&
                                    generationPhase === "streaming" && (
                                      <span className="inline-block w-1.5 h-4 ml-0.5 bg-[#2d5a43] animate-pulse align-middle" />
                                    )}
                                </div>
                              ) : (
                                /* Red Box 2 in Screenshot: Animated Loading Typing Bubble */
                                isGenerating &&
                                msg.id === messages[messages.length - 1]?.id && (
                                  <div className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#faf9f5] rounded-xl w-fit shadow-2xs animate-in fade-in duration-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a43] animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a43] animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a43] animate-bounce" />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Workflow Execution Log Container (Collapsible, Unified with Thought Process style) */}
                      <div className="bg-[#faf9f5] rounded-xl transition-all select-text overflow-hidden shadow-2xs">
                        {!isWorkflowExpanded ? (
                          /* Collapsed State: Slim single line bar matching thought process collapsed style */
                          <button
                            type="button"
                            onClick={() => setIsWorkflowExpanded(true)}
                            className="w-full flex items-center justify-between px-3.5 py-1 text-left cursor-pointer select-none group hover:bg-[#ededed] transition-colors focus:outline-none min-h-[26px]"
                          >
                            <div className="flex items-center space-x-2 min-w-0 flex-1 mr-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] flex-shrink-0" />
                              <span className="text-[12px] sm:text-[12.5px] text-[#8c968f] truncate font-normal leading-tight">
                                工作流执行完成 · 已探索 12 项 · 运行 9 条命令 · 任务
                                1/1 (用时 2分18秒)
                              </span>
                            </div>
                            <ChevronDown className="w-3.5 h-3.5 text-[#747f78] group-hover:text-[#1a211c] transition-colors flex-shrink-0 stroke-[1.8]" />
                          </button>
                        ) : (
                          /* Expanded State: Header with metrics and chevron up + step-by-step timeline content */
                          <div className="p-4 sm:p-5 space-y-3.5">
                            <button
                              type="button"
                              onClick={() => setIsWorkflowExpanded(false)}
                              className="w-full flex items-center justify-between text-left cursor-pointer select-none group focus:outline-none"
                            >
                              <div className="flex items-center space-x-2 sm:space-x-6">
                                <div className="flex items-center space-x-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />
                                  <span className="text-[13.5px] font-medium text-[#262626] group-hover:text-[#000000] transition-colors">
                                    工作流执行
                                  </span>
                                </div>
                                <div className="hidden sm:flex items-center space-x-4 text-[11.5px] text-[#747f78]">
                                  <span>
                                    已工作{" "}
                                    <strong className="text-[#1a211c] font-semibold ml-0.5">
                                      2分18秒
                                    </strong>
                                  </span>
                                  <span>
                                    已探索{" "}
                                    <strong className="text-[#1a211c] font-semibold ml-0.5">
                                      12 项
                                    </strong>
                                  </span>
                                  <span>
                                    已运行{" "}
                                    <strong className="text-[#1a211c] font-semibold ml-0.5">
                                      9 条命令
                                    </strong>
                                  </span>
                                  <span className="text-[#16a34a] font-semibold">
                                    1/1 完成
                                  </span>
                                </div>
                              </div>

                              <div className="text-[#747f78] group-hover:text-[#1a211c] transition-colors p-0.5">
                                <ChevronUp className="w-4 h-4 stroke-[1.8]" />
                              </div>
                            </button>

                            {/* Timeline Items on unified light gray background */}
                            <div className="space-y-2.5 text-[12.5px] pl-1 relative pt-1 animate-in fade-in duration-200">
                              <div className="absolute left-[7px] top-[14px] bottom-[14px] w-[1px] bg-[#eae6dc]" />

                              {/* Step 1: Start */}
                              <div className="flex items-start space-x-2.5 relative z-10">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#e8e6e0] border border-[#d8d6ce] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a43]" />
                                </div>
                                <span className="text-[#949e97] font-mono text-[11.5px]">
                                  10:21
                                </span>
                                <span className="text-[#1a211c]">
                                  开始任务: 使用{" "}
                                  <span className="font-mono text-[#2d5a43] font-medium">
                                    faster-whisper
                                  </span>{" "}
                                  转录音频并生成带时间戳字幕
                                </span>
                              </div>

                              {/* Step 2: Explore */}
                              <div className="flex items-start space-x-2.5 relative z-10">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#e8e6e0] border border-[#d8d6ce] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a43]" />
                                </div>
                                <span className="text-[#949e97] font-mono text-[11.5px]">
                                  10:21
                                </span>
                                <div className="flex items-center space-x-1.5 text-[#252d27]">
                                  <Folder className="w-3.5 h-3.5 text-[#747f78]" />
                                  <span>探索文件夹</span>
                                  <span className="font-mono text-[#5c6760]">
                                    C:\Projects\subtitle\
                                  </span>
                                </div>
                              </div>

                              {/* Step 3: Read config */}
                              <div className="flex items-start space-x-2.5 relative z-10">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#e8e6e0] border border-[#d8d6ce] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a43]" />
                                </div>
                                <span className="text-[#949e97] font-mono text-[11.5px]">
                                  10:21
                                </span>
                                <div className="flex items-center space-x-1.5 text-[#252d27]">
                                  <FileText className="w-3.5 h-3.5 text-[#747f78]" />
                                  <span>读取文件</span>
                                  <span className="font-mono text-[#1a211c] font-medium">
                                    config.yaml
                                  </span>
                                </div>
                              </div>

                              {/* Step 4: Python command */}
                              <div className="flex items-start space-x-2.5 relative z-10">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#22c55e]/20 border border-[#22c55e] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Check className="w-2.5 h-2.5 text-[#16a34a]" />
                                </div>
                                <span className="text-[#949e97] font-mono text-[11.5px]">
                                  10:22
                                </span>
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-1.5 text-[#252d27]">
                                    <span>运行命令</span>
                                    <span className="font-mono text-[#0284c7]">
                                      python -V
                                    </span>
                                  </div>
                                  <div className="text-[11.5px] font-mono text-[#747f78] pl-3">
                                    ↳ Python 3.10.11
                                  </div>
                                </div>
                              </div>

                              {/* Step 5: pip command */}
                              <div className="flex items-start space-x-2.5 relative z-10">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#22c55e]/20 border border-[#22c55e] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Check className="w-2.5 h-2.5 text-[#16a34a]" />
                                </div>
                                <span className="text-[#949e97] font-mono text-[11.5px]">
                                  10:22
                                </span>
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-1.5 text-[#252d27]">
                                    <span>运行命令</span>
                                    <span className="font-mono text-[#0284c7]">
                                      pip show faster-whisper
                                    </span>
                                  </div>
                                  <div className="text-[11.5px] font-mono text-[#747f78] pl-3">
                                    ↳ faster-whisper 1.1.1
                                  </div>
                                </div>
                              </div>

                              {/* Step 6: Script running */}
                              <div className="flex items-start space-x-2.5 relative z-10">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#eaf1e8] border border-[#eae5da] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a43]" />
                                </div>
                                <span className="text-[#949e97] font-mono text-[11.5px]">
                                  10:23
                                </span>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center space-x-1.5 text-[#252d27]">
                                    <FileCode className="w-3.5 h-3.5 text-[#2d5a43]" />
                                    <span>运行脚本</span>
                                    <span className="font-mono text-[#2d5a43] font-medium">
                                      transcribe.py
                                    </span>
                                    <span className="font-mono text-[#747f78] text-[11.5px]">
                                      --model large-v3-turbo --file
                                      C:\Data\audio.mp3
                                    </span>
                                  </div>
                                  <div className="text-[11.5px] text-[#747f78] pl-5 flex items-center space-x-2">
                                    <span>↳ 正在转录音频 (分段模式)</span>
                                    <span className="font-mono text-[#2d5a43] font-semibold">
                                      42%
                                    </span>
                                    <div className="w-24 h-1.5 bg-[#eae6dc] rounded-full overflow-hidden inline-block">
                                      <div className="h-full bg-[#2d5a43] rounded-full w-[42%]" />
                                    </div>
                                    <span className="text-[11px] text-[#949e97] font-mono">
                                      (剩余 00:01:32)
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Step 7: Output file */}
                              <div className="flex items-start space-x-2.5 relative z-10">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#e8e6e0] border border-[#d8d6ce] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a43]" />
                                </div>
                                <span className="text-[#949e97] font-mono text-[11.5px]">
                                  10:24
                                </span>
                                <div className="flex items-center space-x-1.5 text-[#252d27]">
                                  <FileText className="w-3.5 h-3.5 text-[#747f78]" />
                                  <span>生成文件</span>
                                  <span className="font-mono text-[#1a211c] font-medium">
                                    output.srt
                                  </span>
                                </div>
                              </div>

                              {/* Step 8: Done */}
                              <div className="flex items-start space-x-2.5 relative z-10">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#22c55e]/20 border border-[#22c55e] flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16a34a]" />
                                </div>
                                <span className="text-[#949e97] font-mono text-[11.5px]">
                                  10:24
                                </span>
                                <div className="text-[12.5px]">
                                  <span className="font-semibold text-[#166534]">
                                    任务已完成
                                  </span>
                                  <span className="text-[#5c6760] ml-2">
                                    字幕文件已生成:{" "}
                                    <span className="font-mono text-[#166534] font-medium">
                                      output.srt
                                    </span>{" "}
                                    (共 96 条字幕)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
            ) : (
              /* HIGH FIDELITY TRAJECTORY TRACE VIEW */

              <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-[#ffffff]">
                {/* Top Metrics Metrics Bar */}
                <div className="bg-white border border-[#eae6dc] rounded-2xl p-3.5 flex items-center justify-between shadow-2xs text-[12px] text-[#5c6760]">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#949e97]">🕒</span>
                      <span>
                        Duration{" "}
                        <strong className="text-[#1a211c] font-semibold ml-1">
                          4m 18.7s
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#949e97]">💬</span>
                      <span>
                        Turns{" "}
                        <strong className="text-[#1a211c] font-semibold ml-1">
                          1
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#949e97]">⚙️</span>
                      <span>
                        Calls{" "}
                        <strong className="text-[#1a211c] font-semibold ml-1">
                          1
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#949e97]">📊</span>
                      <span>
                        Total Tokens{" "}
                        <strong className="text-[#1a211c] font-semibold ml-1">
                          8,456
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#949e97]">📥</span>
                      <span>
                        Prompt{" "}
                        <strong className="text-[#1a211c] font-semibold ml-1">
                          1,324 (15.7%)
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#949e97]">📤</span>
                      <span>
                        Completion{" "}
                        <strong className="text-[#1a211c] font-semibold ml-1">
                          7,132 (84.3%)
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Search Box in Trajectory */}
                  <div className="relative w-[220px]">
                    <Search className="w-3.5 h-3.5 text-[#949e97] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={trajectorySearch}
                      onChange={(e) => setTrajectorySearch(e.target.value)}
                      placeholder="搜索轨迹..."
                      className="w-full bg-[#faf9f6] border border-[#eae6dc] rounded-lg pl-8 pr-3 py-1 text-[11.5px] text-[#1a211c] focus:outline-none focus:border-[#4a7860]"
                    />
                  </div>
                </div>

                {/* Waterfall Execution Timeline (Gantt Chart) */}
                <div className="bg-white border border-[#eae6dc] rounded-2xl p-4 shadow-2xs space-y-3">
                  {/* Time Scale Ticks */}
                  <div className="flex justify-between pl-16 pr-4 text-[11px] text-[#949e97] font-mono border-b border-[#f7f5ef] pb-1.5">
                    <span>0s</span>
                    <span>48s</span>
                    <span>1m 36s</span>
                    <span>2m 24s</span>
                    <span>3m 12s</span>
                    <span>4m 0s</span>
                    <span>4m 48s</span>
                  </div>

                  {/* Timeline Rows */}
                  <div className="space-y-2 text-[12px] font-medium text-[#747f78]">
                    {/* Row 1: Input */}
                    <div className="flex items-center space-x-3">
                      <span className="w-12 text-right text-[11.5px]">
                        Input
                      </span>
                      <div className="flex-1 h-3 bg-[#f7f5ef] rounded-full relative overflow-hidden">
                        <div
                          className="absolute left-[2%] width-[12%] h-full bg-[#6b7280] rounded-full"
                          style={{ width: "12%" }}
                        />
                        <div
                          className="absolute left-[15%] width-[14%] h-full bg-[#3b82f6] rounded-full"
                          style={{ width: "14%" }}
                        />
                        <div
                          className="absolute left-[30%] width-[20%] h-full bg-[#22c55e] rounded-full"
                          style={{ width: "20%" }}
                        />
                      </div>
                    </div>

                    {/* Row 2: Model */}
                    <div className="flex items-center space-x-3">
                      <span className="w-12 text-right text-[11.5px]">
                        Model
                      </span>
                      <div className="flex-1 h-3 bg-[#f7f5ef] rounded-full relative overflow-hidden">
                        <div
                          className="absolute left-[50%] width-[10%] h-full bg-[#a855f7] rounded-full"
                          style={{ width: "10%" }}
                        />
                        <div
                          className="absolute left-[65%] width-[10%] h-full bg-[#a855f7] rounded-full"
                          style={{ width: "10%" }}
                        />
                        <div
                          className="absolute left-[80%] width-[10%] h-full bg-[#a855f7] rounded-full"
                          style={{ width: "10%" }}
                        />
                      </div>
                    </div>

                    {/* Row 3: Tools */}
                    <div className="flex items-center space-x-3">
                      <span className="w-12 text-right text-[11.5px]">
                        Tools
                      </span>
                      <div className="flex-1 h-3 bg-[#f7f5ef] rounded-full relative overflow-hidden">
                        <div
                          className="absolute left-[61%] width-[12%] h-full bg-[#f97316] rounded-full"
                          style={{ width: "12%" }}
                        />
                        <div
                          className="absolute left-[76%] width-[12%] h-full bg-[#f97316] rounded-full"
                          style={{ width: "12%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Legend Bar */}
                  <div className="flex items-center space-x-6 text-[11.5px] text-[#747f78] pt-2 border-t border-[#f7f5ef] font-medium">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#6b7280]" />
                      <span>Input</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#3b82f6]" />
                      <span>Model (Thinking)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#22c55e]" />
                      <span>Model (Generating)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7]" />
                      <span>Tool Call</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#f97316]" />
                      <span>Tool Result</span>
                    </div>
                  </div>
                </div>

                {/* Grid Split: Events Table & Event Detail Inspector */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Left 8 Cols: Events List Table */}
                  <div className="col-span-8 bg-white border border-[#eae6dc] rounded-2xl p-4 shadow-2xs flex flex-col justify-between space-y-3">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#f7f5ef]">
                        <span className="font-bold text-[#1a211c] text-[13.5px]">
                          事件列表 (8)
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center space-x-1 px-2.5 py-1 bg-[#ffffff] hover:bg-[#f7f5ef] border border-[#eae6dc] rounded-lg text-[11.5px] text-[#5c6760]">
                            <Sliders className="w-3 h-3" />
                            <span>筛选</span>
                          </button>
                          <button className="flex items-center space-x-1 px-2.5 py-1 bg-[#ffffff] hover:bg-[#f7f5ef] border border-[#eae6dc] rounded-lg text-[11.5px] text-[#5c6760]">
                            <Download className="w-3 h-3" />
                            <span>导出</span>
                          </button>
                        </div>
                      </div>

                      {/* Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[12px]">
                          <thead>
                            <tr className="border-b border-[#f7f5ef] text-[#949e97] font-medium text-[11.5px]">
                              <th className="py-2 px-1">#</th>
                              <th className="py-2 px-2">时间</th>
                              <th className="py-2 px-2">类型</th>
                              <th className="py-2 px-2">角色</th>
                              <th className="py-2 px-2">内容 / 名称</th>
                              <th className="py-2 px-2 text-right">耗时</th>
                              <th className="py-2 px-2 text-right">Tokens</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#f7f5ef]">
                            {[
                              {
                                id: 1,
                                time: "00:00.000",
                                type: "USER",
                                typeBg: "bg-[#e0f2fe] text-[#0284c7]",
                                role: "User",
                                content: "请创建 result.txt，写入指定标记...",
                                duration: "-",
                                tokens: "45",
                              },

                              {
                                id: 2,
                                time: "00:01.234",
                                type: "CONTEXT",
                                typeBg: "bg-[#dcfce7] text-[#16a34a]",
                                role: "System",
                                content: "<system-reminder> The following...",
                                duration: "-",
                                tokens: "-",
                              },

                              {
                                id: 3,
                                time: "00:01.345",
                                type: "CONTEXT",
                                typeBg: "bg-[#dcfce7] text-[#16a34a]",
                                role: "System",
                                content: "Current runtime context. This...",
                                duration: "-",
                                tokens: "-",
                              },

                              {
                                id: 4,
                                time: "00:01.789",
                                type: "ASSISTANT",
                                typeBg: "bg-[#f3e8ff] text-[#9333ea]",
                                role: "Assistant",
                                content: "(tool call only)",
                                duration: "-",
                                tokens: "-",
                              },

                              {
                                id: 5,
                                time: "00:02.101",
                                type: "TOOL",
                                typeBg: "bg-[#edf4ec] text-[#234937]",
                                role: "write_file",
                                content: "write result.txt",
                                duration: "312ms",
                                tokens: "-",
                              },

                              {
                                id: 6,
                                time: "00:02.789",
                                type: "ASSISTANT",
                                typeBg: "bg-[#f3e8ff] text-[#9333ea]",
                                role: "Assistant",
                                content: "(tool call only)",
                                duration: "-",
                                tokens: "-",
                              },

                              {
                                id: 7,
                                time: "00:03.102",
                                type: "TOOL",
                                typeBg: "bg-[#edf4ec] text-[#234937]",
                                role: "bash",
                                content: "bash printf 'DSH_HARNESS_BASH_OK'",
                                duration: "521ms",
                                tokens: "-",
                              },

                              {
                                id: 8,
                                time: "00:03.823",
                                type: "ASSISTANT",
                                typeBg: "bg-[#f3e8ff] text-[#9333ea]",
                                role: "Assistant",
                                content: "DSH_HARNESS_TASK_COMPLETED",
                                duration: "-",
                                tokens: "128",
                              },
                            ].map((item) => (
                              <tr
                                key={item.id}
                                onClick={() =>
                                  setSelectedTrajectoryEvent(item.id)
                                }
                                className={`cursor-pointer transition-colors ${
                                  selectedTrajectoryEvent === item.id
                                    ? "bg-[#edf4ec]/60 font-medium"
                                    : "hover:bg-[#ffffff]"
                                }`}
                              >
                                <td className="py-2 px-1 text-[#747f78] font-mono">
                                  {item.id}
                                </td>
                                <td className="py-2 px-2 text-[#747f78] font-mono text-[11.5px]">
                                  {item.time}
                                </td>
                                <td className="py-2 px-2">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10.5px] font-bold font-mono ${item.typeBg}`}
                                  >
                                    {item.type}
                                  </span>
                                </td>
                                <td className="py-2 px-2 text-[#4a534c]">
                                  {item.role}
                                </td>
                                <td className="py-2 px-2 text-[#1a211c] font-mono truncate max-w-[180px]">
                                  {item.content}
                                </td>
                                <td className="py-2 px-2 text-right font-mono text-[#747f78]">
                                  {item.duration}
                                </td>
                                <td className="py-2 px-2 text-right font-mono text-[#747f78]">
                                  {item.tokens}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#f7f5ef] text-[11.5px] text-[#747f78]">
                      <span>显示 1-8 条，共 8 条</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <button className="p-1 hover:bg-[#f7f5ef] rounded text-[#949e97]">
                            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                          </button>
                          <span className="w-6 h-6 flex items-center justify-center bg-[#edf4ec] text-[#2d5a43] border border-[#fde68a] rounded font-bold">
                            1
                          </span>
                          <button className="p-1 hover:bg-[#f7f5ef] rounded text-[#949e97]">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <select className="bg-[#ffffff] border border-[#eae6dc] rounded px-2 py-0.5 text-[11px] font-medium text-[#4a534c]">
                          <option>20 条/页</option>
                          <option>50 条/页</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right 4 Cols: Event Detail Inspector Panel */}
                  <div className="col-span-4 bg-white border border-[#eae6dc] rounded-2xl p-4 shadow-2xs space-y-4 text-[12.5px]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#f7f5ef] pb-2.5">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#1a211c]" />
                        <span className="font-bold text-[#1a211c]">
                          Request #{selectedTrajectoryEvent || 1}
                        </span>
                        <span className="px-2 py-0.5 bg-[#f7f5ef] text-[#5c6760] text-[11px] rounded-full font-mono">
                          Turn 1
                        </span>
                      </div>
                      <button className="p-1 text-[#949e97] hover:text-[#1a211c]">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Inspector Tabs */}
                    <div className="flex items-center space-x-4 border-b border-[#f7f5ef] text-[12px] font-medium text-[#747f78] pb-2">
                      {(["Summary", "Options", "Usage", "Timing"] as const).map(
                        (tab) => (
                          <button
                            key={tab}
                            onClick={() => setTrajectoryDetailTab(tab)}
                            className={`transition-colors ${
                              trajectoryDetailTab === tab
                                ? "text-[#2d5a43] font-bold border-b-2 border-[#2d5a43] pb-1"
                                : "hover:text-[#1a211c]"
                            }`}
                          >
                            {tab}
                          </button>
                        ),
                      )}
                    </div>

                    {/* Summary Details */}
                    <div className="space-y-2.5 text-[12px]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#747f78]">Status</span>
                        <span className="px-2 py-0.5 bg-[#dcfce7] text-[#166534] font-semibold rounded text-[11px]">
                          Completed
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#747f78]">Provider</span>
                        <span className="font-mono text-[#1a211c]">
                          deepseek-official
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#747f78]">Model</span>
                        <span className="font-mono text-[#1a211c]">
                          deepseek-v4-flash
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#747f78]">Tool calls</span>
                        <span className="font-mono text-[#1a211c]">1</span>
                      </div>
                      <div className="flex justify-between items-center cursor-pointer hover:bg-[#ffffff] p-1 rounded">
                        <span className="text-[#747f78]">Result</span>
                        <span className="text-[#2d5a43] font-medium flex items-center space-x-1">
                          <span>Assistant Message</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Collapsible Accordions */}
                    <div className="border-t border-[#f7f5ef] pt-2 space-y-2 text-[12px] text-[#5c6760]">
                      <div className="flex justify-between items-center cursor-pointer p-1.5 hover:bg-[#ffffff] rounded">
                        <span>Options</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#949e97]" />
                      </div>
                      <div className="flex justify-between items-center cursor-pointer p-1.5 hover:bg-[#ffffff] rounded">
                        <span>Usage</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#949e97]" />
                      </div>
                      <div className="flex justify-between items-center cursor-pointer p-1.5 hover:bg-[#ffffff] rounded">
                        <span>Timing</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#949e97]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Input Box Area - Floating cleanly on background */}
            {/* Bottom Input Box Area - Floating cleanly on background */}
            <div
              className={`flex-shrink-0 px-6 pb-4 pt-1 bg-[#ffffff] z-30 transition-all duration-150 ${
                isSideBySide ? "pr-[308px]" : ""
              }`}
            >
              <div className="w-full max-w-[874px] mx-auto">
                {/* Embedded Backing Workspace Tab (Seamlessly docked directly behind the top edge with zero gap) */}
                <div className="flex items-center ml-5 relative z-0 -mb-[1px]">
                  <div className="inline-flex items-center space-x-2 px-3.5 pt-1.5 pb-1 bg-[#f3f1ea] hover:bg-[#ece8df] rounded-t-xl border-t border-l border-r border-black/[0.07] text-[11.5px] text-[#5c6760] select-none transition-colors shadow-2xs">
                    <div
                      onClick={() => {
                        if (messages.length === 0) {
                          setChangeWorkspacePathInput(activeWorkspace.path)

                          setShowChangeWorkspaceModal(true)
                        }
                      }}
                      className={`flex items-center space-x-1.5 ${
                        messages.length === 0
                          ? "hover:text-[#2d5a43] cursor-pointer"
                          : "cursor-default"
                      } transition-colors`}
                      title={
                        messages.length === 0
                          ? `工作空间: ${activeWorkspace.path} (点击更换)`
                          : `工作空间: ${activeWorkspace.path}`
                      }
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-[#2d5a43]" />
                      <span className="font-semibold text-[#1a211c]">
                        {activeWorkspace.name}
                      </span>
                    </div>
                    <span className="text-[#949e97]">·</span>
                    <div className="flex items-center space-x-1">
                      <Laptop className="w-3.5 h-3.5 text-[#5c6760]" />
                      <span>本地</span>
                    </div>
                    <span className="text-[#949e97]">·</span>
                    <div className="flex items-center space-x-1 font-mono text-[#2d5a43]">
                      <GitBranch className="w-3.5 h-3.5 text-[#2d5a43]" />
                      <span className="font-medium">
                        {activeWorkspace.branch}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main White Input Dialog Box Card (Seamlessly lays over the tab with zero gap) */}
                <div className="bg-white border border-black/[0.08] hover:border-black/[0.12] focus-within:border-[#2d5a43]/40 focus-within:ring-4 focus-within:ring-[#2d5a43]/5 rounded-[24px] shadow-[0_6px_24px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] p-3.5 sm:p-4 pointer-events-auto space-y-2.5 relative z-10 transition-all duration-200">
                  <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={handleTextareaInput}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()

                        handleSendMessage()
                      }
                    }}
                    placeholder={
                      messages.length === 0
                        ? "随心输入需求，或点击上方卡片快速开始..."
                        : "提出后续修改要求..."
                    }
                    rows={1}
                    style={{ minHeight: "38px" }}
                    className="w-full bg-transparent border-0 resize-none overflow-hidden text-[13.5px] text-[#1a211c] placeholder-[#949e97] focus:outline-none px-1 py-0.5 leading-relaxed transition-all"
                  />

                  {/* Bottom Toolbar Row with Rounded Badge Buttons */}
                  <div className="flex items-center justify-between pt-1 text-[12.5px]">
                    {/* Left Group: Attachments, Web Search, Access Level */}
                    <div className="flex items-center space-x-1">
                      <button
                        title="添加附件或上下文"
                        className="w-7 h-7 rounded-full bg-transparent hover:bg-black/[0.04] active:scale-95 text-[#5c6760] hover:text-[#1a211c] flex items-center justify-center transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      {/* Web Search Toggle Badge */}
                      <button
                        onClick={() => setEnableWebSearch(!enableWebSearch)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11.5px] font-medium transition-all cursor-pointer select-none active:scale-95 ${
                          enableWebSearch
                            ? "bg-transparent text-[#2d5a43] border border-[#2d5a43]/40 shadow-2xs font-semibold"
                            : "bg-transparent hover:bg-black/[0.04] text-[#747f78] hover:text-[#1a211c]"
                        }`}
                        title="联网搜索开关"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>联网</span>
                      </button>

                      {/* Access Level Dropdown Badge */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowAccessDropdown(!showAccessDropdown)
                          }
                          className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11.5px] bg-transparent hover:bg-black/[0.04] text-[#2d5a43] font-medium border border-transparent hover:border-black/[0.06] transition-all cursor-pointer select-none active:scale-95"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 text-[#2d5a43]" />
                          <span>{settingAccessLevel}</span>
                          <ChevronDown className="w-3 h-3 text-[#2d5a43]" />
                        </button>

                        {showAccessDropdown && (
                          <div className="absolute left-0 bottom-9 w-36 bg-white border border-black/[0.07] rounded-2xl shadow-xl py-1.5 z-50 text-[12px] animate-in fade-in zoom-in-95 duration-150">
                            {([
                              "完全访问",
                              "受信路径",
                              "按需确认",
                            ] as const).map((level) => (
                              <button
                                key={level}
                                onClick={() => {
                                  setSettingAccessLevel(level)

                                  setShowAccessDropdown(false)
                                }}
                                className={`w-full text-left px-3 py-1.5 hover:bg-[#edf4ec] flex items-center justify-between cursor-pointer ${
                                  settingAccessLevel === level
                                    ? "text-[#2d5a43] font-semibold"
                                    : "text-[#4a534c]"
                                }`}
                              >
                                <span>{level}</span>
                                {settingAccessLevel === level && (
                                  <Check className="w-3.5 h-3.5 text-[#2d5a43]" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Group: Context Gauge, Model Selector, Reasoning Level, Send/Stop */}
                    <div className="flex items-center space-x-1.5">
                      {/* Context Capacity Gauge Badge */}
                      <div
                        className="relative"
                        onMouseEnter={() => setShowContextPopover(true)}
                        onMouseLeave={() => setShowContextPopover(false)}
                      >
                        <button
                          onClick={() =>
                            setShowContextPopover(!showContextPopover)
                          }
                          className="w-7 h-7 rounded-full bg-transparent hover:bg-black/[0.04] text-[#747f78] hover:text-[#1a211c] flex items-center justify-center transition-all cursor-pointer active:scale-95"
                          title="上下文用量"
                        >
                          <CircleDashed className="w-4 h-4 text-[#747f78]" />
                        </button>

                        {/* Context Capacity Hover Popover Card */}
                        {showContextPopover && (
                          <div className="absolute right-0 bottom-9 w-[320px] bg-white border border-black/[0.07] rounded-2xl shadow-2xl p-4 text-[12px] z-50 text-[#1a211c] space-y-3 pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[13px] text-[#1a211c]">
                                上下文容量
                              </span>
                              <span className="text-[11.5px] font-mono text-[#747f78]">
                                31.7万/100万 (31.7%)
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                              <div className="h-full bg-[#4a7860] rounded-full w-[31.7%]" />
                            </div>

                            {/* Breakdown List */}
                            <div className="space-y-1.5 text-[12px] pt-0.5">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                                  <span>消息</span>
                                </div>
                                <span className="font-mono font-medium text-[#1a211c]">
                                  94.4%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 rounded-full bg-[#60a5fa]" />
                                  <span>系统工具</span>
                                </div>
                                <span className="font-mono text-[#5c6760]">
                                  4.5%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 rounded-full bg-[#93c5fd]" />
                                  <span>系统提示词</span>
                                </div>
                                <span className="font-mono text-[#5c6760]">
                                  0.4%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 rounded-full bg-[#bfdbfe]" />
                                  <span>技能</span>
                                </div>
                                <span className="font-mono text-[#5c6760]">
                                  0.3%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 rounded-full bg-[#dbeafe]" />
                                  <span>MCP 工具</span>
                                </div>
                                <span className="font-mono text-[#5c6760]">
                                  0.3%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 rounded-full bg-[#e5e7eb]" />
                                  <span>其他</span>
                                </div>
                                <span className="font-mono text-[#747f78]">
                                  0%
                                </span>
                              </div>
                            </div>

                            <div className="border-t border-[#f7f5ef] pt-2 flex justify-between items-center text-[12px]">
                              <span className="text-[#5c6760]">
                                平均缓存命中率
                              </span>
                              <span className="font-mono font-bold text-[#1a211c]">
                                98.6%
                              </span>
                            </div>

                            <div className="border-t border-[#f7f5ef] pt-2 space-y-1.5">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-[12px] text-[#1a211c]">
                                  剩余额度
                                </span>
                                <span className="text-[11px] text-[#747f78] hover:text-[#1a211c] cursor-pointer">
                                  更多 &gt;
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-[11px]">
                                <div>
                                  <p className="text-[#747f78]">
                                    5 小时{" "}
                                    <span className="text-[#949e97]">
                                      已重置
                                    </span>
                                  </p>
                                  <p className="font-mono font-semibold text-[#1a211c] mt-0.5">
                                    15% · 06:28
                                  </p>
                                  <div className="w-full h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden mt-1">
                                    <div className="h-full bg-[#3b82f6] rounded-full w-[15%]" />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-[#747f78]">每周</p>
                                  <p className="font-mono font-semibold text-[#1a211c] mt-0.5">
                                    43% · 8月26日
                                  </p>
                                  <div className="w-full h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden mt-1">
                                    <div className="h-full bg-[#16a34a] rounded-full w-[43%]" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Model Selector Pill Badge */}
                      <div className="relative">
                        <button
                          onClick={() => {
                            setShowModelDropdown(!showModelDropdown)

                            setShowReasoningDropdown(false)
                          }}
                          className="flex items-center space-x-1 px-2 py-1 rounded-full text-[11.5px] font-mono bg-transparent hover:bg-black/[0.04] text-[#4a534c] hover:text-[#1a211c] font-medium transition-all cursor-pointer select-none active:scale-95"
                        >
                          <span className="truncate max-w-[170px]">
                            {selectedChatModel}
                          </span>
                          <ChevronDown className="w-3 h-3 text-[#747f78]" />
                        </button>

                        {showModelDropdown && (
                          <div className="absolute right-0 bottom-9 w-56 bg-white border border-black/[0.07] rounded-2xl shadow-xl py-1.5 z-50 text-[12px] font-mono animate-in fade-in zoom-in-95 duration-150">
                            <div className="px-3 py-1 text-[11px] text-[#949e97] font-semibold border-b border-[#f7f5ef] font-sans">
                              选择模型
                            </div>
                            {[
                              "faster-whisper-large-v3-turbo",

                              "whisper-large-v3",

                              "deepseek-v4-flash",

                              "gpt-4o-transcribe",
                            ].map((model) => (
                              <button
                                key={model}
                                onClick={() => {
                                  setSelectedChatModel(model)

                                  setShowModelDropdown(false)
                                }}
                                className={`w-full text-left px-3 py-1.5 hover:bg-[#edf4ec] flex items-center justify-between cursor-pointer ${
                                  selectedChatModel === model
                                    ? "text-[#2d5a43] font-bold"
                                    : "text-[#4a534c]"
                                }`}
                              >
                                <span className="truncate">{model}</span>
                                {selectedChatModel === model && (
                                  <Check className="w-3.5 h-3.5 text-[#2d5a43] flex-shrink-0 ml-1" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Reasoning Strength Pill Badge */}
                      <div className="relative">
                        <button
                          onClick={() => {
                            setShowReasoningDropdown(!showReasoningDropdown)

                            setShowModelDropdown(false)
                          }}
                          className="flex items-center space-x-1 px-2 py-1 rounded-full text-[11.5px] bg-transparent hover:bg-black/[0.04] text-[#4a534c] hover:text-[#1a211c] font-medium transition-all cursor-pointer select-none active:scale-95"
                        >
                          <Brain className="w-3.5 h-3.5 text-[#747f78]" />
                          <span>{reasoningLevel}</span>
                          <ChevronDown className="w-3 h-3 text-[#747f78]" />
                        </button>

                        {showReasoningDropdown && (
                          <div className="absolute right-0 bottom-9 w-32 bg-white border border-black/[0.07] rounded-2xl shadow-xl py-1.5 z-50 text-[12px] animate-in fade-in zoom-in-95 duration-150">
                            <div className="px-3 py-1 text-[11px] text-[#949e97] font-semibold border-b border-[#f7f5ef]">
                              推理强度
                            </div>
                            {(["最高", "标准", "低"] as const).map((level) => (
                              <button
                                key={level}
                                onClick={() => {
                                  setReasoningLevel(level)

                                  setShowReasoningDropdown(false)
                                }}
                                className={`w-full text-left px-3 py-1.5 hover:bg-[#edf4ec] flex items-center justify-between cursor-pointer ${
                                  reasoningLevel === level
                                    ? "text-[#2d5a43] font-semibold"
                                    : "text-[#4a534c]"
                                }`}
                              >
                                <span>{level}</span>
                                {reasoningLevel === level && (
                                  <Check className="w-3.5 h-3.5 text-[#2d5a43]" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Send / Stop Generation Rounded Pill Button (Matches Screenshot Box 3) */}
                      {isGenerating ? (
                        <button
                          onClick={handleStopGeneration}
                          title="停止生成"
                          className="w-8 h-8 rounded-full bg-[#1a211c] hover:bg-red-600 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs relative group"
                        >
                          <span className="absolute inset-0 rounded-full border border-white/20 animate-pulse pointer-events-none" />
                          <Square className="w-3.5 h-3.5 fill-current text-white" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim()}
                          title={
                            inputMessage.trim()
                              ? "发送消息 (Enter)"
                              : "请输入需求..."
                          }
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs active:scale-95 ${
                            inputMessage.trim()
                              ? "bg-[#2d5a43] hover:bg-[#234937] text-white cursor-pointer shadow-sm"
                              : "bg-black/[0.05] dark:bg-white/[0.08] text-[#949e97] dark:text-[#6d6457] cursor-not-allowed"
                          }`}
                        >
                          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          )}

          {/* RIGHT PANEL RESIZER DIVIDER */}
          {!isRightPanelFullscreen && rightPanelOpen && (
            <div className="relative flex-shrink-0 z-40 select-none h-full flex items-center">
              {/* Drag Hit Zone & Glowing Line */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault()

                  dragRef.current = {
                    startX: e.clientX,

                    startLeftWidth: leftSidebarWidth,

                    startMainWidth: mainWidth,

                    startRightWidth: rightPanelWidth,
                  }

                  setIsDraggingRight(true)
                }}
                title="按住左右拖拽调整中间工作区与右侧栏宽度"
                className="w-2 -mx-1 h-full cursor-col-resize flex justify-center items-center group/line"
              >
                <div
                  className={`w-[2px] h-full transition-colors duration-150 ${
                    isDraggingRight
                      ? "bg-[#2d5a43]/80"
                      : "bg-transparent group-hover/line:bg-[#2d5a43]/80"
                  }`}
                />
              </div>

              {/* Floating Border Toggle Pill Button (Exact same physical pixel alignment) */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()

                  handleToggleRightPanel()
                }}
                title="折叠代码审阅"
                className="absolute top-2.5 -left-[28px] z-50 w-6 h-6 rounded-md bg-white border border-[#eae6dc] shadow-2xs hover:shadow-md hover:border-[#2d5a43] hover:bg-[#ffffff] text-[#747f78] hover:text-[#2d5a43] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <PanelRightClose className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* COLUMN 3: RIGHT PANEL (REVIEW / WORKSPACE / LAUNCHER)     */}
          {/* ========================================================= */}
          {rightPanelOpen ? (
            <section
              style={{
                width: isRightPanelFullscreen ? "100%" : `${rightPanelWidth}px`,
              }}
              className={`${
                isRightPanelFullscreen ? "flex-1 w-full" : "flex-shrink-0"
              } bg-[#ffffff] flex flex-col ${
                isRightPanelFullscreen ? "border-l-0" : "border-l border-[#eae6dc]/70"
              } ${
                isDragging
                  ? "transition-none"
                  : "transition-[width] duration-150 ease-out"
              } relative select-text`}
            >
              {/* TOAST FEEDBACK NOTIFICATION */}
              {toastMessage && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 bg-[#1a211c] text-white text-[12px] rounded-lg shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-2 duration-150 pointer-events-none">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>{toastMessage}</span>
                </div>
              )}

              {/* TOP TABS BAR (Height 46px aligned with Left Sidebar and Middle Column) */}
              <div className="h-[46px] flex-shrink-0 border-b border-[#eae6dc]/60 bg-[#ffffff] flex items-center justify-between px-3 text-[12.5px] select-none">
                <div className="flex items-center space-x-1.5 h-full overflow-x-auto no-scrollbar">
                  {openTabs.map((tab) => {
                    const isActive = rightPanelTab === tab.id
                    return (
                      <div
                        key={tab.id}
                        onClick={() => setRightPanelTab(tab.id)}
                        className={`h-[28px] px-3 rounded-full flex items-center space-x-1.5 cursor-pointer transition-all ${
                          isActive
                            ? "bg-white text-[#1a211c] font-medium shadow-2xs border border-black/[0.06]"
                            : "text-[#747f78] hover:bg-black/[0.04] hover:text-[#1a211c]"
                        }`}
                      >
                        {tab.id === "review" ? (
                          <ReviewIcon className="w-3.5 h-3.5 text-[#747f78]" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-[#747f78]" />
                        )}
                        <span>{tab.title}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            closeTab(tab.id)
                          }}
                          className="p-0.5 hover:bg-black/[0.06] rounded-full text-[#949e97] hover:text-[#1a211c] transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )
                  })}

                  {/* Open new tab button (+) */}
                  <button
                    onClick={() => {
                      if (!openTabs.find((t) => t.id === "review")) {
                        openReviewTab()
                      } else if (!openTabs.find((t) => t.id === "openFile")) {
                        openWorkspaceFileTab()
                      } else {
                        showToast("已打开全部标签页")
                      }
                    }}
                    title="添加标签页"
                    className="w-6 h-6 flex items-center justify-center hover:bg-black/[0.05] rounded-full text-[#747f78] hover:text-[#1a211c] transition-colors cursor-pointer ml-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Standard Window Controls (最小化, 窗口化, 关闭) */}
                <WindowControls
                  isMaximized={isMaximized}
                  onToggleMaximize={() => setIsMaximized(!isMaximized)}
                />
              </div>

              {/* ========================================================================= */}
              {/* VIEW 1: INITIAL LAUNCHER SCREEN (SCREENSHOT 3)                           */}
              {/* ========================================================================= */}
              {rightPanelTab === "launcher" ? (
                <div className="flex-1 flex flex-col items-center justify-center select-none bg-[#ffffff] p-6 animate-in fade-in duration-150">
                  <div className="w-full max-w-[260px] space-y-2.5">
                    <button
                      onClick={() => openReviewTab()}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-black/[0.04] text-[#252d27] transition-all group cursor-pointer border border-transparent hover:border-black/[0.05] shadow-2xs"
                    >
                      <div className="flex items-center space-x-3">
                        <ReviewIcon className="w-4 h-4 text-[#747f78] group-hover:text-[#2d5a43] transition-colors" />
                        <span className="text-[13.5px] font-medium">审查</span>
                      </div>
                      <kbd className="px-2.5 py-0.5 text-[11px] font-mono text-[#949e97] bg-white group-hover:bg-white rounded-full border border-black/[0.07] shadow-2xs">
                        Ctrl+Shift+G
                      </kbd>
                    </button>

                    <button
                      onClick={() => openWorkspaceFileTab()}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-black/[0.04] text-[#252d27] transition-all group cursor-pointer border border-transparent hover:border-black/[0.05] shadow-2xs"
                    >
                      <div className="flex items-center space-x-3">
                        <Folder className="w-4 h-4 text-[#747f78] group-hover:text-[#2d5a43] transition-colors" />
                        <span className="text-[13.5px] font-medium">文件</span>
                      </div>
                      <kbd className="px-2.5 py-0.5 text-[11px] font-mono text-[#949e97] bg-white group-hover:bg-white rounded-full border border-black/[0.07] shadow-2xs">
                        Ctrl+P
                      </kbd>
                    </button>
                  </div>
                </div>
              ) : rightPanelTab === "review" ? (
                /* ========================================================================= */
                /* VIEW 2: CODE REVIEW (DIFF) PANEL (SCREENSHOT 1)                           */
                /* ========================================================================= */
                <div className="flex-1 flex flex-col min-h-0 bg-[#ffffff] animate-in fade-in duration-150">
                  {/* GIT BRANCH & ACTIONS TOOLBAR */}
                  <div className="h-[42px] flex-shrink-0 border-b border-[#eae6dc]/60 px-3 flex items-center justify-between bg-[#ffffff] text-[12.5px] relative">
                    {/* Left: Branch selector, Stats badge, Tracking branch */}
                    <div className="flex items-center space-x-2.5">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowBranchDropdown(!showBranchDropdown)
                          }
                          className="flex items-center space-x-1 font-medium text-[#1a211c] hover:bg-[#f7f5ef] px-2 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          <span>分支</span>
                          <ChevronDown className="w-3.5 h-3.5 text-[#747f78]" />
                        </button>

                        {/* Branch Dropdown */}
                        {showBranchDropdown && (
                          <div className="absolute left-0 top-8 w-48 bg-white border border-[#eae6dc] rounded-xl shadow-xl py-1 z-50 text-[12px]">
                            <div className="px-3 py-1 text-[11px] text-[#949e97] font-semibold border-b border-[#f7f5ef]">
                              切换 Git 分支
                            </div>
                            {[
                              "main",
                              "dev",
                              "feat/subtitle-v2",
                              "release/v1.0",
                            ].map((branch) => (
                              <button
                                key={branch}
                                onClick={() => {
                                  setCurrentBranch(branch)
                                  setShowBranchDropdown(false)
                                  showToast(`已切换至分支: ${branch}`)
                                }}
                                className={`w-full text-left px-3 py-1.5 hover:bg-[#edf4ec] flex items-center justify-between cursor-pointer ${
                                  currentBranch === branch
                                    ? "text-[#2d5a43] font-semibold bg-[#edf4ec]"
                                    : "text-[#4a534c]"
                                }`}
                              >
                                <span className="font-mono">{branch}</span>
                                {currentBranch === branch && (
                                  <Check className="w-3.5 h-3.5 text-[#2d5a43]" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Total Additions / Deletions Badge */}
                      <span className="font-mono text-[12px] font-semibold">
                        <span className="text-[#16a34a]">+2</span>{" "}
                        <span className="text-[#dc2626] ml-0.5">-2</span>
                      </span>

                      {/* Remote Tracking */}
                      <div className="hidden sm:flex items-center space-x-1 text-[#747f78] text-[11.5px] hover:text-[#1a211c] cursor-pointer">
                        <span className="font-mono">
                          {currentBranch} → origin/{currentBranch}
                        </span>
                        <ChevronDown className="w-3 h-3 text-[#949e97]" />
                      </div>
                    </div>

                    {/* Right: Actions (More, Diff View Mode, Sidebar Toggle, Explorer, Commit & Push) */}
                    <div className="flex items-center space-x-1.5">
                      {/* More Menu */}
                      <div className="relative">
                        <button
                          onClick={() => setShowMoreGitMenu(!showMoreGitMenu)}
                          title="更多操作"
                          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#f7f5ef] text-[#747f78] hover:text-[#1a211c] transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                        {showMoreGitMenu && (
                          <div className="absolute right-0 top-8 w-44 bg-white border border-[#eae6dc] rounded-xl shadow-xl py-1 z-50 text-[12px]">
                            <button
                              onClick={() => {
                                setShowMoreGitMenu(false)
                                showToast("已暂存全部更改")
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-[#f7f5ef] text-[#4a534c] cursor-pointer"
                            >
                              暂存全部更改
                            </button>
                            <button
                              onClick={() => {
                                setShowMoreGitMenu(false)
                                showToast("已刷新 Git 状态")
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-[#f7f5ef] text-[#4a534c] cursor-pointer"
                            >
                              刷新审查状态
                            </button>
                            <button
                              onClick={() => {
                                setShowMoreGitMenu(false)
                                showToast("已放弃未暂存更改")
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-[#fee2e2] text-[#dc2626] cursor-pointer"
                            >
                              放弃未暂存更改
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Diff View Mode Toggle (Unified vs Split) */}
                      <button
                        onClick={() =>
                          setDiffViewMode(
                            diffViewMode === "unified" ? "split" : "unified",
                          )
                        }
                        title={`当前: ${
                          diffViewMode === "unified"
                            ? "内联对比 (点击切换为双列)"
                            : "双列对比 (点击切换为内联)"
                        }`}
                        className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
                          diffViewMode === "split"
                            ? "bg-[#edf4ec] text-[#2d5a43]"
                            : "hover:bg-[#f7f5ef] text-[#747f78] hover:text-[#1a211c]"
                        }`}
                      >
                        <DiffSplitIcon className="w-3.5 h-3.5" />
                      </button>

                      {/* Toggle Changed Files List */}
                      <button
                        onClick={() =>
                          setShowRightFileSidebar(!showRightFileSidebar)
                        }
                        title={
                          showRightFileSidebar
                            ? "隐藏变更文件列表"
                            : "显示变更文件列表"
                        }
                        className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
                          showRightFileSidebar
                            ? "bg-[#edf4ec] text-[#2d5a43]"
                            : "hover:bg-[#f7f5ef] text-[#747f78] hover:text-[#1a211c]"
                        }`}
                      >
                        <PanesIcon className="w-3.5 h-3.5" />
                      </button>

                      {/* Open Project Folder */}
                      <button
                        onClick={() => showToast("已在工作区中定位该文件")}
                        title="在资源管理器中打开"
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#f7f5ef] text-[#747f78] hover:text-[#1a211c] transition-colors cursor-pointer"
                      >
                        <Folder className="w-3.5 h-3.5" />
                      </button>

                      {/* Commit & Push Primary Button */}
                      <div className="relative">
                        <button
                          onClick={() => setShowCommitModal(!showCommitModal)}
                          className="flex items-center space-x-1.5 px-2.5 py-1 bg-white hover:bg-[#edf4ec] border border-[#ece8df] hover:border-[#2d5a43] rounded-lg text-[12px] font-medium text-[#252d27] transition-all cursor-pointer shadow-2xs"
                        >
                          <CommitPushIcon className="w-3.5 h-3.5 text-[#2d5a43]" />
                          <span>提交或推送</span>
                          <ChevronDown className="w-3 h-3 text-[#747f78]" />
                        </button>

                        {/* Commit & Push Popover Modal */}
                        {showCommitModal && (
                          <div className="absolute right-0 top-9 w-72 bg-white border border-[#eae6dc] rounded-2xl shadow-2xl p-3.5 z-50 text-[12px] animate-in fade-in slide-in-from-top-2 duration-150">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-[#1a211c]">
                                提交更改到 {currentBranch}
                              </span>
                              <button
                                onClick={() => setShowCommitModal(false)}
                                className="text-[#949e97] hover:text-[#1a211c]"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11.5px] text-[#747f78] mb-2.5">
                              已暂存 5 个文件 (+134 -11)
                            </p>

                            <textarea
                              value={commitMessage}
                              onChange={(e) => setCommitMessage(e.target.value)}
                              placeholder="输入提交信息 (例如: feat: 更新字幕文本)..."
                              rows={3}
                              className="w-full bg-[#faf9f6] border border-[#ece8df] rounded-xl p-2.5 text-[12px] text-[#1a211c] placeholder-[#949e97] focus:outline-none focus:border-[#2d5a43] resize-none mb-2.5"
                            />

                            <label className="flex items-center space-x-2 text-[11.5px] text-[#5c6760] mb-3 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={pushImmediately}
                                onChange={(e) =>
                                  setPushImmediately(e.target.checked)
                                }
                                className="rounded text-[#2d5a43] focus:ring-0"
                              />
                              <span>
                                提交后立即推送到远程 origin/{currentBranch}
                              </span>
                            </label>

                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setShowCommitModal(false)}
                                className="px-2.5 py-1 rounded-lg border border-[#ece8df] hover:bg-[#f7f5ef] text-[#747f78] transition-colors cursor-pointer"
                              >
                                取消
                              </button>
                              <button
                                onClick={() => {
                                  setShowCommitModal(false)
                                  setCommitMessage("")
                                  showToast(
                                    pushImmediately
                                      ? `✓ 已成功提交并推送到 origin/${currentBranch}!`
                                      : "✓ 已成功提交到本地仓库！",
                                  )
                                }}
                                className="px-3 py-1 rounded-lg bg-[#2d5a43] hover:bg-[#b05c22] text-white font-medium transition-colors cursor-pointer shadow-2xs"
                              >
                                {pushImmediately ? "提交并推送" : "仅提交"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BODY AREA: DIFF VIEWER (LEFT) + CHANGED FILES SIDEBAR (RIGHT) */}
                  <div className="flex-1 flex min-h-0 overflow-hidden">
                    {/* LEFT COLUMN: DIFF CODE VIEWER */}
                    {(() => {
                      const currentFile =
                        reviewFiles.find(
                          (f) => f.id === selectedReviewFileId,
                        ) || reviewFiles[0]

                      return (
                        <div className="flex-1 flex flex-col min-w-0 bg-[#ffffff] overflow-hidden">
                          {/* File Path Header Bar matching Screenshot 1 */}
                          <div className="h-[34px] flex-shrink-0 bg-[#ffffff] border-b border-[#eae6dc] px-3 flex items-center justify-between text-[12px] font-mono select-text">
                            <div className="flex items-center space-x-1.5 min-w-0 truncate">
                              <FileText className="w-3.5 h-3.5 text-[#747f78] flex-shrink-0" />
                              <span className="text-[#1a211c] truncate font-medium">
                                {currentFile.path}
                              </span>
                            </div>
                            <span className="font-mono text-[11.5px] font-semibold flex-shrink-0 ml-2">
                              <span className="text-[#16a34a]">
                                +{currentFile.additions}
                              </span>{" "}
                              <span className="text-[#dc2626] ml-0.5">
                                -{currentFile.deletions}
                              </span>
                            </span>
                          </div>

                          {/* Diff Lines Table */}
                          <div className="flex-1 overflow-y-auto overflow-x-auto font-mono text-[12px] leading-[20px] custom-scrollbar p-2 bg-[#ffffff] select-text">
                            {diffViewMode === "unified" ? (
                              /* UNIFIED (INLINE) VIEW */
                              <table className="w-full border-collapse">
                                <tbody>
                                  {currentFile.diffLines.map((line, idx) => {
                                    if (line.type === "banner") {
                                      const isExpanded =
                                        expandedBanners[
                                          `${currentFile.id}-${idx}`
                                        ]
                                      return (
                                        <tr key={idx}>
                                          <td colSpan={2} className="py-1">
                                            <div
                                              onClick={() =>
                                                setExpandedBanners((prev) => ({
                                                  ...prev,
                                                  [`${currentFile.id}-${idx}`]:
                                                    !isExpanded,
                                                }))
                                              }
                                              className="py-1 px-4 my-0.5 bg-[#faf9f5] hover:bg-[#eaeaea] text-[#747f78] text-[11.5px] rounded-lg text-left select-none cursor-pointer flex items-center justify-between transition-colors border border-[#ece8df]"
                                            >
                                              <span>{line.bannerText}</span>
                                              <span className="text-[10px] text-[#949e97]">
                                                {isExpanded
                                                  ? "点击折叠"
                                                  : "点击展开上下文"}
                                              </span>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    }

                                    if (line.type === "delete") {
                                      return (
                                        <tr
                                          key={idx}
                                          className="bg-[#fee2e2]/40 hover:bg-[#fee2e2]/60 transition-colors"
                                        >
                                          <td className="w-12 select-none text-right pr-3 text-[#dc2626] text-[11px] align-top font-mono bg-[#fecaca]/40 border-r border-[#fca5a5]/40 font-medium">
                                            {line.oldNum}
                                          </td>
                                          <td className="pl-3 whitespace-pre text-[#991b1b] align-top font-mono leading-[20px]">
                                            {line.text}
                                          </td>
                                        </tr>
                                      )
                                    }

                                    if (line.type === "add") {
                                      return (
                                        <tr
                                          key={idx}
                                          className="bg-[#dcfce7]/40 hover:bg-[#dcfce7]/60 transition-colors"
                                        >
                                          <td className="w-12 select-none text-right pr-3 text-[#16a34a] text-[11px] align-top font-mono bg-[#bbf7d0]/40 border-r border-[#86efac]/40 font-medium">
                                            {line.newNum}
                                          </td>
                                          <td className="pl-3 whitespace-pre text-[#166534] align-top font-mono leading-[20px]">
                                            {line.text}
                                          </td>
                                        </tr>
                                      )
                                    }

                                    return (
                                      <tr
                                        key={idx}
                                        className="hover:bg-[#ffffff]"
                                      >
                                        <td className="w-12 select-none text-right pr-3 text-[#949e97] text-[11px] align-top font-mono">
                                          {line.oldNum || line.newNum}
                                        </td>
                                        <td className="pl-3 whitespace-pre text-[#1a211c] align-top font-mono leading-[20px]">
                                          {line.text}
                                        </td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            ) : (
                              /* SPLIT (SIDE-BY-SIDE) VIEW */
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="border-b border-[#eae6dc] text-[11px] text-[#747f78]">
                                    <th className="w-1/2 text-left font-normal px-2 py-1 bg-[#fafafa]">
                                      原版本 (Original)
                                    </th>
                                    <th className="w-1/2 text-left font-normal px-2 py-1 bg-[#fafafa] border-l border-[#eae6dc]">
                                      修改后 (Modified)
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentFile.diffLines.map((line, idx) => {
                                    if (line.type === "banner") {
                                      return (
                                        <tr key={idx}>
                                          <td colSpan={2} className="py-1">
                                            <div className="py-1 px-4 my-0.5 bg-[#faf9f5] text-[#747f78] text-[11.5px] rounded-lg text-center select-none border border-[#ece8df]">
                                              {line.bannerText}
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    }

                                    if (line.type === "delete") {
                                      return (
                                        <tr key={idx}>
                                          <td className="w-1/2 bg-[#fee2e2]/40 text-[#991b1b] px-2 py-0.5 whitespace-pre">
                                            <span className="text-[#dc2626] font-mono mr-2 text-[11px]">
                                              {line.oldNum}
                                            </span>
                                            {line.text}
                                          </td>
                                          <td className="w-1/2 bg-[#f7f5ef]/50 border-l border-[#eae6dc] px-2 py-0.5" />
                                        </tr>
                                      )
                                    }

                                    if (line.type === "add") {
                                      return (
                                        <tr key={idx}>
                                          <td className="w-1/2 bg-[#f7f5ef]/50 px-2 py-0.5" />
                                          <td className="w-1/2 bg-[#dcfce7]/40 text-[#166534] px-2 py-0.5 whitespace-pre border-l border-[#eae6dc]">
                                            <span className="text-[#16a34a] font-mono mr-2 text-[11px]">
                                              {line.newNum}
                                            </span>
                                            {line.text}
                                          </td>
                                        </tr>
                                      )
                                    }

                                    return (
                                      <tr
                                        key={idx}
                                        className="hover:bg-[#ffffff]"
                                      >
                                        <td className="w-1/2 px-2 py-0.5 whitespace-pre text-[#1a211c]">
                                          <span className="text-[#949e97] font-mono mr-2 text-[11px]">
                                            {line.oldNum}
                                          </span>
                                          {line.text}
                                        </td>
                                        <td className="w-1/2 px-2 py-0.5 whitespace-pre text-[#1a211c] border-l border-[#eae6dc]">
                                          <span className="text-[#949e97] font-mono mr-2 text-[11px]">
                                            {line.newNum}
                                          </span>
                                          {line.text}
                                        </td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      )
                    })()}

                    {/* RIGHT SUB-SIDEBAR: CHANGED FILES LIST (MATCHES SCREENSHOT 1) */}
                    {showRightFileSidebar && (
                      <div className="w-48 sm:w-56 flex-shrink-0 border-l border-[#eae6dc]/60 bg-[#ffffff] flex flex-col min-h-0 select-none">
                        {/* Search Input */}
                        <div className="p-2 bg-[#ffffff]">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 text-[#949e97] absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={reviewFileSearch}
                              onChange={(e) =>
                                setReviewFileSearch(e.target.value)
                              }
                              placeholder="筛选文件..."
                              className="w-full bg-[#f3f1ea]/70 border-0 rounded-lg pl-7 pr-2 py-1 text-[11.5px] text-[#1a211c] placeholder-[#949e97] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2d5a43]/40 transition-all"
                            />
                          </div>
                        </div>

                        {/* Files Tree List */}
                        <div className="flex-1 overflow-y-auto p-1.5 space-y-1 custom-scrollbar text-[12px]">
                          {reviewFiles
                            .filter(
                              (f) =>
                                f.name
                                  .toLowerCase()
                                  .includes(reviewFileSearch.toLowerCase()) ||
                                f.path
                                  .toLowerCase()
                                  .includes(reviewFileSearch.toLowerCase()),
                            )
                            .map((file) => {
                              const isSelected =
                                selectedReviewFileId === file.id
                              return (
                                <div key={file.id} className="space-y-0.5">
                                  {/* Folder Header */}
                                  <div className="flex items-center justify-between px-2 py-0.5 text-[11px] text-[#747f78] font-mono">
                                    <div className="flex items-center space-x-1 min-w-0 truncate">
                                      <ChevronDown className="w-3 h-3 flex-shrink-0" />
                                      <span className="truncate">
                                        {file.displayFolder}
                                      </span>
                                    </div>
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                        file.status === "added"
                                          ? "bg-[#16a34a]"
                                          : "bg-[#2d5a43]"
                                      }`}
                                    />
                                  </div>

                                  {/* File Item */}
                                  <button
                                    onClick={() =>
                                      setSelectedReviewFileId(file.id)
                                    }
                                    className={`w-full text-left flex items-center justify-between px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                      isSelected
                                        ? "bg-white text-[#1a211c] font-medium shadow-2xs border border-black/[0.06]"
                                        : "hover:bg-black/[0.04] text-[#4a534c]"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-1.5 min-w-0 truncate">
                                      <FileText className="w-3.5 h-3.5 text-[#747f78] flex-shrink-0" />
                                      <span className="truncate text-[11.5px] font-mono">
                                        {file.displayName}
                                      </span>
                                    </div>
                                    <span
                                      className={`text-[10px] font-bold font-mono px-1 py-0.2 rounded ${
                                        file.status === "added"
                                          ? "bg-[#dcfce7] text-[#166534]"
                                          : "bg-[#edf4ec] text-[#234937]"
                                      }`}
                                    >
                                      {file.status === "added" ? "A" : "M"}
                                    </span>
                                  </button>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ========================================================================= */
                /* VIEW 3: WORKSPACE OPEN FILE PANEL (SCREENSHOT 2)                          */
                /* ========================================================================= */
                <div className="flex-1 flex min-h-0 bg-[#ffffff] animate-in fade-in duration-150">
                  {/* LEFT / CENTER VIEW */}
                  <div className="flex-1 flex flex-col min-w-0 bg-[#ffffff]">
                    {/* Header */}
                    <div className="h-[34px] flex-shrink-0 bg-[#ffffff] border-b border-[#eae6dc]/60 px-3 flex items-center justify-between text-[12px] font-mono text-[#5c6760]">
                      <div className="flex items-center space-x-2 min-w-0 truncate">
                        <span className="font-semibold text-[#1a211c]">C:</span>
                        {selectedWorkspaceFile && (
                          <span className="truncate text-[#1a211c] font-medium">
                            / {selectedWorkspaceFile}
                          </span>
                        )}
                      </div>

                      {/* Small Folder Icon Toggle Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setShowWorkspaceTreeSidebar(!showWorkspaceTreeSidebar)
                        }
                        title={
                          showWorkspaceTreeSidebar
                            ? "收起目录树"
                            : "展开目录树"
                        }
                        className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors cursor-pointer ${
                          showWorkspaceTreeSidebar
                            ? "text-[#2d5a43] hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
                            : "text-[#747f78] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] hover:text-[#1a211c]"
                        }`}
                      >
                        <Folder className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Main Workspace File Content / Empty State */}
                    {selectedWorkspaceFile ? (
                      <div className="flex-1 overflow-y-auto font-mono text-[12px] p-4 bg-[#ffffff] select-text custom-scrollbar">
                        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#eae6dc]/60">
                          <span className="font-semibold text-[#1a211c]">
                            {selectedWorkspaceFile}
                          </span>
                          <span className="text-[11px] text-[#747f78]">
                            只读模式
                          </span>
                        </div>
                        <pre className="text-[#252d27] whitespace-pre-wrap leading-relaxed">
                          {workspaceTreeItems.find(
                            (item) => item.name === selectedWorkspaceFile,
                          )?.content ||
                            `// ${selectedWorkspaceFile}\n// Content loaded from workspace`}
                        </pre>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center mb-4 text-[#747f78] shadow-2xs">
                          <FolderOpen className="w-8 h-8 stroke-[1.5]" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-[#1a211c] mb-1">
                          打开文件
                        </h3>
                        <p className="text-[12.5px] text-[#747f78]">
                          从工作区目录树中选择文件
                        </p>
                      </div>
                    )}
                  </div>

                  {/* RIGHT SUB-SIDEBAR: WORKSPACE DIRECTORY TREE (SCREENSHOT 2) */}
                  {showWorkspaceTreeSidebar && (
                    <div className="w-56 sm:w-64 flex-shrink-0 border-l border-[#eae6dc]/60 bg-[#ffffff] flex flex-col min-h-0 select-none animate-in fade-in duration-150">
                      {/* Search Bar */}
                      <div className="p-2.5 bg-[#ffffff]">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-[#949e97] absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={workspaceTreeSearch}
                            onChange={(e) =>
                              setWorkspaceTreeSearch(e.target.value)
                            }
                            placeholder="筛选文件..."
                            className="w-full bg-[#f3f1ea]/70 border-0 rounded-xl pl-8 pr-2.5 py-1 text-[12px] text-[#1a211c] placeholder-[#949e97] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#2d5a43]/40 transition-all"
                          />
                        </div>
                      </div>

                      {/* Workspace Directory Tree Items */}
                      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar text-[12.5px] font-mono">
                        {workspaceTreeItems
                          .filter((item) =>
                            item.name
                              .toLowerCase()
                              .includes(workspaceTreeSearch.toLowerCase()),
                          )
                          .map((item) => {
                            if (item.type === "folder") {
                              const isExpanded = expandedFolders[item.name]
                              return (
                                <div key={item.name} className="space-y-0.5">
                                  <button
                                    onClick={() =>
                                      setExpandedFolders((prev) => ({
                                        ...prev,
                                        [item.name]: !isExpanded,
                                      }))
                                    }
                                    className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-[#f7f5ef] text-[#4a534c] transition-colors cursor-pointer text-left"
                                  >
                                    {isExpanded ? (
                                      <ChevronDown className="w-3.5 h-3.5 text-[#747f78] flex-shrink-0" />
                                    ) : (
                                      <ChevronRight className="w-3.5 h-3.5 text-[#747f78] flex-shrink-0" />
                                    )}
                                    <span className="truncate">{item.name}</span>
                                  </button>

                                  {isExpanded && item.items && (
                                    <div className="pl-5 space-y-0.5">
                                      {item.items.map((subItem) => (
                                        <button
                                          key={subItem}
                                          onClick={() =>
                                            setSelectedWorkspaceFile(subItem)
                                          }
                                          className="w-full flex items-center space-x-1.5 px-2 py-0.5 rounded hover:bg-[#f7f5ef] text-[#747f78] hover:text-[#1a211c] text-[11.5px] transition-colors cursor-pointer text-left truncate"
                                        >
                                          <FileText className="w-3 h-3 text-[#949e97] flex-shrink-0" />
                                          <span className="truncate">
                                            {subItem}
                                          </span>
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                            }

                            const isFileSelected =
                              selectedWorkspaceFile === item.name
                            return (
                              <button
                                key={item.name}
                                onClick={() =>
                                  setSelectedWorkspaceFile(item.name)
                                }
                                className={`w-full flex items-center space-x-2 px-2 py-1 rounded-md transition-colors cursor-pointer text-left ${
                                  isFileSelected
                                    ? "bg-[#edf4ec] text-[#2d5a43] font-medium"
                                    : "hover:bg-[#f7f5ef] text-[#4a534c]"
                                }`}
                              >
                                <FileText className="w-3.5 h-3.5 text-[#747f78] flex-shrink-0" />
                                <span className="truncate">{item.name}</span>
                              </button>
                            )
                          })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* WINDOW RIGHT BORDER RESIZER (when right panel open) */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault()
                  dragRef.current = {
                    startX: e.clientX,
                    startLeftWidth: leftSidebarWidth,
                    startMainWidth: mainWidth,
                    startRightWidth: rightPanelWidth,
                  }
                  setIsDraggingMainRight(true)
                }}
                title="按住左右拖拽调整窗口整体宽度"
                className="absolute right-0 top-0 bottom-0 w-2.5 cursor-col-resize z-50 flex justify-end items-center group/winline pointer-events-auto select-none"
              >
                <div
                  className={`w-[2px] h-full transition-colors duration-150 ${
                    isDraggingMainRight
                      ? "bg-[#2d5a43]/80"
                      : "bg-transparent group-hover/winline:bg-[#2d5a43]/80"
                  }`}
                />
              </div>
            </section>
          ) : null}

          {/* WINDOW RIGHT BORDER RESIZER (when right panel closed) */}
          {!rightPanelOpen && (
            <div className="absolute right-0 top-0 bottom-0 z-40 select-none flex items-center pointer-events-none">
              {/* Drag Hit Zone & Glowing Line right on the window's right border */}
              <div
                onMouseDown={(e) => {
                  e.preventDefault()

                  dragRef.current = {
                    startX: e.clientX,

                    startLeftWidth: leftSidebarWidth,

                    startMainWidth: mainWidth,

                    startRightWidth: rightPanelWidth,
                  }

                  setIsDraggingMainRight(true)
                }}
                title="按住左右拖拽调整工作区宽度"
                className="w-2.5 h-full cursor-col-resize flex justify-end items-center group/line pointer-events-auto"
              >
                <div
                  className={`w-[2px] h-full transition-colors duration-150 ${
                    isDraggingMainRight
                      ? "bg-[#2d5a43]/80"
                      : "bg-transparent group-hover/line:bg-[#2d5a43]/80"
                  }`}
                />
              </div>

              {/* Floating Border Toggle Pill Button (Exact same physical position, unclipped) */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()

                  handleToggleRightPanel()
                }}
                title="展开代码审阅"
                className="absolute top-2.5 right-1.5 z-50 w-6 h-6 rounded-md bg-[#edf4ec] border border-[#eae5da] shadow-2xs hover:shadow-md hover:border-[#2d5a43] hover:bg-[#edf4ec] text-[#2d5a43] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 pointer-events-auto"
              >
                <PanelRightOpen className="w-3.5 h-3.5 text-[#2d5a43]" />
              </button>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* NEW CONVERSATION SETTINGS MODAL */}
        {/* ========================================================= */}
        {showNewConvModal && (
          <div className="fixed inset-0 bg-black/35 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="w-[520px] max-w-[94vw] bg-white border border-[#eae6dc] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="h-[52px] border-b border-[#eae6dc] flex items-center justify-between px-6 flex-shrink-0 bg-[#faf9f6]">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-[#edf4ec] border border-[#cddcd0] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#2d5a43]" />
                  </div>
                  <h3 className="text-[15px] font-bold text-[#1a211c]">
                    新建会话设置
                  </h3>
                </div>
                <button
                  onClick={() => setShowNewConvModal(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#747f78] hover:bg-[#eae8e1] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form Content */}
              <div className="p-6 space-y-4 text-[13px]">
                {/* 会话名称 */}
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-medium text-[#4a534c]">
                    会话名称
                  </label>
                  <input
                    type="text"
                    value={newConvTitle}
                    onChange={(e) => setNewConvTitle(e.target.value)}
                    placeholder="请输入会话名称..."
                    className="w-full bg-[#faf9f6] border border-[#eae6dc] focus:border-[#2d5a43] focus:bg-white rounded-xl px-3.5 py-2 text-[13px] text-[#1a211c] outline-none transition-all"
                  />
                </div>

                {/* 所属分组 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[12px] font-medium text-[#4a534c]">
                      所属分组
                    </label>
                    <span className="text-[11px] text-[#949e97]">
                      会话归类分组
                    </span>
                  </div>
                  <select
                    value={newConvGroup}
                    onChange={(e) => setNewConvGroup(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-[#eae6dc] focus:border-[#2d5a43] focus:bg-white rounded-xl px-3.5 py-2 text-[12.5px] text-[#1a211c] outline-none transition-all cursor-pointer"
                  >
                    {treeData.map((g) => (
                      <option key={g.name} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 项目工作目录（项目空间） */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[12px] font-medium text-[#4a534c]">
                      项目工作目录（项目空间）
                    </label>
                    <span className="text-[11px] text-[#949e97]">
                      目录末尾即项目名称
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newConvPath}
                      onChange={(e) => setNewConvPath(e.target.value)}
                      placeholder="请输入或浏览选择物理目录..."
                      className="flex-1 font-mono bg-[#faf9f6] border border-[#eae6dc] focus:border-[#2d5a43] focus:bg-white rounded-xl px-3.5 py-2 text-[12px] text-[#1a211c] outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => handleBrowseNativeDirectory("newConv")}
                      className="px-3.5 py-2 bg-[#f7f5ef] hover:bg-[#eae8e1] border border-[#eae6dc] text-[#4a534c] rounded-xl text-[12px] font-medium transition-colors cursor-pointer flex-shrink-0 flex items-center space-x-1"
                      title="调用系统资源管理器选择工作空间目录"
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-[#2d5a43]" />
                      <span>浏览...</span>
                    </button>
                  </div>

                  {/* Project Identification & Status Info */}
                  {(() => {
                    const currentProjName = getProjectNameFromPath(newConvPath)

                    const groupObj = treeData.find(
                      (g) => g.name === newConvGroup,
                    )

                    const existsInGroup = groupObj?.projects.some(
                      (p) =>
                        p.workspacePath.toLowerCase() ===
                          newConvPath.trim().toLowerCase() ||
                        p.name.toLowerCase() === currentProjName.toLowerCase(),
                    )

                    return (
                      <div className="flex items-center justify-between pt-0.5 text-[11.5px]">
                        <div className="flex items-center space-x-1 text-[#747f78]">
                          <span>识别项目:</span>
                          <span className="font-mono font-semibold text-[#1a211c] bg-[#f7f5ef] px-1.5 py-0.2 rounded border border-[#eae6dc]">
                            {currentProjName}
                          </span>
                        </div>
                        {existsInGroup ? (
                          <span className="text-[#16a34a] font-medium flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>已归属于「{newConvGroup}」下的已有项目</span>
                          </span>
                        ) : (
                          <span className="text-[#2d5a43] font-medium flex items-center space-x-1">
                            <Plus className="w-3 h-3" />
                            <span>将在「{newConvGroup}」下自动新建该项目</span>
                          </span>
                        )}
                      </div>
                    )
                  })()}

                  {/* 常用项目空间快捷标签 */}
                  <div className="pt-2 space-y-1">
                    <span className="text-[11px] text-[#949e97]">
                      常用项目空间快捷选择:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        {
                          name: "subtitle-agent",
                          path: "C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent",
                          group: "内容生产",
                        },

                        {
                          name: "audio-slice",
                          path: "C:\\Users\\User\\Tokmon\\Projects\\audio-slice",
                          group: "内容生产",
                        },

                        {
                          name: "ppt-generator",
                          path: "C:\\Users\\User\\Tokmon\\Projects\\ppt-generator",
                          group: "演示助手",
                        },

                        {
                          name: "travel-planner",
                          path: "C:\\Users\\User\\Tokmon\\Projects\\travel-planner",
                          group: "旅行计划",
                        },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setNewConvPath(preset.path)

                            setNewConvGroup(preset.group)
                          }}
                          className={`px-2 py-0.8 rounded-lg text-[11px] font-mono border transition-all cursor-pointer ${
                            newConvPath.trim().toLowerCase() ===
                            preset.path.toLowerCase()
                              ? "bg-[#edf4ec] border-[#2d5a43] text-[#2d5a43] font-semibold"
                              : "bg-[#ffffff] border-[#eae6dc] hover:border-[#d6d3d1] text-[#5c6760]"
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="h-[60px] border-t border-[#eae6dc] bg-[#faf9f6] flex items-center justify-end px-6 space-x-3 flex-shrink-0">
                <button
                  onClick={() => setShowNewConvModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#eae6dc] hover:bg-[#eae8e1] text-[#5c6760] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmCreateNewConv}
                  className="px-5 py-2 rounded-xl bg-[#2d5a43] hover:bg-[#234937] active:scale-98 text-white text-[13px] font-semibold transition-all shadow-xs cursor-pointer"
                >
                  创建并进入会话
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CHANGE WORKSPACE PATH MODAL */}
        {/* ========================================================= */}
        {showChangeWorkspaceModal && (
          <div className="fixed inset-0 bg-black/35 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="w-[480px] max-w-[94vw] bg-white border border-[#eae6dc] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
              <div className="h-[52px] border-b border-[#eae6dc] flex items-center justify-between px-6 flex-shrink-0 bg-[#faf9f6]">
                <div className="flex items-center space-x-2">
                  <FolderOpen className="w-4 h-4 text-[#2d5a43]" />
                  <h3 className="text-[14.5px] font-bold text-[#1a211c]">
                    更换当前会话工作空间目录
                  </h3>
                </div>
                <button
                  onClick={() => setShowChangeWorkspaceModal(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#747f78] hover:bg-[#eae8e1] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-3.5 text-[13px]">
                <p className="text-[12px] text-[#747f78]">
                  当前会话尚未开始，您可以自定义工作空间路径。会话开始执行后，工作空间目录将永久锁定。
                </p>

                <div className="space-y-1.5">
                  <label className="block text-[12px] font-medium text-[#4a534c]">
                    工作空间物理路径
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={changeWorkspacePathInput}
                      onChange={(e) =>
                        setChangeWorkspacePathInput(e.target.value)
                      }
                      className="flex-1 font-mono bg-[#faf9f6] border border-[#eae6dc] focus:border-[#2d5a43] focus:bg-white rounded-xl px-3.5 py-2 text-[12px] text-[#1a211c] outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleBrowseNativeDirectory("changeWorkspace")
                      }
                      className="px-3 py-2 bg-[#f7f5ef] hover:bg-[#eae8e1] border border-[#eae6dc] text-[#4a534c] rounded-xl text-[12px] font-medium transition-colors cursor-pointer flex-shrink-0"
                      title="调用系统资源管理器选择工作空间目录"
                    >
                      浏览...
                    </button>
                  </div>
                </div>

                {/* 预设推荐路径 */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11.5px] text-[#747f78]">
                    常用项目空间:
                  </span>
                  <div className="space-y-1">
                    {[
                      {
                        name: "subtitle-agent",
                        path: "C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent",
                      },

                      {
                        name: "audio-slice",
                        path: "C:\\Users\\User\\Tokmon\\Projects\\audio-slice",
                      },

                      {
                        name: "ppt-generator",
                        path: "C:\\Users\\User\\Tokmon\\Projects\\ppt-generator",
                      },

                      {
                        name: "travel-planner",
                        path: "C:\\Users\\User\\Tokmon\\Projects\\travel-planner",
                      },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setChangeWorkspacePathInput(preset.path)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg border border-[#eae6dc] hover:border-[#2d5a43] hover:bg-[#edf4ec] transition-colors flex items-center justify-between text-[11.5px] cursor-pointer"
                      >
                        <span className="font-medium text-[#1a211c]">
                          {preset.name}
                        </span>
                        <span className="font-mono text-[10.5px] text-[#747f78]">
                          {preset.path}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-[56px] border-t border-[#eae6dc] bg-[#faf9f6] flex items-center justify-end px-6 space-x-3 flex-shrink-0">
                <button
                  onClick={() => setShowChangeWorkspaceModal(false)}
                  className="px-4 py-1.5 rounded-xl border border-[#eae6dc] hover:bg-[#eae8e1] text-[#5c6760] text-[12.5px] font-medium transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    const path =
                      changeWorkspacePathInput.trim() || activeWorkspace.path

                    setActiveWorkspace((prev) => ({
                      ...prev,

                      path,

                      shortPath: path
                        .replace("C:\\Users\\User\\Tokmon", "~")
                        .replace(/\\/g, "/"),
                    }))

                    setShowChangeWorkspaceModal(false)
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#2d5a43] hover:bg-[#234937] text-white text-[12.5px] font-semibold transition-all shadow-xs cursor-pointer"
                >
                  确认更换
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden native input for OS directory picker fallback */}
        <input
          type="file"
          ref={nativeFolderInputRef}
          onChange={handleNativeFolderInputChange}
          {...{ webkitdirectory: "", directory: "" } as any}
          className="hidden"
        />

        {/* ========================================================= */}
        {/* HIGH FIDELITY SETTINGS FLOATING MODAL UI (PIXEL PERFECT) */}
        {/* ========================================================= */}
        {showSettingsModal && (
          <div className="fixed inset-0 bg-black/35 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="w-[960px] max-w-[94vw] h-[680px] max-h-[88vh] bg-white border border-[#eae6dc] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
              {/* Settings Toast Notification */}
              {settingsToast && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#1a211c]/95 text-white text-[12.5px] font-medium rounded-xl shadow-2xl border border-white/10 flex items-center space-x-2 animate-in fade-in slide-in-from-top-2 duration-150 pointer-events-none backdrop-blur-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{settingsToast}</span>
                </div>
              )}

              {/* Top Bar inside Settings Modal */}
              <div className="h-[56px] border-b border-[#eae6dc] flex items-center justify-between px-7 flex-shrink-0">
                <h2 className="text-[22px] font-bold text-[#1a211c] tracking-tight">
                  设置
                </h2>

                {/* Search input in settings */}
                <div className="relative w-[360px]">
                  <Search className="w-4 h-4 text-[#949e97] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={settingsSearchQuery}
                    onChange={(e) => setSettingsSearchQuery(e.target.value)}
                    placeholder="搜索设置项"
                    className="w-full bg-[#faf9f6] border border-[#eae6dc] rounded-xl pl-9 pr-3 py-1.5 text-[13px] text-[#1a211c] placeholder-[#949e97] focus:outline-none focus:border-[#4a7860]"
                  />
                </div>

                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="p-1.5 hover:bg-[#f7f5ef] rounded-xl text-[#747f78] hover:text-[#1a211c] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Content Body inside Settings */}
              <div className="flex-1 flex overflow-hidden">
                {/* Settings Left Sidebar */}
                <nav className="w-[220px] border-r border-[#eae6dc] p-4 space-y-1.5 flex-shrink-0 bg-[#fbfbf9]">
                  {settingsCategories.map((cat) => {
                    const Icon = cat.icon

                    const isActive = activeSettingsTab === cat.id

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveSettingsTab(cat.id)}
                        className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#eaf1e8] text-[#2d5a43] font-semibold shadow-2xs"
                            : "text-[#5c6760] hover:bg-[#f5f3eb]"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-[#2d5a43]" : "text-[#747f78]"
                          }`}
                        />
                        <span>{cat.label}</span>
                      </button>
                    )
                  })}
                </nav>

                {/* Settings Center Options Panel */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
                  {/* 1. CATEGORY: 通用 (General) */}
                  {activeSettingsTab === "general" && (
                    <div className="space-y-6 text-[13px]">
                      {/* 应用语言 */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          应用语言
                        </span>
                        <select
                          value={settingLanguage}
                          onChange={(e) => setSettingLanguage(e.target.value)}
                          className="bg-[#ffffff] border border-[#eae6dc] rounded-xl px-4 py-1.5 text-[13px] text-[#1a211c] focus:outline-none focus:border-[#4a7860] cursor-pointer"
                        >
                          <option value="简体中文">简体中文</option>
                          <option value="English">English</option>
                          <option value="日本語">日本語</option>
                        </select>
                      </div>

                      {/* 启动时打开 */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          启动时打开
                        </span>
                        <div className="flex bg-[#f7f5ef] p-1 rounded-xl border border-[#eae6dc]">
                          {(["首页", "上次打开的会话"] as const).map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setSettingStartupOption(opt)}
                              className={`px-4 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                                settingStartupOption === opt
                                  ? "bg-[#eaf1e8] text-[#2d5a43] font-semibold shadow-2xs"
                                  : "text-[#747f78] hover:text-[#1a211c]"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 自动保存 */}
                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          自动保存
                        </span>
                        <select
                          value={settingAutoSave}
                          onChange={(e) => setSettingAutoSave(e.target.value)}
                          className="bg-[#ffffff] border border-[#eae6dc] rounded-xl px-4 py-1.5 text-[13px] text-[#1a211c] focus:outline-none focus:border-[#4a7860] cursor-pointer"
                        >
                          <option value="1 分钟">1 分钟</option>
                          <option value="5 分钟">5 分钟</option>
                          <option value="10 分钟">10 分钟</option>
                          <option value="从不">从不</option>
                        </select>
                      </div>

                      {/* 更新通道 */}
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1a211c]">
                          更新通道
                        </span>
                        <div className="flex bg-[#f7f5ef] p-1 rounded-xl border border-[#eae6dc]">
                          {(["稳定版", "测试版"] as const).map((channel) => (
                            <button
                              key={channel}
                              onClick={() => setSettingUpdateChannel(channel)}
                              className={`px-5 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                                settingUpdateChannel === channel
                                  ? "bg-[#edf4ec] text-[#2d5a43] font-semibold shadow-2xs"
                                  : "text-[#747f78] hover:text-[#1a211c]"
                              }`}
                            >
                              {channel}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. CATEGORY: 智能体与模型 */}
                  {activeSettingsTab === "agents" && (
                    <div className="space-y-6 text-[13px]">
                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          默认智能体
                        </span>
                        <select
                          value={settingDefaultAgent}
                          onChange={(e) =>
                            setSettingDefaultAgent(e.target.value)
                          }
                          className="bg-[#ffffff] border border-[#eae6dc] rounded-xl px-4 py-1.5 text-[13px] text-[#1a211c] focus:outline-none focus:border-[#4a7860] cursor-pointer"
                        >
                          <option value="代码助手">代码助手</option>
                          <option value="翻译助手">翻译助手</option>
                          <option value="演示文稿美化">演示文稿美化</option>
                          <option value="数据分析师">数据分析师</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          模型提供方
                        </span>
                        <div className="flex bg-[#f7f5ef] p-1 rounded-xl border border-[#eae6dc]">
                          {(["Tokmon 官方", "自定义"] as const).map(
                            (provider) => (
                              <button
                                key={provider}
                                onClick={() =>
                                  setSettingModelProvider(provider)
                                }
                                className={`px-4 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                                  settingModelProvider === provider
                                    ? "bg-[#edf4ec] text-[#2d5a43] font-semibold shadow-2xs"
                                    : "text-[#747f78] hover:text-[#1a211c]"
                                }`}
                              >
                                {provider}
                              </button>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          主模型
                        </span>
                        <select
                          value={settingMainModel}
                          onChange={(e) => setSettingMainModel(e.target.value)}
                          className="bg-[#ffffff] border border-[#eae6dc] rounded-xl px-4 py-1.5 text-[13px] text-[#1a211c] focus:outline-none focus:border-[#4a7860] cursor-pointer"
                        >
                          <option value="faster-whisper-large-v3-turbo">
                            faster-whisper-large-v3-turbo
                          </option>
                          <option value="whisper-large-v3">
                            whisper-large-v3
                          </option>
                          <option value="whisper-medium">whisper-medium</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1a211c]">
                          推理强度
                        </span>
                        <div className="flex bg-[#f7f5ef] p-1 rounded-xl border border-[#eae6dc]">
                          {(["低", "标准", "高"] as const).map((power) => (
                            <button
                              key={power}
                              onClick={() => setSettingInferencePower(power)}
                              className={`px-5 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                                settingInferencePower === power
                                  ? "bg-[#edf4ec] text-[#2d5a43] font-semibold shadow-2xs"
                                  : "text-[#747f78] hover:text-[#1a211c]"
                              }`}
                            >
                              {power}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. CATEGORY: 权限与安全 */}
                  {activeSettingsTab === "security" && (
                    <div className="space-y-6 text-[13px]">
                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          文件访问
                        </span>
                        <select
                          value={settingFileAccess}
                          onChange={(e) => setSettingFileAccess(e.target.value)}
                          className="bg-[#ffffff] border border-[#eae6dc] rounded-xl px-4 py-1.5 text-[13px] text-[#1a211c] focus:outline-none focus:border-[#4a7860] cursor-pointer"
                        >
                          <option value="受信路径">受信路径</option>
                          <option value="完全访问">完全访问</option>
                          <option value="严格禁止">完全禁止</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          命令审批
                        </span>
                        <div className="flex bg-[#f7f5ef] p-1 rounded-xl border border-[#eae6dc]">
                          {(["自动执行", "按需确认", "禁止执行"] as const).map(
                            (mode) => (
                              <button
                                key={mode}
                                onClick={() => setSettingCommandApproval(mode)}
                                className={`px-4 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                                  settingCommandApproval === mode
                                    ? "bg-[#edf4ec] text-[#2d5a43] font-semibold shadow-2xs"
                                    : "text-[#747f78] hover:text-[#1a211c]"
                                }`}
                              >
                                {mode}
                              </button>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          网络访问
                        </span>
                        <ToggleSwitch
                          checked={settingNetworkAccess}
                          onChange={setSettingNetworkAccess}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1a211c]">
                          高风险二次确认
                        </span>
                        <ToggleSwitch
                          checked={settingHighRiskConfirmation}
                          onChange={setSettingHighRiskConfirmation}
                        />
                      </div>
                    </div>
                  )}

                  {/* 4. CATEGORY: 工作区 */}
                  {activeSettingsTab === "workspace" && (
                    <div className="space-y-6 text-[13px]">
                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          默认工作区
                        </span>
                        <div className="flex items-center space-x-2 bg-[#ffffff] border border-[#eae6dc] rounded-xl px-3 py-1.5 w-[280px]">
                          <input
                            type="text"
                            value={settingWorkspacePath}
                            onChange={(e) =>
                              setSettingWorkspacePath(e.target.value)
                            }
                            className="bg-transparent text-[12.5px] font-mono text-[#1a211c] focus:outline-none w-full"
                          />
                          <Folder className="w-4 h-4 text-[#747f78] flex-shrink-0 cursor-pointer" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          索引模式
                        </span>
                        <select
                          value={settingIndexMode}
                          onChange={(e) => setSettingIndexMode(e.target.value)}
                          className="bg-[#ffffff] border border-[#eae6dc] rounded-xl px-4 py-1.5 text-[13px] text-[#1a211c] focus:outline-none focus:border-[#4a7860] cursor-pointer"
                        >
                          <option value="标准">标准</option>
                          <option value="深度索引">深度索引</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          自动同步
                        </span>
                        <ToggleSwitch
                          checked={settingAutoSync}
                          onChange={setSettingAutoSync}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1a211c]">
                          Git 集成
                        </span>
                        <ToggleSwitch
                          checked={settingGitIntegration}
                          onChange={setSettingGitIntegration}
                        />
                      </div>
                    </div>
                  )}

                  {/* 5. CATEGORY: 通知 */}
                  {activeSettingsTab === "notifications" && (
                    <div className="space-y-6 text-[13px]">
                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          启用通知
                        </span>
                        <ToggleSwitch
                          checked={settingEnableNotifications}
                          onChange={setSettingEnableNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          桌面通知
                        </span>
                        <ToggleSwitch
                          checked={settingDesktopNotifications}
                          onChange={setSettingDesktopNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-[#f7f5ef]">
                        <span className="font-medium text-[#1a211c]">
                          消息提醒
                        </span>
                        <ToggleSwitch
                          checked={settingMessageReminders}
                          onChange={setSettingMessageReminders}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#1a211c]">
                          免打扰
                        </span>
                        <select
                          value={settingDoNotDisturb}
                          onChange={(e) =>
                            setSettingDoNotDisturb(e.target.value)
                          }
                          className="bg-[#ffffff] border border-[#eae6dc] rounded-xl px-4 py-1.5 text-[13px] text-[#1a211c] focus:outline-none focus:border-[#4a7860] cursor-pointer font-mono"
                        >
                          <option value="22:00 - 08:00">22:00 - 08:00</option>
                          <option value="23:00 - 07:00">23:00 - 07:00</option>
                          <option value="关闭">关闭</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* 6. CATEGORY: 外观 */}
                  {activeSettingsTab === "appearance" && (
                    <div className="space-y-6 text-[13px]">
                      <div>
                        <div className="mb-3">
                          <span className="font-semibold text-[#1a211c] text-[13.5px]">
                            界面主题风格
                          </span>
                          <p className="text-[12px] text-[#747f78] mt-0.5">
                            为 Tokmon 工作空间选择契合视效氛围的暖色系主题
                          </p>
                        </div>

                        {/* Visual Theme Cards */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Light Warm Milk Tea Card */}
                          <div
                            onClick={() => setSettingThemeMode("浅色")}
                            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                              settingThemeMode === "浅色"
                                ? "border-[#2d5a43] bg-[#edf4ec] shadow-sm ring-2 ring-[#2d5a43]/10"
                                : "border-[#eae6dc] hover:border-[#e2ded4] bg-white"
                            }`}
                          >
                            <div className="space-y-2">
                              {/* Mini UI Representation */}
                              <div className="h-20 rounded-xl bg-[#faf9f6] border border-[#eae5da] p-2 flex flex-col justify-between overflow-hidden shadow-2xs">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#2d5a43]" />
                                    <div className="w-12 h-2 rounded-full bg-[#eae6dc]" />
                                  </div>
                                  <div className="w-4 h-2 rounded-full bg-[#eae5da]" />
                                </div>
                                <div className="space-y-1">
                                  <div className="w-3/4 h-2 rounded bg-[#f3f1ea]" />
                                  <div className="w-1/2 h-2 rounded bg-[#e6eee4]" />
                                </div>
                                <div className="h-4 rounded-lg bg-white border border-[#eae5da] flex items-center px-1.5">
                                  <div className="w-2 h-2 rounded-full bg-[#2d5a43]/60" />
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-1">
                                <div>
                                  <h4 className="font-semibold text-[#1a211c] text-[13px]">
                                    浅色 · 暖白奶茶
                                  </h4>
                                  <p className="text-[11.5px] text-[#747f78]">
                                    温润护眼的经典米白暖调
                                  </p>
                                </div>
                                {settingThemeMode === "浅色" && (
                                  <div className="w-5 h-5 rounded-full bg-[#2d5a43] text-white flex items-center justify-center shadow-xs">
                                    <Check className="w-3 h-3 stroke-[2.5]" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Dark Warm Mocha Card */}
                          <div
                            onClick={() => setSettingThemeMode("深色")}
                            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                              settingThemeMode === "深色"
                                ? "border-[#e88d43] bg-[#2a2016] shadow-sm ring-2 ring-[#e88d43]/20"
                                : "border-[#eae6dc] hover:border-[#e2ded4] bg-white"
                            }`}
                          >
                            <div className="space-y-2">
                              {/* Mini UI Representation */}
                              <div className="h-20 rounded-xl bg-[#181614] border border-[#3d342a] p-2 flex flex-col justify-between overflow-hidden shadow-2xs">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#e88d43]" />
                                    <div className="w-12 h-2 rounded-full bg-[#3d342a]" />
                                  </div>
                                  <div className="w-4 h-2 rounded-full bg-[#4a3f33]" />
                                </div>
                                <div className="space-y-1">
                                  <div className="w-3/4 h-2 rounded bg-[#28221b]" />
                                  <div className="w-1/2 h-2 rounded bg-[#332a20]" />
                                </div>
                                <div className="h-4 rounded-lg bg-[#201d19] border border-[#3d342a] flex items-center px-1.5">
                                  <div className="w-2 h-2 rounded-full bg-[#e88d43]/60" />
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-1">
                                <div>
                                  <h4 className="font-semibold text-[#1a211c] text-[13px]">
                                    深色 · 暖黑摩卡
                                  </h4>
                                  <p className="text-[11.5px] text-[#747f78]">
                                    深焙奶茶与沉浸暗光环境
                                  </p>
                                </div>
                                {settingThemeMode === "深色" && (
                                  <div className="w-5 h-5 rounded-full bg-[#e88d43] text-white flex items-center justify-center shadow-xs">
                                    <Check className="w-3 h-3 stroke-[2.5]" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#f7f5ef]">
                        <div>
                          <span className="font-medium text-[#1a211c]">
                            界面字体缩放
                          </span>
                          <p className="text-[11.5px] text-[#747f78] mt-0.5">
                            调节编辑器与各面板的字号大小
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 w-[220px]">
                          <input
                            type="range"
                            min={85}
                            max={115}
                            value={settingFontSize}
                            onChange={(e) =>
                              setSettingFontSize(Number(e.target.value))
                            }
                            className="w-full accent-[#2d5a43] cursor-pointer"
                          />
                          <span className="font-mono text-[12px] text-[#747f78] w-10 text-right font-medium">
                            {settingFontSize}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 7. CATEGORY: 快捷键 */}
                  {activeSettingsTab === "shortcuts" && (
                    <div className="space-y-3.5 text-[13px]">
                      <div className="flex items-center justify-between p-3 bg-[#ffffff] border border-[#eae6dc] rounded-xl">
                        <span className="font-medium text-[#1a211c]">
                          新建会话
                        </span>
                        <div className="flex items-center space-x-1 font-mono text-[12px]">
                          <span className="px-2.5 py-1 bg-white border border-[#eae6dc] rounded-lg shadow-2xs text-[#4a534c]">
                            Ctrl
                          </span>
                          <span className="text-[#949e97]">+</span>
                          <span className="px-2.5 py-1 bg-white border border-[#eae6dc] rounded-lg shadow-2xs text-[#4a534c]">
                            N
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#ffffff] border border-[#eae6dc] rounded-xl">
                        <span className="font-medium text-[#1a211c]">
                          打开设置
                        </span>
                        <div className="flex items-center space-x-1 font-mono text-[12px]">
                          <span className="px-2.5 py-1 bg-white border border-[#eae6dc] rounded-lg shadow-2xs text-[#4a534c]">
                            Ctrl
                          </span>
                          <span className="text-[#949e97]">+</span>
                          <span className="px-2.5 py-1 bg-white border border-[#eae6dc] rounded-lg shadow-2xs text-[#4a534c]">
                            ,
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#ffffff] border border-[#eae6dc] rounded-xl">
                        <span className="font-medium text-[#1a211c]">
                          发送消息
                        </span>
                        <div className="flex items-center space-x-1 font-mono text-[12px]">
                          <span className="px-3.5 py-1 bg-white border border-[#eae6dc] rounded-lg shadow-2xs text-[#4a534c]">
                            Enter
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-[#ffffff] border border-[#eae6dc] rounded-xl">
                        <span className="font-medium text-[#1a211c]">
                          命令面板
                        </span>
                        <div className="flex items-center space-x-1 font-mono text-[12px]">
                          <span className="px-2.5 py-1 bg-white border border-[#eae6dc] rounded-lg shadow-2xs text-[#4a534c]">
                            Ctrl
                          </span>
                          <span className="text-[#949e97]">+</span>
                          <span className="px-2.5 py-1 bg-white border border-[#eae6dc] rounded-lg shadow-2xs text-[#4a534c]">
                            Shift
                          </span>
                          <span className="text-[#949e97]">+</span>
                          <span className="px-2.5 py-1 bg-white border border-[#eae6dc] rounded-lg shadow-2xs text-[#4a534c]">
                            P
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 8. CATEGORY: 账户 */}
                  {activeSettingsTab === "account" && (
                    <div className="space-y-4 text-[13px]">
                      {/* Large User Avatar Icon */}
                      <div className="flex justify-center py-2">
                        <div className="w-16 h-16 rounded-full bg-[#fef08a] border-2 border-[#fde68a] flex items-center justify-center text-[#2d5a43] shadow-xs">
                          <User className="w-8 h-8 text-[#2d5a43]" />
                        </div>
                      </div>

                      {/* Account Settings Item List */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3.5 bg-[#ffffff] border border-[#eae6dc] rounded-xl hover:bg-[#f7f5ef] cursor-pointer transition-colors">
                          <span className="font-medium text-[#1a211c]">
                            昵称
                          </span>
                          <div className="flex items-center space-x-1 text-[#5c6760]">
                            <span>{settingAccountName}</span>
                            <ChevronRight className="w-4 h-4 text-[#949e97]" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3.5 bg-[#ffffff] border border-[#eae6dc] rounded-xl hover:bg-[#f7f5ef] cursor-pointer transition-colors">
                          <span className="font-medium text-[#1a211c]">
                            登录邮箱
                          </span>
                          <div className="flex items-center space-x-1 text-[#5c6760] font-mono text-[12.5px]">
                            <span>{settingAccountEmail}</span>
                            <ChevronRight className="w-4 h-4 text-[#949e97]" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3.5 bg-[#ffffff] border border-[#eae6dc] rounded-xl hover:bg-[#f7f5ef] cursor-pointer transition-colors">
                          <span className="font-medium text-[#1a211c]">
                            当前方案
                          </span>
                          <div className="flex items-center space-x-1 text-[#2d5a43] font-semibold">
                            <span>{settingAccountPlan}</span>
                            <ChevronRight className="w-4 h-4 text-[#949e97]" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3.5 bg-[#ffffff] border border-[#eae6dc] rounded-xl">
                          <span className="font-medium text-[#1a211c]">
                            云同步
                          </span>
                          <ToggleSwitch
                            checked={settingAccountCloudSync}
                            onChange={setSettingAccountCloudSync}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="h-[56px] border-t border-[#eae6dc] bg-[#ffffff] flex items-center justify-between px-6 flex-shrink-0">
                {/* Left: Restore Defaults for Current Tab Button */}
                <button
                  type="button"
                  onClick={handleResetCurrentSettingsTabToDefault}
                  title={`将「${settingsTabNameMap[activeSettingsTab] || "当前页"}」重置为默认预设`}
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-[12.5px] font-medium text-[#747f78] hover:text-[#2d5a43] hover:bg-[#edf4ec] border border-transparent hover:border-[#cddcd0] transition-all cursor-pointer group active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#949e97] group-hover:text-[#2d5a43] group-hover:-rotate-90 transition-all duration-300" />
                  <span>恢复本页默认设置</span>
                </button>

                {/* Right: Cancel & Save Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="px-5 py-2 rounded-xl bg-[#f7f5ef] hover:bg-[#eae6dc] text-[13px] font-medium text-[#5c6760] transition-colors cursor-pointer"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      setShowSettingsModal(false)
                      setSettingsToast("设置更改已保存")
                      setTimeout(() => setSettingsToast(null), 2000)
                    }}
                    className="px-5 py-2 rounded-xl bg-[#2d5a43] hover:bg-[#234937] active:scale-98 text-[13px] font-semibold text-white transition-all shadow-xs cursor-pointer"
                  >
                    保存更改
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
