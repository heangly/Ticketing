import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { validateRequest } from '../middlewares/validate-request'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const exisitingUser = await User.findOne({ email })

    if (!exisitingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await Password.compare(exisitingUser.password, password)

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: exisitingUser.id,
        email: exisitingUser.email
      },
      process.env.JWT_KEY!
    )

    // Store it on req.session object(that is automatically created by cookie-session package)
    req.session = {
      jwt: userJwt
    }

    res.status(200).send(exisitingUser)
  }
)

export { router as signinRouter }
