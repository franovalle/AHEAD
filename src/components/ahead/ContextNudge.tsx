import { motion } from "framer-motion";
import { MapPin, X, Droplets, Eye, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ContextNudgeProps {
  message: string;
  location: string;
  onDismiss: () => void;
  confidence?: number;
}

export const ContextNudge = ({ message, location, onDismiss, confidence = 88 }: ContextNudgeProps) => {
  const [showReasoning, setShowReasoning] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed top-4 left-4 right-4 max-w-lg mx-auto z-50"
    >
      <div className="bg-card/95 backdrop-blur-lg border border-border rounded-2xl p-4 shadow-elevated">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="p-2 rounded-lg bg-primary/10">
            <Droplets className="w-5 h-5 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{message}</p>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>

            {/* Reasoning toggle */}
            <button
              onClick={() => setShowReasoning(!showReasoning)}
              className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Eye className="w-3 h-3" />
              <span>Why this nudge?</span>
              <motion.div animate={{ rotate: showReasoning ? 180 : 0 }}>
                <ChevronDown className="w-3 h-3" />
              </motion.div>
            </button>

            {showReasoning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 pt-2 border-t border-border/50"
              >
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Confidence</span>
                    <span className="font-medium text-primary">{confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trigger</span>
                    <span>Location + time context</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prior nudges today</span>
                    <span>0</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
