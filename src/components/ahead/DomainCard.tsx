import { motion } from "framer-motion";
import { Target, AlertTriangle, Clock } from "lucide-react";

export const DomainCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ahead-card border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Domain: Pre-Event Illness Prevention</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2 text-xs">
          <AlertTriangle className="w-3.5 h-3.5 text-risk-medium mt-0.5 shrink-0" />
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">High stakes:</span> Getting sick before critical events isn't an option
          </p>
        </div>
        <div className="flex items-start gap-2 text-xs">
          <Clock className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">Time-sensitive:</span> Prevention requires advance coordination across services
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/50">
        <p className="text-[10px] text-muted-foreground italic text-center">
          Narrow focus. Deep understanding. Trustworthy actions.
        </p>
      </div>
    </motion.div>
  );
};
