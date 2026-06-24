
export interface IPaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}


export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface IFormError {
  field: string;
  message: string;
  code: string;
}
