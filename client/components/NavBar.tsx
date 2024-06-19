import { useAuth0 } from "@auth0/auth0-react"

export default function NavBar() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()

  const handleOnClick = (name: string) => {
    if (name === 'login') {
      if (isAuthenticated) logout()
      else loginWithRedirect()
    }
  }
  
  return (<>
    <div className='w-full flex gap-2 bg-yellow-300 items-center'>
      <button type='button' name='login'
        className='btn-nav'
        onClick={() => handleOnClick('login')}
      >
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </div>
  </>)
}