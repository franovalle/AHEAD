import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export const DemoControls = ({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: DemoControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto"
    >
      <div className="bg-card/80 backdrop-blur-lg border border-border rounded-2xl p-3 shadow-elevated">
        <div className="flex items-center justify-center gap-2">
          {/* Previous */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            disabled={!canGoPrev}
            className="rounded-xl h-10 w-10 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Play/Pause */}
          <Button
            onClick={onPlayPause}
            className="rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play Demo
              </>
            )}
          </Button>

          {/* Next */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={!canGoNext}
            className="rounded-xl h-10 w-10 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};