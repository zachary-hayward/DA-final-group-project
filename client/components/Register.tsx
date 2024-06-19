import { useAuth0 } from "@auth0/auth0-react"
import { useState, ChangeEvent } from "react"
import { useHooks } from "../hooks/useHooks"


export default function Register() {
  const {getAccessTokenSilently} = useAuth0()
  const [formData, setFormData] = useState({username: '', location: ''})
  const hooks = useHooks()
  const addUser = hooks.addUser

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]:value}))
  }

  const handleOnClick = async () => {
    const token = await getAccessTokenSilently()
    addUser.mutate({userData: formData, token})
  }

  return (<>
    <div className='bg-slate-300'>
      <form>
        <div className='flex'>
          <div>UserName:&nbsp;</div>
          <input type='text' placeholder='Username' autoComplete='off'
            className='rounded'
            name='username' value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className='flex'>
          <div>Location:&nbsp;&nbsp;&nbsp;&nbsp;</div> {/*How else do i get them to line up nicely...*/}
          <input type='text' placeholder='Location' autoComplete='off'
            className='rounded'
            name='location' value={formData.location}
            onChange={handleChange}
          />
        </div>
        <button type='button'
          onClick={() => handleOnClick()}
        >Register</button>
      </form>
    </div>
  </>)
}