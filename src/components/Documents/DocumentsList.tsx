
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, Search, FilePlus, FileQuestion, FileCheck, Upload, X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Document = {
  id: string;
  title: string;
  type: "assignment" | "question_paper" | "notes";
  subject: string;
  createdAt: Date;
  fileSize: string;
  file?: File;
};

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Computer Science Final Exam",
    type: "question_paper",
    subject: "Computer Science",
    createdAt: new Date(2023, 5, 15),
    fileSize: "2.4 MB",
  },
  {
    id: "2",
    title: "Physics Assignment 3",
    type: "assignment",
    subject: "Physics",
    createdAt: new Date(2023, 6, 10),
    fileSize: "1.8 MB",
  },
  {
    id: "3",
    title: "English Literature Study Guide",
    type: "notes",
    subject: "English",
    createdAt: new Date(2023, 7, 5),
    fileSize: "3.2 MB",
  },
  {
    id: "4",
    title: "Calculus Midterm Exam",
    type: "question_paper",
    subject: "Mathematics",
    createdAt: new Date(2023, 4, 20),
    fileSize: "1.5 MB",
  },
  {
    id: "5",
    title: "Chemistry Lab Report Template",
    type: "assignment",
    subject: "Chemistry",
    createdAt: new Date(2023, 5, 25),
    fileSize: "0.8 MB",
  },
];

export function DocumentsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    subject: "",
    type: "notes" as Document["type"],
    file: null as File | null,
  });

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && doc.type === activeTab;
  });

  const getIcon = (type: Document["type"]) => {
    switch (type) {
      case "assignment":
        return <FileCheck size={18} className="text-primary" />;
      case "question_paper":
        return <FileQuestion size={18} className="text-accent" />;
      case "notes":
        return <FileText size={18} className="text-muted-foreground" />;
      default:
        return <FileText size={18} />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if the file is a PDF
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file only.");
        return;
      }
      
      setUploadForm({ ...uploadForm, file });
    }
  };

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadForm.title || !uploadForm.subject || !uploadForm.file) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Create a new document object
    const newDocument: Document = {
      id: `doc_${Date.now()}`,
      title: uploadForm.title,
      subject: uploadForm.subject,
      type: uploadForm.type,
      createdAt: new Date(),
      fileSize: `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB`,
      file: uploadForm.file,
    };
    
    // Add the new document to the list
    setDocuments([newDocument, ...documents]);
    
    // Reset form and close modal
    setUploadForm({
      title: "",
      subject: "",
      type: "notes",
      file: null,
    });
    
    setShowUploadModal(false);
    toast.success("Document uploaded successfully!");
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Documents</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setShowUploadModal(true)}>
            <FilePlus size={16} className="mr-2" />
            Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="assignment">Assignments</TabsTrigger>
            <TabsTrigger value="question_paper">Question Papers</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 p-4 text-sm font-medium text-muted-foreground border-b">
                <div className="col-span-6">Document</div>
                <div className="col-span-2 text-center">Type</div>
                <div className="col-span-2 text-center">Date</div>
                <div className="col-span-2 text-center">Size</div>
              </div>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <div 
                    key={doc.id}
                    className="grid grid-cols-12 p-4 hover:bg-secondary/50 transition-colors text-sm"
                  >
                    <div className="col-span-6 flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary">
                        {getIcon(doc.type)}
                      </div>
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-muted-foreground text-xs">{doc.subject}</div>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        doc.type === "assignment" ? "bg-primary/10 text-primary" :
                        doc.type === "question_paper" ? "bg-accent/10 text-accent" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {doc.type === "assignment" ? "Assignment" :
                         doc.type === "question_paper" ? "Question Paper" : "Notes"}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      {formatDate(doc.createdAt)}
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      {doc.fileSize}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No documents found
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg p-6 w-full max-w-md shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Upload Document</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowUploadModal(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              
              <form onSubmit={handleSubmitUpload} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                    placeholder="Document title"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    value={uploadForm.subject}
                    onChange={(e) => setUploadForm({...uploadForm, subject: e.target.value})}
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Document Type</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={uploadForm.type}
                    onChange={(e) => setUploadForm({...uploadForm, type: e.target.value as Document["type"]})}
                  >
                    <option value="notes">Notes</option>
                    <option value="assignment">Assignment</option>
                    <option value="question_paper">Question Paper</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">File (PDF only)</label>
                  <div className="mt-2">
                    {uploadForm.file ? (
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <span className="text-sm truncate max-w-[250px]">{uploadForm.file.name}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setUploadForm({...uploadForm, file: null})}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-md cursor-pointer hover:bg-secondary/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF files only</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".pdf" 
                          onChange={handleFileUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Upload</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
