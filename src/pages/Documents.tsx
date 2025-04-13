
import { Sidebar } from "@/components/Sidebar";
import { DocumentsList } from "@/components/Documents/DocumentsList";

const Documents = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 animate-slide-in">Documents</h1>
            <p className="text-muted-foreground animate-fade-in">
              Manage your assignments, question papers, and study materials
            </p>
          </div>
          
          <DocumentsList />
        </div>
      </main>
    </div>
  );
};

export default Documents;
