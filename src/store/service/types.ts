import { CookieOptions } from 'ngx-cookie-service';

export interface waiterInterface {
  name: string;
  birthdate?: Date;
  preferences?: {
    maxActiveTableForPermission?: number;
    // waitToSitUntilEntreeOut: { min: number };
  };
  // store: string;
  // status: Boolean;
}
export const cookieOptions: CookieOptions = {
  secure: true, // Mark the cookie as secure
  sameSite: 'None', // Set SameSite attribute to None
};
