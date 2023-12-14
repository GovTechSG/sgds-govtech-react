const { spawn } = require("child_process");

console.log("\x1b[36m%s\x1b[0m", "Opening React, Next.js apps");

// Function to run a shell command and return the child process
function runCommand(command, name) {
  const childProcess = spawn(command, { shell: true });

  childProcess.stdout.on("data", data => {
    console.log("\x1b[32m%s\x1b[0m", `Stdout from ${name} app: ${data}`);
  });

  childProcess.stderr.on("data", data => {
    console.error("\x1b[31m%s\x1b[0m", `Stderr from ${name} app: ${data}`);
  });

  childProcess.on("error", error => {
    console.error("\x1b[31m%s\x1b[0m", `Error from ${name} app: ${error.message}`);
  });

  return childProcess;
}

// Run the commands and store the child processes
const reactProcess = runCommand(`sh ${__dirname}/run_cra.sh`, "React");
const nextProcess = runCommand(`sh ${__dirname}/run_next.sh`, "Next.js");

// Terminate all child processes when the main process exits
process.on("exit", () => {
  reactProcess.kill();
  nextProcess.kill();
});
