/**
 * User Role Enum
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
  MODERATOR = 'moderator',
}

/**
 * User Status Enum
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
  PENDING_ACTIVATION = 'pending_activation',
}

/**
 * Account Type Enum
 */
export enum AccountType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
  ENTERPRISE = 'enterprise',
}
