import { useUser } from "../components/App"

export default function Home() {
  const user = useUser()
  if (!user) return <>Getting your details..</>
  
  return (<>
    <div>Your garden and stuff</div>
  </>)
}