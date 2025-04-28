export interface LoanRequestResponseDto {
    requestId: number | null;  // Changed from 'id' to match backend
    status: string;
    message: string;
  }