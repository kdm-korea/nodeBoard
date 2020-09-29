import express from 'express';
import swaggerDoc from './lib/swaggerDoc';
import db from './config/mariadb.config';
import post from './product/post/post.router';
import user from './product/user/user.router';
import auth from './product/auth/auth.router';
import comment from './product/comment/comment.router';
import NotFoundHandler from './middleware/error/error.NotFound.handler';
import ErrorHandler from './middleware/error/error.handler';

const app = express();

db.sequelize
  // .sync()
  .authenticate()
  .then(() => console.log('✔ Success DB connection!'))
  .catch((err) => {
    console.log(`✗ DB connection error. :::: ${err}`);
    process.exit();
  });

app.use(express.json());

app.use('/', user);

app.use('/', post);

app.use('/', comment);

app.use('/', auth);

app.use(swaggerDoc);

app.use(NotFoundHandler);

app.use(ErrorHandler);

app.listen(8080, () => console.log('✔ Server Runnning.'));

export default app;
