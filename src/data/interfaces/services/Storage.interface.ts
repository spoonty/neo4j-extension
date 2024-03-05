export interface Storage {
  set(
    key: string,
    value:
      | string
      | number
      | boolean
      | Array<string | number | boolean | KeyValue>
      | KeyValue,
  ): void
  get(
    key: string,
  ):
    | string
    | number
    | boolean
    | Array<string | number | boolean | KeyValue>
    | KeyValue
    | undefined
  delete(key: string): void
}
