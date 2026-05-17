/**
 * Security utility functions for input sanitization
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * Removes potentially dangerous HTML/JS characters while preserving safe content
 */
export function sanitizeInput(input: string, type: 'email' | 'text' | 'password' = 'text'): string {
  if (!input) return ''

  // For email: only allow valid email characters
  if (type === 'email') {
    return input
      .toLowerCase()
      .replace(/[^a-z0-9@._\-+]/g, '')
      .trim()
  }

  // For password: allow all characters but remove null bytes
  if (type === 'password') {
    return input.replace(/\0/g, '')
  }

  // For text: remove dangerous HTML/JS patterns
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/\0/g, '') // Remove null bytes
    .trim()
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates password requirements
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('at least 8 characters')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('lowercase letter')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('uppercase letter')
  }
  if (!/\d/.test(password)) {
    errors.push('number')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
