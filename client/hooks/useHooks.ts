import { useMutation, useQueryClient, MutationFunction } from "@tanstack/react-query"
import { User } from "../../models/growGrub.ts"
import * as API from '../apis/growGrub.ts'

export function useHooks() {
  return {
    addUser: useAddUser()
  }
}

function useMutationTemplate<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  queryKeyArry: Array<string | number>
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

interface UseAddUser { userData: User; token: string}
function useAddUser() {
  return useMutationTemplate(({userData, token}: UseAddUser) => API.addUser(userData, token), ['recipes'])
}