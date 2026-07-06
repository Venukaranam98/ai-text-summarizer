import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const tokensStr = localStorage.getItem('ai-text-summarizer-tokens');
  let authHeader = {};
  let currentRefreshToken = null;
  if (tokensStr) {
    try {
      const { accessToken, refreshToken } = JSON.parse(tokensStr);
      if (accessToken) {
        authHeader = { Authorization: `Bearer ${accessToken}` };
      }
      if (refreshToken) {
        currentRefreshToken = refreshToken;
      }
    } catch (e) {
      // ignore
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...authHeader,
    ...options.headers,
  };

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized automatically
  if (response.status === 401 && currentRefreshToken && endpoint !== '/auth/refresh' && endpoint !== '/auth/login') {
    try {
      // Attempt to refresh the token using raw fetch to avoid loop
      const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: currentRefreshToken })
      });

      if (!refreshRes.ok) {
        throw new Error('Session expired');
      }

      const newTokens = await refreshRes.json();
      
      // Save new tokens
      localStorage.setItem('ai-text-summarizer-tokens', JSON.stringify({
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token,
      }));

      // Retry the original request
      const newHeaders = {
        ...headers,
        Authorization: `Bearer ${newTokens.access_token}`
      };
      
      response = await fetch(url, {
        ...options,
        headers: newHeaders,
      });

    } catch (error) {
      // Refresh failed (token expired or invalid)
      localStorage.removeItem('ai-text-summarizer-tokens');
      toast.error('Your session has expired. Please log in again.');
      // Simple reload/redirect
      window.location.href = '/login';
      throw error;
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
};