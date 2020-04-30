import express from 'express';
import { findAll, save } from '../controller/post.controller';

const router = express.Router();

router.get('/:id', async (req, res) => {
  console.log('Route ::::::::::::::::::::::::::::::::::::::::::::::::');
  res.json(await findAll(req));
});

router.put('/:id', (req, res) => {
  res.send('');
});

router.post('/', async (req, res) => {
  console.log('Route ::::::::::::::::::::::::::::::::::::::::::::::::');
  res.json(await save(req));
});

router.delete('/:id', (req, res) => {
  res.send('');
});

module.exports = router;
