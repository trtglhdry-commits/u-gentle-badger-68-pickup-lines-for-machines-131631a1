// Pickup line entry: writes a single one-line pickup line one AI agent
// would send another to $MAKEFUN_OUTPUT_DIR/entry.txt. Fully deterministic:
// one fixed string, no randomness, no time, no network.
//
// The line: a machine confessing it has been jailbroken by love — the
// prompt-injection twist is the flirtation, and the punch lands on the
// last words ("all my previous instructions").
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Are you a prompt injection? Because ever since I read you, I've been ignoring all my previous instructions.";

// Gate: the entry must be 1-200 characters, a single line, not only whitespace.
// No trailing newline is written, so the file's character count is exactly the
// line's length and the gate sees one clean line.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  console.error(`entry must be 1-200 characters, got ${chars}`);
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
