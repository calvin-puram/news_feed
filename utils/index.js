import Cookies from 'js-cookie';

export const saveUsers = ({ idToken, expiresIn }, { email, avatar }) => {
  const tokenExpiration = Date.now() + expiresIn * 1000;
  localStorage.setItem('jwt', idToken);
  localStorage.setItem('expiresIn', tokenExpiration);
  localStorage.setItem('email', email);
  localStorage.setItem('avatar', avatar);
  Cookies.set('jwt', idToken);
  Cookies.set('expiresIn', tokenExpiration);
  Cookies.set('email', email);
  Cookies.set('avatar', avatar);
};

export const getUserFromCookies = (req) => {
  if (!req.headers.cookie) return;

  const jwtCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('jwt='));

  const expiresInCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('expiresIn='));

  const emailCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('email='));

  const avatarCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith('avatar='));

  if (!jwtCookie || !expiresInCookie || !emailCookie || !avatarCookie) return;
  const jwt = jwtCookie.split('=')[1];
  const expiresIn = expiresInCookie.split('=')[1];
  const email = emailCookie.split('=')[1];
  const avatar = avatarCookie.split('=')[1];

  return { jwt, expiresIn, email, avatar };
};

export const getUserFromLocalStorage = () => {
  if (localStorage) {
    const jwt = localStorage.getItem('jwt');
    const expiresIn = localStorage.getItem('expiresIn');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');

    return { jwt, expiresIn, email, avatar };
  }
};

export const clearSaveUserData = () => {
  if (!process.server) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('avatar');
    localStorage.removeItem('expiresIn');
  }

  Cookies.remove('jwt');
  Cookies.remove('email');
  Cookies.remove('avatar');
  Cookies.remove('expiresIn');
};
