/* global chrome */

export function getAuthToken() {
  return new Promise((resolve, reject) => {
    if (!chrome.identity?.getAuthToken) reject({ message: 'is not defined getAuthToken' });
    else chrome.identity.getAuthToken({ interactive: true }, (token) => resolve(token));
  });
}

export function removeCachedAuthToken(token) {
  return new Promise((resolve, reject) => {
    if (!chrome.identity?.removeCachedAuthToken) reject({ message: 'is not defined removeCachedAuthToken' });
    else chrome.identity.removeCachedAuthToken({ token }, () => resolve());
  });
}
