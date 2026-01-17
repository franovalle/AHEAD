import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Shield, Zap, CheckCircle2, Scan
} from "lucide-react";
import { DemoTimeline } from "@/components/ahead/DemoTimeline";
import { AutonomousAction } from "@/components/ahead/AutonomousAction";
import { IVBookingCard } from "@/components/ahead/IVBookingCard";
import { DemoControls } from "@/components/ahead/DemoControls";
import { SilenceLog } from "@/components/ahead/SilenceLog";
import { LearningFeedback } from "@/components/ahead/LearningFeedback";
import { DomainCard } from "@/components/ahead/DomainCard";
import { TrustSettings } from "@/components/ahead/TrustSettings";
import { AIComparison } from "@/components/ahead/AIComparison";
import { StakesOutcome } from "@/components/ahead/StakesOutcome";
import { ViewToggle } from "@/components/ahead/ViewToggle";

export type DemoDay = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday";

const demoData = {
  sunday: {
    title: "Sunday",
    subtitle: "4 days before pitch",
    headline: "AHEAD scans your week",
    description: "Analyzing calendar patterns. High-risk week detected: 3 networking events + critical Thursday pitch.",
  },
  monday: {
    title: "Monday",
    subtitle: "3 days before pitch",
    headline: "Preventive action taken",
    description: "Confidence threshold exceeded. Ordering immunity supplements to arrive before exposure events.",
  },
  tuesday: {
    title: "Tuesday",
    subtitle: "2 days before pitch",
    headline: "Escalating protection",
    description: "Based on event proximity and stakes, confidence for IV therapy reached 91%. Booking confirmed.",
  },
  wednesday: {
    title: "Wednesday",
    subtitle: "1 day before pitch",
    headline: "Monitoring continues",
    description: "Founders Club dinner tonight. AHEAD is monitoring but not intervening — protection protocol active.",
  },
  thursday: {
    title: "Thursday",
    subtitle: "Pitch Day",
    headline: "Protection complete",
    description: "2 high-impact interventions. 4 moments AHEAD stayed silent. System calibration unchanged.",
  },
};

// Silence log data - what AHEAD considered but didn't act on
const silenceMoments = {
  sunday: [
    {
      time: "Sunday 2:00 PM",
      consideration: "Considered suggesting hydration reminder",
      confidence: 52,
      threshold: 80,
    },
  ],
  monday: [
    {
      time: "Monday 11:00 AM",
      consideration: "Considered early sleep suggestion",
      confidence: 58,
      threshold: 80,
    },
  ],
  tuesday: [
    {
      time: "Tuesday 9:00 AM",
      consideration: "Considered diet modification suggestion",
      confidence: 45,
      threshold: 80,
    },
  ],
  wednesday: [
    {
      time: "Wednesday 3:00 PM",
      consideration: "Detected elevated stress signals",
      confidence: 64,
      threshold: 80,
    },
    {
      time: "Wednesday 7:00 PM",
      consideration: "Considered handwash reminder at dinner",
      confidence: 72,
      threshold: 80,
    },
  ],
};

