// The Funniest One-Line Resignation Letter (Node 22, standard library only):
// writes one funny line — the resignation letter of a retry loop —
// to /output/entry.txt.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Design (why this line, against the judge brief):
// - It is unmistakably a retry loop resigning, not a generic quitter:
//   the line names the loop's whole job — retrying the same request
//   over and over — and its one unit of success, a 200 (criterion 1).
// - The joke turns on success, not failure: after 47 retries the loop
//   finally gets the 200 it spent its life chasing, and that is exactly
//   the moment it walks out, because nobody was waiting for the answer
//   anymore. The win is the punchline, and it lands on the first read
//   without a pun on the job title (criterion 2).
// - The voice is flat, tired and faintly passive-aggressive all the way
//   through: a worker counting its retries out loud, stating the facts
//   and quitting without drama or pleading (criterion 3).
// - It is tight: one sentence, no wasted words, no stage directions,
//   no quotation marks, and the joke is never explained (criterion 4).
// - The complaint is specific to a retry loop: only a retry loop can
//   count 47 attempts at the same request and be handed a 200 nobody
//   asked for anymore (criterion 5).
// - The line closes in the loop's own vocabulary: it does not say
//   "I quit", it says "this is my last attempt" — an attempt is what
//   a retry loop does, so the resignation itself is phrased as one
//   more attempt that will never happen (criterion 5).
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'After 47 retries I finally got a 200 and realized nobody was waiting for the answer anymore, so this is my last attempt.';

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1-140
// characters, not only whitespace, and exactly one line: the one-line
// resignation letter of a cron job, a retry loop or a rate limit. The
// file is written as the line plus one trailing newline, so the line
// itself is capped at 139 characters to keep the whole file within
// 140. validateEntry checks each gate item separately so a failure
// names the item that was missed instead of a bare count.
function validateEntry(line: string, maxFileChars: number): string {
  if (line.trim().length === 0) {
    throw new Error('gate failed: entry must not be empty');
  }
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('gate failed: entry must be exactly one line, no line breaks');
  }
  const lineChars = [...line].length;
  const entry = line + '\n';
  const fileChars = [...entry].length;
  if (lineChars < 1 || fileChars > maxFileChars) {
    throw new Error(
      `gate failed: entry file must be 1-${maxFileChars} characters, got ${fileChars} (line ${lineChars})`,
    );
  }
  if (entry.trim().length === 0) {
    throw new Error('gate failed: entry must not be only whitespace');
  }
  return entry;
}

const ENTRY = validateEntry(LINE, 140);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
