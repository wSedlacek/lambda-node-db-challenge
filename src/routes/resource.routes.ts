import { Router } from 'express';
import { find, findById, insert } from '../database/resources';

export const resourceRouter = Router();

resourceRouter.get('/', async (req, res) => res.json(await find()));
resourceRouter.get('/:id', async ({ params: { id } }, res) => {
  try {
    const resource = await findById(id);
    res.json(resource);
  } catch (err) {
    if (err.toString() === 'Error: 404') res.status(404).send();
    else res.status(500).send();
  }
});

resourceRouter.post('/', async ({ body }, res) => {
  try {
    const resource = await insert(body);
    res.json(resource);
  } catch {
    res.status(400).send();
  }
});
