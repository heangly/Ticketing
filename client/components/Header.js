import Link from 'next/link'

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' }
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => (
      <li className='nav-item mx-3' key={href}>
        <Link href={href}>{label}</Link>
      </li>
    ))

  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container'>
        <Link className='navbar-brand' href='/'>
          GitTix
        </Link>

        <div className='d-flex justify-context-end'>
          <ul className='nav d-flex align-items-center'>{links}</ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
