import { motion } from "framer-motion";
import { Settings, Shield } from "lucide-react";

interface TrustSettingsProps {
  threshold?: number;
}

export const TrustSettings = ({ threshold = 80 }: TrustSettingsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ahead-card border-primary/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <Settings className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Your Trust Settings</span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">Intervention threshold</span>
            <span className="font-semibold text-primary">{threshold}%</span>
          </div>
          
          {/* Slider visualization */}
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${threshold}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
            />
            {/* Slider handle */}
            <motion.div
              initial={{ left: 0 }}
              animate={{ left: `${threshold}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-md"
            />
          </div>
          
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
            <span>More actions</span>
            <span>High confidence only</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5">
          <Shield className="w-4 h-4 text-primary" />
          <p className="text-xs text-foreground">
            AHEAD will only act when it's <span className="font-semibold text-primary">{threshold}%+ confident</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
