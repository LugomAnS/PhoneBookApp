export interface ServerErrorMessage {
  field: string;
  message: string;
}

export interface ExceptionError {
  statuscode: number;
  message: string;
  details?: string;
}
