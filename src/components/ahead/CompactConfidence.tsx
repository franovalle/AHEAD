import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface CompactConfidenceProps {
  confidence: number;
  threshold: number;
}

export const CompactConfidence = ({ confidence, threshold }: CompactConfidenceProps) => {
  const isAboveThreshold = confidence >= threshold;

  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      <div className="flex items-center gap-2">
        <Brain className="w-3.5 h-3.5 text-muted-foreground" />
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${
              isAboveThreshold
                ? "bg-gradient-to-r from-primary to-primary/80"
                : "bg-risk-medium"
            }`}
          />
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-foreground/40"
            style={{ left: `${threshold}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          <span className="font-semibold text-foreground">{confidence}%</span>
          <span className="mx-1">|</span>
          <span>{threshold}% threshold</span>
        </span>
      </div>
    </div>
  );
};
