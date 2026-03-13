import { computed } from "vue"

export function useVModel<T>(
  props: any,
  propName: string,
  emit: (event: string, ...args: any[]) => void
) {
  return computed<T>({
    get: () => props[propName],
    set: (value: T) => emit(`update:${propName}`, value) 
  })
}