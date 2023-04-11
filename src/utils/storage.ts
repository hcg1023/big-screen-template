import { ILoginRes } from '@/api/Login'

function isDefined(value: unknown) {
  return value !== undefined && value !== null
}

function createLocalStorageHandler<T = any>(key: string) {
  const set = (value: T) => {
    if (!isDefined(value)) {
      remove()
      return
    }
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
      throw e
    }
  }
  const get = (defaultValue: T): T | null => {
    const result = localStorage.getItem(key)
    try {
      if (!result) {
        return null
      }
      const parsed = JSON.parse(result)
      return isDefined(parsed) ? parsed : defaultValue
    } catch (e) {
      console.error(e)
      return isDefined(result) ? (result as unknown as T) : defaultValue
    }
  }

  const remove = () => {
    localStorage.removeItem(key)
  }

  return {
    set,
    get,
    remove,
  }
}

const userInfoStorageKey = 'userInfo'
export const userInfoStorage = createLocalStorageHandler<ILoginRes | null>(userInfoStorageKey)
