import { useState, useRef } from "react"
import { 
  ChevronDown, 
  Plus, 
  Paperclip, 
  Search, 
  Database, 
  Send,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ChatAreaProps {
  className?: string
}

export function ChatArea({ className }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [selectedAssistant, setSelectedAssistant] = useState("Inner AI Assistant")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const assistants = [
    "Inner AI Assistant",
    "GPT-4o",
    "Claude 3.5 Sonnet",
    "Gemini Pro"
  ]

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userInput = inputValue.trim()
    const newMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue("")

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    // Simulate AI response with more realistic responses
    setTimeout(() => {
      let response = ""
      
      if (userInput.toLowerCase().includes("olá") || userInput.toLowerCase().includes("oi")) {
        response = "Olá! É um prazer falar com você. Sou o Inner AI Assistant e estou aqui para ajudá-lo com qualquer dúvida ou tarefa que precisar. Como posso ser útil hoje?"
      } else if (userInput.toLowerCase().includes("como você funciona")) {
        response = "Sou uma inteligência artificial avançada treinada para conversar e ajudar com uma ampla variedade de tarefas. Posso ajudar com escrita, análise, programação, tradução, explicações e muito mais. O que gostaria de explorar?"
      } else if (userInput.toLowerCase().includes("obrigado")) {
        response = "Fico feliz em poder ajudar! Se tiver mais alguma dúvida ou precisar de assistência com qualquer outra coisa, estarei aqui. É para isso que estou aqui!"
      } else {
        response = `Entendi sua pergunta sobre "${userInput}". Como assistente de IA, posso ajudá-lo de várias formas. Poderia especificar melhor o que precisa para que eu possa dar uma resposta mais direcionada e útil?`
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }

  const startNewChat = () => {
    setMessages([])
    setInputValue("")
  }

  return (
    <div className={`flex flex-col h-full bg-chat-primary ${className || ""}`}>
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-border/50 bg-chat-primary/50 backdrop-blur-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2.5 text-chat-text-primary hover:bg-chat-hover px-4 py-2.5 rounded-lg transition-all duration-200 font-medium"
            >
              <Bot className="h-4 w-4 text-primary" />
              {selectedAssistant}
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border-border shadow-lg">
            {assistants.map((assistant) => (
              <DropdownMenuItem 
                key={assistant}
                onClick={() => setSelectedAssistant(assistant)}
                className={`cursor-pointer ${selectedAssistant === assistant ? "bg-accent" : ""}`}
              >
                <Bot className="h-4 w-4 mr-2" />
                {assistant}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
        <div className="scrollbar-hide h-full">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-5xl font-light text-chat-text-primary mb-6 tracking-tight">
              Olá Fernando
            </h1>
            <p className="text-xl text-chat-text-secondary mb-12 font-light">
              Como posso ajudar hoje?
            </p>
            <Button
              onClick={startNewChat}
              variant="ghost"
              size="lg"
              className="w-14 h-14 rounded-full border border-border/50 hover:bg-chat-hover hover:border-border transition-all duration-200"
            >
              <Plus className="h-5 w-5 text-chat-text-secondary" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-chat-text-secondary flex items-center justify-center text-chat-primary text-sm font-semibold">
                      F
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-chat-input rounded-xl border border-border/60 p-4 shadow-sm">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                adjustTextareaHeight()
              }}
              onKeyDown={handleKeyPress}
              placeholder="Pergunte para Inner AI"
              className="w-full bg-transparent border-none resize-none focus:ring-0 focus:outline-none text-chat-text-primary placeholder:text-chat-text-muted min-h-[24px] max-h-[200px] text-base leading-relaxed"
              rows={1}
            />
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-chat-text-muted hover:text-chat-text-secondary hover:bg-chat-hover/50 rounded-lg px-3 py-2 transition-all"
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-chat-text-muted hover:text-chat-text-secondary hover:bg-chat-hover/50 rounded-lg px-3 py-2 transition-all"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Pesquisa na web
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-chat-text-muted hover:text-chat-text-secondary hover:bg-chat-hover/50 rounded-lg px-3 py-2 transition-all"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Conhecimento
                </Button>
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="sm"
                className="bg-primary hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg px-4 py-2 transition-all shadow-sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
