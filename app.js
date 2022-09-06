const express = require('express');
const app = express()
var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: node $0 -l [listen_port] -i [influx_ip] -P [influx_port] -u [influx_user] -p [influx_pass]')
    .alias('i', 'ip')
    .alias('P', 'port')
    .alias('u', 'username')
    .alias('p', 'password')
    .demandOption(['i', 'P'])
    .default('l', 5000)
    .argv;

module.exports = { argv }

const weather = require('./routes/weather')

//console.log(`IP: ${argv.i}, port: ${argv.P}, listener: ${argv.l}, username: ${argv.u}, password: ${argv.p}`)

app.use(express.json())

app.use('/api/weather', weather)

app.listen(argv.l, () => {
    console.log(`server is listening on port ${argv.l}...`)
})

