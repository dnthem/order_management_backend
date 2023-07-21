import { generateAccessToken, authenticateToken } from './jwt.js';

function phoneFormat(value) {
  return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function displayHttpInfo(httpMethod, param, code) {
  let colorCode = code < 300 ? '\x1b[32m' : '\x1b[31m'; // Green for code < 300, Red for code >= 400

  // Reset the console color after displaying the message
  const resetColor = '\x1b[0m';

  console.log(`${httpMethod} /${param} ${colorCode}${code}${resetColor}`);
}

export { 
  displayHttpInfo,
  phoneFormat,
  capitalize,
  generateAccessToken, 
  authenticateToken
};