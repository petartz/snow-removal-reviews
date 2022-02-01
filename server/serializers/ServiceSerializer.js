class ServiceSerializer{
  static getSummary(service){
    const allowedAttributes = ["id", "name", "number", "email", "websiteUrl", "photoUrl"]

    let serializedService = {}
    for(const attribute of allowedAttributes){
      serializedService[attribute] = service[attribute]
    }

    return serializedService
  }
}

export default ServiceSerializer