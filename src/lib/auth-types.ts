import "next-auth";

declare module "next-auth" {
  interface User {
    isAdmin?: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin?: boolean;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    isAdmin?: boolean;
  }
}
