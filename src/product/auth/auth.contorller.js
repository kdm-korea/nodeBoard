import userService from '../user/service/user.help.service';
import authService from './auth.service';

const execCreateAccessToken = async (req, res) => {
  await userService
    .findUserByHash(req.user.hash)
    .then((user) => authService.createAccessToken(user))
    .then((accessToken) => res.json({ accesstoken: accessToken }))
    .catch((error) => res.status(401).json({ message: error.message }));
};

export default { execCreateAccessToken };
