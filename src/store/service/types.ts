import { addHours, format } from 'date-fns';
import { CookieOptions } from 'ngx-cookie-service';

export interface waiterInterface {
  _id: string;
  name: string;
  birthdate?: Date;
  preferences?: {
    maxActiveTableForPermission?: number;
    // waitToSitUntilEntreeOut: { min: number };
  };
  // store: string;
  // status: Boolean;
}

export interface shiftInterface {
  date: Date;
  section: number;
  waiter: string;
  store: string;
  shiftNumber: number; //for Grouping
  shiftTables: {};
}
export const cookieOptions: CookieOptions = {
  secure: true, // Mark the cookie as secure
  sameSite: 'None', // Set SameSite attribute to None
};

type Result = {
  error: string;
  message: string;
  result: any;
};
export const handleResponseBody = (result: Result): any => {
  return result.error || result.result || result.message || result;
};

export function fixDateTimeOffset(date: string) {
  const dateAdj = new Date(date);
  const minutes = dateAdj.getTimezoneOffset() * 60 * 1000;
  return new Date(minutes + dateAdj.getTime());
}
