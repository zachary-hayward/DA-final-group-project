import {
  useMutation,
  useQueryClient,
  // MutationFunction,
  useQuery,
} from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import request from 'superagent'
import { Plant } from '../../models/growGrub'
import { GardenToSave } from '../../models/growGrub'
import { useNavigate } from 'react-router-dom'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export function useHooks() {
  return {
    useGetUsernames,
    useGetPlants,
    useGetGardens,
    useAddPlant,
    useGetTasks,
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

//hook to get plant list
export function useGetPlants() {
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

const useAddPlant = () => {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (plant: string) => {
      const token = await getAccessTokenSilently()
      const res = await request
        .get(`${rootURL}/googleGemini/`)
        .query({ vege: plant })
        .set('Authorization', `Bearer ${token}`)
      return res.body
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] })
    },
  })
}

export function useSaveGarden() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ layout, plotData, garden_id }: GardenToSave) => {
      const token = await getAccessTokenSilently()
      const newGarden = { layout, plotData }
      if (garden_id == null) {
        const res = await request
          .post(`api/v1/gardens`)
          .send(newGarden)
          .set('Authorization', `Bearer ${token}`)
        return res.body
      } else {
        const res = await request
          .put(`api/v1/gardens/${garden_id}`)
          .send(newGarden)
          .set('Authorization', `Bearer ${token}`)

        return res.body
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['gardens'] })
      navigate('/')
    },
  })
}

export function useSaveNewGarden() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({
      layout,
      plotData,
    }: Omit<GardenToSave, 'garden_id'>) => {
      const token = await getAccessTokenSilently()
      const newGarden = { layout, plotData }

      const res = await request
        .post(`api/v1/gardens`)
        .send(newGarden)
        .set('Authorization', `Bearer ${token}`)
      return res.body
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['gardens'] })
      navigate('/')
    },
  })
}

export const useGetGardens = () => {
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

//hook to get single plant
export function useGetSinglePlant(name: string) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  return useQuery({
    enabled: isAuthenticated,
    queryKey: ['singlePlant'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const res = await request
        .get(`${rootURL}/plants/${name}`)
        .set('Authorization', `Bearer ${token}`)
      return res.body
    },
  })
}

export function useGetTasks() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  return useQuery({
    enabled: isAuthenticated,
    queryKey: ['tasks'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const res = await request
        .put(`${rootURL}/tasks`)
        .set('Authorization', `Bearer ${token}`)
      return res.body
    },
  })
  // return useMutation({
  //   mutationFn: async () => {
  //     const token = await getAccessTokenSilently()
  //     const res = await request
  //       .put(`api/v1/tasks`)
  //       .set('Authorization', `Bearer ${token}`)
  //     return res.body
  //   },
  // })
}

export function useGetUpdatedTasks() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently()
      const res = await request
        .put(`${rootURL}/tasks`)
        .set('Authorization', `Bearer ${token}`)

      return res.body
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export function useGetTestTasks() {
  return useQuery({
    queryKey: ['testtasks'],
    queryFn: async () => {
      const res = await request.put(`${rootURL}/tasksTEST3`)
      return res.body
    },
  })
}

export function useCompleteSingleTest() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const token = await getAccessTokenSilently()
      const res = await request
        .put(`${rootURL}/tasks`)
        .set('Authorization', `Bearer ${token}`)

      return res.body
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
