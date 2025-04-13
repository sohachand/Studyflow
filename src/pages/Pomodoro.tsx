
import { Sidebar } from "@/components/Sidebar";
import { PomodoroTimer } from "@/components/Pomodoro/PomodoroTimer";
import { toast } from "sonner";

const Pomodoro = () => {
  const handlePageAction = () => {
    toast.info("Pomodoro page functionality activated!");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 rounded-lg" onClick={handlePageAction}>
            <h1 className="text-3xl font-bold tracking-tight mb-2 animate-slide-in bg-gradient-accent bg-clip-text text-transparent">Pomodoro Timer</h1>
            <p className="text-muted-foreground animate-fade-in">
              Stay focused and productive with our Pomodoro technique timer
            </p>
          </div>
          
          <PomodoroTimer />
        </div>
      </main>
    </div>
  );
};

export default Pomodoro;
