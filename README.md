# AHEAD - **Anticipatory Health Early-intervention Advisory Delegate**


Grand Prize Winner — Aurora Consumer AI Hackathon, January 2026

An AI delegate that anticipates health risks and intervenes early — acting only when confident, staying silent when not.

---

## The Problem

Did you know most common cold and flu viruses incubate for about three days before you even start to feel sick? By the time you notice a sore throat or body aches, you were actually infected days earlier—often with no warning at all.

What if that crucial day—the one where you pitch your biggest idea, meet investors, or have a once-in-a-lifetime opportunity—lands right as those symptoms hit? Suddenly, you're not at your best, simply because illness caught you off guard.

## The Solution

AHEAD fixes this by looking forward, not backward. Integrated with your calendar, it scans your schedule every week and creates a personalized, proactive game plan.

When it spots risky moments—crowded events, travel, or just a packed week—it seamlessly orders vitamins, schedules in-home immune-boosting IV therapy, and prompts you with timely hygiene tips.

No more waking up voiceless or run down on the big day—because you, and your health, were one step AHEAD.

---

## Key Concepts

- **Confidence Thresholds**: AHEAD only acts when its confidence exceeds user-defined thresholds (default: 80%)
- **Silence Logging**: When AHEAD considers but doesn't take action, it logs these moments for transparency
- **Domain-Specific Trust**: Different action types can have different confidence requirements
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

- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- shadcn/ui components
- Vite for development

## Getting Started

```bash
npm install
npm run dev
```

## License

MIT
