const cleanUserInput = formInput => {
  Object.keys(formInput).forEach(field => {
    if(formInput[field].trim() === "") {
      delete formInput[field]
    }
  })
  return formInput
}

export default cleanUserInput