import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Monitor, User } from "lucide-react";

export const ViewToggle = () => {
  const location = useLocation();
  const isDemo = location.pathname === "/demo";
  const isApp = location.pathname === "/app";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-1 p-1 bg-muted/50 rounded-full mb-6"
    >
      <Link
        to="/demo"
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          isDemo
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        Demo Mode
      </Link>
      <Link
        to="/app"
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          isApp
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <User className="w-3.5 h-3.5" />
        User View
      </Link>
    </motion.div>
  );
};
