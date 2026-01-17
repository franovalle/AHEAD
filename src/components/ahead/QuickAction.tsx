import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "accent";
}

const variantStyles = {
  primary: {
    container: "bg-primary/10 hover:bg-primary/20 border-primary/20",
    icon: "text-primary",
  },
  secondary: {
    container: "bg-secondary hover:bg-secondary/80 border-secondary",
    icon: "text-secondary-foreground",
  },
  accent: {
    container: "bg-accent/10 hover:bg-accent/20 border-accent/20",
    icon: "text-accent",
  },
};

export const QuickAction = ({
  icon: Icon,
  label,
  sublabel,
  onClick,
  variant = "primary",
}: QuickActionProps) => {
  const styles = variantStyles[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-xl border text-left transition-colors ${styles.container}`}
    >
      <Icon className={`w-6 h-6 ${styles.icon} mb-3`} />
      <p className="font-medium text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
    </motion.button>
  );
};