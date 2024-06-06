#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 5000;
let myPin = 1234;
// Print welcome message
console.log("\n \tWelcome to code with Noor - ATM Machine\n");
// Prompt user for pin
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter your pin code:"
    }
]);
// Check if pin is correct
if (pinAnswer.pin === myPin) {
    console.log("\n pin is correct, login successfully!\n");
    // Prompt user for operation choice
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        // Prompt user to select withdrawal method
        let WithdrawAns = await inquirer.prompt([
            {
                name: "Withdrawmethod",
                type: "list",
                message: "Select a Withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (WithdrawAns.Withdrawmethod === "Fast Cash") {
            // Prompt user to select amount for Fast Cash withdrawal
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            // Check if user has sufficient balance
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} Withdraw successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (WithdrawAns.Withdrawmethod === "Enter Amount") {
            // Prompt user to enter custom withdrawal amount
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to Withdraw:",
                }
            ]);
            // Check if user has sufficient balance
            if (amountAns.amount > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw successfully`);
                console.log(`Your remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else {
    console.log("Pin is incorrect, Try Again!");
}
