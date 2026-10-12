/**
 * Thin wrapper around fetch for the Laravel public API.
 * Every response uses the envelope { success, message, data, meta? }.
 * GET responses are cached in memory for a few minutes so navigating back and forth is instant.
 */
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');
const cache = new Map();
const TTL = 5 * 60 * 1000;

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request(method, path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    // non-JSON (e.g. proxy error page)
  }
  if (!res.ok || !json?.success) {
    throw new ApiError(json?.message || `Request failed (${res.status})`, res.status, json?.errors || {});
  }
  return json;
}

export async function get(path, { fresh = false } = {}) {
  const hit = cache.get(path);
  if (!fresh && hit && Date.now() - hit.time < TTL) return hit.value;
  const promise = request('GET', path).catch((err) => {
    cache.delete(path);
    throw err;
  });
  cache.set(path, { time: Date.now(), value: promise });
  return promise;
}

export function post(path, body) {
  return request('POST', path, body);
}

export const api = {
  site: () => get('/public/site'),
  resolve: (slug) => get(`/public/resolve/${encodeURIComponent(slug)}`),
  page: (slug) => get(`/public/pages/${encodeURIComponent(slug)}`),
  posts: (params = {}) => get(`/public/posts?${new URLSearchParams(params)}`),
  post: (slug) => get(`/public/posts/${encodeURIComponent(slug)}`),
  categories: () => get('/public/categories'),
  brands: () => get('/public/brands'),
  galleries: () => get('/public/galleries'),
  gallery: (slug) => get(`/public/galleries/${encodeURIComponent(slug)}`),
  subscribe: (email, website = '') => post('/public/subscribers', { email, website, source: 'website' }),
  contact: (data) => post('/public/contact', data),
};
