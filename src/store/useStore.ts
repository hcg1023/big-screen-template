import store, { IActions, IMutations } from './index'
import { computed, ComputedRef, Ref } from 'vue'
import { CommitOptions, DispatchOptions } from 'vuex'

type IStore = typeof store

/**
 * setup use store composition api
 * @returns {IStore}
 */
export function useStore(): IStore {
  return store
}

export function useState<T extends keyof IStore['state']>(key: T): Ref<IStore['state'][T]> {
  const store = useStore()
  return computed({
    get() {
      return store.state[key]
    },
    set(val) {
      store.state[key] = val
    },
  })
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
export function useMutation<T extends keyof IMutations>(key: T) {
  const store = useStore()
  return (payload: Parameters<IMutations[T]>[1], options?: CommitOptions) => {
    return store.commit(key, payload, options)
  }
}

/**
 * setup use store action functions composition api
 * @param {string} key
 * @param {string} key
 * @returns {function(payload: any, options?: DispatchOptions): Promise<unknown>}
 */
export function useAction<T extends keyof IActions>(key: T) {
  const store = useStore()
  return (payload: Parameters<IActions[T]>[1], options?: DispatchOptions) =>
    store.dispatch(key, payload, options)
}
