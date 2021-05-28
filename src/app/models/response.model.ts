export interface ResponseI {
  status: boolean;
  msg: string;
  data: Data;
  token: string;
}

interface Data {
  role: string;
  google: boolean;
  nombre: string;
  email: string;
  img: string;
  uid: string;
}
