/**
 * deno run --allow-all glob.ts
 */
import { walk, walkSync } from "https://deno.land/std/fs/walk.ts";
import { globToRegExp } from "https://deno.land/std/path/mod.ts";

for await (const entry of walk(".")) {
  console.log(entry);
}

const res = walkSync(".", { match: [globToRegExp("**/*.ts")] });

for (const entry of res) {
  console.log(entry);
}
