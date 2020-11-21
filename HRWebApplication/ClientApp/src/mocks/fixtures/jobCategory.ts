import {JobCategoryDTO} from "services/ApiClient";

// loaị hình nhân sự
export const jobCategories = [
  {
    id: 1,
    name: 'BOD',
    description: 'Board of Director',
  },
  {
    id: 2,
    name: 'Nhân viên',
    description: 'Nhân viên quèn',
  },
  {
    id: 3,
    name: 'Quản lý',
    description: 'Quản lý Cu bưik',
  },
] as JobCategoryDTO[]
