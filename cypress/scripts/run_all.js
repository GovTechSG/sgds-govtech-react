const { exec } = require("child_process");

console.log("\x1b[36m%s\x1b[0m", "Opening React, Next.js apps");

exec(`sh ${__dirname}/run_cra.sh`, (error, stdout, stderr) => {
    if (error) {
        console.error("\x1b[31m%s\x1b[0m", "Error from React app");
        console.error(error.message);
        return;
    }
    console.log(stdout);
})
exec(`sh ${__dirname}/run_next.sh`, (error, stdout, stderr) => {
    if (error) {
        console.error("\x1b[31m%s\x1b[0m", "Error from Next.js app");
        console.error(error.message);
        return;
    }
    console.log(stdout);
})
