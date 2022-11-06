const Influx = require('influx');
const { argv } = require('../app')

const influx = new Influx.InfluxDB({
    host: argv.IP,
    port: argv.PORT,
    database: 'environmental_db'
})

const getAllWeather = (req, res) => {
    influx.query(`SELECT mean_temperature/100,mean_humidity/1024,mean_pressure/24902,mean_light FROM ${argv.INFLUX_DATABASE} tz('Europe/Warsaw')`).then(results => {
        if (!results.groupRows[0]) {
            return res.status(400).json({ status: "failure", msg: `No records found for ${influx.database}` })
        }
        return res.status(200).json({ status: "success", data: results })
    }).catch(err => console.log(err))
}

const getWeeklyWeather = (req, res) => {
    influx.query(`SELECT mean_temperature/100,mean_humidity/1024,mean_pressure/24902,mean_light FROM ${argv.INFLUX_DATABASE} WHERE time >= now() - 7d tz('Europe/Warsaw')`).then(results => {
        if (!results.groupRows[0]) {
            return res.status(400).json({ status: "failure", msg: `No records found for ${influx.database}` })
        }
        return res.status(200).json({ status: "success", data: results })
    }).catch(err => console.log(err))
}

const getSelectedDayWeather = (req, res) => {
    influx.query(`SELECT mean_temperature/100,mean_humidity/1024,mean_pressure/24902,mean_light FROM ${argv.INFLUX_DATABASE} WHERE time >= '${req.params.date}T00:00:00Z' AND time < '${req.params.date}T23:59:59Z' tz('Europe/Warsaw')`).then(results => {
        if (!results.groupRows[0]) {
            return res.status(400).json({ status: "failure", msg: `No records found for ${influx.database}` })
        }
        return res.status(200).json({ status: "success", data: results })
    }).catch(err => console.log(err))
}

module.exports = { getAllWeather, getWeeklyWeather, getSelectedDayWeather }
