interface ProductProps {
  id:          string;
  name:        string;
  price:       string;
  description: string;
  banner:      string;
  created_at:  Date;
  updated_at:  Date;
  category_id: string;
};

export type { ProductProps };