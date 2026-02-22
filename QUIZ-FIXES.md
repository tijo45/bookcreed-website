# Quiz Site Launch QA — Fix List

**Date:** Feb 21, 2026  
**Audited by:** Main (Orchestrator)  
**Method:** Peekaboo screenshots + vision analysis of every page

---

## Critical (Must Fix Before Launch)

### 1. Cookie banner overlaps quiz navigation buttons
- The cookie consent bar at the bottom blocks "Previous"/"Next" buttons and dot navigation on the quiz player
- **Fix:** Add `pb-16` or similar bottom padding to quiz pages, OR make cookie banner dismissible and remember the choice (localStorage)

### 2. "How It Works" step numbers clipped/hidden
- On the `/quiz` page, the step number badges (1, 2, 3, 4) use `absolute -top-2` positioning which can get clipped by parent `overflow: hidden`
- The "How It Works" heading may also be getting scrolled past or cut
- **Fix:** Ensure the section has proper top padding so the absolutely-positioned step number badges aren't clipped. Add `overflow-visible` to the parent if needed.

### 3. No "Enter Access Code" CTA on quiz landing page
- Locked quiz cards just show "Locked · 100 questions" with no indication of how to unlock
- The access code entry only appears AFTER clicking a card AND being logged in
- New users don't know what to do
- **Fix:** Add a brief inline hint on locked cards: "🔑 Enter access code to unlock" as a subtle text line. The card already links to the unlock flow — just make it clearer.

### 4. Quiz landing page needs series context in hero
- Hero says "The Book Creed Quiz Challenge" but never names the series
- A visitor doesn't know WHAT they're quizzing on
- **Fix:** Add "How well do you know **The Kingdom of Valdrath**?" as a subtitle, or add the series name somewhere in the hero section

### 5. Low contrast secondary text
- Multiple places have gray text on dark background that's hard to read
- "This is a skill-based contest..." line, step descriptions, card subtitle text
- **Fix:** Bump `text-stone-500` to `text-stone-400` for body copy that needs to be readable. Keep `text-stone-500` only for truly optional metadata.

---

## Important (Should Fix Before Launch)

### 6. Testimonials section uses fake-sounding attributions
- "— Reader", "— Quiz Taker", "— Competitor" feel obviously fabricated
- **Fix:** Either use real first names + last initial ("— Sarah K.") or remove the testimonials section entirely until we have real reviews. Fake social proof hurts credibility.

### 7. Amazon ASIN link is wrong in demo results
- Demo results CTA links to `https://www.amazon.com/dp/B0DSNQ25RN` — verify this is the correct ASIN for Book 1 (should be B0GKXNCCXD based on MEMORY.md)
- **Fix:** Update to correct Amazon link

### 8. Cookie banner needs "Decline" option
- Only shows "Accept" button — GDPR best practice requires a decline/manage option
- **Fix:** Add a "Decline" or "Essential Only" button. Or if we genuinely only use essential cookies (auth), update the text to say "Essential cookies only — no tracking" with just an "OK" dismiss.

### 9. Countdown timer not visually prominent
- Contest "27d 3h 38m remaining" is styled as throwaway metadata
- **Fix:** Either make it slightly more prominent (larger font, different color) or add a small clock icon

### 10. Demo quiz "See Results" button disabled until all answered
- If user clicks "Next" without answering on last question, they're stuck
- The button says "See Results" but is grayed out
- **Fix:** This is actually correct behavior — just make sure the disabled state has a tooltip: "Answer all questions to see results"

---

## Nice to Have (Post-Launch Polish)

### 11. Add lore explanations to quiz answers
- After answering, show a brief lore snippet: "The seven Valdrath brothers are central to the War of Succession..."
- This is the #1 engagement differentiator from generic quiz platforms

### 12. Social sharing on results screen
- After completing demo, add "Share your score" with a generated card
- "I scored 3/5 on The Exile's Return quiz! Can you beat me?"

### 13. Homepage hero could use a subtle background
- Currently plain dark — a subtle texture or gradient would add depth

### 14. Mobile responsive verification needed
- Nav with 7+ items needs hamburger menu on mobile
- Quiz cards, contest banner need to stack properly

---

## Pages Verified ✅
- `/` (homepage) — Clean, professional, no major issues
- `/quiz` (quiz hub) — Issues #2, #3, #4, #5, #6 above
- `/quiz/demo` (demo intro) — Clean, 8/10
- `/quiz/demo` (playing state) — Cookie overlap (#1), otherwise solid
- `/quiz/demo` (results) — Good CTA, check Amazon link (#7)
- `/series` — 200 OK
- `/leaderboard` — 200 OK
- `/contest/rules` — 200 OK
- `/account/login` — 200 OK
- `/account/register` — 200 OK
