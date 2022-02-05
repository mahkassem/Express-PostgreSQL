// find attribute 'password' and replace it's value with '*******'
import { User } from '../models/user.model'

const hidePassword = (user: User): User => {
  return {
    ...user,
    password: '*******',
  }
}

export { hidePassword }
