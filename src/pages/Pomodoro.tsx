
import { Sidebar } from "@/components/Sidebar";
import { PomodoroTimer } from "@/components/Pomodoro/PomodoroTimer";

const Pomodoro = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 animate-slide-in">Pomodoro Timer</h1>
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
