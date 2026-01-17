import { motion } from "framer-motion";
import type { DemoDay } from "@/pages/Demo";

interface DemoTimelineProps {
  currentDay: DemoDay;
  onDaySelect: (day: DemoDay) => void;
}

const days: { key: DemoDay; label: string; short: string }[] = [
  { key: "sunday", label: "Sun", short: "S" },
  { key: "monday", label: "Mon", short: "M" },
  { key: "tuesday", label: "Tue", short: "T" },
  { key: "wednesday", label: "Wed", short: "W" },
  { key: "thursday", label: "Thu", short: "T" },
  { key: "friday", label: "Fri", short: "F" },
  { key: "saturday", label: "Sat", short: "S" },
  { key: "new-sunday", label: "Sun", short: "S" },
];

export const DemoTimeline = ({ currentDay, onDaySelect }: DemoTimelineProps) => {
  const currentIndex = days.findIndex((d) => d.key === currentDay);

  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted rounded-full" />
      
      {/* Progress bar fill */}
      <motion.div
        className="absolute top-4 left-4 h-0.5 bg-primary rounded-full"
        initial={{ width: "0%" }}
        animate={{ 
          width: `${(currentIndex / (days.length - 1)) * 100}%` 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ maxWidth: "calc(100% - 32px)" }}
      />

      {/* Day dots */}
      <div className="relative flex justify-between">
        {days.map((day, index) => {
          const isActive = day.key === currentDay;
          const isPast = index < currentIndex;
          const isNewWeek = day.key === "new-sunday";

          return (
            <button
              key={day.key}
              onClick={() => onDaySelect(day.key)}
              className="flex flex-col items-center gap-1 focus:outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : isPast
                    ? "bg-primary/80 text-primary-foreground"
                    : isNewWeek
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {day.short}
              </motion.div>
              <span
                className={`text-[9px] font-medium ${
                  isActive ? "text-primary" : isNewWeek ? "text-primary/60" : "text-muted-foreground"
                }`}
              >
                {day.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};