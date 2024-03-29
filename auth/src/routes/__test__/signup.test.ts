import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on succefful signup', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
})

it('return a 400 with an invalid email', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalidEmail',
      password: 'password'
    })
    .expect(400)
})

it('return a 400 with an invalid password', () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'p'
    })
    .expect(400)
})

it('return a 400 with missing email and password', async () => {
  await request(app).post('/api/users/signup').send({ email: 'test@test.com' }).expect(400)
  return request(app).post('/api/users/signup').send({ password: 'password' }).expect(400)
})

it('disallows duplicate email', async () => {
  await request(app).post('/api/users/signup').send({ email: 'test@test.com', password: 'password' }).expect(201)
  return request(app).post('/api/users/signup').send({ email: 'test@test.com', password: 'password' }).expect(400)
})

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  return expect(response.get('Set-Cookie')).toBeDefined()
})
