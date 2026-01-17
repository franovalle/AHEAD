import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, Shield, ChevronRight, ShoppingBag, 
  Syringe, Check, ThumbsUp, ThumbsDown
} from "lucide-react";
import { useState } from "react";
import { ViewToggle } from "@/components/ahead/ViewToggle";

const initialActivityLog = [
  {
    id: 1,
    type: "order" as const,
    title: "Immunity supplements",
    time: "Tuesday, 12:30 PM",
    status: "Delivered",
    reason: "Ordered Monday morning based on your stress levels. Arrived Tuesday, giving you 48 hours of immune support before your Thursday pitch.",
  },
  {
    id: 2,
    type: "booking" as const,
    title: "Mobile IV Therapy",
    subtitle: "Immune Boost · In-home service",
    time: "Wednesday, 7:00 PM",
    status: "Completed",
    reason: "AHEAD booked a mobile IV therapist to come to your home Wednesday evening. High-dose vitamin C and zinc infusion for peak immunity on pitch day. No travel, no waiting room.",
  },
];

const typeConfig = {
  order: { icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
  booking: { icon: Syringe, color: "text-accent", bg: "bg-accent/10" },
};

const UserView = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [activityLog] = useState(initialActivityLog);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<number, 'positive' | 'negative'>>({});

  const handleFeedback = (activityId: number, type: 'positive' | 'negative') => {
    setFeedbackGiven(prev => ({ ...prev, [activityId]: type }));
  };

  const hasFeedback = Object.keys(feedbackGiven).length > 0;

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
              <h3 className="font-semibold text-foreground">AHEAD handled 2 things</h3>
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
                const feedback = feedbackGiven[activity.id];

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
                          {'subtitle' in activity && activity.subtitle && (
                            <p className="text-xs text-muted-foreground/80">{activity.subtitle}</p>
                          )}
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

                      {/* Expanded reasoning + Feedback */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-border/50"
                          >
                            <p className="text-sm text-muted-foreground text-left mb-3">
                              {activity.reason}
                            </p>
                            
                            <div 
                              className="flex justify-end items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {feedback ? (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex items-center gap-1.5 text-xs text-risk-low"
                                >
                                  <Check className="w-3 h-3" />
                                  AHEAD will remember this
                                </motion.div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground mr-1">Was this helpful?</span>
                                  <button
                                    onClick={() => handleFeedback(activity.id, 'positive')}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-risk-low/10 hover:text-risk-low transition-colors"
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => handleFeedback(activity.id, 'negative')}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                    No
                                  </button>
                                </div>
                              )}
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

        {/* Feedback notice */}
        <AnimatePresence>
          {hasFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 rounded-xl bg-risk-low/10 border border-risk-low/20"
            >
              <p className="text-xs text-risk-low text-center font-medium">
                ✓ AHEAD is learning from your feedback
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
