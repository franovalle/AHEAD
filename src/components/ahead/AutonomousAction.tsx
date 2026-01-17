import { motion } from "framer-motion";
import { ShoppingBag, Calendar, Bell, Clock, Undo2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DecisionReasoning } from "./DecisionReasoning";
import { CompactConfidence } from "./CompactConfidence";

interface Signal {
  label: string;
  value: string;
}

interface AutonomousActionProps {
  type: "order" | "booking" | "reminder" | "event";
  title: string;
  subtitle: string;
  timestamp: string;
  status: "confirmed" | "completed" | "upcoming" | "pending";
  undoHours?: number;
  onUndo?: () => void;
  // New props for reasoning
  showReasoning?: boolean;
  signals?: Signal[];
  confidence?: number;
  threshold?: number;
  whyNow?: string;
}

const typeConfig = {
  order: {
    icon: ShoppingBag,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  booking: {
    icon: Calendar,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  reminder: {
    icon: Bell,
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
  },
  event: {
    icon: Calendar,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  },
};

const statusConfig = {
  confirmed: { label: "Confirmed", color: "text-primary", bg: "bg-primary/10" },
  completed: { label: "Done", color: "text-risk-low", bg: "bg-risk-low/10" },
  upcoming: { label: "Upcoming", color: "text-muted-foreground", bg: "bg-muted" },
  pending: { label: "Pending", color: "text-risk-medium", bg: "bg-risk-medium/10" },
};

export const AutonomousAction = ({
  type,
  title,
  subtitle,
  timestamp,
  status,
  undoHours,
  onUndo,
  showReasoning = false,
  signals = [],
  confidence = 0,
  threshold = 80,
  whyNow = "",
}: AutonomousActionProps) => {
  const typeStyles = typeConfig[type];
  const statusStyles = statusConfig[status];
  const Icon = typeStyles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ahead-card"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`p-2.5 rounded-xl ${typeStyles.iconBg}`}>
          <Icon className={`w-5 h-5 ${typeStyles.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-foreground">{title}</h4>
              <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
            </div>
            <span className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-semibold ${statusStyles.bg} ${statusStyles.color}`}>
              {statusStyles.label}
            </span>
          </div>

          {/* Timestamp & Undo */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {status === "completed" ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-risk-low" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
              <span>{timestamp}</span>
            </div>

            {undoHours && status !== "completed" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onUndo}
                className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1"
              >
                <Undo2 className="w-3 h-3" />
                Undo ({undoHours}h)
              </Button>
            )}
          </div>

          {/* Compact Confidence Bar - Always visible */}
          {showReasoning && signals.length > 0 && (
            <CompactConfidence confidence={confidence} threshold={threshold} />
          )}

          {/* Full Decision Reasoning - Expandable */}
          {showReasoning && signals.length > 0 && (
            <DecisionReasoning
              signals={signals}
              confidence={confidence}
              threshold={threshold}
              whyNow={whyNow}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};
