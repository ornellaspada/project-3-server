import express from 'express'
import router from './views/router.js'

// ? TODO: import middleware

// import logger from './middleware/logger.js'
// import errorHandling from './middleware/errorHandler.js'

const app = express()

app.use(express.json())

// app.use(logger)

app.use('/api',router)

// app.use(errorHandling)

export default app

