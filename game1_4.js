#! /usr/bin/env node
const yargs = require("yargs");
const argv = require('yargs/yargs')(process.argv.slice(2))
.argv;
const path = require("path");
const fs = require("fs");

var command = (argv._[0]);
var file = path.join(__dirname,command);

function makeLog (file,content) {
    fs.appendFile(file,content, (err) => {
        if (err) throw Error(err);
        console.log('Лог записан.');
    });
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let count = 1;
let genNum = Math.round(Math.random()+1);

const game = () => {
    if (count <= 1) {
        readline.question('Загадано число 1 или 2. Угадайте.\n', user_number => {
            user_number = parseInt(user_number);
            if (user_number === genNum) {
                var content1 = `Отгадано число "${genNum}"!\n`;
                console.log(content1);
                makeLog (file,content1);
                readline.close();
            } else {
                var content2 = `Неверно!\n`;
                console.log(content2);
                makeLog (file,content2);
                ++count;
                readline.close();
            }
        });
    }
};

game();
