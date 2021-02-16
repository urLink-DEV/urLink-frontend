/* global chrome */

export function getAuthToken() {
  return new Promise((resolve, reject) => {
    const getAuthToken = chrome.identity?.getAuthToken;
    if (!getAuthToken) reject({ message: 'is not defined getAuthToken' });
    else getAuthToken({ interactive: true }, (token) => resolve(token));
  });
}

export function removeCachedAuthToken(token) {
  return new Promise((resolve, reject) => {
    const removeCachedAuthToken = chrome.identity?.removeCachedAuthToken;
    if (!removeCachedAuthToken) reject({ message: 'is not defined removeCachedAuthToken' });
    else removeCachedAuthToken({ token }, () => resolve());
  });
}
