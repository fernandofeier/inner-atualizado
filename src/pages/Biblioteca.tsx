import { SidebarProvider } from "@/components/ui/sidebar"
import { InnerAISidebar } from "@/components/InnerAISidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search,
  BookOpen,
  FileText,
  Video,
  Headphones,
  Download,
  Star
} from "lucide-react"

const libraryItems = [
  {
    id: 1,
    title: "Guia Completo de Prompt Engineering",
    type: "document",
    category: "IA",
    rating: 4.8,
    downloads: 1234,
    icon: FileText
  },
  {
    id: 2,
    title: "Introdução ao Machine Learning",
    type: "video",
    category: "Educação",
    rating: 4.9,
    downloads: 856,
    icon: Video
  },
  {
    id: 3,
    title: "Podcast: Futuro da IA",
    type: "audio",
    category: "Entrevistas",
    rating: 4.7,
    downloads: 567,
    icon: Headphones
  },
  {
    id: 4,
    title: "Manual de Automação com IA",
    type: "document",
    category: "Produtividade",
    rating: 4.6,
    downloads: 789,
    icon: BookOpen
  }
]

const Biblioteca = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <InnerAISidebar />
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-semibold text-chat-text-primary">
                Biblioteca
              </h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar recursos..."
                  className="pl-10 w-64 bg-input border-border"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {libraryItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-card rounded-lg border border-border p-6 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-medium text-card-foreground">
                          {item.title}
                        </h3>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{item.downloads}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Biblioteca;
