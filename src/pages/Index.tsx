
import { Sidebar } from "@/components/Sidebar";
import { FeatureCard } from "@/components/Dashboard/FeatureCard";
import { UpcomingAssignments } from "@/components/Dashboard/UpcomingAssignments";
import { RecentNotes } from "@/components/Dashboard/RecentNotes";
import { PomodoroStatus } from "@/components/Dashboard/PomodoroStatus";
import { RecentDocuments } from "@/components/Dashboard/RecentDocuments";
import { BookOpen, FileText, Calendar, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 animate-slide-in">Welcome to StudyFlow</h1>
            <p className="text-muted-foreground animate-fade-in">Your all-in-one student productivity platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              title="Notes"
              icon={<BookOpen size={18} />}
              description="Create and organize your study notes"
              to="/notes"
              iconColor="text-primary"
            />
            <FeatureCard
              title="Documents"
              icon={<FileText size={18} />}
              description="Store and access your PDFs and papers"
              to="/documents"
              iconColor="text-accent"
            />
            <FeatureCard
              title="Assignments"
              icon={<Calendar size={18} />}
              description="Track your assignments and deadlines"
              to="/assignments"
              iconColor="text-primary"
            />
            <FeatureCard
              title="Pomodoro"
              icon={<Clock size={18} />}
              description="Stay focused with pomodoro timer"
              to="/pomodoro"
              iconColor="text-accent"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingAssignments />
            <RecentNotes />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentDocuments />
            <PomodoroStatus />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
