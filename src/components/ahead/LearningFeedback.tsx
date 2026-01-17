import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, Check } from "lucide-react";

interface LearningFeedbackProps {
  isVisible: boolean;
  actionType: string;
  oldThreshold: number;
  newThreshold: number;
  onComplete?: () => void;
}

export const LearningFeedback = ({
  isVisible,
  actionType,
  oldThreshold,
  newThreshold,
  onComplete,
}: LearningFeedbackProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed inset-x-4 bottom-32 max-w-lg mx-auto z-50"
          onAnimationComplete={() => {
            if (isVisible) {
              setTimeout(() => {
                onComplete?.();
              }, 3000);
            }
          }}
        >
          <div className="bg-card border border-border rounded-2xl p-4 shadow-elevated">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground text-sm">Learning from feedback</h4>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Check className="w-4 h-4 text-primary" />
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Noted. Adjusting confidence model.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {actionType} threshold:
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-foreground/50 line-through">
                      {oldThreshold}%
                    </span>
                    <TrendingUp className="w-3 h-3 text-primary" />
                    <span className="text-xs font-semibold text-primary">
                      {newThreshold}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
