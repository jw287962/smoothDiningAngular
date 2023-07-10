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
