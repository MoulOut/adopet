import express from 'express';

const router = express.Router();

router.post('/')
      .get('/')
      .put('/:id')
      .delete('/:id')

export default router;
