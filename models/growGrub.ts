export interface User {
  username: string
  location: string
}
export interface UserDB extends User {
  id: number
}