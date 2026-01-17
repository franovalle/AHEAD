import { motion } from "framer-motion";
import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
  notificationCount?: number;
  onSettingsClick: () => void;
  onNotificationClick: () => void;
}

export const Header = ({
  userName,
  notificationCount = 0,
  onSettingsClick,
  onNotificationClick,
}: HeaderProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-6"
    >
      <div>
        <p className="text-sm text-muted-foreground font-medium">{getGreeting()}</p>
        <h1 className="text-2xl font-bold text-foreground mt-0.5">{userName}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationClick}
          className="relative rounded-xl hover:bg-muted"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="rounded-xl hover:bg-muted"
        >
          <Settings className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </motion.header>
  );
};
