import { useAuth0 } from "@auth0/auth0-react"
import { useState, ChangeEvent } from "react"
import { addUser } from "../apis/growGrub"
import { useHooks } from "../hooks/useHooks";

interface Props {registered:boolean; setRegistered: (boolean: boolean) => void}
export default function Register({registered, setRegistered}: Props) {
  const {getAccessTokenSilently} = useAuth0()
  const [formData, setFormData] = useState({username: '', location: ''})
  const [displayMessage, setDisplayMessage] = useState('')
  const hooks = useHooks()

  const usernameQuery = hooks.getUsernames()
  const usernameList = usernameQuery.data
  const plantsQuery = hooks.getPlants()
  const plantData = plantsQuery.data
  console.log(plantData) //Use these for plant selection

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]:value}))
  }

  const handleOnClick = async () => {
    if (usernameList && usernameList.includes(formData.username)) {
      setDisplayMessage('Try a different username.')
    } else if (formData.username.length < 3) {
      setDisplayMessage('Please use a longer username.')
    } else if (formData.location.length < 3) {
      setDisplayMessage('Please use your areas full name.')
    } else {
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
  }
  
  return (<>
    <div className='bg-slate-300 container mx-auto rounded'>
      <form className='flex gap-2 m-2'>
        <div className='flex flex-col gap-2 mb-2'>
          <div className='flex mt-2'>
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
        </div>
      </form>
      {displayMessage && <div>{displayMessage}</div>}
      {!registered && usernameList &&
        <button type='button'
          onClick={() => handleOnClick()}
        >Register</button>
      }
    </div>
  </>)
}