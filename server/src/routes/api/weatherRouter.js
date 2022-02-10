import express from "express"
import got from 'got'
import kelvinConverter from '../../../services/KelvinConverter.js'
import API_KEY from '../../config.js'

const weatherRouter = new express.Router()

weatherRouter.get('/:lat&:long', async (req, res) => {
  console.log(API_KEY)
  try {
    const response = await got(`https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.long}&appid=${API_KEY.API_KEY}`)
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
