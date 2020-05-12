import Cookie from 'js-cookie';

export default function ({ idToken, expiresIn }, { email, avatar }) {
  const tokenExpiration = Date.now() + expiresIn * 1000;
  localStorage.setItem('jwt', idToken);
  localStorage.setItem('expiresIn', tokenExpiration);
  localStorage.setItem('email', email);
  localStorage.setItem('avatar', avatar);
  Cookie.set('jwt', idToken);
  Cookie.set('expiresIn', tokenExpiration);
  Cookie.set('email', email);
  Cookie.set('avatar', avatar);
  console.log(Cookie.get());
}
