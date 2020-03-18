// loading the 'fs' module
const fs = require('fs');

fs.writeFileSync('MyFiile.txt', 'This file is written synchronously');
for (let i = 0; i < 10; i++) {
    console.log(`Doing other worl    ${i}`);
}
console.log('file is written Synchronously');

fs.writeFile('MyFileAsync.txt', 'Thw file is written Asynchronously',
    (error) => {
        if (error) {
            console.log(`Some Error Occured ${error.message}`);
            return;
        }
        console.log('File is written Successfully...');
    });
for (let i = 0; i < 10; i++) {
    console.log(`Doing other worl    ${i}`);
}
console.log('Done');