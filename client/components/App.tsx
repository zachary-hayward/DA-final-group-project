import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.tsx'
import NavBar from './NavBar.tsx'
import LandingPage from './LandingPage.tsx'

function App() {
  const {isAuthenticated} = useAuth0()
  
  return (
    <>
      <div className="app">
        <NavBar />
        {!isAuthenticated ?
          <LandingPage />
        : <Outlet />}
        <Footer />
      </div>
    </>
  )
}

export default App
