const cleanUserInput = formInput => {
  Object.keys(formInput).forEach(field => {
    if(formInput[field] === ""){
      delete formInput[field]
    }else if(typeof formInput[field]=== "string" && formInput[field].trim() === ""){
      delete formInput[field]
    }
  })
  return formInput
}

export default cleanUserInput