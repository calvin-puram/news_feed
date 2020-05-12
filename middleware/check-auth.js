import { getUserFromCookies, getUserFromLocalStorage } from '@/utils/index';

export default function ({ store, req }) {
  if (process.server && !req) return;
  const userData = process.server
    ? getUserFromCookies(req)
    : getUserFromLocalStorage();

  if (!userData) {
  } else if (!userData.jwt || Date.now() > userData.expiresIn) {
    store.commit('auth/clear_token');
    store.commit('auth/clear_user');
  } else {
    store.commit('auth/set_token', userData.jwt);
    store.commit('auth/set_user', {
      email: userData.email,
      avatar: userData.avatar,
    });
    const timeToLogout = userData.expiresIn - Date.now();
    store.dispatch('auth/set_logout', timeToLogout);
  }
}
