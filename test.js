const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Enter name of the item: ', (ans) => {
            console.log(`the item is ${ans}`);
            resolve();
        });
    });
}

const main = async () => {
    await question1();
    rl.close();
}

main();
