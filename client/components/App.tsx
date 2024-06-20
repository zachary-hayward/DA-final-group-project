import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.tsx'
import NavBar from './NavBar.tsx'
import LandingPage from '../pages/LandingPage.tsx'
import Register from '../pages/Register.tsx'
import { getUserByAuth } from '../apis/growGrub.ts'
<<<<<<< HEAD
import { User } from '../../models/growGrub.ts'
import Header from './Header.tsx'

const UserContext = createContext<User | undefined>(undefined)
export const useUser = () => useContext(UserContext)

function App() {
  const [user, setUser] = useState<User>()
  const [redirecting, setRedirecting] = useState(true)
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
=======

function App() {
  const [processing, setProcessing] = useState(false)
  const [registered, setRegistered] = useState(false)
  const {isAuthenticated, getAccessTokenSilently} = useAuth0()
>>>>>>> dev

  useEffect(() => {
    const getUser = async () => {
      setProcessing(true)
      const token = await getAccessTokenSilently()
      try {
<<<<<<< HEAD
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
=======
        const result = await getUserByAuth(token)
        if (result.id) setRegistered(true)
      } catch (error) {
        setRegistered(false)
      } finally {
        setProcessing(false)
      }
    }
    if (isAuthenticated) getUser()
  },[isAuthenticated, getAccessTokenSilently])
>>>>>>> dev

  return (
    <>
      <div className="app min-w-screen min-h-screen">
<<<<<<< HEAD
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
=======
        <NavBar />
          {(!isAuthenticated || processing) ?
            <LandingPage />
          : <>{registered ? 
                <Outlet />
              :
                <Register registered={registered} setRegistered={setRegistered}/>
            }</>
          }
>>>>>>> dev
        <Footer />
      </div>
    </>
  )
}

export default App

//Swap this:

// {(!isAuthenticated) ?
//   <LandingPage />
// : <>{!registered ? 
//       <Register registered={registered} setRegistered={setRegistered}/>
//     :
//       <Outlet />
//   }</>
// }

//For this:

// <Outlet />

//To Test things