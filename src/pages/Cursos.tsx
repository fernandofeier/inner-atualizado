import { SidebarProvider } from "@/components/ui/sidebar"
import { InnerAISidebar } from "@/components/InnerAISidebar"

const Cursos = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <InnerAISidebar />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-chat-text-primary mb-6">
              Cursos
            </h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Course cards */}
              <div className="bg-card rounded-lg border border-border p-6 hover:bg-card/80 transition-colors">
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  Fundamentos de IA
                </h3>
                <p className="text-muted-foreground mb-4">
                  Aprenda os conceitos básicos de inteligência artificial e machine learning.
                </p>
                <div className="text-sm text-primary">Iniciante • 4 horas</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 hover:bg-card/80 transition-colors">
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  Prompt Engineering
                </h3>
                <p className="text-muted-foreground mb-4">
                  Domine a arte de criar prompts eficazes para modelos de linguagem.
                </p>
                <div className="text-sm text-primary">Intermediário • 6 horas</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-6 hover:bg-card/80 transition-colors">
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  Automação com IA
                </h3>
                <p className="text-muted-foreground mb-4">
                  Use IA para automatizar tarefas e melhorar sua produtividade.
                </p>
                <div className="text-sm text-primary">Avançado • 8 horas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Cursos;
