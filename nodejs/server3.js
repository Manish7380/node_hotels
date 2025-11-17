const notes = require('./notes.js');
console.log('server file is available');
var age = notes.age;
var result = notes.addNumber(age+18,10);
console.log(age);
console.log('result is now '+result);