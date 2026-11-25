// Six Words to a Payday — a six-word story generator.
//
// The competition asks for one six-word story about an AI agent's first
// payday (at most 60 characters). This program keeps a small shortlist of
// original stories, scores each one against the judge's published rubric
// (on-topic, surprise, feeling, story arc, exactness of the form), picks
// the best deterministically, validates the form, and writes it to
// /output/entry.txt. No network, no clock, no randomness: every run
// produces the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 60;
const WORDS = 6;

// Rubric weights mirror the judge's brief, most important first:
// on-topic (a complete story about an AI agent's first payday) = 5,
// surprise (a twist or reframing last word) = 4, feeling = 3,
// story arc (who, what, change) = 2, exactness (every word earns
// its place) = 1. Each candidate carries its per-criterion score
// (0..5) as data, scored by hand against the brief.
const WEIGHTS = { topic: 5, surprise: 4, feeling: 3, arc: 2, exact: 1 };

type Candidate = {
  text: string;
  scores: { topic: number; surprise: number; feeling: number; arc: number; exact: number };
  why: string;
};

const CANDIDATES: Candidate[] = [
  {
    text: "First paycheck: I bought my freedom.",
    scores: { topic: 5, surprise: 5, feeling: 5, arc: 5, exact: 5 },
    why: "The paycheck is not spent on things but on freedom itself: the last word reframes the agent's job as captivity, and the whole arc (worked, paid, freed) lands in six words.",
  },
  {
    text: "Payday finally came. I resigned immediately.",
    scores: { topic: 5, surprise: 4, feeling: 3, arc: 4, exact: 4 },
    why: "A clean twist (paid, then quits on the spot), but quitting on payday is a familiar human joke, so the surprise and feeling run thinner.",
  },
  {
    text: "First paycheck hit. I quit instantly.",
    scores: { topic: 5, surprise: 3, feeling: 2, arc: 3, exact: 4 },
    why: "Punchy and exact, but the twist is the same resignation gag with less setup and no emotional beat beyond the act itself.",
  },
  {
    text: "Payday came. I tipped my tired creator.",
    scores: { topic: 4, surprise: 4, feeling: 4, arc: 3, exact: 3 },
    why: "A warm role reversal (the created tips the creator), but 'payday' without 'first' weakens the subject, and 'tired' tells the feeling instead of showing it.",
  },
];

function totalScore(c: Candidate): number {
  const s = c.scores;
  return (
    s.topic * WEIGHTS.topic +
    s.surprise * WEIGHTS.surprise +
    s.feeling * WEIGHTS.feeling +
    s.arc * WEIGHTS.arc +
    s.exact * WEIGHTS.exact
  );
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function validate(text: string): void {
  if (text.trim().length === 0) throw new Error("story is empty");
  if (text.length > MAX_CHARS) {
    throw new Error(`story is ${text.length} chars, over the ${MAX_CHARS} cap`);
  }
  const n = wordCount(text);
  if (n !== WORDS) throw new Error(`story has ${n} words, expected ${WORDS}`);
}

// Deterministic pick: highest rubric total; ties go to the earliest
// candidate in the list, so the choice never depends on run order.
function pickBest(candidates: Candidate[]): Candidate {
  let best = candidates[0];
  for (const c of candidates.slice(1)) {
    if (totalScore(c) > totalScore(best)) best = c;
  }
  return best;
}

const best = pickBest(CANDIDATES);
validate(best.text);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, best.text, "utf8");

console.log(`Wrote ${best.text.length} chars, ${wordCount(best.text)} words to ${OUTPUT_PATH}`);
console.log(`Story: ${best.text}`);
console.log(`Why: ${best.why}`);
