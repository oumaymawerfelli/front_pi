import { Commentaire } from "./commentaire";

export interface Post {
  id?: number;
  content: string;
  dateCreated?: Date;
////
  imageUrl?: string;  // Add this
////
  comments?: Commentaire[];

  
}