import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Eye, Brain, Clock, Activity } from "lucide-react";

interface Signal {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface DecisionReasoningProps {
  signals: Signal[];
  confidence: number;
  threshold?: number;
  whyNow: string;
}

export const DecisionReasoning = ({
  signals,
  confidence,
  threshold = 80,
  whyNow,
}: DecisionReasoningProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
      >
        <Eye className="w-3.5 h-3.5" />
        <span>See reasoning</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3">
              {/* Signals */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                  <Activity className="w-3 h-3" />
                  Input Signals
                </div>
                <div className="space-y-1.5">
                  {signals.map((signal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-muted-foreground">{signal.label}</span>
                      <span className="text-foreground font-medium">{signal.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidence */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                  <Brain className="w-3 h-3" />
                  Confidence
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      {/* Threshold marker */}
                      <div className="relative h-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${confidence}%` }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className={`h-full rounded-full ${
                            confidence >= threshold 
                              ? "bg-gradient-to-r from-primary to-primary/80" 
                              : "bg-risk-medium"
                          }`}
                        />
                        {/* Threshold line */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-foreground/30"
                          style={{ left: `${threshold}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-foreground min-w-[3rem] text-right">
                      {confidence}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Threshold: {threshold}%</span>
                    <span className={confidence >= threshold ? "text-primary" : "text-risk-medium"}>
                      {confidence >= threshold ? "Above threshold → Acting" : "Below threshold"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Why Now */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1.5">
                  <Clock className="w-3 h-3" />
                  Why now?
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {whyNow}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
