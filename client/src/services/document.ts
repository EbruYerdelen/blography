export interface Document {
  data: {
    _id: string;
    title: string;
    content?: string;
    createdAt?: string;
    userId: string;
  }[];
}
