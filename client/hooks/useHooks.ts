import { useQuery } from "@tanstack/react-query"
import * as API from '../apis/growGrub.ts'

export default function useHooks() {

  return {
    getUserByAuth: useGetUserByAuth
  }
}

async function useGetUserByAuth(getAccessTokenSilenty: ()=> Promise<string>) {
  const token = await getAccessTokenSilenty()
  return useQuery({queryKey: ['users'], queryFn: () => API.getUserByAuth(token)})
}