/**
 * deno run --allow-all glob.ts
 */
import { walk } from "https://deno.land/std/fs/walk.ts";

for await (const entry of walk(".")) {
  console.log(entry.path);
}
