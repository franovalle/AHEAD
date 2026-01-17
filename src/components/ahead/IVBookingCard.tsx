import { motion } from "framer-motion";
import { Syringe, Clock, MapPin, CheckCircle2, Calendar } from "lucide-react";

interface IVBookingCardProps {
  provider: string;
  treatment: string;
  scheduledTime: string;
  duration: string;
  status: "confirmed" | "today" | "completed";
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
}: IVBookingCardProps) => {
  const statusStyles = statusConfig[status];

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
            <span>In-home service · No travel needed</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};