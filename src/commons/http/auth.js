import { STORAGE, TOKEN_NAME, UPDATE_TOKEN_NAME } from 'setting';

export function getAccessToken() {
  return STORAGE.getItem(TOKEN_NAME) || '';
}

export function getRefreshToken() {
  return STORAGE.getItem(UPDATE_TOKEN_NAME) || '';
}

export function setAccessToken(token = {}) {
  const accessToken = token.access || '';
  const refreshToken = token.refresh || '';
  STORAGE.setItem(TOKEN_NAME, accessToken || STORAGE.getItem(TOKEN_NAME));
  STORAGE.setItem(UPDATE_TOKEN_NAME, refreshToken || STORAGE.getItem(UPDATE_TOKEN_NAME));
}

export function removeAccessToken() {
  STORAGE.setItem(TOKEN_NAME, '');
  STORAGE.setItem(UPDATE_TOKEN_NAME, '');
}
