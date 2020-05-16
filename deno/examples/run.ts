/**
 * deno run --allow-run run.ts 01.webm 01.mp4
 */
const { run, args, stdout } = Deno;

const x = run({
  cmd: ["echo", "hello world"],
});

const cmd = ["ffmpeg", "-i", args[0], args[1]];

console.log(cmd);
const p = run({
  cmd,
  stdout: "piped",
  stderr: "piped",
});

const { code } = await p.status();

if (code === 0) {
  const rawOutput = await p.output();
  await stdout.write(rawOutput);
} else {
  const rawError = await p.stderrOutput();
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
