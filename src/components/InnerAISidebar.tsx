import { useState } from "react"
import { 
  Home, 
  BookOpen, 
  Wrench, 
  Library, 
  ChevronDown, 
  MoreHorizontal, 
  Sparkles,
  HelpCircle,
  User
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navigationItems = [
  { title: "Início", url: "/", icon: Home },
  { title: "Cursos", url: "/cursos", icon: BookOpen },
  { title: "Ferramentas", url: "/ferramentas", icon: Wrench },
  { title: "Biblioteca", url: "/biblioteca", icon: Library },
]

const chatHistory = {
  "Esta Semana": [
    { id: 1, title: "Resultado d...", url: "/chat/1" },
    { id: 2, title: "Bom Dia!", url: "/chat/2" },
  ],
  "Últimos 30 Dias": [
    { id: 3, title: "E-chá GPT", url: "/chat/3" },
    { id: 4, title: "Boa Noite!", url: "/chat/4" },
  ]
}

interface InnerAISidebarProps {
  className?: string
}

export function InnerAISidebar({ className }: InnerAISidebarProps) {
  const sidebar = useSidebar()
  const location = useLocation()
  const [chatsExpanded, setChatsExpanded] = useState(true)
  const collapsed = sidebar.state === "collapsed"
  
  const isActive = (path: string) => location.pathname === path
  
  const getNavClassName = (path: string) => 
    isActive(path) 
      ? "bg-sidebar-accent text-sidebar-primary font-medium" 
      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"

  return (
    <Sidebar className={`w-60 bg-sidebar border-r border-sidebar-border ${className || ""}`}>
      <SidebarContent className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-6 py-5">
          <h1 className="text-lg font-semibold text-sidebar-foreground">
            Inner AI
          </h1>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-4 py-2">
          <SidebarMenu className="space-y-1">
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.url} 
                    className={`${getNavClassName(item.url)} flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Chats Section */}
        <SidebarGroup className="px-4 flex-1 mt-2">
          <SidebarGroupLabel 
            className="flex items-center justify-between px-3 py-3 text-sidebar-foreground/60 text-sm cursor-pointer hover:bg-sidebar-accent/30 rounded-md transition-colors"
            onClick={() => setChatsExpanded(!chatsExpanded)}
          >
            <span className="font-medium">Chats</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-6 px-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Todos
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border shadow-lg">
                <DropdownMenuItem className="cursor-pointer">Todos</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Favoritos</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Arquivados</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupLabel>

          {chatsExpanded && (
            <SidebarGroupContent className="mt-1">
              {Object.entries(chatHistory).map(([period, chats]) => (
                <div key={period} className="mb-6">
                  <div className="text-xs text-sidebar-foreground/50 px-3 py-2 mb-2 font-medium uppercase tracking-wide">
                    {period}
                  </div>
                  <SidebarMenu className="space-y-1">
                    {chats.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={chat.url}
                            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200 group text-sm"
                          >
                            <span className="truncate">{chat.title}</span>
                            <MoreHorizontal className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0 ml-2" />
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </div>
              ))}
            </SidebarGroupContent>
          )}
        </SidebarGroup>

        {/* Free Plan Notice */}
        <div className="px-4 py-4 mt-auto">
          <div className="bg-gradient-subtle rounded-lg p-4 mb-4 border border-sidebar-border/50">
            <p className="text-xs text-sidebar-foreground/60 mb-1 font-medium">
              Você está no plano Free
            </p>
            <p className="text-xs text-sidebar-foreground/50 mb-4 leading-relaxed">
              Faça upgrade para desbloquear funcionalidades disponíveis
            </p>
            <Button 
              className="w-full bg-gradient-purple text-white hover:opacity-90 transition-all duration-200 shadow-sm text-xs font-medium"
              size="sm"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              Fazer upgrade
            </Button>
          </div>

          {/* Support */}
          <div className="mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start px-3 py-2.5 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-all text-sm"
            >
              <HelpCircle className="h-4 w-4 mr-2.5" />
              Suporte
            </Button>
          </div>
          
          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start px-3 py-2.5 hover:bg-sidebar-accent/30 transition-all"
              >
                <Avatar className="h-7 w-7 mr-3">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    FF
                  </AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <span className="text-sidebar-foreground/80 text-sm font-medium">
                    Fernando Feier
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-popover border-border shadow-lg">
              <DropdownMenuItem className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                <NavLink to="/perfil" className="w-full">Perfil</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <NavLink to="/configuracoes" className="w-full">Configurações</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
