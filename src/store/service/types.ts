import { addHours, format } from 'date-fns';
import { CookieOptions } from 'ngx-cookie-service';

export interface waiterInterface {
  _id: string;
  name: string;
  birthdate?: Date;
  preferences?: {
    maxActiveTableForPermission?: number;
    waitToSitUntilEntreeOut: { min: number };
  };
  store: string;
  status: Boolean;
}

export interface shiftInterface {
  date: Date;
  section: number;
  // waiter: { [key: number]: waiterInterface }[];
  waiter: any;
  store: string;
  shiftNumber: number; //for Grouping
  shiftTables: any[];
}

export interface partyInterface {
  name?: string;
  partySize: number;
  phoneNumber?: string;
  reservationDate?: string;
  reservationDateTime?: Date;
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

export function getActiveWaiterFromShiftNumber(result: any, shiftNum: number) {
  try {
    return [...result.result?.[shiftNum]];
  } catch (e) {
    return [];
  }
}
