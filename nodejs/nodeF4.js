const guestList = ["Alice", "Bob", "charlie"];
const prompt = require("prompt-sync")();
const nameToCheck = prompt("Enter your name:");
const isGuest = guestList.includes(nameToCheck);
if(isGuest){
    console.log(`Welcome, ${nameToCheck}!`);
}
else{
    console.log("Sorry you are not on the guest list.");
}