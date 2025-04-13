
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bold, Italic, List, Heading, Save, 
  AlignLeft, AlignCenter, AlignRight 
} from "lucide-react";

type EditorProps = {
  initialTitle?: string;
  initialContent?: string;
  onSave?: (title: string, content: string) => void;
};

export function NoteEditor({ 
  initialTitle = "", 
  initialContent = "", 
  onSave 
}: EditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleToolbarAction = (action: string) => {
    // This is a simplified implementation
    // In a real app, this would modify the content based on selected text
    switch (action) {
      case "bold":
        setContent(content + "**bold text**");
        break;
      case "italic":
        setContent(content + "*italic text*");
        break;
      case "list":
        setContent(content + "\n- List item");
        break;
      case "heading":
        setContent(content + "\n## Heading");
        break;
      case "align-left":
      case "align-center":
      case "align-right":
        // These would apply alignment to selected text
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(title, content);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-4">
        <div className="mb-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="text-xl font-medium mb-2"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4 p-2 border rounded-md bg-secondary/50">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleToolbarAction("bold")}
          >
            <Bold size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleToolbarAction("italic")}
          >
            <Italic size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleToolbarAction("list")}
          >
            <List size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleToolbarAction("heading")}
          >
            <Heading size={18} />
          </Button>
          <div className="h-6 w-px bg-border mx-1" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleToolbarAction("align-left")}
          >
            <AlignLeft size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleToolbarAction("align-center")}
          >
            <AlignCenter size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleToolbarAction("align-right")}
          >
            <AlignRight size={18} />
          </Button>
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing your note here..."
          className="w-full min-h-[300px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Save Note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
