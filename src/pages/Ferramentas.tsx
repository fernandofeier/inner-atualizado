import { SidebarProvider } from "@/components/ui/sidebar"
import { InnerAISidebar } from "@/components/InnerAISidebar"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Image, 
  Code, 
  Calculator, 
  Globe,
  Mail
} from "lucide-react"

const tools = [
  {
    name: "Gerador de Texto",
    description: "Crie textos otimizados para diferentes propósitos",
    icon: FileText,
    category: "Escrita"
  },
  {
    name: "Editor de Imagens",
    description: "Edite e gere imagens com IA",
    icon: Image,
    category: "Design"
  },
  {
    name: "Gerador de Código",
    description: "Gere e revise código em várias linguagens",
    icon: Code,
    category: "Programação"
  },
  {
    name: "Calculadora Avançada",
    description: "Resolva problemas matemáticos complexos",
    icon: Calculator,
    category: "Matemática"
  },
  {
    name: "Tradutor",
    description: "Traduza textos para mais de 100 idiomas",
    icon: Globe,
    category: "Idiomas"
  },
  {
    name: "Gerador de Email",
    description: "Crie emails profissionais e persuasivos",
    icon: Mail,
    category: "Comunicação"
  }
]

const Ferramentas = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <InnerAISidebar />
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-semibold text-chat-text-primary mb-6">
              Ferramentas
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <div 
                  key={tool.name}
                  className="bg-card rounded-lg border border-border p-6 hover:bg-card/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-card-foreground mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                          {tool.category}
                        </span>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Usar
                        </Button>
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

export default Ferramentas;
