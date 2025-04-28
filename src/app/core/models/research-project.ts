export interface ResearchProject {
    projectId: number;
    title: string;
    description: string;
    startDate: Date;
    estimatedDuration: number;
    researchFocus: string;
    status: string;
    soilType: string;
    waterRequirement: number;
    climateConditions: string;
    fundingSource: string;
    // user?: User[]; // Uncomment if you have a User model
  }
  