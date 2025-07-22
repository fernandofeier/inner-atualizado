import { SidebarProvider } from "@/components/ui/sidebar"
import { InnerAISidebar } from "@/components/InnerAISidebar"
import { ChatArea } from "@/components/ChatArea"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <InnerAISidebar />
        <ChatArea className="flex-1" />
      </div>
    </SidebarProvider>
  );
};

export default Index;
