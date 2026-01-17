import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const StakesOutcome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="ahead-card bg-gradient-to-br from-risk-low/10 via-card to-card border-risk-low/30 mt-4"
    >
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Pitch Day</p>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-risk-low" />
          <div className="text-left">
            <p className="text-lg font-semibold text-foreground">You were healthy.</p>
            <p className="text-sm text-risk-low font-medium">You were ready.</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-3 border-t border-border/50">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">2</p>
            <p className="text-[10px] text-muted-foreground">Interventions</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-lg font-bold text-muted-foreground">4</p>
            <p className="text-[10px] text-muted-foreground">Silences</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
