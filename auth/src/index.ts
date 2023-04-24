import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
// make sure it is behind the proxy and still trust the traffic as secure
app.set('trust proxy', true)

app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

// any undefined routes
app.all('*', async () => {
  // Synchronous code work with no extra work. Throw new error is enough
  // Async code will need next() OR we can use NPM package (express-async-errors) to change default behavior of Express, using (express-async-errors) you can just throw error (no need async)
  throw new NotFoundError()
})

// any error thatis thrown will be catched here
app.use(errorHandler)

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('==> Connected to mongdoDB <==')
  } catch (error) {
    console.error('DB error:', error)
  }

  app.listen(3000, () => console.log('==> Auth Sever is running on PORT 3000 <=='))
}

start()
