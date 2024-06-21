import { useAuth0 } from "@auth0/auth0-react"
import { useState, ChangeEvent } from "react"
import { addUser } from "../apis/growGrub"
import { useHooks } from "../hooks/useHooks"
import DropDownAutoFilter from "../components/DropDownAutoFilter"

interface UserData {username: string; location: string; plants: string[]}
interface Props {registered:boolean; setRegistered: (boolean: boolean) => void}
export default function Register({registered, setRegistered}: Props) {
  const {getAccessTokenSilently} = useAuth0()
  const [formData, setFormData] = useState<UserData>({username: '', location: '', plants: []})
  const [displayMessage, setDisplayMessage] = useState('')
  const hooks = useHooks()

  const usernameQuery = hooks.getUsernames()
  const usernameList = usernameQuery.data
  const plantsQuery = hooks.getPlants()
  const plantList: string[] = []
  if (plantsQuery.data) {
    plantsQuery.data.forEach(item => plantList.push(item.name))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]:value}))
  }

  const handleOnRegister = async () => {
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

  const handlePlantSelect = (option: string) => {
    if (!formData.plants.includes(option)) setFormData((prev) => ({...prev, plants: [...prev.plants, option]}))
  }
  
  return (<>
    <div className='bg-slate-300 container mx-auto rounded'>
      <div className='flex gap-2 m-2'>
        <div className='flex flex-col gap-2 mt-2'>
          <p className='font-bold'>UserName:</p>
          <p className='font-bold'>Location:</p>
          <p className='font-bold'>Plants:</p>
        </div>
        <div className='flex flex-col gap-2 mt-2'>
          <input type='text' placeholder='Username' autoComplete='off'
            className='rounded pl-1'
            name='username' value={formData.username}
            onChange={handleChange}
          />
          <input type='text' placeholder='Location' autoComplete='off'
            className='rounded pl-1'
            name='location' value={formData.location}
            onChange={handleChange}
          />
          <DropDownAutoFilter options={plantList} onSelect={handlePlantSelect} containerClass={``}/>

        </div>
        <div className='ml-5 mt-1'>
          <p className='font-bold'>Plants your interested in:</p>
          <ul>
            {formData.plants[0] && formData.plants.map((plant,i) => (
              <li key={`plant${i}`}>
                {plant}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {displayMessage && <div>{displayMessage}</div>}
      {!registered && usernameList &&
        <button type='button'
          className='w-full bg-blue-300 hover:bg-blue-600 rounded-bl rounded-br'
          onClick={() => handleOnRegister()}
        >Register</button>
      }
    </div>
  </>)
}