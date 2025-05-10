export interface Commentaire {
    id?: number;
    text: string;
    dateCreated?: Date;
    likeCount?: number;
    dislikeCount?: number;
    post?: any;
  }