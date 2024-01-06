export interface IProduct {
  _id: any;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  featured: boolean;
  recommended: boolean;
}
