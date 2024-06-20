import { useContext, createContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.tsx'
import NavBar from './NavBar.tsx'
import LandingPage from '../pages/LandingPage.tsx'
import Register from '../pages/Register.tsx'
import { getUserByAuth } from '../apis/growGrub.ts'
import { User } from '../../models/growGrub.ts'
import Header from './Header.tsx'

const UserContext = createContext<User | undefined>(undefined)
export const useUser = () => useContext(UserContext)

function App() {
  const [user, setUser] = useState<User>()
  const [redirecting, setRedirecting] = useState(true)
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const getUserByToken = async () => {
      try {
        const token = await getAccessTokenSilently()
        const user = await getUserByAuth(token)
        // console.log(token) use this to grab your token for thunderclient testing
        setUser(user)
        setRedirecting(false)
      } catch (error) {
        console.error(error)
      }
    }
    getUserByToken()
  }, [isAuthenticated, getAccessTokenSilently])

  return (
    <>
      <div className="app min-w-screen min-h-screen">
        <Header />
        {!isAuthenticated || redirecting ? (
          <LandingPage />
        ) : (
          <>
            {!user ? (
              <Register />
            ) : (
              <UserContext.Provider value={user}>
                <Outlet />
              </UserContext.Provider>
            )}
          </>
        )}
        <Footer />
      </div>
    </>
  )
}

export default App
