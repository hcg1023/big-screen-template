import store from './index'
import { computed } from 'vue'
import { CommitOptions, DispatchOptions } from 'vuex'

type IStore = typeof store

/**
 * setup use store composition api
 * @returns {IStore}
 */
export function useStore(): IStore {
  return store
}

/**
 * setup use store getters composition api
 * @param {string} key - getters key
 * @returns {ComputedRef<Store.getters[key]>}
 */
export function useGetter<T extends keyof IStore['getters']>(key: T): IStore['getters'][T] {
  const store = useStore()
  return computed(() => store.getters[key])
}

/**
 * setup use store mutation functions composition api
 * @param {string} key
 * @returns {function(payload: any, options?: any): void}
 */
export function useMutation<T extends string>(key: T) {
  const store = useStore()
  return (payload: any, options?: CommitOptions) => {
    return store.commit(key, payload, options)
  }
}

/**
 * setup use store action functions composition api
 * @param {string} key
 * @param {string} key
 * @returns {function(payload: any, options?: DispatchOptions): Promise<unknown>}
 */
export function useAction<T extends string>(key: T) {
  const store = useStore()
  return (payload: any, options?: DispatchOptions) => store.dispatch(key, payload, options)
}
