// Token management utility for chat app
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  // Read token from cookie (where backend stores it)
  const token = getCookie('authToken');
  console.log('Getting auth token:', token ? `Token found (length: ${token.length})` : 'No token found');
  console.log('All cookies:', document.cookie);
  return token;
};

export const getCookie = (cookieName: string): string | null => {
  if (typeof window === 'undefined') return null;
  const value = document.cookie.split("; ").find((s) => s.startsWith(cookieName))?.split("=")[1];
  return value || null;
};

// Note: Tokens are managed via cookies by the backend
// No need for manual token setting/removal as cookies are handled automatically

export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  console.log('Token found:', token ? 'Yes' : 'No'); // Debug log
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Utility function for making authenticated requests
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
