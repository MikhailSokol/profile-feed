declare global {
  namespace Express {
    interface User {
      userId: number;
      email?: string;
    }
  }
}

export {};
