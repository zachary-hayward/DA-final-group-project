import { useAuth0 } from "@auth0/auth0-react";

export default function Register() {
  const {isAuthenticated, loginWithRedirect} = useAuth0()
  if (!isAuthenticated) loginWithRedirect()

  return (<>
    <div className=''>

    </div>
  </>)
}