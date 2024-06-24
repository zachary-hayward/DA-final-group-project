import { useAuth0 } from '@auth0/auth0-react'
import { useState, ChangeEvent } from 'react'
import { addUser } from '../apis/growGrub.ts'
import { useHooks } from '../hooks/useHooks.ts'
import DropDownAutoFilter from '../components/DropDownAutoFilter.tsx'
import titleWord from '../functions/titleWord.ts'

interface UserData {
  username: string
  location: string
  plants: string[]
  summerStarts: string
}
interface Props {
  registered: boolean
  setRegistered: (boolean: boolean) => void
}
export default function Register({ registered, setRegistered }: Props) {
  const { getAccessTokenSilently } = useAuth0()
  const [formData, setFormData] = useState<UserData>({
    username: '',
    location: '',
    plants: [],
    summerStarts: '',
  })
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const [displayMessage, setDisplayMessage] = useState('')

  const hooks = useHooks()
  const useAddPlant = hooks.useAddPlant()

  const useUsernameQuery = hooks.useGetUsernames()
  const usernameList = useUsernameQuery.data
  const usePlantsQuery = hooks.useGetPlants()
  const plantList: string[] = []
  if (usePlantsQuery.data) {
    usePlantsQuery.data.forEach((item) => plantList.push(item.name))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOnRegister = async () => {
    if (usernameList && usernameList.includes(formData.username)) {
      setDisplayMessage('Try a different username.')
    } else if (formData.username.length < 3) {
      setDisplayMessage('Please use a longer username.')
    } else if (formData.location.length < 2) {
      setDisplayMessage('Please use your areas full name.')
      // } else if (!months.includes(formData.summerStarts)) {
      //   setDisplayMessage('Please select the month that summer starts for you.')
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
        setDisplayMessage('Something went wrong. Please try again.')
      }
    }
  }

  const handlePlantSelect = (option: string) => {
    const plant = titleWord(option)
    setFormData((prev) => ({ ...prev, plants: [...prev.plants, plant] }))
    if (!plantList.includes(option)) useAddPlant.mutate(option)
  }
  const handleMonthSelect = (option: string) => {
    setFormData((prev) => ({ ...prev, summerStarts: option }))
  }

  return (
    <>
      <div className="container mx-auto rounded bg-slate-300">
        <div className="m-2 flex gap-2">
          <div className="mt-2 flex flex-col gap-2">
            <p className="font-bold">UserName:</p>
            <p className="font-bold">Location:</p>
            <p className="font-bold">Summer Starts In:</p>
            <p className="font-bold">Plants:</p>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Username"
              autoComplete="off"
              className="rounded pl-1"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Location"
              autoComplete="off"
              className="rounded pl-1"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <DropDownAutoFilter
              value={formData.summerStarts}
              options={months}
              onSelect={handleMonthSelect}
              containerClass={``}
            />
            <DropDownAutoFilter
              options={plantList}
              onSelect={handlePlantSelect}
              containerClass={``}
            />
          </div>
          <div className="ml-5 mt-1">
            <p className="font-bold">Plants your interested in:</p>
            <ul>
              {formData.plants[0] &&
                formData.plants.map((plant, i) => (
                  <li key={`plant${i}`}>{plant}</li>
                ))}
            </ul>
          </div>
        </div>
        {displayMessage && <div>{displayMessage}</div>}
        {!registered && usernameList && (
          <button
            type="button"
            className="w-full rounded-bl rounded-br bg-blue-300 hover:bg-blue-600"
            onClick={() => handleOnRegister()}
          >
            Register
          </button>
        )}
      </div>
    </>
  )
}
