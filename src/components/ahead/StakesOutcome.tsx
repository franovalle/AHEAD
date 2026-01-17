import { motion } from "framer-motion";
import { TrendingUp, Shield, CheckCircle2 } from "lucide-react";

export const StakesOutcome = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="ahead-card bg-gradient-to-br from-risk-low/10 via-card to-card border-risk-low/30 mt-4"
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-risk-low" />
          <span className="font-semibold text-foreground">Series A Pitch</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-risk-low/10 mb-4">
          <span className="text-2xl font-bold text-risk-low">$5M</span>
          <span className="text-xs text-muted-foreground">at stake</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-2 rounded-lg bg-muted/50 text-center">
            <p className="text-lg font-bold text-primary">89%</p>
            <p className="text-[10px] text-muted-foreground">Protection confidence</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50 text-center">
            <p className="text-lg font-bold text-foreground">2</p>
            <p className="text-[10px] text-muted-foreground">Interventions</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50 text-center">
            <p className="text-lg font-bold text-muted-foreground">4</p>
            <p className="text-[10px] text-muted-foreground">Silences</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-risk-low/10">
          <CheckCircle2 className="w-5 h-5 text-risk-low" />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">You were healthy.</p>
            <p className="text-xs text-risk-low font-medium">You closed the round.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
