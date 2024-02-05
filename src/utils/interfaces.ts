import { ErrorResponse } from 'resend';

export interface EmailResponse {
  data: {
    id: string;
  } | null;
  error: ErrorResponse | null;
}
