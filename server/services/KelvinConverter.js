const kelvinConverter = (kelvin) => {
  const fahrenheit = Math.floor((kelvin - 273.15) * 9/5 + 32)
  return fahrenheit
}

export default kelvinConverter