import { useUser } from "./App"

export default function Home() {
  const user = useUser()
  console.log(user)
  return (<>
    <div>Your garden and stuff</div>
  </>)
}