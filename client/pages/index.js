import axios from 'axios'

// render each component with pre fetch data ONE TIME
// This function will be execute on Server, so this code wont show up on client side
export const getServerSideProps = async ({ req }) => {
  const baseUrl = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
  const url = `${baseUrl}/api/users/currentuser`

  try {
    const { data } = await axios.get(url, {
      headers: req.headers
    })

    return { props: { currentUser: data.currentUser } }
  } catch (error) {
    console.log(error.message)
    return { props: { currentUser: null } }
  }
}

const LandingPage = ({ currentUser }) => {
  console.log(currentUser)
  return <div>LandingPage</div>
}

export default LandingPage
