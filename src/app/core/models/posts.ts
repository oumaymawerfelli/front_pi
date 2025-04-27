import { Commentaire } from "./commentaire";
import { PostCategory } from "./PostCategory";


export interface Post {
  id?: number;
  content: string;
  dateCreated?: Date;
  comments?: Commentaire[];
  img:string;
  category: PostCategory; 

}