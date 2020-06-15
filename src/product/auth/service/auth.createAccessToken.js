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
      if (!err) {
        return payload.hash;
      } else {
        throw new ErrorMessage.ExpiredToken('유효하지 않은 토큰입니다.');
      }
    }
  );
};

const execCreateAccessToken = async (token) => {
  return getRefreshTokenHash(token)
    .then((hash) => userHelp.findUserByHash(hash))
    .then((user) => authHelp.createAccessToken(user));
};

export default execCreateAccessToken;