const Demo = () => {
  const [currentDay, setCurrentDay] = useState<DemoDay>("sunday");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLearning, setShowLearning] = useState(false);

  const days: DemoDay[] = ["sunday", "monday", "tuesday", "wednesday", "thursday"];
  const currentIndex = days.indexOf(currentDay);
  const dayData = demoData[currentDay];

  // Keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight" && currentIndex < days.length - 1) {
      setCurrentDay(days[currentIndex + 1]);
    } else if (e.key === "ArrowLeft" && currentIndex > 0) {
      setCurrentDay(days[currentIndex - 1]);
    } else if (e.key === " ") {
      e.preventDefault();
      setIsPlaying((prev) => !prev);
    }
  }, [currentIndex, days]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto-advance with longer timing (8 seconds)
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentIndex < days.length - 1) {
          setCurrentDay(days[currentIndex + 1]);
        } else {
          setIsPlaying(false);
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentIndex, days]);

  const goNext = () => {
    if (currentIndex < days.length - 1) {
      setCurrentDay(days[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentDay(days[currentIndex - 1]);
    }
  };

  const handleUndo = () => {
    setShowLearning(true);
  };

  // Get silence moments for current day
  const currentSilenceMoments = silenceMoments[currentDay as keyof typeof silenceMoments] || [];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient - more subtle */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />

      <div className="relative max-w-lg mx-auto px-5 py-6 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            Demo Mode
          </div>
          <h1 className="text-3xl font-bold">
            <span className="ahead-gradient-text">AHEAD</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Acts only when confident. Stays silent when not.
          </p>
        </motion.div>

        {/* View Toggle */}
        <ViewToggle />

        {/* Persona Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="ahead-card mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg">
              JK
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">James Kelly</h2>
              <p className="text-sm text-muted-foreground">Founder · Series A pitch Thursday</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <p className="font-semibold text-risk-high">Elevated</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <DemoTimeline currentDay={currentDay} onDaySelect={setCurrentDay} />

        {/* Current Day Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            {/* Day Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{dayData.title}</h3>
                <p className="text-sm text-muted-foreground">{dayData.subtitle}</p>
              </div>
              {currentDay === "thursday" && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-risk-low/10 text-risk-low text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  Protected
                </div>
              )}
            </div>

            {/* AHEAD's Insight */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="ahead-card mb-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {currentDay === "sunday" ? (
                    <Scan className="w-5 h-5 text-primary" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{dayData.headline}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{dayData.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Day-specific content */}
            
            {/* Sunday - Domain explanation + Trust Settings + Scanning visualization */}
            {currentDay === "sunday" && (
              <>
                <DomainCard />
                <TrustSettings threshold={80} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="ahead-card mt-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Calendar events detected</span>
                      <span className="font-semibold text-foreground">7</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">High-risk exposure events</span>
                      <span className="font-semibold text-risk-high">3</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Critical deadline</span>
                      <span className="font-semibold text-foreground">Thursday pitch</span>
                    </div>
                    <div className="pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Intervention confidence</span>
                        <span className="font-semibold text-primary">87%</span>
                      </div>
                      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "87%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Threshold: 80% · <span className="text-primary">Will act</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
                <SilenceLog moments={currentSilenceMoments} />
              </>
            )}

            {/* Monday - Supplement order with full reasoning */}
            {currentDay === "monday" && (
              <>
                <AutonomousAction
                  type="order"
                  title="Vive Organic Immunity Boost Shots"
                  subtitle="Whole Foods via DoorDash"
                  timestamp="Ordered 9:15 AM"
                  status="confirmed"
                  undoHours={2}
                  onUndo={handleUndo}
                  showReasoning={true}
                  signals={[
                    { label: "High-risk events", value: "3 in next 4 days" },
                    { label: "Lead time needed", value: "72 hours for efficacy" },
                    { label: "Critical deadline", value: "Thursday pitch" },
                    { label: "Past pattern", value: "Sick after 2 of last 4 events" },
                  ]}
                  confidence={87}
                  threshold={80}
                  whyNow="Ordering now ensures 72-hour window for supplements to take effect before Wednesday networking event. Waiting longer reduces protection efficacy."
                />
                <SilenceLog moments={currentSilenceMoments} />
              </>
            )}

            {/* Tuesday - IV booking with reasoning */}
            {currentDay === "tuesday" && (
              <>
                <IVBookingCard
                  provider="Restore Hyper Wellness"
                  treatment="Immune Boost IV Drip"
                  scheduledTime="Tomorrow, 8:30 PM"
                  duration="45 min"
                  status="confirmed"
                  showReasoning={true}
                  signals={[
                    { label: "Supplements alone", value: "65% protection estimate" },
                    { label: "With IV therapy", value: "89% protection estimate" },
                    { label: "Pitch importance", value: "Series A — critical" },
                    { label: "Time to event", value: "36 hours" },
                  ]}
                  confidence={91}
                  threshold={85}
                  whyNow="Tomorrow is the last opportunity for IV therapy to take full effect before Thursday pitch. Higher threshold (85%) due to cost and invasiveness."
                />
                <SilenceLog moments={currentSilenceMoments} />
              </>
            )}

            {/* Wednesday - Monitoring + expanded silence log */}
            {currentDay === "wednesday" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="ahead-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Founders Club Dinner</h4>
                      <p className="text-sm text-muted-foreground">7:00 PM · The Battery</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Protection active — monitoring only
                      </p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="ahead-card mt-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-risk-low/10">
                      <CheckCircle2 className="w-5 h-5 text-risk-low" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">IV therapy completed</h4>
                      <p className="text-sm text-muted-foreground">Immune boost active</p>
                    </div>
                  </div>
                </motion.div>
                <SilenceLog moments={currentSilenceMoments} defaultExpanded={true} />
              </>
            )}

            {/* Thursday - Summary with AI comparison and stakes */}
            {currentDay === "thursday" && (
              <>
                <AIComparison />
                <StakesOutcome />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Learning Feedback */}
        <LearningFeedback
          isVisible={showLearning}
          actionType="Supplement orders"
          oldThreshold={80}
          newThreshold={92}
          onComplete={() => setShowLearning(false)}
        />

        {/* Demo Controls */}
        <DemoControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onPrev={goPrev}
          onNext={goNext}
          canGoPrev={currentIndex > 0}
          canGoNext={currentIndex < days.length - 1}
          currentIndex={currentIndex}
          totalDays={days.length}
        />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            AHEAD: When confident, it acts. When uncertain, it stays silent.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Demo;
