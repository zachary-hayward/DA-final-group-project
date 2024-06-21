import request from 'superagent'

import type { User, UserData } from '../../models/growGrub'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getUserByAuth(token: string): Promise<User> {
  const result = await request.get(rootURL + '/users').set('Authorization', `Bearer ${token}`)
  return result.body
}

export async function addUser(userData: UserData, token:string) {
  const result = await request.post(rootURL + '/users').send(userData).set('Authorization', `Bearer ${token}`)
  return result.body
}
