import {
  useMutation,
  // useQueryClient,
  // MutationFunction,
  useQuery,
} from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import request from 'superagent'
import { Plant } from '../../models/growGrub'
import { GardenToSave } from '../../models/growGrub'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export function useHooks() {
  return {
    getUsernames: useGetUsernames,
    getPlants: useGetPlants,
    getGardens: useGetGardens,
  }
}

// function useAuthQueryTemplate(path: string, keys: string[], bodyData?: object) {
//   const { getAccessTokenSilently, isAuthenticated } = useAuth0()
//   return useQuery({
//     enabled: isAuthenticated,
//     queryKey: keys,
//     queryFn: async () => {
//       const token = await getAccessTokenSilently()
//       const res = await request
//         .get(`${rootURL}/${path}`)
//         .send(bodyData)
//         .set('Authorization', `Bearer ${token}`)
//       return res.body
//     },
//   })
// }

// export function useMutationTemplate<TData = unknown, TVariables = unknown>(
//   mutationFn: MutationFunction<TData, TVariables>,
//   queryKeyArry: Array<string | number>,
// ) {
//   const queryClient = useQueryClient()
//   const mutation = useMutation({
//     mutationFn,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: queryKeyArry })
//     },
//   })
//   return mutation
// }

const useGetUsernames = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  return useQuery({
    enabled: isAuthenticated,
    queryKey: ['users'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const res = await request
        .get(`${rootURL}/usernames`)
        .set('Authorization', `Bearer ${token}`)
      return res.body
    },
  })
}

const useGetPlants = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  return useQuery({
    enabled: isAuthenticated,
    queryKey: ['plants'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const res = await request
        .get(`${rootURL}/plants`)
        .set('Authorization', `Bearer ${token}`)
      return res.body as Plant[]
    },
  })
}

export function useSaveGarden() {
  const { getAccessTokenSilently } = useAuth0()
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ layout, plotData }: GardenToSave) => {
      const token = await getAccessTokenSilently()
      const newGarden = { layout, plotData }
      const res = await request
        .post(`api/v1/gardens`)
        .send(newGarden)
        .set('Authorization', `Bearer ${token}`)
      return res.body
    },
    // onSuccess: async () => {
    //   queryClient.invalidateQueries({ queryKey: ['datatable'] })
    // },
  })
}

const useGetGardens = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  return useQuery({
    enabled: isAuthenticated,
    queryKey: ['gardens'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const res = await request
        .get(`${rootURL}/gardens`)
        .set('Authorization', `Bearer ${token}`)
      return res.body
    },
  })
}
