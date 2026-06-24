
export type Nullable<T> = T | null | undefined;

export type Result<T, E = string> = { success: true; value: T } | { success: false; error: E };

export type AsyncResult<T> = Promise<Result<T>>;

export type FormSubmitHandler<T> = (data: T) => Promise<void> | void;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export type SortDirection = 'asc' | 'desc';

export type PaginationOptions = {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: SortDirection;
};

export type ThemeVariant = 'light' | 'dark';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type AlertSeverity = 'success' | 'warning' | 'error' | 'info';
