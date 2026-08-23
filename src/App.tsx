import { useState, useRef, useEffect } from 'react'
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
  Search,
  Sparkles,
  FileCode,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
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
  CircleDashed
} from 'lucide-react'

// Tokmon Brand Logo Image in Warm Terracotta/Sand (#c86a28)
function TokmonLogo() {
  return (
    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 7V25" stroke="#c86a28" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M9 16H20" stroke="#c86a28" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" fill="#c86a28" />
        <circle cx="9" cy="25" r="4" fill="#c86a28" />
        <circle cx="20" cy="16" r="4" fill="#c86a28" />
      </svg>
    </div>
  )
}

// Reusable Warm Sand Toggle Switch matching Tokmon's UI
function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-[44px] h-[24px] flex items-center rounded-full p-[2px] cursor-pointer transition-colors duration-200 ease-in-out ${
        checked ? 'bg-[#c86a28]' : 'bg-[#e5e2da]'
      }`}
    >
      <div
        className={`bg-white w-[20px] h-[20px] rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-[20px]' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export default function App() {
  // Navigation & Toggle states
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)

  // Resizable Panel Widths & Dragging States
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(240)
  const [rightPanelWidth, setRightPanelWidth] = useState(440)
  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)

  // Mouse drag handler for sidebar resizers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingLeft) {
        const newWidth = Math.min(Math.max(e.clientX, 180), 420)
        setLeftSidebarWidth(newWidth)
      } else if (isDraggingRight) {
        const newWidth = Math.min(Math.max(window.innerWidth - e.clientX, 320), 720)
        setRightPanelWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDraggingLeft(false)
      setIsDraggingRight(false)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    if (isDraggingLeft || isDraggingRight) {
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingLeft, isDraggingRight])

  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code')
  
  // Main View Mode: Chat vs Trajectory Trace View
  const [mainViewMode, setMainViewMode] = useState<'chat' | 'trajectory'>('chat')
  const [selectedTrajectoryEvent, setSelectedTrajectoryEvent] = useState<number | null>(1)
  const [trajectorySearch, setTrajectorySearch] = useState('')
  const [trajectoryDetailTab, setTrajectoryDetailTab] = useState<'Summary' | 'Options' | 'Usage' | 'Timing'>('Summary')
  // Dynamic Conversation Title & List
  const [selectedConversation, setSelectedConversation] = useState('生成音频时间轴字幕')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [conversationTitle, setConversationTitle] = useState('生成音频时间轴字幕')

  // Chat Messages & Input
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      time: '10:20',
      text: '使用 faster-whisper 模型对音频文件进行转录，输出带时间戳的字幕 (Segmentation 模式)。',
      details: {
        modelPath: 'C:\\Models\\faster-whisper-large-v3-turbo',
        audioFile: 'C:\\Data\\audio.mp3',
        outputFile: 'UTF-8 编码的 .srt'
      }
    },
    {
      id: 2,
      sender: 'bot',
      time: '10:20',
      text: '已理解你的需求，我将使用 faster-whisper 进行音频转录，并输出带时间戳的字幕文件。\n我会分步骤完成任务并实时向你汇报进度。'
    }
  ])

  // Workflow Panel Expand/Collapse State
  const [isWorkflowExpanded, setIsWorkflowExpanded] = useState(true)

  // Agent & Model Selection State in Bottom Input Bar
  const [selectedAgent, setSelectedAgent] = useState('代码助手')
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)
  const [selectedChatModel, setSelectedChatModel] = useState('faster-whisper-large-v3-turbo')
  const [showModelDropdown, setShowModelDropdown] = useState(false)

  // File Dropdown State in Inspector
  const [selectedFile, setSelectedFile] = useState<'transcribe.py' | 'config.yaml' | 'output.srt'>('transcribe.py')
  const [showFileDropdown, setShowFileDropdown] = useState(false)

  // Bottom Toolbar Dropdown & Popover States
  const [settingAccessLevel, setSettingAccessLevel] = useState<'完全访问' | '受信路径' | '按需确认'>('完全访问')
  const [showAccessDropdown, setShowAccessDropdown] = useState(false)
  const [showContextPopover, setShowContextPopover] = useState(false)
  const [reasoningLevel, setReasoningLevel] = useState<'最高' | '标准' | '低'>('最高')
  const [showReasoningDropdown, setShowReasoningDropdown] = useState(false)

  // Settings Modal & Active Tab State
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [activeSettingsTab, setActiveSettingsTab] = useState<
    'general' | 'agents' | 'security' | 'workspace' | 'notifications' | 'appearance' | 'shortcuts' | 'account'
  >('general')

  // 1. General Configs
  const [settingLanguage, setSettingLanguage] = useState('简体中文')
  const [settingStartupOption, setSettingStartupOption] = useState<'首页' | '上次打开的会话'>('首页')
  const [settingAutoSave, setSettingAutoSave] = useState('5 分钟')
  const [settingUpdateChannel, setSettingUpdateChannel] = useState<'稳定版' | '测试版'>('稳定版')

  // 2. Agents & Models Configs
  const [settingDefaultAgent, setSettingDefaultAgent] = useState('代码助手')
  const [settingModelProvider, setSettingModelProvider] = useState<'Tokmon 官方' | '自定义'>('Tokmon 官方')
  const [settingMainModel, setSettingMainModel] = useState('faster-whisper-large-v3-turbo')
  const [settingInferencePower, setSettingInferencePower] = useState<'低' | '标准' | '高'>('标准')

  // 3. Permissions & Security Configs
  const [settingFileAccess, setSettingFileAccess] = useState('受信路径')
  const [settingCommandApproval, setSettingCommandApproval] = useState<'自动执行' | '按需确认' | '禁止执行'>('按需确认')
  const [settingNetworkAccess, setSettingNetworkAccess] = useState(true)
  const [settingHighRiskConfirmation, setSettingHighRiskConfirmation] = useState(true)

  // 4. Workspace Configs
  const [settingWorkspacePath, setSettingWorkspacePath] = useState('C:\\Users\\User\\Tokmon\\Projects')
  const [settingIndexMode, setSettingIndexMode] = useState('标准')
  const [settingAutoSync, setSettingAutoSync] = useState(true)
  const [settingGitIntegration, setSettingGitIntegration] = useState(true)

  // 5. Notifications Configs
  const [settingEnableNotifications, setSettingEnableNotifications] = useState(true)
  const [settingDesktopNotifications, setSettingDesktopNotifications] = useState(true)
  const [settingMessageReminders, setSettingMessageReminders] = useState(true)
  const [settingDoNotDisturb, setSettingDoNotDisturb] = useState('22:00 - 08:00')

  // 6. Appearance Configs
  const [settingThemeMode, setSettingThemeMode] = useState<'浅色' | '深色'>('浅色')
  const [settingAccentColor, setSettingThemeAccentColor] = useState('gold')
  const [settingDensity, setSettingDensity] = useState<'紧凑' | '舒适' | '宽松'>('舒适')
  const [settingFontSize, setSettingFontSize] = useState(100)

  // 7. Account Configs
  const [settingAccountName, setSettingAccountName] = useState('Jiandong Chen')
  const [settingAccountEmail, setSettingAccountEmail] = useState('jiandong.chen@tokmon.ai')
  const [settingAccountPlan, setSettingAccountPlan] = useState('Pro')
  const [settingAccountCloudSync, setSettingAccountCloudSync] = useState(true)

  const [settingsSearchQuery, setSettingsSearchQuery] = useState('')

  // Subtitle Preview Search Query
  const [subtitleSearch, setSubtitleSearch] = useState('')
  const [copiedNotification, setCopiedNotification] = useState(false)

  // 3-Level Tree Collapsible States (分组 Group -> 项目 Project -> 会话 Conversation)
  const [group1Open, setGroup1Open] = useState(true)
  const [project1_1Open, setProject1_1Open] = useState(true)
  const [project1_2Open, setProject1_2Open] = useState(false)

  const [group2Open, setGroup2Open] = useState(true)
  const [project2_1Open, setProject2_1Open] = useState(true)

  const [group3Open, setGroup3Open] = useState(false)
  const [project3_1Open, setProject3_1Open] = useState(true)

  // Search keyword state in sidebar
  const [searchQuery, setSearchQuery] = useState('')

  // Textarea Auto Height Ref & Handler
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const [savedMainWidth, setSavedMainWidth] = useState(780)

  const handleToggleRightPanel = () => {
    if (rightPanelOpen && mainRef.current) {
      setSavedMainWidth(mainRef.current.offsetWidth)
    }
    setRightPanelOpen(!rightPanelOpen)
  }

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 220)}px`
    }
  }

  // Send message action
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputMessage
    }
    setMessages((prev) => [...prev, newMsg])
    setInputMessage('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    // Simulate Agent Auto-Reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `智能体（${selectedAgent}）已收到指令: "${inputMessage}"。正在分析并更新执行任务...`
        }
      ])
    }, 700)
  }

  // Handle switching conversation
  const handleSelectConversation = (name: string) => {
    setSelectedConversation(name)
    setConversationTitle(name)
  }

  // Handle Copy All Subtitles
  const handleCopySubtitles = () => {
    const subtitleItems = [
      { id: 1, start: '00:00:00.000', end: '00:00:02.340', text: '欢迎使用 faster-whisper 音频转录模型。' },
      { id: 2, start: '00:00:02.500', end: '00:00:05.800', text: '本视频将向您展示带时间轴字幕的自动生成过程。' },
      { id: 3, start: '00:00:06.100', end: '00:00:09.200', text: '任务已完成，共生成 96 条高精度时间轴字幕。' }
    ]
    const fullText = subtitleItems.map((s) => `${s.id}\n${s.start} --> ${s.end}\n${s.text}`).join('\n\n')
    navigator.clipboard.writeText(fullText)
    setCopiedNotification(true)
    setTimeout(() => setCopiedNotification(false), 2000)
  }

  // Files data for Code Inspector
  const fileContents = {
    'transcribe.py': [
      { num: 1, text: 'import os', type: 'import' },
      { num: 2, text: 'import json', type: 'import' },
      { num: 3, text: 'from pathlib import Path', type: 'import' },
      { num: 4, text: 'from faster_whisper import WhisperModel', type: 'import' },
      { num: 5, text: '', type: 'normal' },
      { num: 6, text: 'def transcribe_audio(model_path: str, audio_path: str,', type: 'def' },
      { num: 7, text: '                     output_srt: str, language: str = "zh",', type: 'def-params' },
      { num: 8, text: '                     beam_size: int = 5, vad_filter: bool = True) -> dict:', type: 'def-params' },
      { num: 9, text: '    """使用 faster-whisper 进行音频转录（分段模式）并输出 SRT。"""', type: 'docstring' },
      { num: 10, text: '    model = WhisperModel(model_path, device="auto",', type: 'normal' },
      { num: 11, text: '                         compute_type="int8")', type: 'normal' },
      { num: 12, text: '', type: 'normal' },
      { num: 13, text: '    segments, info = model.transcribe(', type: 'normal' },
      { num: 14, text: '        audio_path,', type: 'normal' },
      { num: 15, text: '        language=language,', type: 'normal' },
      { num: 16, text: '        beam_size=beam_size,', type: 'normal' },
      { num: 17, text: '        vad_filter=vad_filter,', type: 'normal' },
      { num: 18, text: '        vad_parameters=dict(min_silence_duration_ms=400),', type: 'normal' },
      { num: 19, text: '        word_timestamps=True,', type: 'normal' },
      { num: 20, text: '    )', type: 'normal' },
      { num: 21, text: '', type: 'normal' },
      { num: 22, text: '    results = []', type: 'normal' },
      { num: 23, text: '    for i, seg in enumerate(segments, start=1):', type: 'for' },
      { num: 24, text: '        results.append({', type: 'normal' },
      { num: 25, text: '            "index": i,', type: 'dict-key' },
      { num: 26, text: '            "start": round(seg.start, 2),', type: 'dict-key' },
      { num: 27, text: '            "end": round(seg.end, 2),', type: 'dict-key' },
      { num: 28, text: '            "text": seg.text.strip(),', type: 'dict-key' },
      { num: 29, text: '        })', type: 'normal' },
      { num: 30, text: '', type: 'normal' },
      { num: 31, text: '    # 写入 SRT 文件 (UTF-8)', type: 'comment' },
      { num: 32, text: '    Path(output_srt).write_text(to_srt(results), encoding="utf-8")', type: 'normal' },
      { num: 33, text: '    return {"segments": len(results), "language": info.language}', type: 'return' },
      { num: 34, text: '', type: 'normal' },
    ],
    'config.yaml': [
      { num: 1, text: '# Faster-Whisper Subtitle Config', type: 'comment' },
      { num: 2, text: 'model:', type: 'def' },
      { num: 3, text: '  name: "faster-whisper-large-v3-turbo"', type: 'normal' },
      { num: 4, text: '  path: "C:\\Models\\faster-whisper-large-v3-turbo"', type: 'normal' },
      { num: 5, text: '  device: "auto"', type: 'normal' },
      { num: 6, text: '  compute_type: "int8"', type: 'normal' },
      { num: 7, text: '', type: 'normal' },
      { num: 8, text: 'transcribe:', type: 'def' },
      { num: 9, text: '  language: "zh"', type: 'normal' },
      { num: 10, text: '  beam_size: 5', type: 'normal' },
      { num: 11, text: '  vad_filter: true', type: 'normal' },
      { num: 12, text: '  min_silence_duration_ms: 400', type: 'normal' },
    ],
    'output.srt': [
      { num: 1, text: '1', type: 'def' },
      { num: 2, text: '00:00:00,000 --> 00:00:02,340', type: 'docstring' },
      { num: 3, text: '欢迎使用 faster-whisper 音频转录模型。', type: 'normal' },
      { num: 4, text: '', type: 'normal' },
      { num: 5, text: '2', type: 'def' },
      { num: 6, text: '00:00:02,500 --> 00:00:05,800', type: 'docstring' },
      { num: 7, text: '本视频将向您展示带时间轴字幕的自动生成过程。', type: 'normal' },
      { num: 8, text: '', type: 'normal' },
      { num: 9, text: '3', type: 'def' },
      { num: 10, text: '00:00:06,100 --> 00:00:09,200', type: 'docstring' },
      { num: 11, text: '任务已完成，共生成 96 条高精度时间轴字幕。', type: 'normal' },
    ]
  }

  // Sample SRT Subtitles for Preview Mode
  const subtitleItems = [
    { id: 1, start: '00:00:00.000', end: '00:00:02.340', text: '欢迎使用 faster-whisper 音频转录模型。' },
    { id: 2, start: '00:00:02.500', end: '00:00:05.800', text: '本视频将向您展示带时间轴字幕的自动生成过程。' },
    { id: 3, start: '00:00:06.100', end: '00:00:09.200', text: '任务已完成，共生成 96 条高精度时间轴字幕。' },
    { id: 4, start: '00:00:09.500', end: '00:00:12.800', text: '分段模式可自动检测说话停顿并精准对齐秒数。' },
    { id: 5, start: '00:00:13.100', end: '00:00:16.400', text: '您可以随时导出 UTF-8 编码的 .srt 字幕文件。' },
  ]

  const filteredSubtitles = subtitleItems.filter((item) =>
    item.text.toLowerCase().includes(subtitleSearch.toLowerCase())
  )

  // Render syntax highlighting for Python lines
  const renderCodeLine = (line: { num: number; text: string; type: string }) => {
    const text = line.text
    if (line.type === 'comment') {
      return <span className="text-gray-400 opacity-90">{text}</span>
    }
    if (line.type === 'docstring') {
      return <span className="text-amber-700 font-medium">{text}</span>
    }

    let formatted = text
      .replace(/\b(import|from|def|return|for|in|as|and|or|not|True|False|bool|str|int|dict|model|transcribe)\b/g, '<KW>$1</KW>')
      .replace(/(".*?"|'.*? ')/g, '<STR>$1</STR>')

    const parts = formatted.split(/(<KW>.*?<\/KW>|<STR>.*?<\/STR>)/g)

    return (
      <span>
        {parts.map((part, idx) => {
          if (part.startsWith('<KW>')) {
            return (
              <span key={idx} className="text-purple-700 font-semibold">
                {part.replace(/<\/?KW>/g, '')}
              </span>
            )
          }
          if (part.startsWith('<STR>')) {
            return (
              <span key={idx} className="text-emerald-700">
                {part.replace(/<\/?STR>/g, '')}
              </span>
            )
          }
          return <span key={idx} className="text-gray-800">{part}</span>
        })}
      </span>
    )
  }

  // Settings Category List
  const settingsCategories = [
    { id: 'general', label: '通用', icon: Settings },
    { id: 'agents', label: '智能体与模型', icon: Bot },
    { id: 'security', label: '权限与安全', icon: Lock },
    { id: 'workspace', label: '工作区', icon: Folder },
    { id: 'notifications', label: '通知', icon: Bell },
    { id: 'appearance', label: '外观', icon: Palette },
    { id: 'shortcuts', label: '快捷键', icon: Keyboard },
    { id: 'account', label: '账户', icon: User },
  ] as const

  return (
    <div className="w-screen h-screen flex flex-col bg-[#f5f5f4] text-[#1c1917] select-none overflow-hidden font-sans">
      {/* App Main Layout Grid */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ========================================================= */}
        {/* COLUMN 1: LEFT SIDEBAR */}
        {/* ========================================================= */}
        {leftSidebarOpen ? (
          <aside 
            style={{ width: `${leftSidebarWidth}px` }}
            className="flex-shrink-0 bg-[#f9f9f8] border-r border-[#e7e5e4] flex flex-col justify-between py-3.5 px-3 transition-all duration-75"
          >
            <div className="flex flex-col space-y-3.5 overflow-y-auto pr-0.5 custom-scrollbar">
              
              {/* Header with Tokmon Logo & Left Sidebar Collapse Toggle */}
              <div className="flex items-center justify-between px-1 pt-0.5 pb-1">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <TokmonLogo />
                  <span className="text-[18px] font-bold tracking-tight text-[#1c1917]">Tokmon</span>
                </div>
                <button
                  onClick={() => setLeftSidebarOpen(false)}
                  title="折叠侧边栏"
                  className="p-1 hover:bg-[#e7e5e4] rounded-lg text-[#78716c] transition-colors"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>

              {/* New Conversation Button */}
              <button 
                onClick={() => {
                  const newName = `新会话 ${Date.now().toString().slice(-4)}`
                  setSelectedConversation(newName)
                  setConversationTitle(newName)
                }}
                className="flex items-center justify-center space-x-1.5 w-full py-2.5 px-4 rounded-xl bg-[#f7efe5] border border-[#ebdcd0] text-[#8b5229] font-medium text-[13.5px] hover:bg-[#f3e4d5] active:scale-98 transition-all shadow-2xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#8b5229]" strokeWidth={2.5} />
                <span>新建会话</span>
              </button>

              {/* Search Input Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#a8a29e] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索项目或会话..."
                  className="w-full bg-[#f0eee8] border border-transparent rounded-xl pl-9 pr-3 py-1.5 text-[12.5px] text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:bg-white focus:border-[#f5e4ab] transition-all"
                />
              </div>

              {/* 3-Level Tree Navigation (分组 Group -> 项目 Project -> 会话 Conversation) */}
              <div className="pt-1">
                <div className="flex items-center justify-between px-2 py-1 text-[11.5px] text-[#78716c] font-medium tracking-wider">
                  <span>分组 / 项目 / 会话</span>
                  <button 
                    onClick={() => setGroup1Open(true)}
                    className="p-0.5 hover:bg-[#e7e5e4] rounded text-[#78716c]"
                    title="展开分组"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Level 1: 分组 1 - 内容生产 */}
                <div className="mt-1 space-y-0.5 text-[13px]">
                  <button 
                    onClick={() => setGroup1Open(!group1Open)}
                    className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-[#f3f2eb] text-[#292524] text-left font-semibold transition-colors cursor-pointer"
                  >
                    {group1Open ? <ChevronDown className="w-3.5 h-3.5 text-[#78716c]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#78716c]" />}
                    <Folder className="w-4 h-4 text-[#c86a28]" />
                    <span className="truncate">内容生产</span>
                  </button>

                  {group1Open && (
                    <div className="pl-3.5 space-y-1 border-l-2 border-[#f0eee6] ml-3.5">
                      
                      {/* Level 2: 项目 1.1 - 字幕制作空间 */}
                      <div>
                        <button 
                          onClick={() => setProject1_1Open(!project1_1Open)}
                          className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-[#f3f2eb] text-[#44403c] text-left font-medium text-[12.5px] transition-colors cursor-pointer"
                        >
                          {project1_1Open ? <ChevronDown className="w-3 h-3 text-[#a8a29e]" /> : <ChevronRight className="w-3 h-3 text-[#a8a29e]" />}
                          <Box className="w-3.5 h-3.5 text-[#a8a29e]" />
                          <span className="truncate">字幕制作空间</span>
                        </button>

                        {/* Level 3: 会话列表 */}
                        {project1_1Open && (
                          <div className="pl-3 space-y-0.5 mt-0.5">
                            {['生成音频时间轴字幕', '字幕校对优化', '批量字幕质检优化'].map((item) => (
                              <div 
                                key={item}
                                onClick={() => handleSelectConversation(item)}
                                className={`cursor-pointer flex items-center space-x-2 px-2.5 py-1.5 rounded-xl text-[12px] transition-all ${
                                  selectedConversation === item
                                    ? 'bg-[#f7efe5] text-[#8b5229] font-semibold shadow-2xs'
                                    : 'text-[#57534e] hover:bg-[#f3f2eb]'
                                }`}
                              >
                                <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${selectedConversation === item ? 'text-[#c86a28]' : 'text-[#a8a29e]'}`} />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Level 2: 项目 1.2 - 音频切片项目 */}
                      <div>
                        <button 
                          onClick={() => setProject1_2Open(!project1_2Open)}
                          className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-[#f0eee6] text-[#44403c] text-left font-medium text-[12.5px] transition-colors"
                        >
                          {project1_2Open ? <ChevronDown className="w-3 h-3 text-[#a8a29e]" /> : <ChevronRight className="w-3 h-3 text-[#a8a29e]" />}
                          <Box className="w-3.5 h-3.5 text-[#a8a29e]" />
                          <span className="truncate">音频切片处理</span>
                        </button>

                        {project1_2Open && (
                          <div className="pl-3 space-y-0.5 mt-0.5">
                            <div 
                              onClick={() => handleSelectConversation('自动长音频降噪')}
                              className={`cursor-pointer flex items-center space-x-2 px-2.5 py-1.5 rounded-xl text-[12px] transition-all ${
                                selectedConversation === '自动长音频降噪'
                                  ? 'bg-[#f7efe5] text-[#8b5229] font-semibold'
                                  : 'text-[#57534e] hover:bg-[#f3f2eb]'
                              }`}
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-[#a8a29e]" />
                              <span className="truncate">自动长音频降噪</span>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

                {/* Level 1: 分组 2 - 演示助手 */}
                <div className="mt-1.5 space-y-0.5 text-[13px]">
                  <button 
                    onClick={() => setGroup2Open(!group2Open)}
                    className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-[#f3f2eb] text-[#292524] text-left font-semibold transition-colors cursor-pointer"
                  >
                    {group2Open ? <ChevronDown className="w-3.5 h-3.5 text-[#78716c]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#78716c]" />}
                    <Folder className="w-4 h-4 text-[#c86a28]" />
                    <span className="truncate">演示助手</span>
                  </button>

                  {group2Open && (
                    <div className="pl-3.5 space-y-1 border-l-2 border-[#f0eee6] ml-3.5">
                      <div>
                        <button 
                          onClick={() => setProject2_1Open(!project2_1Open)}
                          className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-[#f3f2eb] text-[#44403c] text-left font-medium text-[12.5px] transition-colors cursor-pointer"
                        >
                          {project2_1Open ? <ChevronDown className="w-3 h-3 text-[#a8a29e]" /> : <ChevronRight className="w-3 h-3 text-[#a8a29e]" />}
                          <Box className="w-3.5 h-3.5 text-[#a8a29e]" />
                          <span className="truncate">PPT 智绘项目</span>
                        </button>

                        {project2_1Open && (
                          <div className="pl-3 space-y-0.5 mt-0.5">
                            {['PPT 大纲生成', '演讲稿润色'].map((item) => (
                              <div 
                                key={item}
                                onClick={() => handleSelectConversation(item)}
                                className={`cursor-pointer flex items-center space-x-2 px-2.5 py-1.5 rounded-xl text-[12px] transition-all ${
                                  selectedConversation === item
                                    ? 'bg-[#f7efe5] text-[#8b5229] font-semibold'
                                    : 'text-[#57534e] hover:bg-[#f3f2eb]'
                                }`}
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-[#a8a29e]" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Level 1: 分组 3 - 旅行计划 */}
                <div className="mt-1.5 space-y-0.5 text-[13px]">
                  <button 
                    onClick={() => setGroup3Open(!group3Open)}
                    className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-[#f3f2eb] text-[#292524] text-left font-semibold transition-colors cursor-pointer"
                  >
                    {group3Open ? <ChevronDown className="w-3.5 h-3.5 text-[#78716c]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#78716c]" />}
                    <Folder className="w-4 h-4 text-[#c86a28]" />
                    <span className="truncate">旅行计划</span>
                  </button>

                  {group3Open && (
                    <div className="pl-3.5 space-y-1 border-l-2 border-[#f0eee6] ml-3.5">
                      <div>
                        <button 
                          onClick={() => setProject3_1Open(!project3_1Open)}
                          className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-md hover:bg-[#f3f2eb] text-[#44403c] text-left font-medium text-[12.5px] transition-colors cursor-pointer"
                        >
                          {project3_1Open ? <ChevronDown className="w-3 h-3 text-[#a8a29e]" /> : <ChevronRight className="w-3 h-3 text-[#a8a29e]" />}
                          <Box className="w-3.5 h-3.5 text-[#a8a29e]" />
                          <span className="truncate">度假规划</span>
                        </button>

                        {project3_1Open && (
                          <div className="pl-3 space-y-0.5 mt-0.5">
                            <div 
                              onClick={() => handleSelectConversation('行程规划助手')}
                              className={`cursor-pointer flex items-center space-x-2 px-2.5 py-1.5 rounded-xl text-[12px] transition-all ${
                                selectedConversation === '行程规划助手'
                                  ? 'bg-[#f7efe5] text-[#8b5229] font-semibold'
                                  : 'text-[#57534e] hover:bg-[#f3f2eb]'
                              }`}
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-[#a8a29e]" />
                              <span className="truncate">行程规划助手</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Settings at Bottom */}
            <div className="pt-2 border-t border-[#e7e5e4]">
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#efeee8] text-[13.5px] text-[#44403c] font-medium transition-colors text-left cursor-pointer"
              >
                <Settings className="w-4 h-4 text-[#78716c]" />
                <span>设置</span>
              </button>
            </div>
          </aside>
        ) : null}

        {/* LEFT SIDEBAR RESIZER DIVIDER */}
        {leftSidebarOpen && (
          <div
            onMouseDown={() => setIsDraggingLeft(true)}
            title="按住拖拽调整左侧栏宽度"
            className="w-1.5 h-full cursor-col-resize z-30 flex-shrink-0 relative group flex justify-center items-center select-none"
          >
            <div className={`w-[2px] h-full transition-colors ${isDraggingLeft ? 'bg-[#f5a623]' : 'bg-transparent group-hover:bg-[#f5a623]'}`} />
          </div>
        )}

        {/* ========================================================= */}
        {/* COLUMN 2: MAIN CHAT & WORKFLOW EXECUTION */}
        {/* ========================================================= */}
        <main 
          ref={mainRef}
          style={{
            width: rightPanelOpen ? undefined : `${savedMainWidth}px`
          }}
          className={`${rightPanelOpen ? 'flex-1 min-w-[400px]' : 'flex-shrink-0'} flex flex-col bg-[#fafaf9] border-r border-[#e7e5e4] overflow-hidden relative`}
        >
          
          {/* Middle Chat Header Bar */}
          <header className="h-[46px] flex-shrink-0 bg-[#fafaf9]/90 backdrop-blur-xs border-b border-[#e7e5e4] flex items-center justify-between px-4 z-10">
            <div className="flex items-center space-x-3">
              {/* Left Sidebar Expand Button if collapsed */}
              {!leftSidebarOpen && (
                <button
                  onClick={() => setLeftSidebarOpen(true)}
                  title="展开侧边栏"
                  className="p-1.5 hover:bg-[#e7e5e4] rounded-lg text-[#57534e] transition-colors cursor-pointer"
                >
                  <PanelLeftOpen className="w-4 h-4 text-[#d97706]" />
                </button>
              )}

              {/* Editable Title */}
              {isEditingTitle ? (
                <input
                  type="text"
                  value={conversationTitle}
                  onChange={(e) => setConversationTitle(e.target.value)}
                  onBlur={() => {
                    setIsEditingTitle(false)
                    setSelectedConversation(conversationTitle)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingTitle(false)
                      setSelectedConversation(conversationTitle)
                    }
                  }}
                  autoFocus
                  className="text-[14.5px] font-semibold text-[#1c1917] bg-white border border-[#f5a623] px-2 py-0.5 rounded-md focus:outline-none"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <h1 className="text-[14.5px] font-semibold text-[#1c1917] tracking-tight">
                    {conversationTitle}
                  </h1>
                  <button 
                    onClick={() => setIsEditingTitle(true)}
                    className="p-1 hover:bg-[#e7e5e4] rounded-md text-[#a8a29e] transition-colors cursor-pointer"
                    title="修改会话名称"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Panel Toggle Button */}
            <div className="flex items-center">
              <button
                onClick={handleToggleRightPanel}
                title={rightPanelOpen ? '折叠代码审阅' : '展开代码审阅'}
                className="p-1.5 hover:bg-[#e7e5e4] rounded-lg text-[#57534e] hover:text-[#1c1917] transition-colors cursor-pointer flex items-center justify-center"
              >
                {rightPanelOpen ? (
                  <PanelRightClose className="w-4 h-4 text-[#78716c]" />
                ) : (
                  <PanelRightOpen className="w-4 h-4 text-[#d97706]" />
                )}
              </button>
            </div>
          </header>

          {/* View Switcher Tabs: 对话 (Chat) vs 轨迹 (Trajectory) */}
          <div className="h-[38px] flex-shrink-0 bg-[#faf9f6] border-b border-[#e8e6df] flex items-center px-6 space-x-6 text-[13.5px] font-medium text-[#78716c] z-10">
            <button
              onClick={() => setMainViewMode('chat')}
              className={`h-full border-b-2 flex items-center transition-colors cursor-pointer ${
                mainViewMode === 'chat'
                  ? 'border-[#c86a28] text-[#8b5229] font-bold'
                  : 'border-transparent hover:text-[#1c1917]'
              }`}
            >
              对话
            </button>
            <button
              onClick={() => setMainViewMode('trajectory')}
              className={`h-full border-b-2 flex items-center transition-colors cursor-pointer ${
                mainViewMode === 'trajectory'
                  ? 'border-[#c86a28] text-[#8b5229] font-bold'
                  : 'border-transparent hover:text-[#1c1917]'
              }`}
            >
              轨迹
            </button>
          </div>

          {mainViewMode === 'chat' ? (
            /* Chat Messages & Execution Scroll Panel */
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar pb-36">
              
              {/* Timestamp tag */}
              <div className="text-center">
                <span className="text-[11.5px] text-[#a8a29e] font-medium">10:20</span>
              </div>

              {/* Render Chat Messages */}
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.sender === 'user' ? (
                    <div className="flex justify-end items-start space-x-2.5 pl-12">
                      <div className="max-w-[560px] bg-[#fcf8f3] border border-[#ebdcd0] rounded-2xl p-3.5 text-[13px] text-[#292524] leading-relaxed shadow-2xs">
                        <p className="font-medium text-[#1c1917] mb-1">{msg.text}</p>
                        {msg.details && (
                          <div className="font-mono text-[12px] text-[#57534e] space-y-0.5 bg-[#f7efe5]/60 p-2 rounded-lg border border-[#ebdcd0] mt-1.5">
                            <p><span className="text-[#a8a29e]">模型路径:</span> {msg.details.modelPath}</p>
                            <p><span className="text-[#a8a29e]">音频文件:</span> {msg.details.audioFile}</p>
                            <p><span className="text-[#a8a29e]">输出字幕文件:</span> {msg.details.outputFile}</p>
                          </div>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#f7efe5] border border-[#ebdcd0] flex items-center justify-center flex-shrink-0 text-[#8b5229]">
                        <User className="w-4 h-4 text-[#8b5229]" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3 pr-12">
                      <div className="w-8 h-8 rounded-full bg-[#f7efe5] border border-[#ebdcd0] flex items-center justify-center flex-shrink-0 shadow-2xs">
                        <Bot className="w-4 h-4 text-[#c86a28]" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="text-[13.5px] text-[#292524] leading-normal pt-1 whitespace-pre-line">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Workflow Execution Log Container (Collapsible) */}
              <div className="bg-[#ffffff] border border-[#e7e5e4] rounded-xl p-4 shadow-2xs space-y-3.5">
                
                {/* Execution Metrics Summary Bar with Collapse Toggle */}
                <div 
                  onClick={() => setIsWorkflowExpanded(!isWorkflowExpanded)}
                  className="flex items-center justify-between text-[12px] text-[#57534e] pb-3 border-b border-[#f5f5f4] font-medium cursor-pointer hover:bg-[#fafaf9] p-1 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[#a8a29e]">🕒</span>
                      <span>已工作 <strong className="text-[#1c1917] font-semibold ml-1">2分18秒</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Folder className="w-3.5 h-3.5 text-[#a8a29e]" />
                      <span>已探索 <strong className="text-[#1c1917] font-semibold ml-1">12 项</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#a8a29e]" />
                      <span>已运行 <strong className="text-[#1c1917] font-semibold ml-1">9 条命令</strong></span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span>完成任务 <strong className="text-[#1c1917] font-semibold ml-1">1/1</strong></span>
                    </div>
                  </div>

                  <button className="flex items-center space-x-1 text-[#78716c] text-[11.5px]">
                    <span>{isWorkflowExpanded ? '收起步骤' : '展开步骤'}</span>
                    {isWorkflowExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Collapsible Timeline Items */}
                {isWorkflowExpanded && (
                  <div className="space-y-3 text-[12.5px] pl-1 relative pt-1">
                    <div className="absolute left-[7px] top-[14px] bottom-[14px] w-[1px] bg-[#e7e5e4]" />

                    <div className="flex items-start space-x-2.5 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#f7efe5] border border-[#ebdcd0] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c86a28]" />
                      </div>
                      <span className="text-[#a8a29e] font-mono text-[11.5px]">10:21</span>
                      <span className="text-[#1c1917] font-medium">
                        开始任务: 使用 <span className="font-mono text-[#8b5229]">faster-whisper</span> 转录音频并生成带时间戳字幕
                      </span>
                    </div>

                    <div className="flex items-start space-x-2.5 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#f7efe5] border border-[#ebdcd0] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c86a28]" />
                      </div>
                      <span className="text-[#a8a29e] font-mono text-[11.5px]">10:21</span>
                      <div className="flex items-center space-x-1 text-[#292524]">
                        <Folder className="w-3.5 h-3.5 text-[#78716c]" />
                        <span>探索文件夹</span>
                        <span className="font-mono bg-[#f5f5f4] text-[#44403c] px-1.5 py-0.2 rounded text-[11.5px]">C:\Projects\subtitle\</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#f7efe5] border border-[#ebdcd0] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c86a28]" />
                      </div>
                      <span className="text-[#a8a29e] font-mono text-[11.5px]">10:21</span>
                      <div className="flex items-center space-x-1 text-[#292524]">
                        <FileText className="w-3.5 h-3.5 text-[#78716c]" />
                        <span>读取文件</span>
                        <span className="font-mono text-[#1c1917]">config.yaml</span>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#22c55e]/20 border border-[#22c55e] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#16a34a]" />
                      </div>
                      <span className="text-[#a8a29e] font-mono text-[11.5px]">10:22</span>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-[#292524]">
                          <span className="text-[#22c55e]">✓</span>
                          <span>运行命令</span>
                          <span className="font-mono text-[#0284c7]">python -V</span>
                        </div>
                        <div className="bg-[#f5f5f4] text-[#57534e] font-mono text-[11.5px] px-2 py-1 rounded border border-[#e7e5e4]">
                          Python 3.10.11
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#fef3d6] border border-[#f59e0b] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]" />
                      </div>
                      <span className="text-[#a8a29e] font-mono text-[11.5px]">10:22</span>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-[#292524]">
                          <span className="font-mono text-[#78716c]">&gt;_</span>
                          <span>运行命令</span>
                          <span className="font-mono text-[#0284c7]">pip show faster-whisper</span>
                        </div>
                        <div className="bg-[#f5f5f4] text-[#57534e] font-mono text-[11.5px] px-2 py-1 rounded border border-[#e7e5e4]">
                          faster-whisper 1.1.1
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#f7efe5] border border-[#ebdcd0] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c86a28]" />
                      </div>
                      <span className="text-[#a8a29e] font-mono text-[11.5px]">10:23</span>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-1.5 text-[#292524]">
                          <FileCode className="w-3.5 h-3.5 text-[#c86a28]" />
                          <span>运行脚本</span>
                          <span className="font-mono text-[#8b5229] font-medium">transcribe.py</span>
                          <span className="font-mono text-[#78716c] text-[11.5px]">--model large-v3-turbo --file C:\Data\audio.mp3</span>
                        </div>

                        <div className="bg-[#faf8f5] border border-[#e8e6df] rounded-lg p-3 space-y-2">
                          <div className="flex justify-between items-center text-[12px] text-[#44403c]">
                            <span>正在转录音频 (分段模式) ...</span>
                            <span className="font-mono font-semibold text-[#8b5229]">进度 42 %</span>
                          </div>
                          <div className="w-full h-2 bg-[#e8e6df] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#e08a7e] to-[#c86a28] rounded-full w-[42%]" />
                          </div>
                          <div className="text-[11px] text-[#78716c]">
                            预计剩余: <span className="font-mono text-[#44403c]">00:01:32</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5 relative z-10">
                      <div className="w-3.5 h-3.5 rounded-full border border-dashed border-[#a8a29e] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <RotateCw className="w-2 h-2 text-[#a8a29e] animate-spin" />
                      </div>
                      <span className="text-[#a8a29e] font-mono text-[11.5px]">10:24</span>
                      <div className="flex items-center space-x-1 text-[#292524]">
                        <FileText className="w-3.5 h-3.5 text-[#78716c]" />
                        <span>生成文件</span>
                        <span className="font-mono text-[#1c1917] font-medium">output.srt</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-start space-x-2.5 p-2.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg text-[12.5px] text-[#15803d]">
                        <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#166534]">任务已完成</p>
                          <p className="text-[12px] text-[#15803d]">字幕文件已生成: <span className="font-mono">output.srt</span></p>
                          <p className="text-[11.5px] text-[#166534]/80 mt-0.5">共生成 96 条字幕</p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          ) : (
            /* HIGH FIDELITY TRAJECTORY TRACE VIEW */
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-[#fafaf9]">
              
              {/* Top Metrics Metrics Bar */}
              <div className="bg-white border border-[#e7e5e4] rounded-2xl p-3.5 flex items-center justify-between shadow-2xs text-[12px] text-[#57534e]">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#a8a29e]">🕒</span>
                    <span>Duration <strong className="text-[#1c1917] font-semibold ml-1">4m 18.7s</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#a8a29e]">💬</span>
                    <span>Turns <strong className="text-[#1c1917] font-semibold ml-1">1</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#a8a29e]">⚙️</span>
                    <span>Calls <strong className="text-[#1c1917] font-semibold ml-1">1</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#a8a29e]">📊</span>
                    <span>Total Tokens <strong className="text-[#1c1917] font-semibold ml-1">8,456</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#a8a29e]">📥</span>
                    <span>Prompt <strong className="text-[#1c1917] font-semibold ml-1">1,324 (15.7%)</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#a8a29e]">📤</span>
                    <span>Completion <strong className="text-[#1c1917] font-semibold ml-1">7,132 (84.3%)</strong></span>
                  </div>
                </div>

                {/* Search Box in Trajectory */}
                <div className="relative w-[220px]">
                  <Search className="w-3.5 h-3.5 text-[#a8a29e] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={trajectorySearch}
                    onChange={(e) => setTrajectorySearch(e.target.value)}
                    placeholder="搜索轨迹..."
                    className="w-full bg-[#f9f9f8] border border-[#e7e5e4] rounded-lg pl-8 pr-3 py-1 text-[11.5px] text-[#1c1917] focus:outline-none focus:border-[#f5a623]"
                  />
                </div>
              </div>

              {/* Waterfall Execution Timeline (Gantt Chart) */}
              <div className="bg-white border border-[#e7e5e4] rounded-2xl p-4 shadow-2xs space-y-3">
                {/* Time Scale Ticks */}
                <div className="flex justify-between pl-16 pr-4 text-[11px] text-[#a8a29e] font-mono border-b border-[#f5f5f4] pb-1.5">
                  <span>0s</span>
                  <span>48s</span>
                  <span>1m 36s</span>
                  <span>2m 24s</span>
                  <span>3m 12s</span>
                  <span>4m 0s</span>
                  <span>4m 48s</span>
                </div>

                {/* Timeline Rows */}
                <div className="space-y-2 text-[12px] font-medium text-[#78716c]">
                  {/* Row 1: Input */}
                  <div className="flex items-center space-x-3">
                    <span className="w-12 text-right text-[11.5px]">Input</span>
                    <div className="flex-1 h-3 bg-[#f5f5f4] rounded-full relative overflow-hidden">
                      <div className="absolute left-[2%] width-[12%] h-full bg-[#6b7280] rounded-full" style={{ width: '12%' }} />
                      <div className="absolute left-[15%] width-[14%] h-full bg-[#3b82f6] rounded-full" style={{ width: '14%' }} />
                      <div className="absolute left-[30%] width-[20%] h-full bg-[#22c55e] rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>

                  {/* Row 2: Model */}
                  <div className="flex items-center space-x-3">
                    <span className="w-12 text-right text-[11.5px]">Model</span>
                    <div className="flex-1 h-3 bg-[#f5f5f4] rounded-full relative overflow-hidden">
                      <div className="absolute left-[50%] width-[10%] h-full bg-[#a855f7] rounded-full" style={{ width: '10%' }} />
                      <div className="absolute left-[65%] width-[10%] h-full bg-[#a855f7] rounded-full" style={{ width: '10%' }} />
                      <div className="absolute left-[80%] width-[10%] h-full bg-[#a855f7] rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>

                  {/* Row 3: Tools */}
                  <div className="flex items-center space-x-3">
                    <span className="w-12 text-right text-[11.5px]">Tools</span>
                    <div className="flex-1 h-3 bg-[#f5f5f4] rounded-full relative overflow-hidden">
                      <div className="absolute left-[61%] width-[12%] h-full bg-[#f97316] rounded-full" style={{ width: '12%' }} />
                      <div className="absolute left-[76%] width-[12%] h-full bg-[#f97316] rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                </div>

                {/* Legend Bar */}
                <div className="flex items-center space-x-6 text-[11.5px] text-[#78716c] pt-2 border-t border-[#f5f5f4] font-medium">
                  <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#6b7280]" /><span>Input</span></div>
                  <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#3b82f6]" /><span>Model (Thinking)</span></div>
                  <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#22c55e]" /><span>Model (Generating)</span></div>
                  <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7]" /><span>Tool Call</span></div>
                  <div className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#f97316]" /><span>Tool Result</span></div>
                </div>
              </div>

              {/* Grid Split: Events Table & Event Detail Inspector */}
              <div className="grid grid-cols-12 gap-4">
                
                {/* Left 8 Cols: Events List Table */}
                <div className="col-span-8 bg-white border border-[#e7e5e4] rounded-2xl p-4 shadow-2xs flex flex-col justify-between space-y-3">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f4]">
                      <span className="font-bold text-[#1c1917] text-[13.5px]">事件列表 (8)</span>
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-1 px-2.5 py-1 bg-[#fafaf9] hover:bg-[#f5f5f4] border border-[#e7e5e4] rounded-lg text-[11.5px] text-[#57534e]">
                          <Sliders className="w-3 h-3" />
                          <span>筛选</span>
                        </button>
                        <button className="flex items-center space-x-1 px-2.5 py-1 bg-[#fafaf9] hover:bg-[#f5f5f4] border border-[#e7e5e4] rounded-lg text-[11.5px] text-[#57534e]">
                          <Download className="w-3 h-3" />
                          <span>导出</span>
                        </button>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[12px]">
                        <thead>
                          <tr className="border-b border-[#f5f5f4] text-[#a8a29e] font-medium text-[11.5px]">
                            <th className="py-2 px-1">#</th>
                            <th className="py-2 px-2">时间</th>
                            <th className="py-2 px-2">类型</th>
                            <th className="py-2 px-2">角色</th>
                            <th className="py-2 px-2">内容 / 名称</th>
                            <th className="py-2 px-2 text-right">耗时</th>
                            <th className="py-2 px-2 text-right">Tokens</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f5f5f4]">
                          {[
                            { id: 1, time: '00:00.000', type: 'USER', typeBg: 'bg-[#e0f2fe] text-[#0284c7]', role: 'User', content: '请创建 result.txt，写入指定标记...', duration: '-', tokens: '45' },
                            { id: 2, time: '00:01.234', type: 'CONTEXT', typeBg: 'bg-[#dcfce7] text-[#16a34a]', role: 'System', content: '<system-reminder> The following...', duration: '-', tokens: '-' },
                            { id: 3, time: '00:01.345', type: 'CONTEXT', typeBg: 'bg-[#dcfce7] text-[#16a34a]', role: 'System', content: 'Current runtime context. This...', duration: '-', tokens: '-' },
                            { id: 4, time: '00:01.789', type: 'ASSISTANT', typeBg: 'bg-[#f3e8ff] text-[#9333ea]', role: 'Assistant', content: '(tool call only)', duration: '-', tokens: '-' },
                            { id: 5, time: '00:02.101', type: 'TOOL', typeBg: 'bg-[#fef3d6] text-[#b45309]', role: 'write_file', content: 'write result.txt', duration: '312ms', tokens: '-' },
                            { id: 6, time: '00:02.789', type: 'ASSISTANT', typeBg: 'bg-[#f3e8ff] text-[#9333ea]', role: 'Assistant', content: '(tool call only)', duration: '-', tokens: '-' },
                            { id: 7, time: '00:03.102', type: 'TOOL', typeBg: 'bg-[#fef3d6] text-[#b45309]', role: 'bash', content: "bash printf 'DSH_HARNESS_BASH_OK'", duration: '521ms', tokens: '-' },
                            { id: 8, time: '00:03.823', type: 'ASSISTANT', typeBg: 'bg-[#f3e8ff] text-[#9333ea]', role: 'Assistant', content: 'DSH_HARNESS_TASK_COMPLETED', duration: '-', tokens: '128' },
                          ].map((item) => (
                            <tr 
                              key={item.id}
                              onClick={() => setSelectedTrajectoryEvent(item.id)}
                              className={`cursor-pointer transition-colors ${
                                selectedTrajectoryEvent === item.id ? 'bg-[#fef3d6]/60 font-medium' : 'hover:bg-[#fafaf9]'
                              }`}
                            >
                              <td className="py-2 px-1 text-[#78716c] font-mono">{item.id}</td>
                              <td className="py-2 px-2 text-[#78716c] font-mono text-[11.5px]">{item.time}</td>
                              <td className="py-2 px-2">
                                <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold font-mono ${item.typeBg}`}>
                                  {item.type}
                                </span>
                              </td>
                              <td className="py-2 px-2 text-[#44403c]">{item.role}</td>
                              <td className="py-2 px-2 text-[#1c1917] font-mono truncate max-w-[180px]">{item.content}</td>
                              <td className="py-2 px-2 text-right font-mono text-[#78716c]">{item.duration}</td>
                              <td className="py-2 px-2 text-right font-mono text-[#78716c]">{item.tokens}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#f5f5f4] text-[11.5px] text-[#78716c]">
                    <span>显示 1-8 条，共 8 条</span>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <button className="p-1 hover:bg-[#f5f5f4] rounded text-[#a8a29e]"><ChevronRight className="w-3.5 h-3.5 rotate-180" /></button>
                        <span className="w-6 h-6 flex items-center justify-center bg-[#fef3d6] text-[#855702] border border-[#fde68a] rounded font-bold">1</span>
                        <button className="p-1 hover:bg-[#f5f5f4] rounded text-[#a8a29e]"><ChevronRight className="w-3.5 h-3.5" /></button>
                      </div>
                      <select className="bg-[#fafaf9] border border-[#e7e5e4] rounded px-2 py-0.5 text-[11px] font-medium text-[#44403c]">
                        <option>20 条/页</option>
                        <option>50 条/页</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right 4 Cols: Event Detail Inspector Panel */}
                <div className="col-span-4 bg-white border border-[#e7e5e4] rounded-2xl p-4 shadow-2xs space-y-4 text-[12.5px]">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-[#f5f5f4] pb-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
                      <span className="font-bold text-[#1c1917]">Request #{selectedTrajectoryEvent || 1}</span>
                      <span className="px-2 py-0.5 bg-[#f5f5f4] text-[#57534e] text-[11px] rounded-full font-mono">Turn 1</span>
                    </div>
                    <button className="p-1 text-[#a8a29e] hover:text-[#1c1917]"><X className="w-3.5 h-3.5" /></button>
                  </div>

                  {/* Inspector Tabs */}
                  <div className="flex items-center space-x-4 border-b border-[#f5f5f4] text-[12px] font-medium text-[#78716c] pb-2">
                    {(['Summary', 'Options', 'Usage', 'Timing'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setTrajectoryDetailTab(tab)}
                        className={`transition-colors ${
                          trajectoryDetailTab === tab ? 'text-[#d97706] font-bold border-b-2 border-[#d97706] pb-1' : 'hover:text-[#1c1917]'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Summary Details */}
                  <div className="space-y-2.5 text-[12px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#78716c]">Status</span>
                      <span className="px-2 py-0.5 bg-[#dcfce7] text-[#166534] font-semibold rounded text-[11px]">Completed</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#78716c]">Provider</span>
                      <span className="font-mono text-[#1c1917]">deepseek-official</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#78716c]">Model</span>
                      <span className="font-mono text-[#1c1917]">deepseek-v4-flash</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#78716c]">Tool calls</span>
                      <span className="font-mono text-[#1c1917]">1</span>
                    </div>
                    <div className="flex justify-between items-center cursor-pointer hover:bg-[#fafaf9] p-1 rounded">
                      <span className="text-[#78716c]">Result</span>
                      <span className="text-[#d97706] font-medium flex items-center space-x-1">
                        <span>Assistant Message</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Collapsible Accordions */}
                  <div className="border-t border-[#f5f5f4] pt-2 space-y-2 text-[12px] text-[#57534e]">
                    <div className="flex justify-between items-center cursor-pointer p-1.5 hover:bg-[#fafaf9] rounded">
                      <span>Options</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#a8a29e]" />
                    </div>
                    <div className="flex justify-between items-center cursor-pointer p-1.5 hover:bg-[#fafaf9] rounded">
                      <span>Usage</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#a8a29e]" />
                    </div>
                    <div className="flex justify-between items-center cursor-pointer p-1.5 hover:bg-[#fafaf9] rounded">
                      <span>Timing</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#a8a29e]" />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Bottom Floating Input Box Area (Reconstructed from Reference Image 1 & 2) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/90 to-transparent pointer-events-none">
            <div className="max-w-[760px] mx-auto bg-[#ffffff] border border-[#e7e5e4] rounded-2xl shadow-lg p-3 pointer-events-auto transition-all focus-within:border-[#f59e0b] space-y-2">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={handleTextareaInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="提出后续修改要求"
                rows={1}
                style={{ minHeight: '38px' }}
                className="w-full bg-transparent border-0 resize-none overflow-hidden text-[13.5px] text-[#1c1917] placeholder-[#a8a29e] focus:outline-none px-1 py-0.5 leading-relaxed transition-all"
              />

              {/* Bottom Toolbar Row matching Reference Image 1 */}
              <div className="flex items-center justify-between pt-1 text-[12.5px]">
                
                {/* Left Group */}
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 rounded-lg text-[#78716c] hover:bg-[#f5f5f4] transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" />
                  </button>

                  {/* Access Level Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                      className="flex items-center space-x-1.5 px-2 py-1 rounded-lg text-[#d97706] hover:bg-[#fef3d6]/60 transition-colors font-medium cursor-pointer"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-[#d97706]" />
                      <span>{settingAccessLevel}</span>
                      <ChevronDown className="w-3 h-3 text-[#d97706]" />
                    </button>

                    {showAccessDropdown && (
                      <div className="absolute left-0 bottom-9 w-36 bg-white border border-[#e7e5e4] rounded-xl shadow-xl py-1 z-50 text-[12px]">
                        {(['完全访问', '受信路径', '按需确认'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => {
                              setSettingAccessLevel(level)
                              setShowAccessDropdown(false)
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-[#fef3d6] flex items-center justify-between cursor-pointer ${
                              settingAccessLevel === level ? 'text-[#d97706] font-semibold' : 'text-[#44403c]'
                            }`}
                          >
                            <span>{level}</span>
                            {settingAccessLevel === level && <Check className="w-3.5 h-3.5 text-[#d97706]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Group */}
                <div className="flex items-center space-x-2.5">
                  
                  {/* Donut Ring Context Usage Icon with Hover Popover (Reference Image 2) */}
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowContextPopover(true)}
                    onMouseLeave={() => setShowContextPopover(false)}
                  >
                    <button 
                      onClick={() => setShowContextPopover(!showContextPopover)}
                      className="p-1 rounded-lg text-[#a8a29e] hover:text-[#1c1917] hover:bg-[#f5f5f4] transition-colors cursor-pointer flex items-center justify-center"
                    >
                      <CircleDashed className="w-4 h-4 text-[#78716c]" />
                    </button>

                    {/* Context Capacity Hover Popover Card */}
                    {showContextPopover && (
                      <div className="absolute right-0 bottom-9 w-[320px] bg-white border border-[#e7e5e4] rounded-2xl shadow-2xl p-4 text-[12px] z-50 text-[#1c1917] space-y-3 pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-[13px] text-[#1c1917]">上下文容量</span>
                          <span className="text-[11.5px] font-mono text-[#78716c]">31.7万/100万 (31.7%)</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                          <div className="h-full bg-[#f5a623] rounded-full w-[31.7%]" />
                        </div>

                        {/* Breakdown List */}
                        <div className="space-y-1.5 text-[12px] pt-0.5">
                          <div className="flex justify-between items-center"><div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" /><span>消息</span></div><span className="font-mono font-medium text-[#1c1917]">94.4%</span></div>
                          <div className="flex justify-between items-center"><div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-[#60a5fa]" /><span>系统工具</span></div><span className="font-mono text-[#57534e]">4.5%</span></div>
                          <div className="flex justify-between items-center"><div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-[#93c5fd]" /><span>系统提示词</span></div><span className="font-mono text-[#57534e]">0.4%</span></div>
                          <div className="flex justify-between items-center"><div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-[#bfdbfe]" /><span>技能</span></div><span className="font-mono text-[#57534e]">0.3%</span></div>
                          <div className="flex justify-between items-center"><div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-[#dbeafe]" /><span>MCP 工具</span></div><span className="font-mono text-[#57534e]">0.3%</span></div>
                          <div className="flex justify-between items-center"><div className="flex items-center space-x-2"><span className="w-2 h-2 rounded-full bg-[#e5e7eb]" /><span>其他</span></div><span className="font-mono text-[#78716c]">0%</span></div>
                        </div>

                        <div className="border-t border-[#f5f5f4] pt-2 flex justify-between items-center text-[12px]">
                          <span className="text-[#57534e]">平均缓存命中率</span>
                          <span className="font-mono font-bold text-[#1c1917]">98.6%</span>
                        </div>

                        <div className="border-t border-[#f5f5f4] pt-2 space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[12px] text-[#1c1917]">剩余额度</span>
                            <span className="text-[11px] text-[#78716c] hover:text-[#1c1917] cursor-pointer">更多 &gt;</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <div>
                              <p className="text-[#78716c]">5 小时 <span className="text-[#a8a29e]">已重置</span></p>
                              <p className="font-mono font-semibold text-[#1c1917] mt-0.5">15% · 06:28</p>
                              <div className="w-full h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden mt-1">
                                <div className="h-full bg-[#3b82f6] rounded-full w-[15%]" />
                              </div>
                            </div>
                            <div>
                              <p className="text-[#78716c]">每周</p>
                              <p className="font-mono font-semibold text-[#1c1917] mt-0.5">43% · 8月26日</p>
                              <div className="w-full h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden mt-1">
                                <div className="h-full bg-[#16a34a] rounded-full w-[43%]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Model Selector Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => {
                        setShowModelDropdown(!showModelDropdown)
                        setShowReasoningDropdown(false)
                      }}
                      className="flex items-center space-x-1.5 px-2 py-1 rounded-lg text-[#44403c] hover:bg-[#f5f5f4] transition-colors font-medium cursor-pointer"
                    >
                      <span className="font-mono text-[12px]">{selectedChatModel}</span>
                      <ChevronDown className="w-3 h-3 text-[#78716c]" />
                    </button>

                    {showModelDropdown && (
                      <div className="absolute right-0 bottom-9 w-56 bg-white border border-[#e7e5e4] rounded-xl shadow-xl py-1 z-50 text-[12px] font-mono">
                        <div className="px-3 py-1 text-[11px] text-[#a8a29e] font-semibold border-b border-[#f5f5f4] font-sans">
                          选择模型
                        </div>
                        {[
                          'faster-whisper-large-v3-turbo',
                          'whisper-large-v3',
                          'deepseek-v4-flash',
                          'gpt-4o-transcribe'
                        ].map((model) => (
                          <button
                            key={model}
                            onClick={() => {
                              setSelectedChatModel(model)
                              setShowModelDropdown(false)
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-[#fef3d6] flex items-center justify-between cursor-pointer ${
                              selectedChatModel === model ? 'text-[#d97706] font-bold' : 'text-[#44403c]'
                            }`}
                          >
                            <span className="truncate">{model}</span>
                            {selectedChatModel === model && <Check className="w-3.5 h-3.5 text-[#d97706] flex-shrink-0 ml-1" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Reasoning Strength Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => {
                        setShowReasoningDropdown(!showReasoningDropdown)
                        setShowModelDropdown(false)
                      }}
                      className="flex items-center space-x-1 px-2 py-1 rounded-lg text-[#44403c] hover:bg-[#f5f5f4] transition-colors font-medium cursor-pointer"
                    >
                      <Brain className="w-3.5 h-3.5 text-[#78716c]" />
                      <span>{reasoningLevel}</span>
                      <ChevronDown className="w-3 h-3 text-[#78716c]" />
                    </button>

                    {showReasoningDropdown && (
                      <div className="absolute right-0 bottom-9 w-32 bg-white border border-[#e7e5e4] rounded-xl shadow-xl py-1 z-50 text-[12px]">
                        <div className="px-3 py-1 text-[11px] text-[#a8a29e] font-semibold border-b border-[#f5f5f4]">
                          推理强度
                        </div>
                        {(['最高', '标准', '低'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => {
                              setReasoningLevel(level)
                              setShowReasoningDropdown(false)
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-[#fef3d6] flex items-center justify-between cursor-pointer ${
                              reasoningLevel === level ? 'text-[#d97706] font-semibold' : 'text-[#44403c]'
                            }`}
                          >
                            <span>{level}</span>
                            {reasoningLevel === level && <Check className="w-3.5 h-3.5 text-[#d97706]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Send Up Arrow Button */}
                  <button 
                    onClick={handleSendMessage}
                    className="w-7 h-7 rounded-xl bg-[#6b7280] hover:bg-[#4b5563] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  >
                    <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                  </button>

                </div>

              </div>
            </div>
          </div>

        </main>

        {/* RIGHT PANEL RESIZER DIVIDER */}
        {rightPanelOpen && (
          <div
            onMouseDown={() => setIsDraggingRight(true)}
            title="按住拖拽调整右侧栏宽度"
            className="w-1.5 h-full cursor-col-resize z-30 flex-shrink-0 relative group flex justify-center items-center select-none"
          >
            <div className={`w-[2px] h-full transition-colors ${isDraggingRight ? 'bg-[#f5a623]' : 'bg-transparent group-hover:bg-[#f5a623]'}`} />
          </div>
        )}

        {/* ========================================================= */}
        {/* COLUMN 3: RIGHT CODE INSPECTOR / FILE PREVIEW */}
        {/* ========================================================= */}
        {rightPanelOpen ? (
          <section 
            style={{ width: `${rightPanelWidth}px` }}
            className="flex-shrink-0 bg-[#ffffff] flex flex-col border-l border-[#e7e5e4] transition-all duration-75"
          >
            
            {/* Top Tabs */}
            <div className="h-[46px] flex-shrink-0 border-b border-[#e7e5e4] flex items-center justify-between px-4 text-[13.5px] font-medium text-[#78716c]">
              <div className="flex items-center space-x-6 h-full">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`h-full border-b-2 flex items-center transition-colors cursor-pointer ${
                    activeTab === 'code'
                      ? 'border-[#d97706] text-[#b45309] font-semibold'
                      : 'border-transparent hover:text-[#1c1917]'
                  }`}
                >
                  代码审阅
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`h-full border-b-2 flex items-center transition-colors cursor-pointer ${
                    activeTab === 'preview'
                      ? 'border-[#d97706] text-[#b45309] font-semibold'
                      : 'border-transparent hover:text-[#1c1917]'
                  }`}
                >
                  文件预览
                </button>
              </div>
            </div>

            {/* Sub Header File Selector */}
            <div className="h-[38px] flex-shrink-0 bg-[#fafaf9] border-b border-[#e7e5e4] flex items-center justify-between px-3 text-[12.5px] relative">
              <div className="relative">
                <button 
                  onClick={() => setShowFileDropdown(!showFileDropdown)}
                  className="flex items-center space-x-1.5 font-medium text-[#1c1917] hover:bg-[#e7e5e4] px-2 py-1 rounded-md transition-colors"
                >
                  <span className="text-sm">
                    {selectedFile === 'transcribe.py' ? '🐍' : selectedFile === 'config.yaml' ? '⚙️' : '🎬'}
                  </span>
                  <span className="font-mono">{selectedFile}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#a8a29e]" />
                </button>

                {/* File Selector Dropdown Menu */}
                {showFileDropdown && (
                  <div className="absolute left-0 mt-1 w-44 bg-white border border-[#e7e5e4] rounded-xl shadow-lg py-1 z-50 text-[12px] font-mono">
                    {(['transcribe.py', 'config.yaml', 'output.srt'] as const).map((file) => (
                      <button
                        key={file}
                        onClick={() => {
                          setSelectedFile(file)
                          setShowFileDropdown(false)
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-[#fef3d6] flex items-center justify-between ${
                          selectedFile === file ? 'text-[#d97706] font-bold' : 'text-[#44403c]'
                        }`}
                      >
                        <span>{file}</span>
                        {selectedFile === file && <Check className="w-3.5 h-3.5 text-[#d97706]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <span className="font-mono text-[11.5px] font-semibold tracking-wide">
                  <span className="text-[#16a34a]">+42</span> <span className="text-[#dc2626] ml-0.5">-0</span>
                </span>
                <button className="p-0.5 hover:bg-[#e7e5e4] rounded text-[#78716c]">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Main Code Viewer / File Preview Body */}
            <div className="flex-1 overflow-y-auto overflow-x-auto bg-[#ffffff] font-mono text-[12px] leading-[20px] custom-scrollbar p-2">
              {activeTab === 'code' ? (
                <table className="w-full border-collapse">
                  <tbody>
                    {(fileContents[selectedFile] || fileContents['transcribe.py']).map((line) => (
                      <tr key={line.num} className="hover:bg-[#fafaf9]">
                        <td className="w-10 select-none text-right pr-3 text-[#d6d3d1] text-[11px] align-top">
                          {line.num}
                        </td>
                        <td className="pl-2 whitespace-pre text-[#1c1917] align-top font-mono">
                          {renderCodeLine(line)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-3 space-y-3 font-sans text-[12.5px]">
                  
                  {/* Notification banner when copied */}
                  {copiedNotification && (
                    <div className="p-2 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] rounded-lg text-[12px] flex items-center justify-between">
                      <span>✓ 已成功复制全条字幕内容！</span>
                      <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setCopiedNotification(false)} />
                    </div>
                  )}

                  {/* Header & Controls in Preview Mode */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1c1917]">字幕预览 (output.srt)</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handleCopySubtitles}
                        className="flex items-center space-x-1 px-2 py-1 bg-[#f5f5f4] hover:bg-[#e7e5e4] border border-[#e7e5e4] rounded-lg text-[11.5px] text-[#44403c] transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>复制字幕</span>
                      </button>
                    </div>
                  </div>

                  {/* Search Subtitles Bar */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#a8a29e] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={subtitleSearch}
                      onChange={(e) => setSubtitleSearch(e.target.value)}
                      placeholder="在字幕中搜索..."
                      className="w-full bg-[#f9f9f8] border border-[#e7e5e4] rounded-lg pl-8 pr-3 py-1 text-[12px] text-[#1c1917] focus:outline-none focus:border-[#f5a623]"
                    />
                  </div>

                  {/* Subtitle Items List */}
                  <div className="space-y-2 mt-2">
                    {filteredSubtitles.map((sub) => (
                      <div key={sub.id} className="p-2.5 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl hover:border-[#f5a623] transition-colors space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#d97706]">
                          <span>#{sub.id}</span>
                          <span>{sub.start} ➔ {sub.end}</span>
                        </div>
                        <p className="text-[12.5px] text-[#1c1917] leading-relaxed font-sans">{sub.text}</p>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>

            {/* Inspector Footer Status Bar */}
            <footer className="h-[32px] flex-shrink-0 bg-[#fafaf9] border-t border-[#e7e5e4] flex items-center justify-between px-3 text-[11.5px] text-[#57534e]">
              <div className="flex items-center space-x-1.5 text-[#16a34a] font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>审阅完成</span>
              </div>

              <div className="flex items-center space-x-3 text-[#78716c]">
                <span>Python</span>
                <span>|</span>
                <span>UTF-8</span>
                <span>|</span>
                <div className="flex items-center space-x-1 hover:text-[#1c1917] cursor-pointer">
                  <span>2 个问题</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </footer>

          </section>
        ) : null}

      </div>

      {/* ========================================================= */}
      {/* HIGH FIDELITY SETTINGS FLOATING MODAL UI (PIXEL PERFECT) */}
      {/* ========================================================= */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/35 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-[1120px] max-w-[92vw] h-[720px] max-h-[86vh] bg-white border border-[#e7e5e4] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
            
            {/* Top Bar inside Settings Modal */}
            <div className="h-[56px] border-b border-[#f0eee8] flex items-center justify-between px-7 flex-shrink-0">
              <h2 className="text-[22px] font-bold text-[#1c1917] tracking-tight">设置</h2>
              
              {/* Search input in settings */}
              <div className="relative w-[360px]">
                <Search className="w-4 h-4 text-[#a8a29e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={settingsSearchQuery}
                  onChange={(e) => setSettingsSearchQuery(e.target.value)}
                  placeholder="搜索设置项"
                  className="w-full bg-[#f9f9f8] border border-[#e7e5e4] rounded-xl pl-9 pr-3 py-1.5 text-[13px] text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#f5a623]"
                />
              </div>

              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 hover:bg-[#f5f5f4] rounded-xl text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Body inside Settings */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Settings Left Sidebar */}
              <nav className="w-[220px] border-r border-[#f0eee8] p-4 space-y-1.5 flex-shrink-0 bg-[#fbfbf9]">
                {settingsCategories.map((cat) => {
                  const Icon = cat.icon
                  const isActive = activeSettingsTab === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveSettingsTab(cat.id)}
                      className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#f7efe5] text-[#8b5229] font-semibold shadow-2xs'
                          : 'text-[#57534e] hover:bg-[#f3f2eb]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#c86a28]' : 'text-[#78716c]'}`} />
                      <span>{cat.label}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Settings Center Options Panel */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
                
                {/* 1. CATEGORY: 通用 (General) */}
                {activeSettingsTab === 'general' && (
                  <div className="space-y-6 text-[13px]">
                    {/* 应用语言 */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">应用语言</span>
                      <select
                        value={settingLanguage}
                        onChange={(e) => setSettingLanguage(e.target.value)}
                        className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl px-4 py-1.5 text-[13px] text-[#1c1917] focus:outline-none focus:border-[#f5a623] cursor-pointer"
                      >
                        <option value="简体中文">简体中文</option>
                        <option value="English">English</option>
                        <option value="日本語">日本語</option>
                      </select>
                    </div>

                    {/* 启动时打开 */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">启动时打开</span>
                      <div className="flex bg-[#f5f5f4] p-1 rounded-xl border border-[#e7e5e4]">
                        {(['首页', '上次打开的会话'] as const).map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setSettingStartupOption(opt)}
                            className={`px-4 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                              settingStartupOption === opt
                                ? 'bg-[#f7efe5] text-[#8b5229] font-semibold shadow-2xs'
                                : 'text-[#78716c] hover:text-[#1c1917]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 自动保存 */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">自动保存</span>
                      <select
                        value={settingAutoSave}
                        onChange={(e) => setSettingAutoSave(e.target.value)}
                        className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl px-4 py-1.5 text-[13px] text-[#1c1917] focus:outline-none focus:border-[#f5a623] cursor-pointer"
                      >
                        <option value="1 分钟">1 分钟</option>
                        <option value="5 分钟">5 分钟</option>
                        <option value="10 分钟">10 分钟</option>
                        <option value="从不">从不</option>
                      </select>
                    </div>

                    {/* 更新通道 */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1c1917]">更新通道</span>
                      <div className="flex bg-[#f5f5f4] p-1 rounded-xl border border-[#e7e5e4]">
                        {(['稳定版', '测试版'] as const).map((channel) => (
                          <button
                            key={channel}
                            onClick={() => setSettingUpdateChannel(channel)}
                            className={`px-5 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                              settingUpdateChannel === channel
                                ? 'bg-[#fef3d6] text-[#855702] font-semibold shadow-2xs'
                                : 'text-[#78716c] hover:text-[#1c1917]'
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
                {activeSettingsTab === 'agents' && (
                  <div className="space-y-6 text-[13px]">
                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">默认智能体</span>
                      <select
                        value={settingDefaultAgent}
                        onChange={(e) => setSettingDefaultAgent(e.target.value)}
                        className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl px-4 py-1.5 text-[13px] text-[#1c1917] focus:outline-none focus:border-[#f5a623] cursor-pointer"
                      >
                        <option value="代码助手">代码助手</option>
                        <option value="翻译助手">翻译助手</option>
                        <option value="演示文稿美化">演示文稿美化</option>
                        <option value="数据分析师">数据分析师</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">模型提供方</span>
                      <div className="flex bg-[#f5f5f4] p-1 rounded-xl border border-[#e7e5e4]">
                        {(['Tokmon 官方', '自定义'] as const).map((provider) => (
                          <button
                            key={provider}
                            onClick={() => setSettingModelProvider(provider)}
                            className={`px-4 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                              settingModelProvider === provider
                                ? 'bg-[#fef3d6] text-[#855702] font-semibold shadow-2xs'
                                : 'text-[#78716c] hover:text-[#1c1917]'
                            }`}
                          >
                            {provider}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">主模型</span>
                      <select
                        value={settingMainModel}
                        onChange={(e) => setSettingMainModel(e.target.value)}
                        className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl px-4 py-1.5 text-[13px] text-[#1c1917] focus:outline-none focus:border-[#f5a623] cursor-pointer"
                      >
                        <option value="faster-whisper-large-v3-turbo">faster-whisper-large-v3-turbo</option>
                        <option value="whisper-large-v3">whisper-large-v3</option>
                        <option value="whisper-medium">whisper-medium</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1c1917]">推理强度</span>
                      <div className="flex bg-[#f5f5f4] p-1 rounded-xl border border-[#e7e5e4]">
                        {(['低', '标准', '高'] as const).map((power) => (
                          <button
                            key={power}
                            onClick={() => setSettingInferencePower(power)}
                            className={`px-5 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                              settingInferencePower === power
                                ? 'bg-[#fef3d6] text-[#855702] font-semibold shadow-2xs'
                                : 'text-[#78716c] hover:text-[#1c1917]'
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
                {activeSettingsTab === 'security' && (
                  <div className="space-y-6 text-[13px]">
                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">文件访问</span>
                      <select
                        value={settingFileAccess}
                        onChange={(e) => setSettingFileAccess(e.target.value)}
                        className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl px-4 py-1.5 text-[13px] text-[#1c1917] focus:outline-none focus:border-[#f5a623] cursor-pointer"
                      >
                        <option value="受信路径">受信路径</option>
                        <option value="完全访问">完全访问</option>
                        <option value="严格禁止">完全禁止</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">命令审批</span>
                      <div className="flex bg-[#f5f5f4] p-1 rounded-xl border border-[#e7e5e4]">
                        {(['自动执行', '按需确认', '禁止执行'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setSettingCommandApproval(mode)}
                            className={`px-4 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                              settingCommandApproval === mode
                                ? 'bg-[#fef3d6] text-[#855702] font-semibold shadow-2xs'
                                : 'text-[#78716c] hover:text-[#1c1917]'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">网络访问</span>
                      <ToggleSwitch checked={settingNetworkAccess} onChange={setSettingNetworkAccess} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1c1917]">高风险二次确认</span>
                      <ToggleSwitch checked={settingHighRiskConfirmation} onChange={setSettingHighRiskConfirmation} />
                    </div>
                  </div>
                )}

                {/* 4. CATEGORY: 工作区 */}
                {activeSettingsTab === 'workspace' && (
                  <div className="space-y-6 text-[13px]">
                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">默认工作区</span>
                      <div className="flex items-center space-x-2 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl px-3 py-1.5 w-[280px]">
                        <input
                          type="text"
                          value={settingWorkspacePath}
                          onChange={(e) => setSettingWorkspacePath(e.target.value)}
                          className="bg-transparent text-[12.5px] font-mono text-[#1c1917] focus:outline-none w-full"
                        />
                        <Folder className="w-4 h-4 text-[#78716c] flex-shrink-0 cursor-pointer" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">索引模式</span>
                      <select
                        value={settingIndexMode}
                        onChange={(e) => setSettingIndexMode(e.target.value)}
                        className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl px-4 py-1.5 text-[13px] text-[#1c1917] focus:outline-none focus:border-[#f5a623] cursor-pointer"
                      >
                        <option value="标准">标准</option>
                        <option value="深度索引">深度索引</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">自动同步</span>
                      <ToggleSwitch checked={settingAutoSync} onChange={setSettingAutoSync} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1c1917]">Git 集成</span>
                      <ToggleSwitch checked={settingGitIntegration} onChange={setSettingGitIntegration} />
                    </div>
                  </div>
                )}

                {/* 5. CATEGORY: 通知 */}
                {activeSettingsTab === 'notifications' && (
                  <div className="space-y-6 text-[13px]">
                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">启用通知</span>
                      <ToggleSwitch checked={settingEnableNotifications} onChange={setSettingEnableNotifications} />
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">桌面通知</span>
                      <ToggleSwitch checked={settingDesktopNotifications} onChange={setSettingDesktopNotifications} />
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">消息提醒</span>
                      <ToggleSwitch checked={settingMessageReminders} onChange={setSettingMessageReminders} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1c1917]">免打扰</span>
                      <select
                        value={settingDoNotDisturb}
                        onChange={(e) => setSettingDoNotDisturb(e.target.value)}
                        className="bg-[#fafaf9] border border-[#e7e5e4] rounded-xl px-4 py-1.5 text-[13px] text-[#1c1917] focus:outline-none focus:border-[#f5a623] cursor-pointer font-mono"
                      >
                        <option value="22:00 - 08:00">22:00 - 08:00</option>
                        <option value="23:00 - 07:00">23:00 - 07:00</option>
                        <option value="关闭">关闭</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 6. CATEGORY: 外观 */}
                {activeSettingsTab === 'appearance' && (
                  <div className="space-y-6 text-[13px]">
                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">主题模式</span>
                      <div className="flex bg-[#f5f5f4] p-1 rounded-xl border border-[#e7e5e4]">
                        {(['浅色', '深色'] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setSettingThemeMode(mode)}
                            className={`px-6 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                              settingThemeMode === mode
                                ? 'bg-[#fef3d6] text-[#855702] font-semibold shadow-2xs'
                                : 'text-[#78716c] hover:text-[#1c1917]'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">强调色</span>
                      <div className="flex items-center space-x-3">
                        {[
                          { id: 'gold', color: '#f5a623' },
                          { id: 'rose', color: '#f43f5e' },
                          { id: 'purple', color: '#a855f7' },
                          { id: 'blue', color: '#3b82f6' },
                          { id: 'green', color: '#22c55e' },
                          { id: 'gray', color: '#6b7280' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setSettingThemeAccentColor(item.id)}
                            style={{ backgroundColor: item.color }}
                            className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                              settingAccentColor === item.id ? 'ring-2 ring-offset-2 ring-[#f5a623] scale-110' : 'hover:scale-105'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f4]">
                      <span className="font-medium text-[#1c1917]">界面密度</span>
                      <div className="flex bg-[#f5f5f4] p-1 rounded-xl border border-[#e7e5e4]">
                        {(['紧凑', '舒适', '宽松'] as const).map((density) => (
                          <button
                            key={density}
                            onClick={() => setSettingDensity(density)}
                            className={`px-5 py-1.5 rounded-lg font-medium text-[12.5px] transition-all cursor-pointer ${
                              settingDensity === density
                                ? 'bg-[#fef3d6] text-[#855702] font-semibold shadow-2xs'
                                : 'text-[#78716c] hover:text-[#1c1917]'
                            }`}
                          >
                            {density}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#1c1917]">字体大小</span>
                      <div className="flex items-center space-x-3 w-[240px]">
                        <input
                          type="range"
                          min={80}
                          max={120}
                          value={settingFontSize}
                          onChange={(e) => setSettingFontSize(Number(e.target.value))}
                          className="w-full accent-[#f5a623] cursor-pointer"
                        />
                        <span className="font-mono text-[12px] text-[#78716c] w-10 text-right">{settingFontSize}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. CATEGORY: 快捷键 */}
                {activeSettingsTab === 'shortcuts' && (
                  <div className="space-y-3.5 text-[13px]">
                    <div className="flex items-center justify-between p-3 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl">
                      <span className="font-medium text-[#1c1917]">新建会话</span>
                      <div className="flex items-center space-x-1 font-mono text-[12px]">
                        <span className="px-2.5 py-1 bg-white border border-[#e7e5e4] rounded-lg shadow-2xs text-[#44403c]">Ctrl</span>
                        <span className="text-[#a8a29e]">+</span>
                        <span className="px-2.5 py-1 bg-white border border-[#e7e5e4] rounded-lg shadow-2xs text-[#44403c]">N</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl">
                      <span className="font-medium text-[#1c1917]">打开设置</span>
                      <div className="flex items-center space-x-1 font-mono text-[12px]">
                        <span className="px-2.5 py-1 bg-white border border-[#e7e5e4] rounded-lg shadow-2xs text-[#44403c]">Ctrl</span>
                        <span className="text-[#a8a29e]">+</span>
                        <span className="px-2.5 py-1 bg-white border border-[#e7e5e4] rounded-lg shadow-2xs text-[#44403c]">,</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl">
                      <span className="font-medium text-[#1c1917]">发送消息</span>
                      <div className="flex items-center space-x-1 font-mono text-[12px]">
                        <span className="px-3.5 py-1 bg-white border border-[#e7e5e4] rounded-lg shadow-2xs text-[#44403c]">Enter</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl">
                      <span className="font-medium text-[#1c1917]">命令面板</span>
                      <div className="flex items-center space-x-1 font-mono text-[12px]">
                        <span className="px-2.5 py-1 bg-white border border-[#e7e5e4] rounded-lg shadow-2xs text-[#44403c]">Ctrl</span>
                        <span className="text-[#a8a29e]">+</span>
                        <span className="px-2.5 py-1 bg-white border border-[#e7e5e4] rounded-lg shadow-2xs text-[#44403c]">Shift</span>
                        <span className="text-[#a8a29e]">+</span>
                        <span className="px-2.5 py-1 bg-white border border-[#e7e5e4] rounded-lg shadow-2xs text-[#44403c]">P</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. CATEGORY: 账户 */}
                {activeSettingsTab === 'account' && (
                  <div className="space-y-4 text-[13px]">
                    {/* Large User Avatar Icon */}
                    <div className="flex justify-center py-2">
                      <div className="w-16 h-16 rounded-full bg-[#fef08a] border-2 border-[#fde68a] flex items-center justify-center text-[#855702] shadow-xs">
                        <User className="w-8 h-8 text-[#855702]" />
                      </div>
                    </div>

                    {/* Account Settings Item List */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3.5 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl hover:bg-[#f5f5f4] cursor-pointer transition-colors">
                        <span className="font-medium text-[#1c1917]">昵称</span>
                        <div className="flex items-center space-x-1 text-[#57534e]">
                          <span>{settingAccountName}</span>
                          <ChevronRight className="w-4 h-4 text-[#a8a29e]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl hover:bg-[#f5f5f4] cursor-pointer transition-colors">
                        <span className="font-medium text-[#1c1917]">登录邮箱</span>
                        <div className="flex items-center space-x-1 text-[#57534e] font-mono text-[12.5px]">
                          <span>{settingAccountEmail}</span>
                          <ChevronRight className="w-4 h-4 text-[#a8a29e]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl hover:bg-[#f5f5f4] cursor-pointer transition-colors">
                        <span className="font-medium text-[#1c1917]">当前方案</span>
                        <div className="flex items-center space-x-1 text-[#d97706] font-semibold">
                          <span>{settingAccountPlan}</span>
                          <ChevronRight className="w-4 h-4 text-[#a8a29e]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-[#fafaf9] border border-[#e7e5e4] rounded-xl">
                        <span className="font-medium text-[#1c1917]">云同步</span>
                        <ToggleSwitch checked={settingAccountCloudSync} onChange={setSettingAccountCloudSync} />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Settings Right Overview Box */}
              <div className="w-[230px] border-l border-[#f0eee8] bg-[#fdfbf7] p-5 flex-shrink-0 flex flex-col justify-between text-[12.5px]">
                <div className="space-y-3">
                  <h3 className="font-bold text-[#1c1917] text-[13px] border-b border-[#f3f1e9] pb-2">
                    {activeSettingsTab === 'general' && '通用概览'}
                    {activeSettingsTab === 'agents' && '模型概览'}
                    {activeSettingsTab === 'security' && '安全概览'}
                    {activeSettingsTab === 'workspace' && '工作区概览'}
                    {activeSettingsTab === 'notifications' && '通知概览'}
                    {activeSettingsTab === 'appearance' && '外观概览'}
                    {activeSettingsTab === 'shortcuts' && '快捷键概览'}
                    {activeSettingsTab === 'account' && '账户概览'}
                  </h3>

                  {activeSettingsTab === 'general' && (
                    <div className="space-y-2 text-[#57534e]">
                      <p><span className="text-[#a8a29e]">语言:</span><br /><strong className="text-[#1c1917]">{settingLanguage}</strong></p>
                      <p><span className="text-[#a8a29e]">启动:</span><br /><strong className="text-[#1c1917]">{settingStartupOption}</strong></p>
                      <p><span className="text-[#a8a29e]">更新通道:</span><br /><strong className="text-[#1c1917]">{settingUpdateChannel}</strong></p>
                    </div>
                  )}

                  {activeSettingsTab === 'agents' && (
                    <div className="space-y-2 text-[#57534e]">
                      <p><span className="text-[#a8a29e]">默认智能体:</span><br /><strong className="text-[#1c1917]">{settingDefaultAgent}</strong></p>
                      <p><span className="text-[#a8a29e]">模型提供方:</span><br /><strong className="text-[#1c1917]">{settingModelProvider}</strong></p>
                      <p><span className="text-[#a8a29e]">主模型:</span><br /><strong className="text-[#1c1917] font-mono break-all text-[11px]">{settingMainModel}</strong></p>
                    </div>
                  )}

                  {activeSettingsTab === 'security' && (
                    <div className="space-y-2 text-[#57534e]">
                      <p><span className="text-[#a8a29e]">文件访问:</span><br /><strong className="text-[#1c1917]">{settingFileAccess}</strong></p>
                      <p><span className="text-[#a8a29e]">命令审批:</span><br /><strong className="text-[#1c1917]">{settingCommandApproval}</strong></p>
                      <p><span className="text-[#a8a29e]">确认状态:</span><br /><strong className="text-[#16a34a]">{settingHighRiskConfirmation ? '已开启二次确认' : '未开启'}</strong></p>
                    </div>
                  )}

                  {activeSettingsTab === 'workspace' && (
                    <div className="space-y-2 text-[#57534e]">
                      <p><span className="text-[#a8a29e]">路径:</span><br /><strong className="text-[#1c1917] font-mono break-all text-[11px]">{settingWorkspacePath}</strong></p>
                      <p><span className="text-[#a8a29e]">索引模式:</span><br /><strong className="text-[#1c1917]">{settingIndexMode}</strong></p>
                      <p><span className="text-[#a8a29e]">自动同步:</span><br /><strong className="text-[#1c1917]">{settingAutoSync ? '已开启' : '已关闭'}</strong></p>
                    </div>
                  )}

                  {activeSettingsTab === 'notifications' && (
                    <div className="space-y-2 text-[#57534e]">
                      <p><span className="text-[#a8a29e]">通知状态:</span><br /><strong className="text-[#16a34a]">{settingEnableNotifications ? '已启用' : '已禁用'}</strong></p>
                      <p><span className="text-[#a8a29e]">桌面通知:</span><br /><strong className="text-[#1c1917]">{settingDesktopNotifications ? '已启用' : '已禁用'}</strong></p>
                      <p><span className="text-[#a8a29e]">免打扰时间:</span><br /><strong className="text-[#1c1917] font-mono">{settingDoNotDisturb}</strong></p>
                    </div>
                  )}

                  {activeSettingsTab === 'appearance' && (
                    <div className="space-y-2 text-[#57534e]">
                      <p><span className="text-[#a8a29e]">主题:</span><br /><strong className="text-[#1c1917]">{settingThemeMode}</strong></p>
                      <p><span className="text-[#a8a29e]">强调色:</span><br /><strong className="text-[#1c1917]">浅金色</strong></p>
                      <p><span className="text-[#a8a29e]">密度:</span><br /><strong className="text-[#1c1917]">{settingDensity}</strong></p>
                    </div>
                  )}

                  {activeSettingsTab === 'shortcuts' && (
                    <div className="space-y-2 text-[#57534e]">
                      <p><span className="text-[#a8a29e]">预设方案:</span><br /><strong className="text-[#1c1917]">Tokmon 默认</strong></p>
                      <p><span className="text-[#a8a29e]">已修改:</span><br /><strong className="text-[#1c1917]">0 项</strong></p>
                      <p><span className="text-[#a8a29e]">冲突状态:</span><br /><strong className="text-[#16a34a]">无冲突</strong></p>
                    </div>
                  )}

                  {activeSettingsTab === 'account' && (
                    <div className="space-y-2 text-[#57534e]">
                      <p><span className="text-[#a8a29e]">昵称:</span><br /><strong className="text-[#1c1917]">{settingAccountName}</strong></p>
                      <p><span className="text-[#a8a29e]">方案:</span><br /><strong className="text-[#d97706] font-semibold">{settingAccountPlan}</strong></p>
                      <p><span className="text-[#a8a29e]">云同步:</span><br /><strong className="text-[#16a34a]">{settingAccountCloudSync ? '● 已开启' : '○ 已关闭'}</strong></p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => {
                    setSettingLanguage('简体中文')
                    setSettingStartupOption('首页')
                    setSettingDefaultAgent('代码助手')
                    setSettingModelProvider('Tokmon 官方')
                    setSettingMainModel('faster-whisper-large-v3-turbo')
                    setSettingInferencePower('标准')
                    setSettingFileAccess('受信路径')
                    setSettingCommandApproval('按需确认')
                    setSettingThemeMode('浅色')
                    setSettingDensity('舒适')
                  }}
                  className="w-full py-1.5 px-2 bg-white border border-[#e7e5e4] hover:bg-[#fafaf9] rounded-xl text-[11.5px] text-[#57534e] transition-colors cursor-pointer"
                >
                  恢复默认设置
                </button>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="h-[56px] border-t border-[#f0eee8] bg-[#ffffff] flex items-center justify-end px-6 space-x-3 flex-shrink-0">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="px-5 py-2 rounded-xl bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[13px] font-medium text-[#57534e] transition-colors cursor-pointer"
              >
                取消
              </button>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="px-5 py-2 rounded-xl bg-[#f7efe5] hover:bg-[#f3e4d5] border border-[#ebdcd0] text-[13px] font-semibold text-[#8b5229] transition-colors shadow-2xs cursor-pointer"
              >
                保存更改
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Floating System Window Titlebar Controls (Top Right Overlay) */}
      <div className="absolute top-2 right-3 z-50 flex items-center space-x-2 text-[#78716c]">
        <button className="p-1 hover:bg-[#e7e5e4] rounded text-[#57534e] transition-colors">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button className="p-1 hover:bg-[#e7e5e4] rounded text-[#57534e] transition-colors">
          <Square className="w-3 h-3" />
        </button>
        <button className="p-1 hover:bg-[#ef4444] hover:text-white rounded text-[#57534e] transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
