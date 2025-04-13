
import { Sidebar } from "@/components/Sidebar";
import { AssignmentTracker } from "@/components/Assignments/AssignmentTracker";
import { toast } from "sonner";

const Assignments = () => {
  const handlePageAction = () => {
    toast.info("Assignments functionality activated!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg" onClick={handlePageAction}>
            <h1 className="text-3xl font-bold tracking-tight mb-2 animate-slide-in bg-gradient-primary bg-clip-text text-transparent">Assignment Tracker</h1>
            <p className="text-muted-foreground animate-fade-in">
              Keep track of your assignments, due dates, and progress
            </p>
          </div>
          
          <AssignmentTracker />
        </div>
      </main>
    </div>
  );
};

export default Assignments;
