import { useContext, createContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.tsx'
import NavBar from './NavBar.tsx'
import LandingPage from '../pages/LandingPage.tsx'
import Register from '../pages/Register.tsx'
import { getUserByAuth } from '../apis/growGrub.ts'
import { User } from '../../models/growGrub.ts'
import { GardenView } from '../pages/GardenView.tsx'

const UserContext = createContext<User | undefined>(undefined)
export const useUser = () => useContext(UserContext)

function App() {
  const [user, setUser] = useState<User>()
  const [redirecting, setRedirecting] = useState(true)
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const getUserByToken = async () => {
      try {
        const newToken = await getAccessTokenSilently()
        const user = await getUserByAuth(newToken)
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
        <NavBar />
        {!isAuthenticated || redirecting ? (
          <>
            <LandingPage />
            <GardenView />
          </>
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
