import {
  useMutation,
  useQueryClient,
  MutationFunction,
  useQuery,
} from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import request from 'superagent'
import type { Layout } from 'react-grid-layout'
import Layout from '../components/Layout'
import { GardenToSave, PlotDatum } from '../../models/growGrub'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export function useHooks() {
  return {
    getUsernames: useGetUsernames,
    getPlants: useGetPlants,
  }
}

function useAuthQueryTemplate(path: string, keys: string[], bodyData?: object) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  return useQuery({
    enabled: isAuthenticated,
    queryKey: keys,
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const res = await request
        .get(`${rootURL}/${path}`)
        .send(bodyData)
        .set('Authorization', `Bearer ${token}`)
      return res.body
    },
  })
}

export function useMutationTemplate<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  queryKeyArry: Array<string | number>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyArry })
    },
  })
  return mutation
}

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
  return useAuthQueryTemplate('/plants', ['plants'])
}

// Rough works-in-progress below - nothing finished yet - not sure if we need useQuery or useMutation

// export function useSaveGarden(blockData, layout, userID) {
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

export function useSaveGarden() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ layout, plot }: GardenToSave) => {
      const token = await getAccessTokenSilently()
      const gardenObj = { layout, plot, token }
      await request.post(`api/v1/gardens`).send(gardenObj)
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['datatable'] })
    },
  })
}

// interface LayoutObject {}

// Template from my personal project, just for reference

// export function useUpdatePlaceholderdata() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (entry: TableEntry) => {
//       {
//         await request
//           .patch(`api/v1/placeholder/${entry[Object.keys(entry)[0]]}`)
//           .send(entry)
//       }
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ['datatable'] })
//     },
//   })
// }
