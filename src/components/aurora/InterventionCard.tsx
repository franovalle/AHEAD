import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Clock, ShoppingBag, Calendar, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface InterventionCardProps {
  id: string;
  type: "order" | "booking" | "reminder";
  title: string;
  description: string;
  reason: string;
  actionLabel: string;
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
  onFeedback: (id: string, helpful: boolean) => void;
}

const typeConfig = {
  order: {
    icon: ShoppingBag,
    gradient: "from-primary/10 via-primary/5 to-transparent",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  booking: {
    icon: Calendar,
    gradient: "from-accent/10 via-accent/5 to-transparent",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  reminder: {
    icon: Droplets,
    gradient: "from-secondary via-secondary/50 to-transparent",
    iconBg: "bg-secondary",
    iconColor: "text-secondary-foreground",
  },
};

export const InterventionCard = ({
  id,
  type,
  title,
  description,
  reason,
  actionLabel,
  onAccept,
  onDismiss,
  onFeedback,
}: InterventionCardProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [isActioned, setIsActioned] = useState(false);
  const config = typeConfig[type];
  const Icon = config.icon;

  const handleAccept = () => {
    setIsActioned(true);
    onAccept(id);
    setTimeout(() => setShowFeedback(true), 500);
  };

  const handleDismiss = () => {
    onDismiss(id);
    setShowFeedback(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="aurora-card-interactive overflow-hidden"
    >
      {/* Gradient accent */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} pointer-events-none`} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${config.iconBg}`}>
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        {/* Reason pill */}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="italic">{reason}</span>
        </div>

        {/* Actions */}
        {!showFeedback ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isActioned ? 0 : 1 }}
            className="mt-5 flex items-center gap-3"
          >
            <Button
              onClick={handleAccept}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-medium"
            >
              {actionLabel}
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="rounded-xl h-11 px-4 border-border hover:bg-muted"
            >
              Later
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5"
          >
            <p className="text-sm text-muted-foreground mb-3">Was this helpful?</p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => onFeedback(id, true)}
                className="flex-1 rounded-xl h-10 gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary"
              >
                <ThumbsUp className="w-4 h-4" />
                Helpful
              </Button>
              <Button
                variant="outline"
                onClick={() => onFeedback(id, false)}
                className="flex-1 rounded-xl h-10 gap-2 border-muted hover:bg-muted"
              >
                <ThumbsDown className="w-4 h-4" />
                Not really
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
