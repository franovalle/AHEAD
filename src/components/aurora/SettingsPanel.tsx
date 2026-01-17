import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Bell, Calendar, MapPin, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [sensitivity, setSensitivity] = useState([50]);
  const [calendarAccess, setCalendarAccess] = useState(true);
  const [locationAccess, setLocationAccess] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  const getSensitivityLabel = (value: number) => {
    if (value < 33) return "Low - Only critical interventions";
    if (value < 66) return "Medium - Balanced recommendations";
    return "High - Proactive suggestions";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-foreground">Settings</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-xl hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Privacy Section */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Privacy & Data</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Calendar Access</p>
                        <p className="text-xs text-muted-foreground">View upcoming events</p>
                      </div>
                    </div>
                    <Switch checked={calendarAccess} onCheckedChange={setCalendarAccess} />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">Location Access</p>
                        <p className="text-xs text-muted-foreground">Detect travel patterns</p>
                      </div>
                    </div>
                    <Switch checked={locationAccess} onCheckedChange={setLocationAccess} />
                  </div>
                </div>
              </section>

              {/* Notifications Section */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Timely health nudges</p>
                    </div>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </section>

              {/* Sensitivity Section */}
              <section className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Intervention Sensitivity</h3>
                <div className="p-4 rounded-xl bg-muted/50">
                  <Slider
                    value={sensitivity}
                    onValueChange={setSensitivity}
                    max={100}
                    step={1}
                    className="mb-3"
                  />
                  <p className="text-sm text-muted-foreground">{getSensitivityLabel(sensitivity[0])}</p>
                </div>
              </section>

              {/* Data Management */}
              <section>
                <h3 className="font-semibold text-foreground mb-4">Data Management</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full rounded-xl justify-start">
                    Export My Data
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl justify-start text-destructive hover:text-destructive">
                    Delete All Data
                  </Button>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
