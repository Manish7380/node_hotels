//convert json string to json object.
const jsonString = `{"name": "john", "age":30, "city": "New york"}`;
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name);
console.log(jsonObject);


//convert json object to json string.
const objectToConvert = {
    name: "Alice",
    age: 25
};
const json = JSON.stringify(objectToConvert);
console.log(json);
console.log(typeof json);