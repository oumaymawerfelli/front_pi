export class Investment {
    id!: number;
    type!: string;
    investmentAmount!: number;
    expectedROI!: number;
    strategy!: string;
    investmentDate!: string;
    performance?: number;
    userId!: number;
    userName?: string; // 🆕 sera rempli après
  }
  
  export interface User {
    id: number;
    name: string;
  }
  
  
  
  export interface Project {
    id: number;
    name: string;
    description: string;
  }