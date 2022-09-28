const Influx = require('influx');
const { argv } = require('../app')

const influx = new Influx.InfluxDB({
    host: argv.IP,
    port: argv.PORT,
    database: 'environmental_db'
})

const getAllWeather = (req, res) => {
    influx.query("SELECT mean_temperature/100,mean_humidity/1024,mean_pressure/24902,mean_light FROM one_year.OSW1_station tz('Europe/Warsaw')").then(results => {
        /* Example of failed query */
        //influx.query('SELECT tx FROM pogoda limit 10').then(results => {
        if (!results.groupRows[0]) {
            return res.status(400).json({ status: "failure", msg: `No records found for ${influx.database}` })
        }
        return res.status(200).json({ status: "success", data: results })
    }).catch(err => console.log(err))
}

const getWeeklyWeather = (req, res) => {
    influx.query("SELECT mean_temperature/100,mean_humidity/1024,mean_pressure/24902,mean_light FROM one_year.OSW1_station WHERE time >= now() - 7d tz('Europe/Warsaw')").then(results => {
        //influx.query("SELECT temperature/100,humidity/1024,pressure/24902,light FROM pogoda WHERE time >= now() - 7d tz('Europe/Warsaw')").then(results => {
        /* Example of failed query */
        //influx.query('SELECT tx FROM pogoda limit 10').then(results => {
        if (!results.groupRows[0]) {
            return res.status(400).json({ status: "failure", msg: `No records found for ${influx.database}` })
        }
        return res.status(200).json({ status: "success", data: results })
    }).catch(err => console.log(err))
}

module.exports = { getAllWeather, getWeeklyWeather }
