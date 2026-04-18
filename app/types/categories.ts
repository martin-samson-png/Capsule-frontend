export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  createdAt: string;
}

export interface CategoriesResponse {
  data: Category[];
}
