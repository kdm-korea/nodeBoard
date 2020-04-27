import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => {
  res.send('');
});

router.put('/:id', (req, res) => {
  res.send('');
});

router.post('/', (req, res) => {
  res.send('');
});

router.delete('/:id', (req, res) => {
  res.send('');
});

module.exports = router;
