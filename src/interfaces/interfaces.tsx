export interface Email {
  id: number;
  email: string;
  nome: string;
  date: string;
  subject: string;
  body: string;
  attachment?: {
    filename: string;
    url: string;
    type: string;
  }[];
  type: string;
}
