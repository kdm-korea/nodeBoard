import express from 'express';
import { save } from '../controller/post.controller';

const router = express.Router();

router.get('/:id', (req, res) => {
  res.json(req.body);
});

router.put('/:id', (req, res) => {
  res.send('');
});

router.post('/', async (req, res) => {
  res.json(await save(req));
});

router.delete('/:id', (req, res) => {
  res.send('');
});

module.exports = router;
