import { LignePanier } from "./LignePanier";

export interface Order {
    id?: number;
    customer?: any;
    status?: string;
    dateCommande?: Date;
    quantity?: number;
    paymentMethod?: string;
    lignePanier?: LignePanier[];
}