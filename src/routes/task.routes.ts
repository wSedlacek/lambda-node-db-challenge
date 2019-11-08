import { Router } from 'express';
import { find, findById, insert } from '../database/tasks';

export const taskRouter = Router();

taskRouter.get('/', async (req, res) => res.json(await find()));
taskRouter.get('/:id', async ({ params: { id } }, res) => {
  try {
    const project = await findById(id);
    res.json(project);
  } catch (err) {
    if (err.toString() === 'Error: 404') res.status(404).send();
    else res.status(500).send();
  }
});

taskRouter.post('/', async ({ body }, res) => {
  try {
    const project = await insert(body);
    res.json(project);
  } catch {
    res.status(400).send();
  }
});
