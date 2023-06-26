import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!!!email.trim().length || !!!password.trim().length) return
    doRequest()
  }

  return (
    <form className='container mt-5' onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className='form-group'>
        <label htmlFor='email'>Email address</label>
        <input className='form-control' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>

      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          className='form-control'
          id='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      {errors}

      <button type='submit' className='btn btn-success mt-3'>
        Sign In
      </button>
    </form>
  )
}

export default SignIn
