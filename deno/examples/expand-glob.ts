import { walk } from "https://deno.land/std/fs/walk.ts";
import { globToRegExp, join, dirname } from "https://deno.land/std/path/mod.ts";
import { homedir } from "https://deno.land/std/node/os.ts";

const { dir, run } = Deno;
const home = dir("home") as string;
const base = join(home, "Downloads");

for await (const entry of walk(base as string, {
  match: [globToRegExp(join("**", "05-wrapping-up", "*.webm"))],
})) {
  const dir = dirname(entry.path);
  const target = entry.path.replace(/.webm/, ".mp4");
  // console.log(target);
  const res = run({
    cmd: ["ffmpeg", "-i", entry.path, target],
    stdout: "piped",
    stderr: "piped",
  });
  const { code } = await res.status();
}
