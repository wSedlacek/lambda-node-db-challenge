import { Project } from '../models/Project';
import { ProjectResource } from '../models/ProjectResource';
import { Task } from '../models/Task';

import { db } from '../../knexfile';
import {
  convertArrIntToBoolean,
  convertCompletedIntToBoolean,
  convertCompletedBooleanToInt,
} from './utils/conversions';

export const find = async () => {
  const projects = await db<Project>('projects');
  const converted = convertArrIntToBoolean<Project>(projects);
  return converted;
};

export const findById = async (id: string | number) => {
  const [project] = await db<Project>('projects').where({ id });
  if (!project) throw new Error('404');
  const converted = convertCompletedIntToBoolean<Project>(project);
  return converted;
};

export const insert = async (body: Project) => {
  const converted = convertCompletedBooleanToInt<Project>(body);
  const [id] = await db<Project>('projects').insert(converted);
  return await findById(id);
};

export const update = async (body: Project, id: string | number) => {
  await findById(id);
  const converted = convertCompletedBooleanToInt<Project>(body);
  const count = await db<Project>('projects')
    .where({ id })
    .update(converted);
  if (!count) throw new Error('Did not update!');

  return await findById(body.id || id);
};

export const remove = async (id: string | number) => {
  const project = await findById(id);
  const count = await db<Project>('projects')
    .where({ id })
    .del();
  if (!count) throw new Error('Did not remove!');

  return project;
};
