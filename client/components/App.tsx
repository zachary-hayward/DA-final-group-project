import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.tsx'
import NavBar from './NavBar.tsx'
import LandingPage from '../pages/LandingPage.tsx'
import Register from '../pages/Register.tsx'

function App() {
  const [registered, setRegistered] = useState(false)
  const {isAuthenticated} = useAuth0()
  
  return (
    <>
      <div className='app min-w-screen min-h-screen'>
        <NavBar />
          {(!isAuthenticated) ?
            <LandingPage />
          : <>{!registered ? 
                <Register registered={registered} setRegistered={setRegistered}/>
              :
                <Outlet />
            }</>
          }
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