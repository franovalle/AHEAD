import { motion } from "framer-motion";
import { Bot, Sparkles, Bell, BellOff, MessageSquare, Volume2 } from "lucide-react";

export const AIComparison = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ahead-card"
    >
      <h4 className="text-sm font-semibold text-foreground mb-4 text-center">
        This Week: Typical AI vs AHEAD
      </h4>

      <div className="grid grid-cols-2 gap-4">
        {/* Typical AI Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 pb-2 border-b border-border/50">
            <Bot className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Typical AI</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Bell className="w-3.5 h-3.5 text-risk-medium" />
              <span className="text-muted-foreground">12 notifications</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MessageSquare className="w-3.5 h-3.5 text-risk-medium" />
              <span className="text-muted-foreground">Daily reminders</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Volume2 className="w-3.5 h-3.5 text-risk-medium" />
              <span className="text-muted-foreground">"Drink water!" at 3pm</span>
            </div>
          </div>
        </div>

        {/* AHEAD Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 pb-2 border-b border-primary/30">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">AHEAD</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3.5 h-3.5 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[8px] font-bold text-primary">2</span>
              </div>
              <span className="text-foreground font-medium">interventions</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <BellOff className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-foreground font-medium">4 silences</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3.5 h-3.5 rounded-full bg-risk-low/20 flex items-center justify-center">
                <span className="text-[8px] font-bold text-risk-low">✓</span>
              </div>
              <span className="text-foreground font-medium">Context-aware</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 text-center">
        <p className="text-[10px] text-muted-foreground italic">
          Less noise. More trust. Better outcomes.
        </p>
      </div>
    </motion.div>
  );
};
