
interface OrderProps{
  id:         string;
  name:       string | null;
  created_at: Date;
  updated_at: Date;
  table:      number;
  status:     boolean;
  draft:      boolean;
}


export type { OrderProps }