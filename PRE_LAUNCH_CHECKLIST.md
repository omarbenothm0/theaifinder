Read this checklist before deploying to production. None of these are urgent while running locally, but should be addressed before real public traffic.

## Deferred Security Items

### Session Revocation / Session Invalidation
**Why it matters:** Cannot invalidate compromised session tokens before expiration (1 hour).  
**Priority:** P1  
**Files/systems likely requiring changes:** `lib/auth/adminSession.ts`, Redis or database for session tracking  
**Status:** Deferred

### Account Lockout
**Why it matters:** Unlimited failed login attempts per account enable targeted brute force attacks.  
**Priority:** P1  
**Files/systems likely requiring changes:** `lib/auth/adminSession.ts`, Redis or database for attempt tracking  
**Status:** Deferred

### Password Complexity Requirements
**Why it matters:** Users can set weak passwords that are vulnerable to brute force attacks.  
**Priority:** P1  
**Files/systems likely requiring changes:** `lib/auth/adminSession.ts`, password change interface  
**Status:** Deferred

### 2FA/MFA
**Why it matters:** Single-factor authentication (username + password) provides no protection against credential theft.  
**Priority:** P2  
**Files/systems likely requiring changes:** `lib/auth/adminSession.ts`, TOTP library, 2FA UI components  
**Status:** Deferred

### CAPTCHA / Bot Protection
**Why it matters:** No protection against automated login attacks and credential stuffing.  
**Priority:** P2  
**Files/systems likely requiring changes:** `app/api/admin/login/route.ts`, CAPTCHA service integration  
**Status:** Deferred

### Distributed Rate Limiting (Redis/Upstash)
**Why it matters:** In-memory rate limiting does not work across multiple instances in production deployment.  
**Priority:** P1  
**Files/systems likely requiring changes:** `lib/rate-limit.ts`, Redis/Upstash client, environment configuration  
**Status:** Deferred

### Session Management Features
**Why it matters:** No session rotation, renewal, idle timeout, or concurrent session limits reduce security control.  
**Priority:** P2  
**Files/systems likely requiring changes:** `lib/auth/adminSession.ts`, session management UI  
**Status:** Deferred

### jti-Based Session Fixation Protection
**Why it matters:** jti field is generated but unused, leaving theoretical session fixation vulnerability unaddressed.  
**Priority:** P2  
**Files/systems likely requiring changes:** `lib/auth/adminSession.ts`, Redis or database for jti tracking  
**Status:** Deferred

### Password Policy Enforcement
**Why it matters:** No password expiration, rotation requirements, or history enforcement.  
**Priority:** P2  
**Files/systems likely requiring changes:** `lib/auth/adminSession.ts`, password management system  
**Status:** Deferred

### Progressive Delay on Failed Login
**Why it matters:** Fixed 650ms delay on all failures is insufficient against automated attacks.  
**Priority:** P2  
**Files/systems likely requiring changes:** `app/api/admin/login/route.ts`, attempt tracking system  
**Status:** Deferred
