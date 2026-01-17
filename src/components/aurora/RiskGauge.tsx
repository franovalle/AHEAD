import { motion } from "framer-motion";

interface RiskGaugeProps {
  level: "low" | "medium" | "high" | "critical";
  score: number;
  label?: string;
}

const riskConfig = {
  low: {
    color: "risk-low",
    gradient: "from-risk-low/20 to-risk-low/5",
    text: "Low Risk",
    description: "You're in great shape",
  },
  medium: {
    color: "risk-medium",
    gradient: "from-risk-medium/20 to-risk-medium/5",
    text: "Moderate Risk",
    description: "Minor attention needed",
  },
  high: {
    color: "risk-high",
    gradient: "from-risk-high/20 to-risk-high/5",
    text: "Elevated Risk",
    description: "Consider preventive action",
  },
  critical: {
    color: "risk-critical",
    gradient: "from-risk-critical/20 to-risk-critical/5",
    text: "High Risk",
    description: "Action recommended",
  },
};

export const RiskGauge = ({ level, score, label }: RiskGaugeProps) => {
  const config = riskConfig[level];
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference * 0.75;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col items-center"
    >
      <div className="relative w-40 h-40">
        {/* Background arc */}
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            className="text-muted/50"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className={`text-${config.color}`}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-4xl font-bold text-${config.color}`}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground font-medium mt-1">
            {label || "RISK SCORE"}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center mt-4"
      >
        <div className="flex items-center justify-center gap-2">
          <span className={`w-2 h-2 rounded-full bg-${config.color} animate-pulse-soft`} />
          <span className={`font-semibold text-${config.color}`}>{config.text}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
      </motion.div>
    </motion.div>
  );
};
