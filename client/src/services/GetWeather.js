const successfulLookup = async position => {
  const { latitude, longitude } = position.coords
  console.log(latitude, longitude)
  try{
    const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=d8e8742fa1b1aa5b85716c6144013e98`)
    const body = await response.json()
    let temp = kelvinConverter(body.list[0].main.temp)
    setForecast({
      city: body.city.name,
      temp: temp,
      description: body.list[0].weather[0].description            
    })
    if(!response.ok){
      throw new Error(`${response.status} ${response.statusText}`)
    }
  }catch(error){
    console.log(error)
  }
}

export default successfulLookup