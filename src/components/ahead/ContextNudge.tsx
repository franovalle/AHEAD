import { motion } from "framer-motion";
import { MapPin, X, Droplets } from "lucide-react";

interface ContextNudgeProps {
  message: string;
  location: string;
  onDismiss: () => void;
}

export const ContextNudge = ({ message, location, onDismiss }: ContextNudgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-24 left-4 right-4 max-w-lg mx-auto z-50"
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