import { Commentaire } from "./commentaire";

export interface Post {
  id?: number;
  content: string;
  dateCreated?: Date;
  comments?: Commentaire[];
  img:string;
}
