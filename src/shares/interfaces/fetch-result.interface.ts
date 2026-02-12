export interface FetchResult<T> {
  isLoading: boolean;
  error: string | null;
  data: T
}
