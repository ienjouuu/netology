#! /usr/bin/env node

const yargs = require("yargs");

const argv = require('yargs/yargs')(process.argv.slice(2))
    .alias('y', 'year')
    .alias('m', 'month')
    .alias('d', 'date')
    .argv;


var command = (argv._[0]);

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();


if (command === 'current') {
    if ( argv.year === true) {
        console.log(year);
    } else if ( argv.month === true) {
        console.log(month);
    } else if ( argv.date === true) {
        console.log(day);
    } else console.log(date.toISOString());    
} else if (command === 'add') {
    if ( argv.year >= 0) {
        date.setFullYear(date.getFullYear() + argv.year);
        console.log(date.toISOString());
    } else if ( argv.month >= 0) {
        date.setMonth(date.getMonth() + argv.month);
        console.log(date.toISOString());
    } else if ( argv.date >= 0) {
        date.setDate(date.getDate() + argv.date);
        console.log(date.toISOString());
    }
} else if (command === 'sub') {
    if ( argv.year >= 0) {
        date.setFullYear(date.getFullYear() - argv.year);
        console.log(date.toISOString());
    } else if ( argv.month >= 0) {
        date.setMonth(date.getMonth() - argv.month);
        console.log(date.toISOString());
    } else if ( argv.date >= 0) {
        date.setDate(date.getDate() - argv.date);
        console.log(date.toISOString());
    }
}
