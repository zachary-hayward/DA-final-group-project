import { useAuth0 } from "@auth0/auth0-react"
import { useState, ChangeEvent } from "react"
import { addUser } from "../apis/growGrub"

interface Props {registered:boolean; setRegistered: (boolean: boolean) => void}
export default function Register({registered, setRegistered}: Props) {
  const {getAccessTokenSilently} = useAuth0()
  const [formData, setFormData] = useState({username: '', location: ''})
  const [displayMessage, setDisplayMessage] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]:value}))
  }

  const handleOnClick = async () => {
    const token = await getAccessTokenSilently()
    try {
      await addUser(formData, token)
      setDisplayMessage('Registered successfully! Redirecting you...')
      setTimeout(() => {
        setRegistered(true)
      }, 1500)
    } catch (error) {
      setRegistered(false)
      setDisplayMessage('Something went wrong, try a different username.')
    }
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
        {!registered &&
          <button type='button'
            onClick={() => handleOnClick()}
          >Register</button>
        }
      </form>
      {displayMessage && <div>{displayMessage}</div>}
    </div>
  </>)
}