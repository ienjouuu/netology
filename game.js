#! /usr/bin/env node
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let count = 1;
let genNum = Math.round(Math.random() * 100);

const game = () => {
    if (count <= 10) {
        readline.question('Загадано число в диапазоне от 0 до 100 ( у вас не более 10ти попыток ): ', user_number => {
            user_number = parseInt(user_number)
            console.log(`================= Попытка #${count} =================`);

            if (user_number === genNum) {
                console.log(`Отгадано число "${genNum}"!`);
                readline.close();
            } else if (user_number > genNum) {
                console.log(`Число "${user_number}" больше!\n`);
                ++count;
                game();
            } else if (user_number < genNum) {
                console.log(`Число "${user_number}" меньше!\n`);
                ++count;
                game();
            }
        })
    } else {
        console.log('Вы исчерпали лимит попыток =(');
        readline.close();
    }
};

game();