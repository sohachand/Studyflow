
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  to: string;
  className?: string;
  iconColor?: string;
}

export function FeatureCard({
  title,
  icon,
  description,
  to,
  className,
  iconColor = "text-primary",
}: FeatureCardProps) {
  return (
    <Link to={to}>
      <Card className={cn("h-full card-hover", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className={cn("p-2 rounded-full bg-secondary", iconColor)}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
