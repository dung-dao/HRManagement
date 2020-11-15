export declare type KeyOrId = number | string;
export declare type Status = 'active' | 'inactive';
export declare type RefToTable<T> = KeyOrId | T;
export declare type DateString = string;
export declare type DocumentContent = unknown;

export interface Branch {
  id: KeyOrId;
  name: string;
  address: string;
  status: Status;
}

type EnumType<T extends string> = {
  id: KeyOrId;
  name: T;
  description: string;
};

export type WorkType = EnumType<
  'Full-time' | 'Part-time' | 'Hợp đồng' | 'Freelance' | 'Thực tập' | 'Thử việc' | 'Thời vụ'
>;
export type EmployeeType = EnumType<'BOD' | 'Quản lý' | 'Nhân viên'>;
export type ContractType = EnumType<'HĐLĐ không thời hạn' | 'HĐLĐ 1 năm' | 'HĐ thử việc'>;
export type FileType = EnumType<'pdf' | 'jpeg' | 'png'>; // the interface DocumentType is already reserved

export interface Document {
  id: KeyOrId;
  name: string;
  description: string;
  fileType: RefToTable<FileType>;
  content: DocumentContent;
}

export interface Contract {
  id: KeyOrId;
  contractNumber: string;
  contractType: RefToTable<ContractType>;
  dateStarted: DateString;
  dateEnd?: DateString;
  content: RefToTable<Document>;
}

export interface Position {
  id: KeyOrId;
  name: string;
  employeeType: RefToTable<EmployeeType>;
  workType: RefToTable<WorkType>;
  contractType: RefToTable<ContractType>;
}

export interface Employee {
  id: KeyOrId;
  code: string;
  name: string;
  organizationUnit: RefToTable<OrganizationUnit>;
  position: RefToTable<Position>;
  branch: RefToTable<Branch>;
  contracts: RefToTable<Contract>[];
}

export interface OrganizationUnit {
  id: KeyOrId;
  name: string;
  description: string;
  status: Status;
  branch?: RefToTable<Branch>;
  children?: RefToTable<OrganizationUnit>[];
  people: RefToTable<Employee>[];
  readonly numberOfPeople: number;
  readonly leaderName: string;
  leader: RefToTable<Employee>;
}