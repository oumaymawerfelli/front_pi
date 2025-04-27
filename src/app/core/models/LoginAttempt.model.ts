export interface LoginAttempt {
    id: number;
    userId: number;
    failedAttempts: number;
    loginHour: number;
    suspicious: boolean;
    timestamp: string;
    action: string;
  }
  