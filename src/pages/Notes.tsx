
import { Sidebar } from "@/components/Sidebar";
import { NoteEditor } from "@/components/Notes/NoteEditor";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, Folder, Star, Clock, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
  starred: boolean;
  folder: string;
};

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Chemistry - Organic Compounds",
    content: "Classification of organic compounds and their properties...",
    updatedAt: new Date(Date.now() - 3600000), // 1 hour ago
    starred: true,
    folder: "Chemistry",
  },
  {
    id: "2",
    title: "Calculus - Integration Methods",
    content: "Techniques for solving complex integrals including...",
    updatedAt: new Date(Date.now() - 86400000), // 1 day ago
    starred: false,
    folder: "Mathematics",
  },
  {
    id: "3",
    title: "Literature - Shakespeare Analysis",
    content: "Themes and motifs in Hamlet act 3, scene 2...",
    updatedAt: new Date(Date.now() - 172800000), // 2 days ago
    starred: false,
    folder: "Literature",
  },
  {
    id: "4",
    title: "Physics - Newton's Laws",
    content: "Detailed explanation of Newton's three laws of motion...",
    updatedAt: new Date(Date.now() - 259200000), // 3 days ago
    starred: true,
    folder: "Physics",
  },
];

const folders = ["All Notes", "Chemistry", "Mathematics", "Literature", "Physics"];

const Notes = () => {
  const [notes, setNotes] = useState(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("All Notes");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === "All Notes" || note.folder === selectedFolder;
    
    if (activeTab === "all") return matchesSearch && matchesFolder;
    if (activeTab === "starred") return matchesSearch && matchesFolder && note.starred;
    if (activeTab === "recent") {
      // Filter for notes updated in the last 2 days
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      return matchesSearch && matchesFolder && note.updatedAt > twoDaysAgo;
    }
    return matchesSearch && matchesFolder;
  });

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      updatedAt: new Date(),
      starred: false,
      folder: selectedFolder === "All Notes" ? "Uncategorized" : selectedFolder,
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const saveNote = (id: string, title: string, content: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title, content, updatedAt: new Date() }
          : note
      )
    );
  };

  const toggleStarred = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, starred: !note.starred } : note
      )
    );
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1">
        {/* Notes sidebar */}
        <div className="w-72 border-r overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold mb-4">Notes</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="p-2">
            <Button onClick={createNewNote} className="w-full justify-start">
              <Plus size={16} className="mr-2" />
              New Note
            </Button>
          </div>
          
          <div className="overflow-y-auto flex-1">
            <div className="p-2">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="p-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Folders</h3>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <Button
                    key={folder}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      selectedFolder === folder && "bg-accent/50"
                    )}
                    onClick={() => setSelectedFolder(folder)}
                  >
                    {folder === "All Notes" ? (
                      <FolderOpen size={16} className="mr-2" />
                    ) : (
                      <Folder size={16} className="mr-2" />
                    )}
                    {folder}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="p-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {filteredNotes.length} {filteredNotes.length === 1 ? "Note" : "Notes"}
              </h3>
              <div className="space-y-1">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className={cn(
                      "p-2 rounded-md cursor-pointer",
                      selectedNote?.id === note.id ? "bg-accent/50" : "hover:bg-secondary"
                    )}
                    onClick={() => setSelectedNote(note)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">{note.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStarred(note.id);
                        }}
                      >
                        <Star
                          size={16}
                          className={cn(
                            note.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          )}
                        />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {note.content.slice(0, 50)}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock size={12} className="mr-1" />
                      {formatTimeAgo(note.updatedAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Note editor */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedNote ? (
            <NoteEditor
              initialTitle={selectedNote.title}
              initialContent={selectedNote.content}
              onSave={(title, content) => saveNote(selectedNote.id, title, content)}
            />
          ) : (
            <Card className="animate-fade-in">
              <CardContent className="p-8 text-center">
                <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Note Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a note from the sidebar or create a new one to start writing.
                </p>
                <Button onClick={createNewNote}>
                  <Plus size={16} className="mr-2" />
                  Create New Note
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
