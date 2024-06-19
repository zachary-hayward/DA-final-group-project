import request from 'superagent'

import type { User } from '../../models/growGrub'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getUserByAuth(token: string): Promise<User> {
  console.log(token)
  const result = await request.get(rootURL + '/users/').set('Authorization', `Bearer ${token}`)
  return result.body
}
