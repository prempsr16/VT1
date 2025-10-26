// Fix: Replaced placeholder content with actual type definitions.
export enum Role {
  Admin = 'admin',
  Teacher = 'teacher',
  Student = 'student',
  Parent = 'parent',
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: Role;
}

export interface Notification {
  id: string | number;
  message: string;
}
