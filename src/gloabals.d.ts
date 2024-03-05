export {}

declare global {
  export type ValueOrNull<T> = T | null
  export type KeyValue<Key = string, TValue = any> = {
    [key: keyof Key]: TValue
  }
}
