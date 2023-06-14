import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    console.log('err', err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

export function generateAccessToken(payload) {
  // expires after midnight
  // const expireAt = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
  return jwt.sign({ ...payload }, process.env.JWT_SECRET_TOKEN);
}