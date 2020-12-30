import { Roles } from './AuthService';

export type RoleRequired = {
  type: '>=' | '<=' | '==';
  role: RoleNames;
};

export type RoleNames = Exclude<Roles, undefined> | 'Unauthorized';

export const isRoleValid = (requireRole: RoleRequired, userRole: RoleNames | Roles) => {
  if (userRole === undefined) userRole = 'Unauthorized';
  return (
    (requireRole.type === '>=' && roleLevel[userRole] >= roleLevel[requireRole.role]) ||
    (requireRole.type === '<=' && roleLevel[userRole] <= roleLevel[requireRole.role]) ||
    (requireRole.type === '==' && roleLevel[userRole] === roleLevel[requireRole.role])
  );
};

export const roleLevel: Record<RoleNames, number> = {
  Unauthorized: 0,
  User: 1,
  Manager: 2,
  Admin: 3,
} as const;

export const returnRoute: Record<RoleNames, string> = {
  Unauthorized: '/login',
  User: '/me',
  Manager: '/dashboard',
  Admin: '/dashboard',
} as const;
