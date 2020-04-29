import express from 'express';
import db from './config/mariadb.config';
import post from './routers/post.router';

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('✓ DB connection success.');
  })
  .catch((err) => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

app.use(express.json());

app.use('/post', post);

app.listen(8080, () => {});
