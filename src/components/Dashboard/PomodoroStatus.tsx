
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function PomodoroStatus() {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(1500); // 25 minutes in seconds
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          setProgress((newTime / 1500) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimer(1500);
    setProgress(100);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={cn("animate-fade-in", isActive && "animate-pulse-light")}>
      <CardHeader>
        <CardTitle className="text-xl">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <span className="text-3xl font-bold">{formatTime(timer)}</span>
          <Progress value={progress} className="h-2 mt-2" />
        </div>
        <div className="flex justify-center gap-3">
          <Button onClick={toggleTimer} variant="outline" size="sm">
            {isActive ? <Pause size={16} /> : <Play size={16} />}
            <span className="ml-2">{isActive ? "Pause" : "Start"}</span>
          </Button>
          <Button onClick={resetTimer} variant="outline" size="sm">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
