
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, Search, FilePlus, FileQuestion, FileCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";

type Document = {
  id: string;
  title: string;
  type: "assignment" | "question_paper" | "notes";
  subject: string;
  createdAt: Date;
  fileSize: string;
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

  const filteredDocuments = mockDocuments.filter((doc) => {
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
          <Button>
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
      </CardContent>
    </Card>
  );
}
