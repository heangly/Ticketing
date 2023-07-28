import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@heangtickets/common'
import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'

const app = express()
// make sure it is behind the proxy and still trust the traffic as secure
app.set('trust proxy', true)

app.use(json())

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)

app.use(currentUser)
app.use(createTicketRouter)
app.use(showTicketRouter)

// any undefined routes
app.all('*', () => {
  // Synchronous code work with no extra work. Throw new error is enough
  // Async code will need next() OR we can use NPM package (express-async-errors) to change default behavior of Express, using (express-async-errors) you can just throw error (no need async)
  throw new NotFoundError()
})

// any error thatis thrown will be catched here
app.use(errorHandler)

export { app }
