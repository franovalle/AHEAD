import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, Shield, ChevronRight, ShoppingBag, 
  Syringe, Check, Undo2, Hand, Sparkles, Loader2
} from "lucide-react";
import { useState } from "react";
import { ViewToggle } from "@/components/ahead/ViewToggle";
import { supabase } from "@/integrations/supabase/client";

const initialActivityLog = [
  {
    id: 1,
    type: "order" as const,
    title: "Immunity supplements",
    time: "Saturday, 9:15 AM",
    status: "Delivered",
    reason: "Stress weakens your immune system. AHEAD ordered supplements 72 hours before your pitch to keep your defenses strong against colds.",
  },
  {
    id: 2,
    type: "nudge" as const,
    title: "Hand washing reminder",
    time: "Monday, 7:45 PM",
    status: "Sent",
    reason: "At the networking dinner, AHEAD noticed appetizers were being served. Sent a gentle reminder: 'Bathroom is on your right - quick wash before the food?'",
  },
  {
    id: 3,
    type: "booking" as const,
    title: "IV therapy session",
    time: "Tuesday, 3:45 PM",
    status: "Confirmed",
    reason: "Hydration plus vitamins prevent the fatigue that makes you vulnerable to colds. Scheduled 36 hours before your pitch.",
  },
  {
    id: 4,
    type: "booking" as const,
    title: "Immunity IV drip",
    time: "Saturday, 10:00 AM",
    status: "Booked",
    reason: "After high-stress events, your immune system dips for 24-48 hours. This prevents the post-pitch crash that often leads to colds.",
  },
];

const typeConfig = {
  order: { icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
  booking: { icon: Syringe, color: "text-accent", bg: "bg-accent/10" },
  nudge: { icon: Hand, color: "text-blue-500", bg: "bg-blue-500/10" },
};

const UserView = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [activityLog, setActivityLog] = useState(initialActivityLog);
  const [undoneItems, setUndoneItems] = useState<typeof initialActivityLog>([]);
  const [aiReasonings, setAiReasonings] = useState<Record<number, string>>({});
  const [loadingReasoning, setLoadingReasoning] = useState<number | null>(null);

  const handleUndo = (activityId: number) => {
    const item = activityLog.find(a => a.id === activityId);
    if (item) {
      setUndoneItems(prev => [...prev, item]);
      setActivityLog(prev => prev.filter(a => a.id !== activityId));
      setSelectedActivity(null);
    }
  };

  const generateAIReasoning = async (activity: typeof initialActivityLog[0]) => {
    if (aiReasonings[activity.id]) return; // Already generated
    
    setLoadingReasoning(activity.id);
    try {
      const { data, error } = await supabase.functions.invoke('generate-reasoning', {
        body: {
          actionType: activity.type,
          actionTitle: activity.title,
          userContext: "James, preparing for a high-stakes pitch on Thursday during flu season",
        },
      });

      if (error) throw error;
      
      setAiReasonings(prev => ({
        ...prev,
        [activity.id]: data.reasoning,
      }));
    } catch (error) {
      console.error('Failed to generate AI reasoning:', error);
    } finally {
      setLoadingReasoning(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

      <div className="relative max-w-lg mx-auto px-5 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <h1 className="text-xl font-bold">
            <span className="ahead-gradient-text">AHEAD</span>
          </h1>
          <Settings className="w-5 h-5 text-muted-foreground" />
        </motion.div>

        {/* View Toggle */}
        <ViewToggle />

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-foreground">Good evening, James</h2>
        </motion.div>

        {/* Status Card - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="ahead-card bg-gradient-to-br from-risk-low/10 via-card to-card mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-risk-low/20">
              <Shield className="w-6 h-6 text-risk-low" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">AHEAD handled {activityLog.length} things</h3>
              <p className="text-sm text-muted-foreground">to keep you healthy this week</p>
            </div>
            <div className="p-2 rounded-full bg-risk-low/10">
              <Check className="w-5 h-5 text-risk-low" />
            </div>
          </div>
        </motion.div>

        {/* Activity Log - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">This Week</h3>
          
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {activityLog.map((activity, index) => {
                const config = typeConfig[activity.type];
                const Icon = config.icon;
                const isSelected = selectedActivity === activity.id;
                const aiReasoning = aiReasonings[activity.id];
                const isLoadingThis = loadingReasoning === activity.id;

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10, height: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    layout
                  >
                    <button
                      onClick={() => setSelectedActivity(isSelected ? null : activity.id)}
                      className="w-full ahead-card hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.bg}`}>
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-foreground">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-risk-low">
                            <Check className="w-3 h-3" />
                            {activity.status}
                          </span>
                          <motion.div
                            animate={{ rotate: isSelected ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Expanded reasoning + Undo */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-border/50"
                          >
                            <p className="text-sm text-muted-foreground text-left mb-3">
                              {aiReasoning || activity.reason}
                            </p>
                            
                            <div 
                              className="flex justify-between items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {!aiReasoning && (
                                <button
                                  onClick={() => generateAIReasoning(activity)}
                                  disabled={isLoadingThis}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                                >
                                  {isLoadingThis ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Sparkles className="w-3 h-3" />
                                  )}
                                  {isLoadingThis ? "Generating..." : "Ask AI why"}
                                </button>
                              )}
                              {aiReasoning && (
                                <span className="flex items-center gap-1 text-xs text-primary/60">
                                  <Sparkles className="w-3 h-3" />
                                  AI generated
                                </span>
                              )}
                              <button
                                onClick={() => handleUndo(activity.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                              >
                                <Undo2 className="w-3 h-3" />
                                Undo this action
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Undone items notice */}
        <AnimatePresence>
          {undoneItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 rounded-xl bg-muted/50 border border-border/50"
            >
              <p className="text-xs text-muted-foreground text-center">
                {undoneItems.length} action{undoneItems.length > 1 ? 's' : ''} undone. AHEAD will learn from this.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Acts only when confident. Stays silent when not.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default UserView;
