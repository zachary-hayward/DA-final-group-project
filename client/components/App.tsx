import { useContext, createContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.tsx'
import NavBar from './NavBar.tsx'
import LandingPage from './LandingPage.tsx'
import Register from './Register.tsx'
import { getUserByAuth } from '../apis/growGrub.ts'
import { User } from '../../models/growGrub.ts'

const UserContext = createContext<User | undefined>(undefined)
export const useUser = () => useContext(UserContext)

function App() {
  const [token, setToken] = useState('notarealtokenyet')
  const [user, setUser] = useState<User>()
  const {isAuthenticated, getAccessTokenSilently} = useAuth0()
  
  useEffect(() => {
    const getUserByToken = async () => {
      try {
        const newToken = await getAccessTokenSilently()
        setToken(newToken)
        // const user = await getUserByAuth(token)
        // setUser(user)
      } catch(error) {
        console.error(error)
      }
    }
    getUserByToken()
  })
  
  return (
    <>
      <div className="app">
        <NavBar />
        {!isAuthenticated ?
          <LandingPage />
        : 
            <UserContext.Provider value={user}>
              <Outlet />
            </UserContext.Provider>
        }
        <Footer />
      </div>
    </>
  )
}

export default App
