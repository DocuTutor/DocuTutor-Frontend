/**
 * Authentication Status Enum
 */
export enum AuthStatus {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  LOADING = 'loading',
  ERROR = 'error',
  PENDING_EMAIL_VERIFICATION = 'pending_email_verification',
}

/**
 * Password Strength Enum
 */
export enum PasswordStrength {
  WEAK = 'weak',
  FAIR = 'fair',
  GOOD = 'good',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong',
}

/**
 * Authentication Method Enum
 */
export enum AuthMethod {
  EMAIL = 'email',
  GOOGLE = 'google',
  MICROSOFT = 'microsoft',
  GITHUB = 'github',
}
