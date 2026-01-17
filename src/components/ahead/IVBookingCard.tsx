import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Syringe, Clock, MapPin, Calendar, Eye, ChevronDown, Brain, Activity } from "lucide-react";
import { CompactConfidence } from "./CompactConfidence";

interface Signal {
  label: string;
  value: string;
}

interface IVBookingCardProps {
  provider: string;
  treatment: string;
  scheduledTime: string;
  duration: string;
  status: "confirmed" | "today" | "completed";
  showReasoning?: boolean;
  signals?: Signal[];
  confidence?: number;
  threshold?: number;
  whyNow?: string;
}

const statusConfig = {
  confirmed: { label: "Confirmed", color: "text-primary", bg: "bg-primary/10" },
  today: { label: "Today", color: "text-accent", bg: "bg-accent/10" },
  completed: { label: "Complete", color: "text-risk-low", bg: "bg-risk-low/10" },
};

export const IVBookingCard = ({
  provider,
  treatment,
  scheduledTime,
  duration,
  status,
  showReasoning = false,
  signals = [],
  confidence = 0,
  threshold = 80,
  whyNow = "",
}: IVBookingCardProps) => {
  const statusStyles = statusConfig[status];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ahead-card border-accent/30 bg-gradient-to-br from-accent/5 via-card to-card"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="p-2.5 rounded-xl bg-accent/10">
          <Syringe className="w-5 h-5 text-accent" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-foreground">{treatment}</h4>
              <p className="text-sm text-muted-foreground mt-0.5">{provider}</p>
            </div>
            <span className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-semibold ${statusStyles.bg} ${statusStyles.color}`}>
              {statusStyles.label}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{scheduledTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          </div>

          {/* In-home badge */}
          <div className="flex items-center gap-1.5 mt-3 text-xs text-accent font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>In-home service</span>
          </div>

          {/* Compact Confidence Bar - Always visible */}
          {showReasoning && signals.length > 0 && (
            <CompactConfidence confidence={confidence} threshold={threshold} />
          )}

          {/* Full Decision Reasoning - Expandable */}
          {showReasoning && signals.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>See reasoning</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-3">
                      {/* Signals */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                          <Activity className="w-3 h-3" />
                          Input Signals
                        </div>
                        <div className="space-y-1.5">
                          {signals.map((signal, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="text-muted-foreground">{signal.label}</span>
                              <span className="text-foreground font-medium">{signal.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Confidence */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-2">
                          <Brain className="w-3 h-3" />
                          Confidence
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="relative h-full">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${confidence}%` }}
                                  transition={{ duration: 0.5, delay: 0.1 }}
                                  className={`h-full rounded-full ${
                                    confidence >= threshold 
                                      ? "bg-gradient-to-r from-accent to-accent/80" 
                                      : "bg-risk-medium"
                                  }`}
                                />
                                <div 
                                  className="absolute top-0 bottom-0 w-0.5 bg-foreground/30"
                                  style={{ left: `${threshold}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-foreground min-w-[3rem] text-right">
                              {confidence}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                            <span>Threshold: {threshold}%</span>
                            <span className={confidence >= threshold ? "text-accent" : "text-risk-medium"}>
                              {confidence >= threshold ? "Above threshold → Acting" : "Below threshold"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Why Now */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1.5">
                          <Clock className="w-3 h-3" />
                          Why now?
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {whyNow}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
