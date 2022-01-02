export interface IUser {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  age?: number;
  behaviour?: "naughty" | "nice";
}
