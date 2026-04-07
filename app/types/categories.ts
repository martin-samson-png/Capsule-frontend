export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  created_at: string;
}

export interface CategoriesResponse {
  data: Category[];
}
