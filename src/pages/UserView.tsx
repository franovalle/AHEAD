import { motion } from "framer-motion";
import { 
  Settings, Shield, ChevronRight, ShoppingBag, 
  Syringe, BellOff, Eye, ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const activityLog = [
  {
    id: 1,
    type: "order" as const,
    title: "Immunity supplements ordered",
    time: "Saturday, 9:15 AM",
    status: "Delivered",
    confidence: 87,
    threshold: 80,
  },
  {
    id: 2,
    type: "silence" as const,
    title: "3 considerations, no action",
    time: "Sunday - Tuesday",
    status: "Below threshold",
    confidence: 55,
    threshold: 80,
  },
  {
    id: 3,
    type: "booking" as const,
    title: "IV therapy booked",
    time: "Tuesday, 3:45 PM",
    status: "Completed",
    confidence: 91,
    threshold: 85,
  },
];

const typeConfig = {
  order: { icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
  booking: { icon: Syringe, color: "text-accent", bg: "bg-accent/10" },
  silence: { icon: BellOff, color: "text-muted-foreground", bg: "bg-muted" },
};

const UserView = () => {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

      <div className="relative max-w-lg mx-auto px-5 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Link 
            to="/demo" 
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to demo
          </Link>
          <Settings className="w-5 h-5 text-muted-foreground" />
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">Good evening, James</h1>
          <p className="text-sm text-muted-foreground mt-1">Thursday · Pitch day complete</p>
        </motion.div>

        {/* Status Card */}
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
              <h2 className="font-semibold text-foreground">Protection Complete</h2>
              <p className="text-sm text-muted-foreground">2 interventions · 4 silences</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-risk-low">89%</p>
              <p className="text-[10px] text-muted-foreground">confidence</p>
            </div>
          </div>
        </motion.div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">This Week's Activity</h3>
          
          <div className="space-y-2">
            {activityLog.map((activity, index) => {
              const config = typeConfig[activity.type];
              const Icon = config.icon;
              const isSelected = selectedActivity === activity.id;

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
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
                        <span className="text-xs text-muted-foreground">{activity.status}</span>
                        <motion.div
                          animate={{ rotate: isSelected ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded reasoning */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-border/50"
                      >
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Decision reasoning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden relative">
                            <div
                              className={`h-full rounded-full ${
                                activity.confidence >= activity.threshold
                                  ? "bg-primary"
                                  : "bg-muted-foreground/30"
                              }`}
                              style={{ width: `${activity.confidence}%` }}
                            />
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-foreground/30"
                              style={{ left: `${activity.threshold}%` }}
                            />
                          </div>
                          <span className="text-xs">
                            <span className="font-semibold text-foreground">{activity.confidence}%</span>
                            <span className="text-muted-foreground"> / {activity.threshold}%</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {activity.confidence >= activity.threshold
                            ? "Confidence exceeded threshold → Action taken"
                            : "Confidence below threshold → Stayed silent"}
                        </p>
                      </motion.div>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

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
