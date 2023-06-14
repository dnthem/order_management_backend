export function shortenToken(token) {
  if (!token) return token;
  return token.slice(0, 5) + '...' + token.slice(-5);
}