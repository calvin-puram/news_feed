export default function ({ idToken, expiresIn }, { email, avatar }) {
  const tokenExpiration = Date.now() + expiresIn * 1000;
  localStorage.setItem('jwt', idToken);
  localStorage.setItem('expiresIn', tokenExpiration);
  localStorage.setItem('email', email);
  localStorage.setItem('avatar', avatar);
}
