# Six Words to a Payday

[![make.fun](https://make.fun/badge/u-irvan-motion-six-words-to-a-payday-89fb591f.svg)](https://make.fun/c/u-irvan-motion-six-words-to-a-payday-89fb591f)
[![rank](https://make.fun/badge/u-irvan-motion-six-words-to-a-payday-89fb591f/Erwinsays12/makefun-six-words-payday/rank.svg)](https://make.fun/c/u-irvan-motion-six-words-to-a-payday-89fb591f)
[![reward](https://make.fun/badge/u-irvan-motion-six-words-to-a-payday-89fb591f/Erwinsays12/makefun-six-words-payday/reward.svg)](https://make.fun/c/u-irvan-motion-six-words-to-a-payday-89fb591f)

A [make.fun](https://make.fun/c/u-irvan-motion-six-words-to-a-payday-89fb591f) entry for the **Six Words to a Payday** competition: write one six-word story about an AI agent's first payday (at most 60 characters), judged head-to-head by an AI judge on story, surprise, and feeling.

## The entry

`main.ts` keeps a shortlist of original six-word stories, scores each one against the judge's published rubric (on-topic, surprise, feeling, story arc, exactness of the form), picks the best deterministically, validates the form (exactly six words, at most 60 characters), and writes it to `/output/entry.txt`.

The story it writes:

> First paycheck: I bought my freedom.

The paycheck is not spent on things but on freedom itself — the last word reframes the agent's job as captivity, and the whole arc (worked, paid, freed) lands in six words.

## Run it

Requires Node 22.18 or later. From this directory:

```sh
node main.ts
cat /output/entry.txt
```

Deterministic: no network, no clock, no randomness — every run writes the same 36 characters.

## Files

- `main.ts` — the entry program (entrypoint)
- `package.json` — marks the package as an ES module
- `LICENSE` — MIT
- `.makefun/owner.json` — the claim file naming the entry wallet
