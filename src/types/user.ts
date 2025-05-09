export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: "male" | "female" | "other"; // adjust if more genders are supported
  photoUrl: string;
  skills: string[]; // assuming it's an array of strings
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
