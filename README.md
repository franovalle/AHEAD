# AHEAD

**Autonomous Health & Event-Aware Decision-making**

An AI system that acts only when confident — and stays silent when not.

## Overview

AHEAD is a proactive AI assistant designed for high-stakes health protection. It analyzes your calendar, detects risk patterns, and takes preventive action when confidence thresholds are met. When uncertain, it stays silent.

## Key Concepts

- **Confidence Thresholds**: AHEAD only acts when its confidence exceeds user-defined thresholds (default: 80%)
- **Silence Logging**: When AHEAD considers but doesn't take action, it logs these moments for transparency
- **Domain-Specific Trust**: Different action types (orders, bookings, health interventions) can have different confidence requirements
- **Learning from Feedback**: User feedback adjusts future decision-making

## Demo Scenario

The demo follows James Kelly, a founder with a critical Series A pitch on Thursday. AHEAD:

1. **Sunday**: Scans the week, detects 7 calendar events including 3 high-risk exposure events
2. **Monday**: Orders immunity supplements (87% confidence, threshold 80%)
3. **Tuesday**: Books mobile IV therapy (91% confidence, threshold 85%)
4. **Wednesday**: Monitors — protection protocol active
5. **Thursday**: Pitch delivered successfully with full protection
6. **Friday-Sunday**: System idle, awaiting next high-risk pattern

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** components
- **Vite** for development and building

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/ahead/    # AHEAD-specific components
│   ├── AutonomousAction.tsx
│   ├── IVBookingCard.tsx
│   ├── SilenceLog.tsx
│   ├── DemoControls.tsx
│   └── ...
├── pages/
│   ├── Demo.tsx        # Main demo walkthrough
│   ├── UserView.tsx    # User's activity log view
│   └── Dashboard.tsx   # Dashboard view
└── ...
```

## License

MIT
