import { motion } from "framer-motion";
import { EyeOff, ChevronDown } from "lucide-react";
import { useState } from "react";

interface SilenceMoment {
  time: string;
  consideration: string;
  confidence: number;
  threshold: number;
}

interface SilenceLogProps {
  moments: SilenceMoment[];
}

export const SilenceLog = ({ moments }: SilenceLogProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (moments.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
      >
        <EyeOff className="w-3.5 h-3.5" />
        <span>{moments.length} moment{moments.length > 1 ? 's' : ''} AHEAD stayed silent</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 space-y-2"
        >
          {moments.map((moment, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-muted/50 border border-border/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">{moment.time}</p>
                  <p className="text-sm text-foreground mt-0.5">{moment.consideration}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-muted-foreground/30 rounded-full"
                    style={{ width: `${moment.confidence}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {moment.confidence}% / {moment.threshold}%
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 italic">
                Stayed silent — confidence below threshold
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
