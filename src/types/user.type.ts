export type User = {
  id: string;
  fullname: string;
  email: string;
  password?: string;
  image: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  type?: string;
};
