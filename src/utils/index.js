export function getAuthToken() {
  try {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find((cookie) => cookie.includes('authorization'));
    return authCookie.split('=')[1];
  }
  catch (error) {
    return null;
  }
}
