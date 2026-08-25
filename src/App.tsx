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
  FolderOpen,
  GitBranch,
  ExternalLink,
  HardDrive,
  RefreshCw,
  ChevronUp,
  FolderPlus,
  Monitor,
  CircleDashed,
  Laptop
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

// Window Controls Component (Minimize, Maximize/Restore, Close)
function WindowControls({ isMaximized, onToggleMaximize }: { isMaximized?: boolean; onToggleMaximize?: () => void }) {
  return (
    <div className="flex items-center space-x-0.5 text-[#78716c]">
      <button 
        type="button"
        title="最小化" 
        className="w-7 h-7 flex items-center justify-center hover:bg-[#e7e5e4] rounded-md text-[#57534e] transition-colors cursor-pointer"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <button 
        type="button"
        onClick={onToggleMaximize}
        title={isMaximized ? "向下还原" : "最大化"} 
        className="w-7 h-7 flex items-center justify-center hover:bg-[#e7e5e4] rounded-md text-[#57534e] transition-colors cursor-pointer"
      >
        <Square className="w-3 h-3" />
      </button>
      <button 
        type="button"
        title="关闭" 
        className="w-7 h-7 flex items-center justify-center hover:bg-[#ef4444] hover:text-white rounded-md text-[#57534e] transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
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
  }>({ startX: 0, startLeftWidth: 240, startMainWidth: 780, startRightWidth: 440 })

  // Mouse drag handler for sidebar resizers (resizes adjacent columns without shifting outer window)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      const deltaX = e.clientX - dragRef.current.startX

      if (isDraggingLeft) {
        // Dragging left divider: leftSidebarWidth changes, mainWidth absorbs the difference
        // Total (leftSidebarWidth + mainWidth) stays constant!
        const totalLM = dragRef.current.startLeftWidth + dragRef.current.startMainWidth
        const minLeft = 160
        const maxLeft = Math.min(420, totalLM - 450)
        const newLeft = Math.min(Math.max(dragRef.current.startLeftWidth + deltaX, minLeft), maxLeft)
        const newMain = totalLM - newLeft

        setLeftSidebarWidth(newLeft)
        setMainWidth(newMain)
      } else if (isDraggingRight) {
        // Dragging right divider: mainWidth changes, rightPanelWidth absorbs the difference
        // Total (mainWidth + rightPanelWidth) stays constant!
        const totalMR = dragRef.current.startMainWidth + dragRef.current.startRightWidth
        const minMain = 450
        const maxMain = Math.min(totalMR - 280, 1200)
        const newMain = Math.min(Math.max(dragRef.current.startMainWidth + deltaX, minMain), maxMain)
        const newRight = totalMR - newMain

        setMainWidth(newMain)
        setRightPanelWidth(newRight)
      } else if (isDraggingMainRight) {
        // When right panel is closed, dragging right window border adjusts mainWidth
        const newWidth = Math.min(Math.max(dragRef.current.startMainWidth + deltaX, 480), 1400)
        setMainWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDraggingLeft(false)
      setIsDraggingRight(false)
      setIsDraggingMainRight(false)
      document.body.style.cursor = 'default'
      document.body.style.userSelect = 'auto'
    }

    if (isDraggingLeft || isDraggingRight || isDraggingMainRight) {
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingLeft, isDraggingRight, isDraggingMainRight])

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

  // Active Workspace & Project Space State (Agent Desktop Working Directory)
  const [activeWorkspace, setActiveWorkspace] = useState({
    group: '默认',
    name: 'subtitle-agent',
    path: 'C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent',
    shortPath: '~/Projects/subtitle-agent',
    branch: 'main',
    indexedFiles: 142,
    totalTokens: '84.2k'
  })
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false)
  const [copiedPathToast, setCopiedPathToast] = useState(false)

  // Environment Info Floating Panel & Apple AssistiveTouch State
  const [isEnvPanelOpen, setIsEnvPanelOpen] = useState(true)
  const [envDropdown, setEnvDropdown] = useState<'none' | 'changes' | 'local' | 'branch' | 'plus'>('none')
  const [gitBranches, setGitBranches] = useState(['main', 'dev', 'feat/subtitle-v2', 'release/v1.0'])
  const [envToast, setEnvToast] = useState<string | null>(null)
  const [showNewBranchInput, setShowNewBranchInput] = useState(false)
  const [newBranchInput, setNewBranchInput] = useState('')
  const [envModifiedFiles] = useState([
    { name: 'src/App.tsx', additions: 32, deletions: 6, status: 'M' },
    { name: 'transcribe.py', additions: 14, deletions: 2, status: 'M' },
    { name: 'config.yaml', additions: 4, deletions: 1, status: 'M' },
    { name: 'output.srt', additions: 96, deletions: 0, status: 'A' },
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
      if (envPanelRef.current && !envPanelRef.current.contains(e.target as Node)) {
        setEnvDropdown('none')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  // Dynamic 3-Level Conversation Tree Data (分组 Group -> 项目 Project -> 会话 Conversation)
  const [treeData, setTreeData] = useState([
    {
      id: 'group-default',
      name: '默认',
      isOpen: true,
      projects: [
        {
          id: 'proj-1-1',
          name: 'subtitle-agent',
          workspacePath: 'C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent',
          shortPath: '~/Projects/subtitle-agent',
          isOpen: true,
          conversations: ['生成音频时间轴字幕', '字幕校对优化', '批量字幕质检优化']
        }
      ]
    },
    {
      id: 'group-1',
      name: '内容生产',
      isOpen: true,
      projects: [
        {
          id: 'proj-1-2',
          name: 'audio-slice',
          workspacePath: 'C:\\Users\\User\\Tokmon\\Projects\\audio-slice',
          shortPath: '~/Projects/audio-slice',
          isOpen: false,
          conversations: ['自动长音频降噪']
        }
      ]
    },
    {
      id: 'group-2',
      name: '演示助手',
      isOpen: true,
      projects: [
        {
          id: 'proj-2-1',
          name: 'ppt-generator',
          workspacePath: 'C:\\Users\\User\\Tokmon\\Projects\\ppt-generator',
          shortPath: '~/Projects/ppt-generator',
          isOpen: true,
          conversations: ['PPT 大纲生成', '演讲稿润色']
        }
      ]
    },
    {
      id: 'group-3',
      name: '旅行计划',
      isOpen: false,
      projects: [
        {
          id: 'proj-3-1',
          name: 'travel-planner',
          workspacePath: 'C:\\Users\\User\\Tokmon\\Projects\\travel-planner',
          shortPath: '~/Projects/travel-planner',
          isOpen: true,
          conversations: ['行程规划助手']
        }
      ]
    }
  ])

  // New Conversation Modal State
  const [showNewConvModal, setShowNewConvModal] = useState(false)
  const [newConvTitle, setNewConvTitle] = useState('')
  const [newConvGroup, setNewConvGroup] = useState('默认')
  const [newConvPath, setNewConvPath] = useState('C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent')

  // Helper to extract directory name from physical path
  const getProjectNameFromPath = (pathStr: string) => {
    const clean = pathStr.trim().replace(/[/\\]+$/, '')
    const parts = clean.split(/[/\\]/)
    return parts.pop() || 'new-project'
  }

  // Change Workspace Path Modal State (for pre-dialogue customization)
  const [showChangeWorkspaceModal, setShowChangeWorkspaceModal] = useState(false)
  const [changeWorkspacePathInput, setChangeWorkspacePathInput] = useState('')

  // Native OS Directory Picker State & Handler
  const [folderPickerTarget, setFolderPickerTarget] = useState<'newConv' | 'changeWorkspace'>('newConv')
  const nativeFolderInputRef = useRef<HTMLInputElement>(null)

  // Direct Native Directory Picker Handler (Calls OS File System Dialog directly)
  const handleBrowseNativeDirectory = async (target: 'newConv' | 'changeWorkspace') => {
    setFolderPickerTarget(target)

    // 1. Try modern native File System Access API (window.showDirectoryPicker)
    if (typeof window !== 'undefined' && 'showDirectoryPicker' in window) {
      try {
        const dirHandle = await (window as any).showDirectoryPicker()
        const folderName = dirHandle.name
        const fullPath = `C:\\Users\\User\\Tokmon\\Projects\\${folderName}`
        
        if (target === 'newConv') {
          setNewConvPath(fullPath)
          // Also check if this project already exists in a group and auto-align group
          for (const g of treeData) {
            if (g.projects.some(p => p.workspacePath.toLowerCase() === fullPath.toLowerCase() || p.name.toLowerCase() === folderName.toLowerCase())) {
              setNewConvGroup(g.name)
              break
            }
          }
        } else {
          setChangeWorkspacePathInput(fullPath)
        }
        return
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return // User cancelled the native folder selection dialog
        }
        console.warn('showDirectoryPicker error, falling back to input:', err)
      }
    }

    // 2. Fallback: Trigger native file input with webkitdirectory
    if (nativeFolderInputRef.current) {
      nativeFolderInputRef.current.value = ''
      nativeFolderInputRef.current.click()
    }
  }

  // Handle native folder picker change from HTML input
  const handleNativeFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const firstFile = e.target.files[0]
      const folderName = firstFile.webkitRelativePath?.split('/')[0] || firstFile.name || 'custom-workspace'
      const fullPath = `C:\\Users\\User\\Tokmon\\Projects\\${folderName}`
      if (folderPickerTarget === 'newConv') {
        setNewConvPath(fullPath)
        for (const g of treeData) {
          if (g.projects.some(p => p.workspacePath.toLowerCase() === fullPath.toLowerCase() || p.name.toLowerCase() === folderName.toLowerCase())) {
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
  const [searchQuery, setSearchQuery] = useState('')

  // Textarea Auto Height Ref & Handler
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleToggleRightPanel = () => {
    setRightPanelOpen((prev) => !prev)
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

  // Open New Conversation Settings Modal
  const handleOpenNewConvModal = () => {
    const defaultName = `新会话 ${Date.now().toString().slice(-4)}`
    setNewConvTitle(defaultName)
    setNewConvGroup('默认')
    setNewConvPath(activeWorkspace.path || 'C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent')
    setShowNewConvModal(true)
  }

  // Confirm Creating New Conversation from Modal (Auto-identify or create project)
  const handleConfirmCreateNewConv = () => {
    const title = newConvTitle.trim() || `新会话 ${Date.now().toString().slice(-4)}`
    const path = newConvPath.trim() || 'C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent'
    const projName = getProjectNameFromPath(path)
    const shortPath = path.replace('C:\\Users\\User\\Tokmon', '~').replace(/\\/g, '/')
    const targetGroup = newConvGroup.trim() || '默认'

    setTreeData(prev => {
      const groupExists = prev.some(g => g.name === targetGroup)

      if (groupExists) {
        return prev.map(g => {
          if (g.name === targetGroup) {
            // Check if project with same path or name exists in this group
            const projectExists = g.projects.some(
              p => p.workspacePath.toLowerCase() === path.toLowerCase() || p.name.toLowerCase() === projName.toLowerCase()
            )

            if (projectExists) {
              // Add conversation to existing project
              return {
                ...g,
                isOpen: true,
                projects: g.projects.map(p => {
                  if (p.workspacePath.toLowerCase() === path.toLowerCase() || p.name.toLowerCase() === projName.toLowerCase()) {
                    return {
                      ...p,
                      isOpen: true,
                      conversations: [title, ...p.conversations]
                    }
                  }
                  return p
                })
              }
            } else {
              // Create new project under this group
              const newProject = {
                id: `proj-${Date.now()}`,
                name: projName,
                workspacePath: path,
                shortPath: shortPath,
                isOpen: true,
                conversations: [title]
              }
              return {
                ...g,
                isOpen: true,
                projects: [newProject, ...g.projects]
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
          conversations: [title]
        }
        const newGroup = {
          id: `group-${Date.now()}`,
          name: targetGroup,
          isOpen: true,
          projects: [newProject]
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
      branch: 'main',
      indexedFiles: 142,
      totalTokens: '0'
    })
    setShowNewConvModal(false)
  }

  // Quick Create in Group
  const handleQuickCreateInGroup = (groupName: string) => {
    const group = treeData.find(g => g.name === groupName)
    if (!group || group.projects.length === 0) return
    const defaultProj = group.projects[0]
    const title = `新会话 ${Date.now().toString().slice(-4)}`

    setTreeData(prev => prev.map(g => {
      if (g.name === groupName) {
        return {
          ...g,
          isOpen: true,
          projects: g.projects.map((p, idx) => {
            if (idx === 0) {
              return {
                ...p,
                isOpen: true,
                conversations: [title, ...p.conversations]
              }
            }
            return p
          })
        }
      }
      return g
    }))

    setSelectedConversation(title)
    setConversationTitle(title)
    setMessages([])
    setActiveWorkspace({
      group: groupName,
      name: defaultProj.name,
      path: defaultProj.workspacePath,
      shortPath: defaultProj.shortPath,
      branch: 'main',
      indexedFiles: 142,
      totalTokens: '0'
    })
  }

  // Quick Create in Project
  const handleQuickCreateInProject = (groupName: string, projectName: string) => {
    const group = treeData.find(g => g.name === groupName)
    const project = group?.projects.find(p => p.name === projectName)
    if (!project) return
    const title = `新会话 ${Date.now().toString().slice(-4)}`

    setTreeData(prev => prev.map(g => {
      if (g.name === groupName) {
        return {
          ...g,
          isOpen: true,
          projects: g.projects.map(p => {
            if (p.name === projectName) {
              return {
                ...p,
                isOpen: true,
                conversations: [title, ...p.conversations]
              }
            }
            return p
          })
        }
      }
      return g
    }))

    setSelectedConversation(title)
    setConversationTitle(title)
    setMessages([])
    setActiveWorkspace({
      group: groupName,
      name: projectName,
      path: project.workspacePath,
      shortPath: project.shortPath,
      branch: 'main',
      indexedFiles: 142,
      totalTokens: '0'
    })
  }

  // Handle selecting a conversation
  const handleSelectConversationItem = (convName: string, groupName: string, project: any) => {
    setSelectedConversation(convName)
    setConversationTitle(convName)
    setActiveWorkspace({
      group: groupName,
      name: project.name,
      path: project.workspacePath,
      shortPath: project.shortPath,
      branch: 'main',
      indexedFiles: 142,
      totalTokens: '84.2k'
    })

    if (convName === '生成音频时间轴字幕') {
      setMessages([
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
    } else {
      setMessages([])
    }
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

  // Highlight search keyword in text helper
  const renderHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text
    const q = query.trim()
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-[#fed7aa] text-[#9a3412] font-semibold px-0.5 py-0 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  // Filtered Tree Data according to search query (supports searching Groups, Projects, and Conversations)
  const filteredTreeData = (() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return treeData

    return treeData.map(group => {
      const groupMatches = group.name.toLowerCase().includes(q)

      const filteredProjects = group.projects.map(proj => {
        const projectMatches = proj.name.toLowerCase().includes(q) || 
                               proj.workspacePath.toLowerCase().includes(q)

        const matchedConversations = proj.conversations.filter(conv =>
          conv.toLowerCase().includes(q)
        )

        // If group or project matches, show all conversations in that project or matched ones
        if (groupMatches || projectMatches) {
          return {
            ...proj,
            isOpen: true,
            conversations: projectMatches && matchedConversations.length === 0 ? proj.conversations : (matchedConversations.length > 0 ? matchedConversations : proj.conversations)
          }
        }

        // If only conversation matched
        if (matchedConversations.length > 0) {
          return {
            ...proj,
            isOpen: true,
            conversations: matchedConversations
          }
        }

        return null
      }).filter(Boolean) as typeof group.projects

      if (groupMatches || filteredProjects.length > 0) {
        return {
          ...group,
          isOpen: true,
          projects: groupMatches && filteredProjects.length === 0 ? group.projects : filteredProjects
        }
      }

      return null
    }).filter(Boolean) as typeof treeData
  })()

  const effectiveMainWidth = leftSidebarOpen ? mainWidth : (mainWidth + leftSidebarWidth + 6)

  const totalWindowWidth =
    leftSidebarWidth +
    6 +
    mainWidth +
    (rightPanelOpen ? rightPanelWidth + 6 : 0)

  return (
    <div className="w-screen h-screen bg-[#eceae5] flex items-center justify-start overflow-x-auto overflow-y-hidden select-none font-sans">
      {/* Tokmon Agent Desktop Window */}
      <div 
        style={{
          width: isMaximized ? '100vw' : `${totalWindowWidth}px`,
        }}
        className={`h-full flex flex-col bg-[#fafaf9] text-[#1c1917] overflow-hidden relative ${
          isDragging ? 'transition-none' : 'transition-[width] duration-150 ease-out'
        } ${isMaximized ? 'w-screen rounded-none' : 'border-r border-[#d4d1c8] shadow-2xl'}`}
      >
        {/* App Main Layout Grid */}
        <div className="flex-1 flex overflow-hidden relative">

        {/* ========================================================= */}
        {/* COLUMN 1: LEFT SIDEBAR */}
        {/* ========================================================= */}
        <aside 
          style={{ width: leftSidebarOpen ? `${leftSidebarWidth}px` : '0px' }}
          className={`h-full flex-shrink-0 bg-[#f9f9f8] ${
            leftSidebarOpen ? 'border-r border-[#e7e5e4]' : 'border-r-0'
          } flex flex-col justify-between overflow-hidden ${
            isDragging ? 'transition-none' : 'transition-[width] duration-150 ease-out'
          }`}
        >
          {/* Header with Tokmon Logo (Pinned outside scrollable tree) */}
          <div className="h-[46px] min-w-[240px] flex-shrink-0 px-4 border-b border-[#e7e5e4] flex items-center justify-between bg-[#f9f9f8]">
            <div className="flex items-center space-x-2 cursor-pointer">
              <TokmonLogo />
              <span className="text-[17px] font-bold tracking-tight text-[#1c1917]">Tokmon</span>
            </div>
          </div>

          {/* Scrollable Tree Navigation & Content Area (Fills entire window height, zero horizontal scrollbar) */}
          <div className="flex-1 min-h-0 min-w-[240px] overflow-y-auto overflow-x-hidden p-3 space-y-3.5 custom-scrollbar">
            
            {/* New Conversation Button */}
            <button 
              onClick={handleOpenNewConvModal}
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
                placeholder="搜索会话、项目或分组..."
                className="w-full bg-[#f0eee8] border border-transparent rounded-xl pl-9 pr-8 py-1.5 text-[12.5px] text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:bg-white focus:border-[#c86a28] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-[#e2e0d8] rounded text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer"
                  title="清空搜索"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 3-Level Dynamic Tree Navigation (分组 Group -> 项目 Project -> 会话 Conversation) */}
            <div className="pt-1 space-y-1">
              <div className="flex items-center justify-between px-2 py-1 text-[11.5px] text-[#78716c] font-medium tracking-wider">
                <span>分组 / 项目 / 会话</span>
                {searchQuery.trim() && (
                  <span className="text-[10px] bg-[#fef8f4] text-[#c86a28] border border-[#f5d9c3] px-1.5 py-0.2 rounded font-medium">
                    找到 {filteredTreeData.reduce((acc, g) => acc + g.projects.reduce((pAcc, p) => pAcc + p.conversations.length, 0), 0)} 个会话
                  </span>
                )}
              </div>

              {filteredTreeData.length === 0 ? (
                <div className="py-8 px-2 text-center space-y-2">
                  <div className="w-9 h-9 mx-auto rounded-full bg-[#f5f5f4] flex items-center justify-center text-[#a8a29e]">
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="text-[12.5px] text-[#78716c] font-medium">未找到匹配的会话、项目或分组</div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[11.5px] text-[#c86a28] hover:underline font-medium cursor-pointer"
                  >
                    清除搜索条件
                  </button>
                </div>
              ) : (
                filteredTreeData.map((group) => (
                  <div key={group.id} className="space-y-0.5 text-[13px]">
                    {/* Group Header Row */}
                    <div className="flex items-center justify-between pl-2 pr-1 py-1 rounded-md hover:bg-[#f3f2eb] text-[#292524] transition-colors group/group">
                      <button 
                        onClick={() => {
                          setTreeData(prev => prev.map(g => g.id === group.id ? { ...g, isOpen: !g.isOpen } : g))
                        }}
                        className="flex items-center space-x-1.5 font-semibold text-left flex-1 min-w-0 cursor-pointer"
                      >
                        {(group.isOpen || !!searchQuery.trim()) ? <ChevronDown className="w-3.5 h-3.5 text-[#78716c] flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-[#78716c] flex-shrink-0" />}
                        <Folder className="w-4 h-4 text-[#c86a28] flex-shrink-0" />
                        <span className="truncate">{renderHighlightedText(group.name, searchQuery)}</span>
                      </button>

                      {/* Quick Add Button on Group Header (Hidden by default, shows on hover of this group only, aligned) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleQuickCreateInGroup(group.name)
                        }}
                        className="w-5.5 h-5.5 rounded-md hover:bg-[#e4e2da] text-[#78716c] hover:text-[#c86a28] flex items-center justify-center opacity-0 group-hover/group:opacity-100 transition-all cursor-pointer flex-shrink-0"
                        title={`在「${group.name}」快速新建会话`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Group Projects */}
                    {(group.isOpen || !!searchQuery.trim()) && (
                      <div className="pl-3.5 space-y-1 border-l-2 border-[#f0eee6] ml-3.5">
                        {group.projects.map((project) => (
                          <div key={project.id}>
                            {/* Project Header Row */}
                            <div className="flex items-center justify-between pl-1.5 pr-1 py-1 rounded-md hover:bg-[#f3f2eb] text-[#44403c] transition-colors group/proj">
                              <button 
                                onClick={() => {
                                  setTreeData(prev => prev.map(g => g.id === group.id ? {
                                    ...g,
                                    projects: g.projects.map(p => p.id === project.id ? { ...p, isOpen: !p.isOpen } : p)
                                  } : g))
                                }}
                                className="flex items-center space-x-1.5 font-medium text-[12.5px] text-left flex-1 min-w-0 cursor-pointer"
                              >
                                {(project.isOpen || !!searchQuery.trim()) ? <ChevronDown className="w-3 h-3 text-[#a8a29e] flex-shrink-0" /> : <ChevronRight className="w-3 h-3 text-[#a8a29e] flex-shrink-0" />}
                                <Box className="w-3.5 h-3.5 text-[#a8a29e] flex-shrink-0" />
                                <span className="truncate">{renderHighlightedText(project.name, searchQuery)}</span>
                              </button>

                              {/* Quick Add Button on Project Header (Hidden by default, shows on hover of this project only, aligned) */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleQuickCreateInProject(group.name, project.name)
                                }}
                                className="w-5.5 h-5.5 rounded-md hover:bg-[#e4e2da] text-[#78716c] hover:text-[#c86a28] flex items-center justify-center opacity-0 group-hover/proj:opacity-100 transition-all cursor-pointer flex-shrink-0"
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
                                    onClick={() => handleSelectConversationItem(item, group.name, project)}
                                    className={`cursor-pointer flex items-center space-x-2 px-2.5 py-1.5 rounded-xl text-[12px] transition-all ${
                                      selectedConversation === item
                                        ? 'bg-[#f7efe5] text-[#8b5229] font-semibold shadow-2xs'
                                        : 'text-[#57534e] hover:bg-[#f3f2eb]'
                                    }`}
                                  >
                                    <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${selectedConversation === item ? 'text-[#c86a28]' : 'text-[#a8a29e]'}`} />
                                    <span className="truncate">{renderHighlightedText(item, searchQuery)}</span>
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
            <div className="p-3 min-w-[240px] border-t border-[#e7e5e4] flex-shrink-0 bg-[#f9f9f8]">
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#efeee8] text-[13.5px] text-[#44403c] font-medium transition-colors text-left cursor-pointer"
              >
                <Settings className="w-4 h-4 text-[#78716c]" />
                <span>设置</span>
              </button>
            </div>
          </aside>

        {/* LEFT SIDEBAR RESIZER DIVIDER */}
        {leftSidebarOpen && (
          <div className="relative flex-shrink-0 z-40 select-none h-full flex items-center">
            {/* Drag Hit Zone & Glowing Line */}
            <div
              onMouseDown={(e) => {
                e.preventDefault()
                dragRef.current = {
                  startX: e.clientX,
                  startLeftWidth: leftSidebarWidth,
                  startMainWidth: mainWidth,
                  startRightWidth: rightPanelWidth
                }
                setIsDraggingLeft(true)
              }}
              title="按住左右拖拽调整左侧栏与工作区宽度"
              className="w-2 -mx-1 h-full cursor-col-resize flex justify-center items-center group/line"
            >
              <div className={`w-[2px] h-full transition-colors duration-150 ${
                isDraggingLeft ? 'bg-[#c86a28]/80' : 'bg-transparent group-hover/line:bg-[#c86a28]/80'
              }`} />
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
              className="absolute top-2.5 -left-2 z-50 w-6 h-6 rounded-md bg-white border border-[#e5e2da] shadow-2xs hover:shadow-md hover:border-[#c86a28] hover:bg-[#fafaf9] text-[#78716c] hover:text-[#c86a28] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* COLUMN 2: MAIN CHAT & WORKFLOW EXECUTION */}
        {/* ========================================================= */}
        <main 
          style={{ width: isMaximized && !rightPanelOpen ? undefined : `${effectiveMainWidth}px` }}
          className={`${isMaximized && !rightPanelOpen ? 'flex-1' : 'flex-shrink-0'} flex flex-col bg-[#fafaf9] overflow-hidden relative ${
            isDragging ? 'transition-none' : 'transition-[width] duration-150 ease-out'
          }`}
        >
          {/* Left border micro-pill to expand left sidebar when closed */}
          {!leftSidebarOpen && (
            <div className="absolute left-0 top-0 bottom-0 w-2 z-40 flex justify-center items-start select-none pointer-events-none">
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onClick={() => setLeftSidebarOpen(true)}
                title="展开侧边栏"
                className="absolute top-2.5 left-1.5 z-50 w-6 h-6 rounded-md bg-[#fef8f4] border border-[#ebdcd0] shadow-2xs hover:shadow-md hover:border-[#c86a28] hover:bg-[#fcf2ea] text-[#c86a28] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 pointer-events-auto"
              >
                <PanelLeftOpen className="w-3.5 h-3.5 text-[#c86a28]" />
              </button>
            </div>
          )}
          
          {/* Middle Chat Header Bar */}
          <header className="h-[46px] flex-shrink-0 bg-[#fafaf9]/90 backdrop-blur-xs border-b border-[#e7e5e4] flex items-center justify-between px-4 z-10">
            <div className={`flex items-center space-x-2.5 ${!leftSidebarOpen ? 'pl-7' : ''}`}>

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

            {/* Right Controls in Main Header */}
            <div className="flex items-center">
              {!rightPanelOpen && (
                <div className="pr-8">
                  <WindowControls 
                    isMaximized={isMaximized} 
                    onToggleMaximize={() => setIsMaximized(!isMaximized)} 
                  />
                </div>
              )}
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

          {/* ========================================================================= */}
          {/* TOP-RIGHT FLOATING ENVIRONMENT INFORMATION PANEL / APPLE ASSISTIVETOUCH */}
          {/* ========================================================================= */}
          <div ref={envPanelRef} className="absolute top-[48px] right-4 z-40 select-none">
            {/* Collapsed State: Apple iPhone AssistiveTouch Floating Button */}
            {!isEnvPanelOpen ? (
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => {
                    setIsEnvPanelOpen(true)
                    setEnvDropdown('none')
                  }}
                  title="环境信息 (点击展开)"
                  className="w-12 h-12 rounded-[18px] bg-gradient-to-b from-white/95 via-white/90 to-[#f6f5f0]/90 hover:from-white hover:to-[#fcfbfa] active:scale-95 text-[#292524] backdrop-blur-2xl border border-white/90 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.1),0_4px_12px_-2px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ring-1 ring-[#e5e2da]/70 select-none"
                >
                  {/* Authentic Apple AssistiveTouch Geometric Vector Glyph */}
                  <svg 
                    className="w-7.5 h-7.5 text-[#383533] group-hover:text-[#c86a28] transition-colors duration-200" 
                    viewBox="0 0 32 32" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer soft diffuse field */}
                    <circle cx="16" cy="16" r="14.2" fill="currentColor" fillOpacity="0.05" />
                    {/* Outermost concentric ring */}
                    <circle cx="16" cy="16" r="13.2" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.4" />
                    {/* Middle concentric ring */}
                    <circle cx="16" cy="16" r="8" stroke="currentColor" strokeOpacity="0.65" strokeWidth="2.2" />
                    {/* Center solid core dot */}
                    <circle cx="16" cy="16" r="3.5" fill="currentColor" fillOpacity="0.9" />
                  </svg>

                  {/* Pulsing Status Dot with Ping Effect */}
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white shadow-xs"></span>
                  </span>
                </button>

                {/* Tooltip on Hover */}
                <div className="absolute right-0 top-14 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 whitespace-nowrap bg-[#1c1917]/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl shadow-xl backdrop-blur-md border border-white/10 z-50 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>环境信息 · {activeWorkspace.name}</span>
                  <span className="text-[#a8a29e] font-mono">({activeWorkspace.branch})</span>
                </div>
              </div>
            ) : (
              /* Expanded State: Environment Information Floating Card matching screenshot */
              <div className="w-[275px] bg-white/95 backdrop-blur-xl rounded-2xl border border-[#e7e5e4] shadow-[0_16px_40px_rgba(0,0,0,0.14)] p-3 text-[#292524] animate-in fade-in zoom-in-95 duration-200 space-y-1.5">
                {/* Card Header: 环境信息 + Quick Actions (+) + Collapse / AssistiveTouch Icon */}
                <div className="flex items-center justify-between px-1 pb-1 border-b border-[#f0eee6]">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[13px] font-semibold text-[#44403c] tracking-tight">环境信息</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* Plus Quick Actions Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setEnvDropdown(envDropdown === 'plus' ? 'none' : 'plus')}
                        title="快捷操作"
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-[#78716c] hover:text-[#1c1917] hover:bg-[#f5f5f4] transition-colors cursor-pointer ${
                          envDropdown === 'plus' ? 'bg-[#f5f5f4] text-[#1c1917]' : ''
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      {/* Plus Dropdown Menu */}
                      {envDropdown === 'plus' && (
                        <div className="absolute right-0 top-7 w-48 bg-white border border-[#e7e5e4] rounded-xl shadow-xl py-1.5 z-50 text-[12px] space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            type="button"
                            onClick={() => {
                              setShowNewBranchInput(true)
                              setEnvDropdown('branch')
                            }}
                            className="w-full px-3 py-1.5 text-left text-[#44403c] hover:bg-[#fef8f4] hover:text-[#c86a28] flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <GitBranch className="w-3.5 h-3.5" />
                            <span>新建 Git 分支</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEnvDropdown('none')
                              handleBrowseNativeDirectory('changeWorkspace')
                            }}
                            className="w-full px-3 py-1.5 text-left text-[#44403c] hover:bg-[#fef8f4] hover:text-[#c86a28] flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            <span>浏览本地目录</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEnvDropdown('none')
                              showEnvToastMessage('已重新扫描工作空间 (142 文件就绪)')
                            }}
                            className="w-full px-3 py-1.5 text-left text-[#44403c] hover:bg-[#fef8f4] hover:text-[#c86a28] flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>重新扫描工作空间</span>
                          </button>
                          <div className="my-1 border-t border-[#f0eee6]" />
                          <button
                            type="button"
                            onClick={() => {
                              setEnvDropdown('none')
                              setShowSettingsModal(true)
                              setActiveSettingsTab('workspace')
                            }}
                            className="w-full px-3 py-1.5 text-left text-[#44403c] hover:bg-[#fef8f4] hover:text-[#c86a28] flex items-center space-x-2 transition-colors cursor-pointer"
                          >
                            <Settings className="w-3.5 h-3.5" />
                            <span>工作空间偏好设置</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Collapse Button (Apple AssistiveTouch Miniature Icon) */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsEnvPanelOpen(false)
                        setEnvDropdown('none')
                      }}
                      title="收起为 AssistiveTouch 悬浮按钮"
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[#78716c] hover:text-[#c86a28] hover:bg-[#fef8f4] transition-colors cursor-pointer group/min"
                    >
                      <svg className="w-4 h-4 text-[#78716c] group-hover/min:text-[#c86a28] transition-colors" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6.8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
                        <circle cx="8" cy="8" r="4.2" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.2" />
                        <circle cx="8" cy="8" r="1.8" fill="currentColor" fillOpacity="0.9" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Main 5 Rows List */}
                <div className="space-y-0.5 text-[12.5px]">
                  {/* Row 1: 变更 (Diff / Changes) */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setEnvDropdown(envDropdown === 'changes' ? 'none' : 'changes')}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f5f5f4] text-[#1c1917] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        {/* Diff square icon with +/- */}
                        <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#57534e]">
                          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M8 5V9M6 7H10M6 11H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="font-medium">变更</span>
                      </div>
                      <span className="text-[10.5px] font-mono text-[#78716c] bg-[#f5f5f4] px-1.5 py-0.2 rounded border border-[#e7e5e4]">
                        {envModifiedFiles.length} 个文件
                      </span>
                    </button>

                    {/* Changes Dropdown */}
                    {envDropdown === 'changes' && (
                      <div className="mt-1 p-2 bg-[#fafaf9] rounded-xl border border-[#e7e5e4] text-[11.5px] space-y-1.5 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between text-[10.5px] text-[#a8a29e] px-1">
                          <span>未提交的改动</span>
                          <span className="text-emerald-600 font-mono">+146 -9</span>
                        </div>
                        <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                          {envModifiedFiles.map((file, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                if (file.name.includes('.py')) setSelectedFile('transcribe.py')
                                else if (file.name.includes('.yaml')) setSelectedFile('config.yaml')
                                else setSelectedFile('output.srt')
                                setActiveTab('code')
                                if (!rightPanelOpen) setRightPanelOpen(true)
                              }}
                              className="flex items-center justify-between px-2 py-1 rounded bg-white hover:bg-[#fef8f4] border border-[#ebdcd0]/60 text-[#44403c] cursor-pointer transition-colors"
                            >
                              <span className="font-mono truncate max-w-[140px] text-[11px]">{file.name}</span>
                              <div className="flex items-center space-x-1 font-mono text-[9.5px]">
                                <span className="text-emerald-600">+{file.additions}</span>
                                <span className="text-rose-500">-{file.deletions}</span>
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
                      onClick={() => setEnvDropdown(envDropdown === 'local' ? 'none' : 'local')}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f5f5f4] text-[#1c1917] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <Laptop className="w-4 h-4 text-[#57534e] flex-shrink-0" />
                        <span className="font-medium">本地</span>
                        <span className="text-[11px] text-[#78716c] font-normal truncate max-w-[100px]">
                          ({activeWorkspace.name})
                        </span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#a8a29e] transition-transform ${envDropdown === 'local' ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Local Workspace Dropdown */}
                    {envDropdown === 'local' && (
                      <div className="mt-1 p-1.5 bg-[#fafaf9] rounded-xl border border-[#e7e5e4] text-[11.5px] space-y-1 animate-in fade-in duration-150">
                        <div className="text-[10px] font-medium text-[#a8a29e] px-1.5 py-0.5">切换工作空间项目</div>
                        <div className="space-y-0.5 max-h-32 overflow-y-auto custom-scrollbar">
                          {treeData.flatMap(g => g.projects).map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setActiveWorkspace({
                                  group: treeData.find(g => g.projects.some(proj => proj.id === p.id))?.name || '默认',
                                  name: p.name,
                                  path: p.workspacePath,
                                  shortPath: p.shortPath,
                                  branch: 'main',
                                  indexedFiles: 142,
                                  totalTokens: '84.2k'
                                })
                                showEnvToastMessage(`已切换至工作空间: ${p.name}`)
                                setEnvDropdown('none')
                              }}
                              className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-left transition-colors cursor-pointer ${
                                activeWorkspace.name === p.name ? 'bg-[#fef8f4] text-[#c86a28] font-medium border border-[#f5d9c3]' : 'hover:bg-white text-[#44403c]'
                              }`}
                            >
                              <span className="truncate">{p.name}</span>
                              {activeWorkspace.name === p.name && <Check className="w-3 h-3 text-[#c86a28]" />}
                            </button>
                          ))}
                        </div>
                        <div className="border-t border-[#e7e5e4] my-1" />
                        <button
                          type="button"
                          onClick={() => {
                            setEnvDropdown('none')
                            setChangeWorkspacePathInput(activeWorkspace.path)
                            setShowChangeWorkspaceModal(true)
                          }}
                          className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-lg text-[10.5px] text-[#c86a28] hover:bg-[#fef8f4] font-medium transition-colors cursor-pointer"
                        >
                          <FolderOpen className="w-3 h-3 text-[#c86a28]" />
                          <span>更换物理目录...</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Row 3: main (Git Branch) */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setEnvDropdown(envDropdown === 'branch' ? 'none' : 'branch')}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f5f5f4] text-[#1c1917] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <GitBranch className="w-4 h-4 text-[#57534e] flex-shrink-0" />
                        <span className="font-mono font-medium text-[12.5px]">{activeWorkspace.branch}</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#a8a29e] transition-transform ${envDropdown === 'branch' ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Git Branch Dropdown */}
                    {envDropdown === 'branch' && (
                      <div className="mt-1 p-1.5 bg-[#fafaf9] rounded-xl border border-[#e7e5e4] text-[11.5px] space-y-1 animate-in fade-in duration-150">
                        <div className="text-[10px] font-medium text-[#a8a29e] px-1.5 py-0.5">Git 分支列表</div>
                        <div className="space-y-0.5">
                          {gitBranches.map((br) => (
                            <button
                              key={br}
                              type="button"
                              onClick={() => {
                                setActiveWorkspace(prev => ({ ...prev, branch: br }))
                                showEnvToastMessage(`已切换至分支: ${br}`)
                                setEnvDropdown('none')
                              }}
                              className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-left font-mono text-[11.5px] transition-colors cursor-pointer ${
                                activeWorkspace.branch === br ? 'bg-[#fef8f4] text-[#c86a28] font-medium border border-[#f5d9c3]' : 'hover:bg-white text-[#44403c]'
                              }`}
                            >
                              <span>{br}</span>
                              {activeWorkspace.branch === br && <Check className="w-3 h-3 text-[#c86a28]" />}
                            </button>
                          ))}
                        </div>

                        {/* Create new branch input */}
                        {showNewBranchInput ? (
                          <div className="pt-1 flex items-center space-x-1">
                            <input
                              type="text"
                              value={newBranchInput}
                              onChange={(e) => setNewBranchInput(e.target.value)}
                              placeholder="新分支名称..."
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && newBranchInput.trim()) {
                                  const newBr = newBranchInput.trim()
                                  setGitBranches(prev => [...prev, newBr])
                                  setActiveWorkspace(prev => ({ ...prev, branch: newBr }))
                                  setNewBranchInput('')
                                  setShowNewBranchInput(false)
                                  setEnvDropdown('none')
                                  showEnvToastMessage(`已创建并切换至新分支: ${newBr}`)
                                }
                              }}
                              className="flex-1 px-1.5 py-0.5 text-[11px] font-mono bg-white border border-[#c86a28] rounded-md focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newBranchInput.trim()) {
                                  const newBr = newBranchInput.trim()
                                  setGitBranches(prev => [...prev, newBr])
                                  setActiveWorkspace(prev => ({ ...prev, branch: newBr }))
                                  setNewBranchInput('')
                                  setShowNewBranchInput(false)
                                  setEnvDropdown('none')
                                  showEnvToastMessage(`已创建并切换至新分支: ${newBr}`)
                                }
                              }}
                              className="px-2 py-0.5 bg-[#c86a28] text-white text-[11px] rounded-md hover:bg-[#b45309] cursor-pointer"
                            >
                              创建
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setShowNewBranchInput(true)}
                            className="w-full flex items-center space-x-1.5 px-2 py-1 rounded-lg text-[10.5px] text-[#c86a28] hover:bg-[#fef8f4] font-medium transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3 text-[#c86a28]" />
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
                        showEnvToastMessage('已提交更改并推送到 origin/' + activeWorkspace.branch)
                      }}
                      className="w-full flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-[#f5f5f4] text-[#57534e] hover:text-[#1c1917] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center space-x-2.5">
                        {/* Git commit node icon -o- */}
                        <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#57534e]">
                          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 8H6M10 8H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            <circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.3" />
                          </svg>
                        </div>
                        <span className="font-medium text-[12.5px]">提交或推送</span>
                      </div>
                      <span className="text-[10.5px] text-[#78716c] group-hover:text-[#c86a28] font-medium transition-colors">
                        推送 (0↑)
                      </span>
                    </button>
                  </div>

                  {/* Row 5: 无法获取拉取请求状态 (PR Status) */}
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        showEnvToastMessage('PR 状态: 未检测到关联的 GitHub Pull Request')
                      }}
                      className="w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-xl hover:bg-[#f5f5f4] text-[#78716c] hover:text-[#57534e] transition-colors cursor-pointer text-left"
                    >
                      {/* GitHub Cat Icon */}
                      <div className="w-4.5 h-4.5 rounded flex items-center justify-center text-[#57534e] flex-shrink-0">
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.09 10 14.96 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
                        </svg>
                      </div>
                      <span className="text-[11.5px] truncate">无法获取拉取请求状态</span>
                    </button>
                  </div>
                </div>

                {/* Card Footer: Path & Index Status */}
                <div className="pt-2 border-t border-[#f0eee6] space-y-1.5 text-[11px] text-[#78716c]">
                  <div className="flex items-center justify-between px-1">
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(activeWorkspace.path)
                        showEnvToastMessage('已复制工作空间完整路径')
                      }}
                      title={`点击复制: ${activeWorkspace.path}`}
                      className="font-mono text-[10px] text-[#78716c] hover:text-[#c86a28] bg-[#f5f5f4] hover:bg-[#fef8f4] px-1.5 py-0.2 rounded border border-[#e7e5e4] truncate max-w-[170px] cursor-pointer transition-colors"
                    >
                      {activeWorkspace.shortPath}
                    </span>
                    <div className="flex items-center space-x-1 text-[10px] text-[#78716c]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{activeWorkspace.indexedFiles} 文件就绪</span>
                    </div>
                  </div>

                  {/* Change Directory / Locked Indicator */}
                  {messages.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setChangeWorkspacePathInput(activeWorkspace.path)
                        setShowChangeWorkspaceModal(true)
                      }}
                      className="w-full flex items-center justify-center space-x-1 px-2 py-1 rounded-lg bg-[#fef8f4] hover:bg-[#fcf2ea] border border-[#f5d9c3] text-[#c86a28] text-[10.5px] font-medium transition-colors cursor-pointer"
                    >
                      <FolderOpen className="w-3 h-3 text-[#c86a28]" />
                      <span>更换工作空间目录</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center space-x-1 px-2 py-0.5 rounded-md bg-[#f5f5f4] text-[#a8a29e] text-[9.5px]">
                      <Lock className="w-2.5 h-2.5" />
                      <span>当前会话工作空间已锁定</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Floating Toast Notification */}
            {envToast && (
              <div className="absolute right-0 top-full mt-2 whitespace-nowrap bg-white text-[#292524] text-[11.5px] font-medium px-3 py-1.5 rounded-xl shadow-xl border border-[#e7e5e4] z-50 animate-in fade-in slide-in-from-top-1 duration-150 flex items-center space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>{envToast}</span>
              </div>
            )}
          </div>

          {mainViewMode === 'chat' ? (
            messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 select-none pb-36 animate-in fade-in duration-200">
                <div className="w-14 h-14 rounded-2xl bg-[#fef8f4] border border-[#f5d9c3] flex items-center justify-center shadow-xs">
                  <Sparkles className="w-7 h-7 text-[#c86a28]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[17px] font-bold text-[#1c1917] tracking-tight">{conversationTitle}</h3>
                  <p className="text-[13px] text-[#78716c] max-w-[460px] leading-relaxed">
                    当前为新会话。工作空间已关联至 <span className="font-mono text-[#c86a28] font-medium bg-[#fef8f4] px-1.5 py-0.5 rounded border border-[#f5d9c3]">{activeWorkspace.shortPath}</span>。
                  </p>
                  <p className="text-[11.5px] text-[#a8a29e]">
                    您可在右上角「环境信息」悬浮面板中点击「更换目录」调整路径。发送第一条指令后工作空间将永久锁定。
                  </p>
                </div>
              </div>
            ) : (
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
          )) : (
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
            <div className="max-w-[760px] mx-auto pointer-events-auto">

              {/* Main Input Dialog Box Card (Independent 4-rounded-corner card) */}
              <div className="bg-[#ffffff] border border-[#e7e5e4] rounded-2xl shadow-lg p-3 pointer-events-auto transition-all focus-within:border-[#f59e0b] space-y-2">
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
          </div>

        </main>

        {/* RIGHT PANEL RESIZER DIVIDER */}
        {rightPanelOpen && (
          <div className="relative flex-shrink-0 z-40 select-none h-full flex items-center">
            {/* Drag Hit Zone & Glowing Line */}
            <div
              onMouseDown={(e) => {
                e.preventDefault()
                dragRef.current = {
                  startX: e.clientX,
                  startLeftWidth: leftSidebarWidth,
                  startMainWidth: mainWidth,
                  startRightWidth: rightPanelWidth
                }
                setIsDraggingRight(true)
              }}
              title="按住左右拖拽调整中间工作区与右侧栏宽度"
              className="w-2 -mx-1 h-full cursor-col-resize flex justify-center items-center group/line"
            >
              <div className={`w-[2px] h-full transition-colors duration-150 ${
                isDraggingRight ? 'bg-[#c86a28]/80' : 'bg-transparent group-hover/line:bg-[#c86a28]/80'
              }`} />
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
              className="absolute top-2.5 -left-[28px] z-50 w-6 h-6 rounded-md bg-white border border-[#e5e2da] shadow-2xs hover:shadow-md hover:border-[#c86a28] hover:bg-[#fafaf9] text-[#78716c] hover:text-[#c86a28] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <PanelRightClose className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* COLUMN 3: RIGHT CODE INSPECTOR / FILE PREVIEW */}
        {/* ========================================================= */}
        {rightPanelOpen ? (
          <section 
            style={{ width: `${rightPanelWidth}px` }}
            className={`flex-shrink-0 bg-[#ffffff] flex flex-col border-l border-[#e7e5e4] ${
              isDragging ? 'transition-none' : 'transition-[width] duration-150 ease-out'
            }`}
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

              {/* Right panel window controls */}
              <div className="flex items-center">
                <WindowControls 
                  isMaximized={isMaximized} 
                  onToggleMaximize={() => setIsMaximized(!isMaximized)} 
                />
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
                  startRightWidth: rightPanelWidth
                }
                setIsDraggingMainRight(true)
              }}
              title="按住左右拖拽调整工作区宽度"
              className="w-2.5 h-full cursor-col-resize flex justify-end items-center group/line pointer-events-auto"
            >
              <div className={`w-[2px] h-full transition-colors duration-150 ${
                isDraggingMainRight ? 'bg-[#c86a28]/80' : 'bg-transparent group-hover/line:bg-[#c86a28]/80'
              }`} />
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
              className="absolute top-2.5 right-1.5 z-50 w-6 h-6 rounded-md bg-[#fef8f4] border border-[#ebdcd0] shadow-2xs hover:shadow-md hover:border-[#c86a28] hover:bg-[#fcf2ea] text-[#c86a28] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 pointer-events-auto"
            >
              <PanelRightOpen className="w-3.5 h-3.5 text-[#c86a28]" />
            </button>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* NEW CONVERSATION SETTINGS MODAL */}
      {/* ========================================================= */}
      {showNewConvModal && (
        <div className="fixed inset-0 bg-black/35 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-[520px] max-w-[94vw] bg-white border border-[#e7e5e4] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="h-[52px] border-b border-[#f0eee8] flex items-center justify-between px-6 flex-shrink-0 bg-[#faf9f6]">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-[#fef8f4] border border-[#f5d9c3] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#c86a28]" />
                </div>
                <h3 className="text-[15px] font-bold text-[#1c1917]">新建会话设置</h3>
              </div>
              <button 
                onClick={() => setShowNewConvModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#78716c] hover:bg-[#eae8e1] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Content */}
            <div className="p-6 space-y-4 text-[13px]">
              {/* 会话名称 */}
              <div className="space-y-1.5">
                <label className="block text-[12px] font-medium text-[#44403c]">会话名称</label>
                <input
                  type="text"
                  value={newConvTitle}
                  onChange={(e) => setNewConvTitle(e.target.value)}
                  placeholder="请输入会话名称..."
                  className="w-full bg-[#f9f9f8] border border-[#e7e5e4] focus:border-[#c86a28] focus:bg-white rounded-xl px-3.5 py-2 text-[13px] text-[#1c1917] outline-none transition-all"
                />
              </div>

              {/* 所属分组 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[12px] font-medium text-[#44403c]">所属分组</label>
                  <span className="text-[11px] text-[#a8a29e]">会话归类分组</span>
                </div>
                <select
                  value={newConvGroup}
                  onChange={(e) => setNewConvGroup(e.target.value)}
                  className="w-full bg-[#f9f9f8] border border-[#e7e5e4] focus:border-[#c86a28] focus:bg-white rounded-xl px-3.5 py-2 text-[12.5px] text-[#1c1917] outline-none transition-all cursor-pointer"
                >
                  {treeData.map(g => (
                    <option key={g.name} value={g.name}>{g.name}</option>
                  ))}
                </select>
              </div>

              {/* 项目工作目录（项目空间） */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[12px] font-medium text-[#44403c]">项目工作目录（项目空间）</label>
                  <span className="text-[11px] text-[#a8a29e]">目录末尾即项目名称</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newConvPath}
                    onChange={(e) => setNewConvPath(e.target.value)}
                    placeholder="请输入或浏览选择物理目录..."
                    className="flex-1 font-mono bg-[#f9f9f8] border border-[#e7e5e4] focus:border-[#c86a28] focus:bg-white rounded-xl px-3.5 py-2 text-[12px] text-[#1c1917] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleBrowseNativeDirectory('newConv')}
                    className="px-3.5 py-2 bg-[#f5f5f4] hover:bg-[#eae8e1] border border-[#e7e5e4] text-[#44403c] rounded-xl text-[12px] font-medium transition-colors cursor-pointer flex-shrink-0 flex items-center space-x-1"
                    title="调用系统资源管理器选择工作空间目录"
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-[#c86a28]" />
                    <span>浏览...</span>
                  </button>
                </div>

                {/* Project Identification & Status Info */}
                {(() => {
                  const currentProjName = getProjectNameFromPath(newConvPath)
                  const groupObj = treeData.find(g => g.name === newConvGroup)
                  const existsInGroup = groupObj?.projects.some(
                    p => p.workspacePath.toLowerCase() === newConvPath.trim().toLowerCase() || p.name.toLowerCase() === currentProjName.toLowerCase()
                  )
                  return (
                    <div className="flex items-center justify-between pt-0.5 text-[11.5px]">
                      <div className="flex items-center space-x-1 text-[#78716c]">
                        <span>识别项目:</span>
                        <span className="font-mono font-semibold text-[#1c1917] bg-[#f5f5f4] px-1.5 py-0.2 rounded border border-[#e7e5e4]">
                          {currentProjName}
                        </span>
                      </div>
                      {existsInGroup ? (
                        <span className="text-[#16a34a] font-medium flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>已归属于「{newConvGroup}」下的已有项目</span>
                        </span>
                      ) : (
                        <span className="text-[#c86a28] font-medium flex items-center space-x-1">
                          <Plus className="w-3 h-3" />
                          <span>将在「{newConvGroup}」下自动新建该项目</span>
                        </span>
                      )}
                    </div>
                  )
                })()}

                {/* 常用项目空间快捷标签 */}
                <div className="pt-2 space-y-1">
                  <span className="text-[11px] text-[#a8a29e]">常用项目空间快捷选择:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: 'subtitle-agent', path: 'C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent', group: '内容生产' },
                      { name: 'audio-slice', path: 'C:\\Users\\User\\Tokmon\\Projects\\audio-slice', group: '内容生产' },
                      { name: 'ppt-generator', path: 'C:\\Users\\User\\Tokmon\\Projects\\ppt-generator', group: '演示助手' },
                      { name: 'travel-planner', path: 'C:\\Users\\User\\Tokmon\\Projects\\travel-planner', group: '旅行计划' }
                    ].map(preset => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setNewConvPath(preset.path)
                          setNewConvGroup(preset.group)
                        }}
                        className={`px-2 py-0.8 rounded-lg text-[11px] font-mono border transition-all cursor-pointer ${
                          newConvPath.trim().toLowerCase() === preset.path.toLowerCase()
                            ? 'bg-[#fef8f4] border-[#c86a28] text-[#c86a28] font-semibold'
                            : 'bg-[#fafaf9] border-[#e7e5e4] hover:border-[#d6d3d1] text-[#57534e]'
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
            <div className="h-[60px] border-t border-[#f0eee8] bg-[#faf9f6] flex items-center justify-end px-6 space-x-3 flex-shrink-0">
              <button
                onClick={() => setShowNewConvModal(false)}
                className="px-4 py-2 rounded-xl border border-[#e7e5e4] hover:bg-[#eae8e1] text-[#57534e] text-[13px] font-medium transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={handleConfirmCreateNewConv}
                className="px-5 py-2 rounded-xl bg-[#c86a28] hover:bg-[#b45309] active:scale-98 text-white text-[13px] font-semibold transition-all shadow-xs cursor-pointer"
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
          <div className="w-[480px] max-w-[94vw] bg-white border border-[#e7e5e4] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
            <div className="h-[52px] border-b border-[#f0eee8] flex items-center justify-between px-6 flex-shrink-0 bg-[#faf9f6]">
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-4 h-4 text-[#c86a28]" />
                <h3 className="text-[14.5px] font-bold text-[#1c1917]">更换当前会话工作空间目录</h3>
              </div>
              <button 
                onClick={() => setShowChangeWorkspaceModal(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#78716c] hover:bg-[#eae8e1] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-[13px]">
              <p className="text-[12px] text-[#78716c]">
                当前会话尚未开始，您可以自定义工作空间路径。会话开始执行后，工作空间目录将永久锁定。
              </p>

              <div className="space-y-1.5">
                <label className="block text-[12px] font-medium text-[#44403c]">工作空间物理路径</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={changeWorkspacePathInput}
                    onChange={(e) => setChangeWorkspacePathInput(e.target.value)}
                    className="flex-1 font-mono bg-[#f9f9f8] border border-[#e7e5e4] focus:border-[#c86a28] focus:bg-white rounded-xl px-3.5 py-2 text-[12px] text-[#1c1917] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleBrowseNativeDirectory('changeWorkspace')}
                    className="px-3 py-2 bg-[#f5f5f4] hover:bg-[#eae8e1] border border-[#e7e5e4] text-[#44403c] rounded-xl text-[12px] font-medium transition-colors cursor-pointer flex-shrink-0"
                    title="调用系统资源管理器选择工作空间目录"
                  >
                    浏览...
                  </button>
                </div>
              </div>

              {/* 预设推荐路径 */}
              <div className="space-y-1 pt-1">
                <span className="text-[11.5px] text-[#78716c]">常用项目空间:</span>
                <div className="space-y-1">
                  {[
                    { name: 'subtitle-agent', path: 'C:\\Users\\User\\Tokmon\\Projects\\subtitle-agent' },
                    { name: 'audio-slice', path: 'C:\\Users\\User\\Tokmon\\Projects\\audio-slice' },
                    { name: 'ppt-generator', path: 'C:\\Users\\User\\Tokmon\\Projects\\ppt-generator' },
                    { name: 'travel-planner', path: 'C:\\Users\\User\\Tokmon\\Projects\\travel-planner' }
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setChangeWorkspacePathInput(preset.path)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg border border-[#e7e5e4] hover:border-[#c86a28] hover:bg-[#fef8f4] transition-colors flex items-center justify-between text-[11.5px] cursor-pointer"
                    >
                      <span className="font-medium text-[#1c1917]">{preset.name}</span>
                      <span className="font-mono text-[10.5px] text-[#78716c]">{preset.path}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[56px] border-t border-[#f0eee8] bg-[#faf9f6] flex items-center justify-end px-6 space-x-3 flex-shrink-0">
              <button
                onClick={() => setShowChangeWorkspaceModal(false)}
                className="px-4 py-1.5 rounded-xl border border-[#e7e5e4] hover:bg-[#eae8e1] text-[#57534e] text-[12.5px] font-medium transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={() => {
                  const path = changeWorkspacePathInput.trim() || activeWorkspace.path
                  setActiveWorkspace(prev => ({
                    ...prev,
                    path,
                    shortPath: path.replace('C:\\Users\\User\\Tokmon', '~').replace(/\\/g, '/')
                  }))
                  setShowChangeWorkspaceModal(false)
                }}
                className="px-4 py-1.5 rounded-xl bg-[#c86a28] hover:bg-[#b45309] text-white text-[12.5px] font-semibold transition-all shadow-xs cursor-pointer"
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
        {...({ webkitdirectory: '', directory: '' } as any)}
        className="hidden"
      />

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

      </div>
    </div>
  )
}
