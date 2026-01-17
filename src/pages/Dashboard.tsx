import { motion } from "framer-motion";
import { useState } from "react";
import { Package, Syringe, ShieldCheck, Sparkles, HandMetal } from "lucide-react";
import { Header } from "@/components/aurora/Header";
import { RiskGauge } from "@/components/aurora/RiskGauge";
import { InterventionCard } from "@/components/aurora/InterventionCard";
import { UpcomingEventCard } from "@/components/aurora/UpcomingEventCard";
import { QuickAction } from "@/components/aurora/QuickAction";
import { SettingsPanel } from "@/components/aurora/SettingsPanel";
import { toast } from "sonner";

const Dashboard = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [interventions, setInterventions] = useState([
    {
      id: "1",
      type: "order" as const,
      title: "Immune Support Kit",
      description: "Vitamin C, Zinc, and Elderberry supplements for your upcoming travel week.",
      reason: "Based on your 3 flights scheduled this week",
      actionLabel: "Order Kit ($29)",
    },
    {
      id: "2",
      type: "booking" as const,
      title: "Vitamin C Infusion",
      description: "Book a rejuvenating vitamin infusion at a partner clinic near you.",
      reason: "Post-conference recovery recommended",
      actionLabel: "Book Appointment",
    },
  ]);

  const upcomingEvents = [
    {
      title: "Flight to New York",
      date: "Tomorrow",
      time: "6:00 AM",
      type: "travel" as const,
      riskLevel: "high" as const,
      riskContribution: "+25 risk",
    },
    {
      title: "Client Presentation",
      date: "Wed, Jan 22",
      time: "2:00 PM",
      type: "meeting" as const,
      riskLevel: "medium" as const,
      riskContribution: "+10 risk",
    },
    {
      title: "Team Workshop",
      date: "Thu, Jan 23",
      time: "9:00 AM",
      type: "event" as const,
      riskLevel: "medium" as const,
      riskContribution: "+8 risk",
    },
    {
      title: "Return Flight",
      date: "Fri, Jan 24",
      time: "8:00 PM",
      type: "travel" as const,
      riskLevel: "high" as const,
      riskContribution: "+20 risk",
    },
  ];

  const handleAccept = (id: string) => {
    toast.success("Action confirmed!", {
      description: "We'll take care of the rest.",
    });
    setTimeout(() => {
      setInterventions((prev) => prev.filter((i) => i.id !== id));
    }, 3000);
  };

  const handleDismiss = (id: string) => {
    toast.info("Noted", {
      description: "We'll remind you later if needed.",
    });
  };

  const handleFeedback = (id: string, helpful: boolean) => {
    if (helpful) {
      toast.success("Thanks for your feedback!");
    } else {
      toast.info("We'll adjust our recommendations.");
    }
    setInterventions((prev) => prev.filter((i) => i.id !== id));
  };

  const handleQuickAction = (action: string) => {
    toast.success(`${action} initiated`, {
      description: "We're processing your request.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="relative max-w-lg mx-auto px-5 pb-8">
        <Header
          userName="Samantha"
          notificationCount={2}
          onSettingsClick={() => setSettingsOpen(true)}
          onNotificationClick={() => toast.info("Notifications coming soon!")}
        />

        {/* Risk Status Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="aurora-card mt-4"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-foreground">Your Health Status</h2>
              <p className="text-sm text-muted-foreground">Week of January 20-26</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-risk-high/10 text-risk-high text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Busy week ahead
            </div>
          </div>
          <RiskGauge level="high" score={72} />
        </motion.section>

        {/* Interventions Section */}
        {interventions.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Suggested Actions</h2>
            </div>
            <div className="space-y-4">
              {interventions.map((intervention, index) => (
                <motion.div
                  key={intervention.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <InterventionCard
                    {...intervention}
                    onAccept={handleAccept}
                    onDismiss={handleDismiss}
                    onFeedback={handleFeedback}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <QuickAction
              icon={Package}
              label="Order Kit"
              sublabel="Supplements"
              onClick={() => handleQuickAction("Order")}
              variant="primary"
            />
            <QuickAction
              icon={Syringe}
              label="Book IV"
              sublabel="Vitamin C"
              onClick={() => handleQuickAction("Booking")}
              variant="accent"
            />
            <QuickAction
              icon={HandMetal}
              label="Hygiene"
              sublabel="Reminder"
              onClick={() => handleQuickAction("Reminder")}
              variant="secondary"
            />
          </div>
        </motion.section>

        {/* Upcoming Events */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <h2 className="font-semibold text-foreground mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <UpcomingEventCard key={index} {...event} />
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Aurora monitors your schedule to help you stay healthy.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your data stays private and secure.
          </p>
        </motion.footer>
      </div>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default Dashboard;
