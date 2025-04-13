
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileCheck, FileClock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Document = {
  id: string;
  title: string;
  type: "assignment" | "question_paper" | "notes";
  updatedAt: Date;
  subject: string;
};

const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Computer Science Final Exam",
    type: "question_paper",
    updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
    subject: "Computer Science",
  },
  {
    id: "2",
    title: "Physics Assignment 3",
    type: "assignment",
    updatedAt: new Date(Date.now() - 86400000), // 1 day ago
    subject: "Physics",
  },
  {
    id: "3",
    title: "English Literature Study Guide",
    type: "notes",
    updatedAt: new Date(Date.now() - 172800000), // 2 days ago
    subject: "English",
  },
];

export function RecentDocuments() {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const getIcon = (type: Document["type"]) => {
    switch (type) {
      case "assignment":
        return <FileCheck size={18} className="text-primary" />;
      case "question_paper":
        return <FileClock size={18} className="text-accent" />;
      case "notes":
        return <FileText size={18} className="text-muted-foreground" />;
      default:
        return <FileText size={18} />;
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Recent Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockDocuments.map((doc) => (
          <Link to={`/documents/${doc.id}`} key={doc.id}>
            <div className="flex gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                {getIcon(doc.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{doc.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeAgo(doc.updatedAt)} · {doc.subject}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
