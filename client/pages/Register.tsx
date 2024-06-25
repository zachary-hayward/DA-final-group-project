import { useAuth0 } from '@auth0/auth0-react'
import { useState, ChangeEvent } from 'react'
import { addUser } from '../apis/growGrub.ts'
import { useHooks } from '../hooks/useHooks.ts'
import DropDownAutoFilter from '../components/DropDownAutoFilter.tsx'
import titleWord from '../functions/titleWord.ts'
import { MouseEvent } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import { Link } from 'react-router-dom'
import SecondaryButton from '../components/SecondaryButton'
import Banner from '../components/Banner.tsx'

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

  const handleMonthChange = (month: string) => {
    setFormData((prev) => ({ ...prev, month: month }))
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
      <Banner 
        bannerInfo={{
          title: "Create your profile to start your garden"
        }}
        />
      {/* <div
        className="banner-container relative flex h-96 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/homepage/Homepage_banner_bg.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <h2 className="text-4xl font-bold">
            Create your profile to start your garden.
          </h2>
        </div>
      </div> */}
      <div className="align-center flex justify-center py-20 text-gray-800 text-left">
        <div className="container w-1/2 mx-auto rounded bg-slate-100 p-3">
          <div className="m-2 flex gap-2">
            <div className="mt-2 flex flex-col gap-2 pr-2">
              <p className="font-bold">UserName:</p>
              <p className="font-bold">Location:</p>
              <p className="font-bold">Summer Starts In:</p>
              <p className="font-bold">Plants:</p>
            </div>
            <div className="mt-2 flex flex-col gap-2 pr-4">
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
                onChange={handleMonthChange}
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
          {!registered && usernameList && (<>
            <div className="flex items-center justify-end p-4">
            <PrimaryButton
              onClick={() => handleOnRegister()}
              //   () => {
              //   throw new Error('Function not implemented.')
              // }}
            >
              Get Growing!
            </PrimaryButton>
            </div>
          </>)}
        </div>
      </div>
    </>
  )
}
