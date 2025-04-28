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
    profilePicture: any; 
    profilePictureBase64?: string;
    dateOfBirth: Date;
    service: string;
    paymentInfo: string;
    companyName: string;
    institution: any; 
    status:string;
  }