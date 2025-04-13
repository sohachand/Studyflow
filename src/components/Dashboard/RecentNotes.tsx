
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

type Note = {
  id: string;
  title: string;
  preview: string;
  updatedAt: Date;
  subject: string;
};

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Chemistry - Organic Compounds",
    preview: "Classification of organic compounds and their properties...",
    updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
    subject: "Chemistry",
  },
  {
    id: "2",
    title: "Calculus - Integration Methods",
    preview: "Techniques for solving complex integrals including...",
    updatedAt: new Date(Date.now() - 86400000), // 1 day ago
    subject: "Mathematics",
  },
  {
    id: "3",
    title: "Literature - Shakespeare Analysis",
    preview: "Themes and motifs in Hamlet act 3, scene 2...",
    updatedAt: new Date(Date.now() - 172800000), // 2 days ago
    subject: "Literature",
  },
];

export function RecentNotes() {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Recent Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockNotes.map((note) => (
          <Link to={`/notes/${note.id}`} key={note.id}>
            <div className="flex gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <BookOpen size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{note.title}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {note.preview}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeAgo(note.updatedAt)} · {note.subject}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
