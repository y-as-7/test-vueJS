export interface Product {
  id: number;
  image: string;
  title: string;
  images: string[];
  price: number;
  description: string;
}

export interface IBreadCrumb {
  text: string;
  href: string;
}
