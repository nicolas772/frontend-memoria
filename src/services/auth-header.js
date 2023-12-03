export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken, 'id': user.id };
  } else {
    return {};
  }
}