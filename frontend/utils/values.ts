// export const primaryColor = "#4338ca"
export const primaryColor = "black"

export enum WorkModelOption {
    in_office,
    hybrid,
    remote
}

export enum RoleOptions {
    REGIONAL_MANAGER = "Regional Manager",
    ASST_REGIONAL_MANAGER = "Asst Regional Manager",
    SALES_HEAD = "Sales Head",
    SALES_ASSOCIATE = "Sales Associate",
    FINANCE_HEAD = "Finance Head",
    FINANCE_ANALYST = "Finance Analyst",
    SECURITY_OFFICER = "Security Officer",
    JANITOR = "Janitor",
    RECEPTIONIST = "Receptionist",
    UNASSIGNED = "Unassigned",
  }
  

export interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: bigint;
  password: string;
  objectUrl?: string | null;
  workModel: WorkModelOption;
  role: RoleOptions;
  officeId?: number | null;
  office?: Office | null;
  managed_office?: Office | null;
  assisted_office?: Office | null;
  desk_occupied?: Desk | null;
  cabin_occupied?: Cabin | null;
}

export interface Office {
  id: number;
  name: string;
  objectUrl?: string | null;
  employees?: Employee[];
  regional_manager_id?: number | null;
  regional_manager?: Employee | null;
  asst_regional_manager_id?: number | null;
  asst_regional_manager?: Employee | null;
  floors?: Floor[];
}

export interface Floor {
  id: number;
  name: string;
  desks?: Desk[];
  cabins?: Cabin[];
  officeId: number;
  office: Office;
}

export interface Desk {
  id: number;
  floorId: number;
  floor: Floor;
  occupiedById?: number | null;
  occupiedBy?: Employee | null;
}

export interface Cabin {
  id: number;
  floorId: number;
  floor: Floor;
  occupiedById?: number | null;
  occupiedBy?: Employee | null;
}