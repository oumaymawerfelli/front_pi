import { Commentaire } from "./commentaire";
import { PostCategory } from "./PostCategory";
import { User } from "./user.model";


export interface Post {
  id?: number;
  content: string;
  dateCreated?: Date;
  comments?: Commentaire[];
  img:string;
  category: PostCategory; 
  pinned?: boolean;  // Add this
  createdBy?: User;

}