import { Task } from '../models/Task';

import { db } from '../../knexfile';
import {
  convertArrIntToBoolean,
  convertCompletedIntToBoolean,
  convertCompletedBooleanToInt,
} from './utils/conversions';
import { findById as findProject } from './projects';

export const find = async () => {
  const tasks = await db<Task>('tasks');
  const converted = convertArrIntToBoolean<Task>(tasks);
  const withProjects = converted.map(appendProject);
  return await Promise.all(withProjects);
};

export const findById = async (id: string | number) => {
  const [task] = await db<Task>('tasks').where({ id });
  if (!task) throw new Error('404');
  const converted = convertCompletedIntToBoolean<Task>(task);
  const withProject = await appendProject(converted);
  return withProject;
};

export const findByProjectID = async (project_id: string | number) => {
  const tasks = await db<Task>('tasks').where({ project_id });
  const converted = convertArrIntToBoolean<Task>(tasks);
  return converted;
};

export const insert = async (body: Task) => {
  const converted = convertCompletedBooleanToInt<Task>(body);
  const [id] = await db<Task>('tasks').insert(converted);
  return await findById(id);
};

export const update = async (body: Task, id: string | number) => {
  await findById(id);
  const converted = convertCompletedBooleanToInt<Task>(body);
  const count = await db<Task>('tasks')
    .where({ id })
    .update(converted);
  if (!count) throw new Error('Did not update!');

  return await findById(body.id || id);
};

export const remove = async (id: string | number) => {
  const task = await findById(id);
  const count = await db<Task>('tasks')
    .where({ id })
    .del();
  if (!count) throw new Error('Did not remove!');

  return task;
};

const appendProject = async (task: Task) => {
  const project = await findProject(task.project_id, false);
  const appended = { ...task };
  delete appended.project_id;
  return { ...appended, project };
};
