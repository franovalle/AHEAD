import { motion } from "framer-motion";
import { Shield, Calendar, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Smart Calendar Analysis",
      description: "Detects busy weeks, travel, and high-stress periods automatically",
    },
    {
      icon: Sparkles,
      title: "Timely Interventions",
      description: "Rare but meaningful nudges when you need them most",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays on your device, always under your control",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/15 via-transparent to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-lg mx-auto px-5 py-12">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          {/* Logo/Brand */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30 mb-6"
          >
            <Shield className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold text-foreground mb-3"
          >
            <span className="aurora-gradient-text">Aurora</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-2"
          >
            Your Personal Health Guardian
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground max-w-sm mx-auto"
          >
            Stay ahead of illness with intelligent, calm interventions tailored to your busy lifestyle.
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="aurora-card-interactive flex items-start gap-4 p-5"
            >
              <div className="p-2.5 rounded-xl bg-primary/10">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="aurora-card mb-10"
        >
          <h3 className="font-semibold text-foreground mb-4">How it works</h3>
          <div className="space-y-3">
            {[
              "Connect your calendar (optional location)",
              "Aurora analyzes your upcoming schedule",
              "Get timely nudges before risk spikes",
              "Order supplements or book appointments with one tap",
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base gap-2 aurora-glow"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-primary" />
            No account required · Data stays on device
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Built for the Aurora Hackathon
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
