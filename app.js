#!/usr/bin/env node
const express = require('express')
const findup = require('findup-sync')
const fs = require('fs')

const app = express()
const yaml = require('yaml')
const configPath = findup('config.yaml')
const config = configPath ? yaml.parse(fs.readFileSync(configPath, 'utf-8')) : {IP: 'localhost', PORT: 8086}

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: node $0 --config <conf-file> -l [api_port]')
    .default('config', 'IP: localhost, PORT: 8086')
    .default('l', 5000)
    .config(config)
    .argv;

module.exports = { argv }

const weather = require('./routes/weather')

app.use(express.json())

app.use('/api/weather', weather)

app.listen(argv.l, () => {
    console.log(`server is listening on port ${argv.l}...`)
})

