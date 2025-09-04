import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68a29dee67b48f7c791f337f", 
  requiresAuth: true // Ensure authentication is required for all operations
});
