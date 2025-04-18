
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, Check, Clock, CalendarDays, CheckCircle, Circle,
  AlertCircle, Edit, MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type Assignment = {
  id: string;
  title: string;
  subject: string;
  dueDate: Date;
  completed: boolean;
  progress: number;
};

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Mathematics Problem Set",
    subject: "Mathematics",
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    completed: false,
    progress: 25,
  },
  {
    id: "2",
    title: "History Essay",
    subject: "History",
    dueDate: new Date(Date.now() + 172800000), // Day after tomorrow
    completed: false,
    progress: 50,
  },
  {
    id: "3",
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: new Date(Date.now() + 43200000), // 12 hours from now
    completed: false,
    progress: 75,
  },
  {
    id: "4",
    title: "Literature Review",
    subject: "Literature",
    dueDate: new Date(Date.now() - 86400000), // Yesterday
    completed: true,
    progress: 100,
  },
  {
    id: "5",
    title: "Chemistry Experiment Analysis",
    subject: "Chemistry",
    dueDate: new Date(Date.now() - 172800000), // 2 days ago
    completed: false,
    progress: 10,
  },
];

export function AssignmentTracker() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: ""
    }
  });

  const toggleCompleted = (id: string) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
  };

  const handleNewAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: "New Assignment",
      subject: "Study Subject",
      dueDate: new Date(Date.now() + 259200000), // 3 days from now
      completed: false,
      progress: 0,
    };
    
    setAssignments([newAssignment, ...assignments]);
    toast.success("New assignment created successfully");
  };

  const openRenameDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    form.setValue("title", assignment.title);
    setRenameDialogOpen(true);
  };

  const handleRename = (values: { title: string }) => {
    if (!selectedAssignment) return;
    
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? { ...assignment, title: values.title }
          : assignment
      )
    );
    
    setRenameDialogOpen(false);
    toast.success("Assignment renamed successfully");
  };

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeTab === "upcoming") return !assignment.completed;
    if (activeTab === "completed") return assignment.completed;
    if (activeTab === "overdue") 
      return !assignment.completed && assignment.dueDate < new Date();
    return true;
  });

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === now.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDueDateStatus = (date: Date, completed: boolean) => {
    if (completed) return { icon: CheckCircle, text: "Completed", class: "text-green-500" };
    
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const daysUntilDue = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return { icon: AlertCircle, text: "Overdue", class: "text-destructive" };
    if (daysUntilDue === 0) return { icon: Clock, text: "Due Today", class: "text-accent" };
    if (daysUntilDue === 1) return { icon: Clock, text: "Due Tomorrow", class: "text-primary" };
    return { icon: CalendarDays, text: `Due in ${daysUntilDue} days`, class: "text-muted-foreground" };
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Assignments</CardTitle>
        <Button size="sm" onClick={handleNewAssignment}>
          <Plus size={16} className="mr-2" />
          New Assignment
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0 space-y-4">
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => {
                const status = getDueDateStatus(assignment.dueDate, assignment.completed);
                const StatusIcon = status.icon;
                
                return (
                  <ContextMenu key={assignment.id}>
                    <ContextMenuTrigger>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => toggleCompleted(assignment.id)}
                            >
                              {assignment.completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Circle className="h-4 w-4" />
                              )}
                              <span className="sr-only">Toggle completion</span>
                            </Button>
                            <div>
                              <h4 className={cn("font-medium", assignment.completed && "line-through text-muted-foreground")}>
                                {assignment.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                            </div>
                          </div>
                          <div className={cn("flex items-center text-xs", status.class)}>
                            <StatusIcon size={14} className="mr-1" />
                            <span>{status.text}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{assignment.progress}%</span>
                          </div>
                          <Progress value={assignment.progress} className="h-2" />
                        </div>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem onClick={() => openRenameDialog(assignment)}>
                        <Edit className="mr-2 h-4 w-4" /> Rename Assignment
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                );
              })
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No assignments found
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename Assignment</DialogTitle>
              <DialogDescription>
                Enter a new name for this assignment.
              </DialogDescription>
            </DialogHeader>
            {/* This is the key fix - wrapping the form elements with a Form component */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRename)}>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assignment Title</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter assignment title" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
