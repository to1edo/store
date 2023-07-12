export interface IUser {
  _id: string;
  name: String;
  email: String;
  password?: String;
  role: "admin" | "client";
  createdAt?: string;
  updatedat?: string;
}
