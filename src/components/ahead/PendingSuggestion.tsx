import { motion } from "framer-motion";
import { Sparkles, Check, X, Ban } from "lucide-react";
import { useState } from "react";

interface PendingSuggestionProps {
  title: string;
  description: string;
}

export const PendingSuggestion = ({ title, description }: PendingSuggestionProps) => {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined" | "never">("pending");

  if (status !== "pending") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="ahead-card bg-muted/30 border-dashed"
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          {status === "accepted" && (
            <>
              <Check className="w-4 h-4 text-risk-low" />
              <span className="text-sm">Booking confirmed</span>
            </>
          )}
          {status === "declined" && (
            <>
              <X className="w-4 h-4" />
              <span className="text-sm">Suggestion dismissed</span>
            </>
          )}
          {status === "never" && (
            <>
              <Ban className="w-4 h-4" />
              <span className="text-sm">Won't suggest this again</span>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ahead-card border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">Suggestion</p>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStatus("accepted")}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Check className="w-3.5 h-3.5" />
          Accept
        </button>
        <button
          onClick={() => setStatus("declined")}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          Not now
        </button>
        <button
          onClick={() => setStatus("never")}
          className="px-3 py-2 rounded-lg text-muted-foreground text-sm hover:bg-muted transition-colors"
        >
          Never
        </button>
      </div>
    </motion.div>
  );
};
