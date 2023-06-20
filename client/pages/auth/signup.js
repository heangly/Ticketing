import { useState } from 'react'
const signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!!!email.trim().length || !!!password.trim().length) return
    console.log(email, password)
  }

  return (
    <form className='container mt-5' onSubmit={onSubmit}>
      <h1>Sign Up</h1>
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

      <button type='submit' className='btn btn-primary'>
        Sign up
      </button>
    </form>
  )
}

export default signup
