const fs = require('fs');

let data = fs.readFileSync('MyFile.txt');
console.log(data.toString());

fs.readFile('MyFileAsync.txt', (error, data) => {
    if (error) {
        console.log(`Error Occured ${error.message}`);
        return;
    }
    console.log(data.toString());
});