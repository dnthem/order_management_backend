export function shortenToken(token) {
  if (!token) return token;
  return token.slice(0, 5) + '...' + token.slice(-5);
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}