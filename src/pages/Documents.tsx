
import { Sidebar } from "@/components/Sidebar";
import { DocumentsList } from "@/components/Documents/DocumentsList";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { useState } from "react";

const Documents = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 animate-slide-in">Documents</h1>
              <p className="text-muted-foreground animate-fade-in">
                Upload and manage your assignments, question papers, and study materials
              </p>
            </div>
            <Button 
              onClick={handleOpenUploadModal} 
              size="lg" 
              className="animate-fade-in"
            >
              <FilePlus size={20} className="mr-2" />
              Upload Document
            </Button>
          </div>
          
          <DocumentsList showUploadModalProp={showUploadModal} setShowUploadModalProp={setShowUploadModal} />
        </div>
      </main>
    </div>
  );
}

export default Documents;
