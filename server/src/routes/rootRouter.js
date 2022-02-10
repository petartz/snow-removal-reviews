import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import servicesRouter from "./api/v1/servicesRouter.js"
import weatherRouter from "./api/weatherRouter.js"


const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/services", servicesRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/weather", weatherRouter)

export default rootRouter
