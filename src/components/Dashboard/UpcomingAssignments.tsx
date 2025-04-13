
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Assignment = {
  id: string;
  title: string;
  dueDate: Date;
  completed: boolean;
  subject: string;
};

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Mathematics Problem Set",
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    completed: false,
    subject: "Mathematics",
  },
  {
    id: "2",
    title: "History Essay",
    dueDate: new Date(Date.now() + 172800000), // Day after tomorrow
    completed: false,
    subject: "History",
  },
  {
    id: "3",
    title: "Physics Lab Report",
    dueDate: new Date(Date.now() + 43200000), // 12 hours from now
    completed: false,
    subject: "Physics",
  },
  {
    id: "4",
    title: "Literature Review",
    dueDate: new Date(Date.now() - 86400000), // Yesterday
    completed: true,
    subject: "Literature",
  },
];

export function UpcomingAssignments() {
  const sortedAssignments = [...mockAssignments]
    .filter((a) => !a.completed)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 3);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedAssignments.length > 0 ? (
          sortedAssignments.map((assignment) => {
            const isToday = new Date().toDateString() === assignment.dueDate.toDateString();
            const isPast = assignment.dueDate < new Date();
            const daysUntilDue = Math.ceil(
              (assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{assignment.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {assignment.subject}
                  </span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                    isPast
                      ? "bg-destructive/10 text-destructive"
                      : isToday
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {isPast ? (
                    <AlertCircle size={14} />
                  ) : isToday ? (
                    <Clock size={14} />
                  ) : (
                    <CheckCircle size={14} />
                  )}
                  <span>
                    {isPast
                      ? "Overdue"
                      : isToday
                      ? "Due Today"
                      : `Due in ${daysUntilDue} days`}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No upcoming assignments
          </div>
        )}
      </CardContent>
    </Card>
  );
}
