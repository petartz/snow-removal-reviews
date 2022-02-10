import express from "express"
import got from 'got'
import kelvinConverter from '../../../services/KelvinConverter.js'


const weatherRouter = new express.Router()

weatherRouter.get('/:lat&:long', async (req, res) => {
  try {
    const response = await got(`https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.long}&appid=d8e8742fa1b1aa5b85716c6144013e98`)
    const body = JSON.parse(response.body)
    const city = body.city.name
    const description = body.list[0].weather[0].description
    const temp = kelvinConverter(parseInt(body.list[0].main.temp))
    return res.status(200).json({ city, description, temp })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }

})

export default weatherRouter
