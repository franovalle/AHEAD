import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, ChevronRight, ChevronLeft, Play, Pause, 
  ShoppingBag, Syringe, MapPin, Clock, CheckCircle2,
  Sparkles, Shield, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoTimeline } from "@/components/ahead/DemoTimeline";
import { AutonomousAction } from "@/components/ahead/AutonomousAction";
import { ContextNudge } from "@/components/ahead/ContextNudge";
import { DeliveryTracker } from "@/components/ahead/DeliveryTracker";
import { IVBookingCard } from "@/components/ahead/IVBookingCard";
import { DemoControls } from "@/components/ahead/DemoControls";

export type DemoDay = "friday" | "saturday" | "sunday" | "monday" | "tuesday" | "wednesday" | "thursday";

const demoData = {
  friday: {
    title: "Friday",
    subtitle: "5 days before pitch",
    headline: "AHEAD scans your week",
    description: "High-risk week detected. 3 networking events + critical Thursday pitch. Initiating protection protocol.",
  },
  saturday: {
    title: "Saturday",
    subtitle: "4 days before pitch",
    headline: "Immunity shots ordered",
    description: "Vive Organic Immunity Boost Shot Sampler Pack ordered via DoorDash from Whole Foods. Arriving Sunday 5pm.",
  },
  sunday: {
    title: "Sunday",
    subtitle: "3 days before pitch",
    headline: "Delivery arriving",
    description: "Your Vive Organic shots are on the way. Start taking one each morning beginning tomorrow.",
  },
  monday: {
    title: "Monday",
    subtitle: "2 days before pitch",
    headline: "First shot + networking",
    description: "Take your immunity shot this morning. WeWork networking event tonight - AHEAD will nudge you contextually.",
  },
  tuesday: {
    title: "Tuesday",
    subtitle: "1 day before pitch",
    headline: "IV therapy booked",
    description: "Immunity shot taken. In-home IV immune boost therapy booked for tomorrow 8:30pm - direct bloodstream support.",
  },
  wednesday: {
    title: "Wednesday",
    subtitle: "Night before pitch",
    headline: "IV therapy tonight",
    description: "Founders Club dinner at 7pm. IV therapy at home at 8:30pm. Maximum protection before your big day.",
  },
  thursday: {
    title: "Thursday",
    subtitle: "Pitch Day",
    headline: "You're protected",
    description: "7 days of layered protection complete. Supplements + IV boost + contextual hygiene. Go crush it, Alex.",
  },
};

const Demo = () => {
  const [currentDay, setCurrentDay] = useState<DemoDay>("friday");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  const days: DemoDay[] = ["friday", "saturday", "sunday", "monday", "tuesday", "wednesday", "thursday"];
  const currentIndex = days.indexOf(currentDay);
  const dayData = demoData[currentDay];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentIndex < days.length - 1) {
          setCurrentDay(days[currentIndex + 1]);
        } else {
          setIsPlaying(false);
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentIndex, days]);

  // Show contextual nudge on Monday evening
  useEffect(() => {
    if (currentDay === "monday") {
      const timer = setTimeout(() => setShowNudge(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowNudge(false);
    }
  }, [currentDay]);

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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="relative max-w-lg mx-auto px-5 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            Demo Mode
          </div>
          <h1 className="text-3xl font-bold">
            <span className="ahead-gradient-text">AHEAD</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Watch AHEAD protect Alex before his Series A pitch
          </p>
        </motion.div>

        {/* Persona Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="ahead-card mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg">
              AC
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">Alex Chen</h2>
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
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{dayData.headline}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{dayData.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Day-specific content */}
            {currentDay === "saturday" && (
              <AutonomousAction
                type="order"
                title="Vive Organic Immunity Boost Shot Sampler Pack"
                subtitle="Whole Foods via DoorDash"
                timestamp="Ordered 9:15 AM"
                status="confirmed"
                undoHours={2}
              />
            )}

            {currentDay === "sunday" && (
              <DeliveryTracker
                status="arriving"
                itemName="Vive Organic Immunity Shots"
                eta="5:00 PM today"
                driverName="Marcus"
              />
            )}

            {currentDay === "monday" && (
              <>
                <AutonomousAction
                  type="reminder"
                  title="Take your immunity shot"
                  subtitle="First of 4 in the pack"
                  timestamp="7:00 AM"
                  status="completed"
                />
                <div className="mt-4">
                  <AutonomousAction
                    type="event"
                    title="WeWork Networking Event"
                    subtitle="6:30 PM · Downtown"
                    timestamp="AHEAD will nudge you"
                    status="upcoming"
                  />
                </div>
              </>
            )}

            {currentDay === "tuesday" && (
              <>
                <AutonomousAction
                  type="reminder"
                  title="Take your immunity shot"
                  subtitle="2 of 4 taken"
                  timestamp="7:00 AM"
                  status="completed"
                />
                <div className="mt-4">
                  <IVBookingCard
                    provider="Restore Hyper Wellness"
                    treatment="Immune Boost IV Drip"
                    scheduledTime="Tomorrow, 8:30 PM"
                    duration="45 min"
                    status="confirmed"
                  />
                </div>
              </>
            )}

            {currentDay === "wednesday" && (
              <>
                <AutonomousAction
                  type="reminder"
                  title="Take your immunity shot"
                  subtitle="3 of 4 taken"
                  timestamp="7:00 AM"
                  status="completed"
                />
                <div className="mt-4 space-y-4">
                  <AutonomousAction
                    type="event"
                    title="Founders Club Dinner"
                    subtitle="7:00 PM · The Battery"
                    timestamp="Contextual nudges active"
                    status="upcoming"
                  />
                  <IVBookingCard
                    provider="Restore Hyper Wellness"
                    treatment="Immune Boost IV Drip"
                    scheduledTime="Tonight, 8:30 PM"
                    duration="45 min"
                    status="today"
                  />
                </div>
              </>
            )}

            {currentDay === "thursday" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ahead-card bg-gradient-to-br from-risk-low/10 via-card to-card"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-risk-low/20 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-risk-low" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">7-Day Protection Complete</h4>
                  <p className="text-sm text-muted-foreground mb-6">AHEAD handled everything autonomously</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">4</p>
                      <p className="text-xs text-muted-foreground">Immunity Shots</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent">1</p>
                      <p className="text-xs text-muted-foreground">IV Therapy</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">6</p>
                      <p className="text-xs text-muted-foreground">Nudges</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contextual Nudge Overlay */}
        <AnimatePresence>
          {showNudge && (
            <ContextNudge
              message="Restroom on the right. Quick handwash before appetizers?"
              location="WeWork Downtown"
              onDismiss={() => setShowNudge(false)}
            />
          )}
        </AnimatePresence>

        {/* Demo Controls */}
        <DemoControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onPrev={goPrev}
          onNext={goNext}
          canGoPrev={currentIndex > 0}
          canGoNext={currentIndex < days.length - 1}
        />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            AHEAD acts before you get sick.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Demo;