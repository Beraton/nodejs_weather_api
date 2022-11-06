const express = require('express')
const router = express.Router()

const { getAllWeather, getWeeklyWeather, getSelectedDayWeather } = require('../controllers/weather')

router.get('/', getAllWeather)
router.get('/weekly', getWeeklyWeather)
router.get('/day/:date', getSelectedDayWeather)

module.exports = router
