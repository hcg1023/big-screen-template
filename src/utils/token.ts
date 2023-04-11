import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token?: string) {
  if (token) {
    Cookies.set(TOKEN_KEY, token)
  } else {
    removeToken()
  }
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY)
}
