import { motion } from "framer-motion";
import { Plane, Users, Briefcase, Calendar } from "lucide-react";

interface UpcomingEventCardProps {
  title: string;
  date: string;
  time: string;
  type: "travel" | "meeting" | "work" | "event";
  riskLevel: "low" | "medium" | "high";
  riskContribution: string;
}

const typeConfig = {
  travel: { icon: Plane, label: "Travel" },
  meeting: { icon: Users, label: "Meeting" },
  work: { icon: Briefcase, label: "Work" },
  event: { icon: Calendar, label: "Event" },
};

const riskColors = {
  low: "bg-risk-low",
  medium: "bg-risk-medium",
  high: "bg-risk-high",
};

export const UpcomingEventCard = ({
  title,
  date,
  time,
  type,
  riskLevel,
  riskContribution,
}: UpcomingEventCardProps) => {
  const Icon = typeConfig[type].icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/30 hover:border-border hover:shadow-sm transition-all"
    >
      {/* Risk indicator */}
      <div className="relative">
        <div className="p-2.5 rounded-lg bg-muted">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <span
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${riskColors[riskLevel]} ring-2 ring-background`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{title}</h4>
        <p className="text-sm text-muted-foreground">
          {date} · {time}
        </p>
      </div>

      {/* Risk contribution */}
      <div className="text-right">
        <span className="text-xs text-muted-foreground">{riskContribution}</span>
      </div>
    </motion.div>
  );
};
