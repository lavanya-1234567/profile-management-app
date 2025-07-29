export interface Profile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: string | number; // <-- allow optional
}
