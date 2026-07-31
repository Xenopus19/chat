export default interface ServerError {
  status: number;
  message: string;
  details?: string;
}