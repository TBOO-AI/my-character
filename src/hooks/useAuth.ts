import { useLocalStorage } from '@/stores/local/state'

import { useClient } from './useClient'

type TokenType = {
  access_token: string
  refresh_token: string
}

type UserType = {
  id: string
  name: string
  username: string
}
export const useAuth = () => {
  const token = useLocalStorage((store) => store.token)
  const user = useLocalStorage((store) => store.user)
  const set = useLocalStorage((store) => store.set)
  const isClient = useClient()

  const isLogin: boolean | null = isClient ? !!token?.access_token : null

  const setToken = (token: TokenType) => {
    set('token', token)
  }
  const setUser = (user: UserType) => {
    set('user', user)
  }

  const logout = () => {
    set('token', null)
    set('user', null)
  }
  return { isLogin, token, user, setToken, setUser, logout }
}
