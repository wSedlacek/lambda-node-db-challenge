import { Project } from '../models/Project';
import { ProjectResource } from '../models/ProjectResource';

import { db } from '../../knexfile';
import {
  convertArrIntToBoolean,
  convertCompletedIntToBoolean,
  convertCompletedBooleanToInt,
} from './utils/conversions';
import { findByProjectID as findTasks } from './tasks';
import { findByProjectID as findResources } from './resources';

export const find = async () => {
  const projects = await db<Project>('projects');
  const converted = convertArrIntToBoolean<Project>(projects);
  return converted;
};

export const findById = async (id: string | number, append = true) => {
  const [project] = await db<Project>('projects').where({ id });
  if (!project) throw new Error('404');
  const converted = convertCompletedIntToBoolean<Project>(project);
  const withTasks = await appendTask(converted);
  const withResources = await appendResources(converted);
  return append ? { ...withTasks, ...withResources } : converted;
};

export const insert = async (body: Project) => {
  const converted = convertCompletedBooleanToInt<Project>(body);
  const [id] = await db<Project>('projects').insert(converted);
  return await findById(id);
};

export const insertResource = async (project_id: string | number, resource_id: string | number) => {
  await db<ProjectResource>('project-resources').insert({ project_id, resource_id });
  return true;
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

const appendTask = async (project: Project) => {
  const tasks = await findTasks(project.id);
  return { ...project, tasks };
};

const appendResources = async (project: Project) => {
  const resources = await findResources(project.id);
  return { ...project, resources };
};
