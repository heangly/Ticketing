import axios from 'axios'

// render each component with pre fetch data ONE TIME
// This function will be execute on Server, so this code wont show up on client side
export const getStaticProps = async () => {
  try {
    const response = await axios.get('/api/users/currentuser')
    return { props: { currentUser: response.data } }
  } catch (error) {
    console.log(error.message)
    return { props: { currentUser: null } }
  }
}

const LandingPage = ({ currentUser }) => {
  console.log(`I am on component, ${currentUser}`)
  return <div>LandingPage</div>
}

export default LandingPage
