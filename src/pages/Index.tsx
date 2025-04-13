
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
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
            <h1 className="text-3xl font-bold tracking-tight mb-2 animate-slide-in bg-gradient-primary bg-clip-text text-transparent">Welcome to StudyFlow</h1>
            <p className="text-muted-foreground animate-fade-in">Your all-in-one student productivity platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              title="Notes"
              icon={<BookOpen size={18} className="text-white" />}
              description="Create and organize your study notes"
              to="/notes"
              iconColor="bg-gradient-primary"
            />
            <FeatureCard
              title="Documents"
              icon={<FileText size={18} className="text-white" />}
              description="Store and access your PDFs and papers"
              to="/documents"
              iconColor="bg-gradient-accent"
            />
            <FeatureCard
              title="Assignments"
              icon={<Calendar size={18} className="text-white" />}
              description="Track your assignments and deadlines"
              to="/assignments"
              iconColor="bg-gradient-primary"
            />
            <FeatureCard
              title="Pomodoro"
              icon={<Clock size={18} className="text-white" />}
              description="Stay focused with pomodoro timer"
              to="/pomodoro"
              iconColor="bg-gradient-accent"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-shadow rounded-lg overflow-hidden border border-border/50">
              <div className="bg-gradient-primary p-4">
                <h2 className="text-xl font-bold text-white">Upcoming Assignments</h2>
              </div>
              <div className="bg-card">
                <UpcomingAssignments />
              </div>
            </div>
            
            <div className="card-shadow rounded-lg overflow-hidden border border-border/50">
              <div className="bg-gradient-accent p-4">
                <h2 className="text-xl font-bold text-white">Recent Notes</h2>
              </div>
              <div className="bg-card">
                <RecentNotes />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-shadow rounded-lg overflow-hidden border border-border/50">
              <div className="bg-gradient-accent p-4">
                <h2 className="text-xl font-bold text-white">Recent Documents</h2>
              </div>
              <div className="bg-card">
                <RecentDocuments />
              </div>
            </div>
            
            <div className="card-shadow rounded-lg overflow-hidden border border-border/50">
              <div className="bg-gradient-primary p-4">
                <h2 className="text-xl font-bold text-white">Pomodoro Status</h2>
              </div>
              <div className="bg-card">
                <PomodoroStatus />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
