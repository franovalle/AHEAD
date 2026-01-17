import { motion } from "framer-motion";
import { Package, Truck, MapPin, User, Clock } from "lucide-react";

interface DeliveryTrackerProps {
  status: "preparing" | "picked_up" | "arriving" | "delivered";
  itemName: string;
  eta: string;
  driverName?: string;
}

const statusConfig = {
  preparing: { label: "Preparing", progress: 25 },
  picked_up: { label: "Picked Up", progress: 50 },
  arriving: { label: "On the Way", progress: 75 },
  delivered: { label: "Delivered", progress: 100 },
};

export const DeliveryTracker = ({
  status,
  itemName,
  eta,
  driverName,
}: DeliveryTrackerProps) => {
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="ahead-card"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-accent/10">
          <Truck className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">DoorDash Delivery</h4>
            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-semibold">
              {config.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{itemName}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${config.progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Progress steps */}
      <div className="flex justify-between mb-4">
        {["preparing", "picked_up", "arriving", "delivered"].map((step, index) => {
          const isComplete = statusConfig[step as keyof typeof statusConfig].progress <= config.progress;
          const icons = [Package, Truck, MapPin, Package];
          const Icon = icons[index];
          
          return (
            <div key={step} className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isComplete ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ETA and Driver */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">ETA:</span>
          <span className="font-medium text-foreground">{eta}</span>
        </div>
        {driverName && (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{driverName}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};