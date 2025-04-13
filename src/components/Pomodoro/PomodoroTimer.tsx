
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Play, Pause, SkipForward, Settings, RotateCcw,
  Timer, Coffee, Volume2, VolumeX
} from "lucide-react";
import { cn } from "@/lib/utils";

type TimerMode = "focus" | "shortBreak" | "longBreak";

type TimerSettings = {
  focus: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  soundEnabled: boolean;
};

export function PomodoroTimer() {
  const [settings, setSettings] = useState<TimerSettings>({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: true,
    autoStartPomodoros: true,
    longBreakInterval: 4,
    soundEnabled: true,
  });
  
  const [mode, setMode] = useState<TimerMode>("focus");
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.focus * 60);
  const [completed, setCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  
  const totalTime = useRef(settings.focus * 60);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
  }, []);
  
  // Set timer based on mode
  useEffect(() => {
    switch (mode) {
      case "focus":
        setTimeLeft(settings.focus * 60);
        totalTime.current = settings.focus * 60;
        break;
      case "shortBreak":
        setTimeLeft(settings.shortBreak * 60);
        totalTime.current = settings.shortBreak * 60;
        break;
      case "longBreak":
        setTimeLeft(settings.longBreak * 60);
        totalTime.current = settings.longBreak * 60;
        break;
    }
    // We stop the timer when changing modes
    setIsActive(false);
  }, [mode, settings]);
  
  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer finished
      if (settings.soundEnabled && audioRef.current) {
        audioRef.current.play();
      }
      
      // Handle timer completion
      if (mode === "focus") {
        const newCompleted = completed + 1;
        setCompleted(newCompleted);
        
        // Determine if we should take a long break or short break
        if (newCompleted % settings.longBreakInterval === 0) {
          setMode("longBreak");
          if (settings.autoStartBreaks) setIsActive(true);
        } else {
          setMode("shortBreak");
          if (settings.autoStartBreaks) setIsActive(true);
        }
      } else {
        // Break is over, back to focus
        setMode("focus");
        if (settings.autoStartPomodoros) setIsActive(true);
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, completed, settings]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    switch (mode) {
      case "focus":
        setTimeLeft(settings.focus * 60);
        break;
      case "shortBreak":
        setTimeLeft(settings.shortBreak * 60);
        break;
      case "longBreak":
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  };
  
  const skipTimer = () => {
    setIsActive(false);
    if (mode === "focus") {
      const newCompleted = completed + 1;
      setCompleted(newCompleted);
      
      if (newCompleted % settings.longBreakInterval === 0) {
        setMode("longBreak");
      } else {
        setMode("shortBreak");
      }
    } else {
      setMode("focus");
    }
  };
  
  const saveSettings = () => {
    setSettings(tempSettings);
    setShowSettings(false);
    
    // Reset timer with new settings
    switch (mode) {
      case "focus":
        setTimeLeft(tempSettings.focus * 60);
        totalTime.current = tempSettings.focus * 60;
        break;
      case "shortBreak":
        setTimeLeft(tempSettings.shortBreak * 60);
        totalTime.current = tempSettings.shortBreak * 60;
        break;
      case "longBreak":
        setTimeLeft(tempSettings.longBreak * 60);
        totalTime.current = tempSettings.longBreak * 60;
        break;
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = (timeLeft / totalTime.current) * 100;
  
  return (
    <Card className={cn("max-w-lg mx-auto animate-fade-in", isActive && mode === "focus" && "animate-pulse-light")}>
      <CardHeader>
        <CardTitle className="text-xl text-center">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={mode} onValueChange={(value) => setMode(value as TimerMode)} className="mb-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="focus" className="gap-2">
              <Timer size={14} />
              <span>Focus</span>
            </TabsTrigger>
            <TabsTrigger value="shortBreak" className="gap-2">
              <Coffee size={14} />
              <span>Short Break</span>
            </TabsTrigger>
            <TabsTrigger value="longBreak" className="gap-2">
              <Coffee size={14} />
              <span>Long Break</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="text-center mb-8">
          <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>
          <Progress value={progress} className="h-2 mb-6" />
          
          <div className="flex justify-center gap-4">
            <Button onClick={toggleTimer} size="lg" className="gap-2">
              {isActive ? <Pause size={18} /> : <Play size={18} />}
              <span>{isActive ? "Pause" : "Start"}</span>
            </Button>
            <Button onClick={resetTimer} variant="outline" size="icon">
              <RotateCcw size={18} />
            </Button>
            <Button onClick={skipTimer} variant="outline" size="icon">
              <SkipForward size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
            >
              {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setTempSettings(settings);
                setShowSettings(!showSettings);
              }}
            >
              <Settings size={18} />
            </Button>
          </div>
        </div>
        
        <div className="text-center text-muted-foreground">
          <p>Completed: {completed} {completed === 1 ? "pomodoro" : "pomodoros"}</p>
        </div>
        
        {showSettings && (
          <div className="mt-8 p-4 border rounded-lg animate-fade-in">
            <h3 className="font-medium mb-4">Timer Settings</h3>
            
            <div className="grid gap-4 mb-4">
              <div className="grid gap-2">
                <Label htmlFor="focusLength">Focus Length (minutes)</Label>
                <Input
                  id="focusLength"
                  type="number"
                  min="1"
                  max="60"
                  value={tempSettings.focus}
                  onChange={(e) => 
                    setTempSettings({ ...tempSettings, focus: parseInt(e.target.value) || 25 })
                  }
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="shortBreakLength">Short Break Length (minutes)</Label>
                <Input
                  id="shortBreakLength"
                  type="number"
                  min="1"
                  max="30"
                  value={tempSettings.shortBreak}
                  onChange={(e) =>
                    setTempSettings({ ...tempSettings, shortBreak: parseInt(e.target.value) || 5 })
                  }
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="longBreakLength">Long Break Length (minutes)</Label>
                <Input
                  id="longBreakLength"
                  type="number"
                  min="1"
                  max="60"
                  value={tempSettings.longBreak}
                  onChange={(e) =>
                    setTempSettings({ ...tempSettings, longBreak: parseInt(e.target.value) || 15 })
                  }
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="longBreakInterval">Long Break Interval</Label>
                <Input
                  id="longBreakInterval"
                  type="number"
                  min="1"
                  max="10"
                  value={tempSettings.longBreakInterval}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      longBreakInterval: parseInt(e.target.value) || 4,
                    })
                  }
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={saveSettings}>Save Settings</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
