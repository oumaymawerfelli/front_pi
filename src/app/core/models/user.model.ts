export interface User {
    idUser?: number;
    name: string;
    email: string;
    password: string;
    role: string;
    address: string;
    phone: string;
    cin: number;
    enabled: boolean;
    profilePicture: any; // Or the correct type based on your implementation
    dateOfBirth: Date;
    service: string;
    paymentInfo: string;
    companyName: string;
    institution: any; // Adjust according to your relationships
  }