export interface UseCase<T> {
  execute(...args: any[]): T;
}