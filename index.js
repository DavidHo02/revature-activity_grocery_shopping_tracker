// Import the readline module for handling user input in the console
const { resolve } = require('path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

class Item {
    name = '';
    quantity = 0;
    price = 0.00;
    bought;

    constructor(name, quantity, price, bought = false) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.bought = bought;
    }
}

const grocery_list = [];

rl.setPrompt(`\nPlease select from the below options what you want to do: 
    (1) View your grocery list
    (2) Checkmark grocery items
    (3) Add an item to the grocery list
    (4) Delete an item from the grocery list
    (q) Exit the program\n`
);

rl.question('Please enter your name: ', (name) => {
	console.log(`Please select from the below options what you want to do: 
        (1) View your grocery list
        (2) Checkmark grocery items
        (3) Add an item to the grocery list
        (4) Delete an item from the grocery list
        (q) Exit the program`
    );
});

rl.on('line', (action) => {
    switch (action) {
        case '1':
            if(grocery_list.length < 1) {
                console.log('Your grocery list is empty.');
            }
            else {
                console.log(grocery_list);
            }
            rl.prompt();
            break;
        case '2':
            if(grocery_list.length < 1) {
                console.log('Your grocery list is empty! Nothing to checkmark.');
            }
            else {
                checkmarkItem();
            }
            break;
        case '3':
            //console.log('adding');
            addItem(); 
            break;
        case '4':
            //console.log('deleting');
            deleteItem();
            break;
        case 'q':
            rl.close();
            break;
        default:
            console.log('Sorry, I didn\'t understand that.');
            rl.prompt();
    }
});

rl.once('close', () => {
     // end of input
     console.log("Goodbye");
 });

function checkmarkItem() {
    rl.question('Please enter the item you would like to mark as purchased: ', (item_to_mark) => {
        let index = grocery_list.findIndex((item) => item.name == item_to_mark);
        if(index === -1) { // could not find item in grocery_list

            console.log(`Did not find an item of name ${item_to_mark}`);
        }
        else {
            grocery_list.at(index).bought = true;
            console.log(`${item_to_mark} marked as purchased.`);
        }
    });
}

function addItem() {
    rl.question('Please enter the item, quantity, price: ', (line) => {
        // example input: apple pie, 2, 1.00

        input = line.split(', '); // separate user input into individual fields

        const item = new Item(input[0], Number(input[1]), Number(input[2]));

        grocery_list.push(item);
        //console.log(grocery_list);

        console.log(`${input[0]} was added to the grocery list.`);

        rl.prompt();
    });
}

function deleteItem() {
    rl.question('Please enter the name of the item you would like to remove: ', (item_to_remove) => {
        // example input: apple pie
        //console.log(item_to_remove);
        let index = grocery_list.findIndex((item) => item.name == item_to_remove);
        if(index === -1) { // could not find item in grocery_list

            console.log(`Did not find an item of name ${item_to_remove}`);
        }
        else { // did find the item in grocery_list, now remove it
            grocery_list.splice(index, 1)
            console.log(`${item_to_remove} was removed from the grocery list`);
        }

        rl.prompt();
    });
}