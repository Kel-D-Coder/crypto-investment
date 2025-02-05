import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
    iat: number;
    user: [{
        _id: string;
        // add other user properties if needed
    }];
}

export function isTokenExpired(token: string): boolean {
    if (!token) return true; // No token means it's invalid or expired
      try {
            const { exp } = jwtDecode<DecodedToken>(token); // Decode the token to get the `exp` field
            const now = Date.now() / 1000; // Current time in seconds
          // console.log(jwtDecode<DecodedToken>(token).user[0]._id);
          if (exp < now) {
            localStorage.clear()
            return true; // Return true if the token has expired
          }
            return false
        } catch (error) {
            console.error('Error decoding token:', error);
            return true; // Treat as expired if decoding fails
        }
  }
