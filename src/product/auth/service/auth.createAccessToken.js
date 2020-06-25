import jwt from 'jsonwebtoken';
import authHelp from './auth.help.service';
import userHelp from '../../user/service/user.help.service';
import ErrorMessage from '../../help/exception';

const getRefreshTokenHash = async (token) => {
  if (token === undefined) {
    throw new ErrorMessage.UndefinedToken();
  }
  return jwt.verify(
    token.split('Bearer ')[1],
    process.env.REFRESH_JWT_KEY,
    (err, payload) => {
      if (err) {
        throw new ErrorMessage.ConflictError('유효하지 않은 토큰입니다.');
      }
      return payload.hash;
    }
  );
};

const execCreateAccessToken = async (token) => {
  const hash = await getRefreshTokenHash(token);
  const user = await userHelp.findUserByHash(hash);
  return authHelp.createAccessToken(user);
};

export default execCreateAccessToken;
