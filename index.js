#! /usr/bin/env node

const yargs = require("yargs");
const argv = require('yargs/yargs')(process.argv.slice(2))
.argv;

const config = require('./config.js');

const http = require('http');
const myAPIKey = config.APIKey;
let city = argv._[0];

const url = 'http://api.weatherstack.com/forecast?access_key='+myAPIKey+'&query='+city;

http.get(url, (res) => {
    const {statusCode} = res;
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`);
        return;
    }

    res.setEncoding('utf8');
    let rowData = '';
    res.on('data', (chunk) => rowData += chunk);
    res.on('end', () => {
        let parseData = JSON.parse(rowData);
        let finalData = {
            location: parseData.request.query,
            forecast: parseData.forecast
        };
        console.log(finalData);
    });
}).on('error', (err) => {
    console.error(err);
});