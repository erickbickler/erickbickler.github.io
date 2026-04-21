# Chinese Flashcard App — Implementation Plan
 
## Context
 
Adding a `/flashcards` route to the existing Angular portfolio site at `erickbickler.github.io`. The feature is a spaced-repetition flashcard app for learning Mandarin Chinese (Taiwanese style: traditional characters, pinyin). It covers HSK levels 1–3 and uses the SM-2 algorithm for scheduling. Progress is persisted in `localStorage`; level preferences are persisted in a cookie.
 
---
 
## Files to Create
 
### Data
- `src/app/data/hsk-data.ts` — HSK 1 (~150 words), HSK 2 (~150 words), HSK 3 (~300 words). Each entry: `{ id, character (traditional), pinyin, english, level }`.
### Model
- `src/app/models/flashcard.model.ts` — `HskCard` and `CardState` interfaces.
### Services
- `src/app/services/sm2.service.ts` — SM-2 algorithm: `createInitialState()` and `calculate(state, quality 0–5)`.
- `src/app/services/storage.service.ts` — `localStorage` for card states, cookie for level prefs.
- `src/app/services/flashcard.service.ts` — `getDueCards(enabledLevels)` and `rateCard(cardId, quality)`.
### Components
- `src/app/components/flashcard/` — Card with CSS 3D flip animation. Front: large character. Back: pinyin + English.
- `src/app/components/rating-buttons/` — Six buttons after card is flipped: Blackout (0), Wrong (1), Hard (2), Good (3), Easy (4), Perfect (5).
- `src/app/pages/flashcards-page/` — Page container. Has level selector (HSK 1/2/3 checkboxes), deck stats, and orchestrates card flow.
---
 
## Files to Modify
 
- `src/app/app-routing.module.ts` — Add `{ path: 'flashcards', component: FlashcardsPageComponent }`.
- `src/app/app.module.ts` — Declare all new components; import any new Angular Material modules needed.
- `src/app/components/navbar/navbar.component.html` — Add `flashcards` nav link.
---
 
## Card Flow
 
1. On load: read level prefs from cookie → build due deck (new cards + cards where `nextReview <= now`).
2. Show one card at a time (character on front).
3. User taps card → flips to show pinyin + English.
4. Six rating buttons appear.
5. User rates → SM-2 recalculates interval → next card loads.
6. When deck empty: show "All caught up!" message.
7. When no levels selected: show prompt to enable a level.
---
 
## SM-2 Logic
 
- Quality ≥ 3 → correct: increment repetitions, increase interval (1 → 6 → interval × EF).
- Quality < 3 → incorrect: reset repetitions and interval to 1.
- EF updated each review: `max(1.3, EF + 0.1 − (5 − q) × (0.08 + (5 − q) × 0.02))`.
- `nextReview = now + interval × 86400000ms`.
---
 
## Storage
 
| Data | Storage | Key |
|------|---------|-----|
| Card SM-2 states | `localStorage` | `hsk_card_states` (JSON) |
| Level preferences | Cookie | `hsk_levels` (e.g. `1,0,0`) |
 
---
 
## Branch
 
All changes go to: `claude/add-subdomain-hosting-hhjRh`
