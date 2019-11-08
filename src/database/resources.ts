import { Resource } from '../models/Resource';

import { db } from '../../knexfile';

export const find = async () => {
  const resources = await db<Resource>('resources');
  return resources;
};

export const findById = async (id: string | number) => {
  const [resource] = await db<Resource>('resources').where({ id });
  if (!resource) throw new Error('404');
  return resource;
};

export const insert = async (body: Resource) => {
  const [id] = await db<Resource>('resources').insert(body);
  return await findById(id);
};

export const update = async (body: Resource, id: string | number) => {
  await findById(id);
  const count = await db<Resource>('resources')
    .where({ id })
    .update(body);
  if (!count) throw new Error('Did not update!');

  return await findById(body.id || id);
};

export const remove = async (id: string | number) => {
  const resource = await findById(id);
  const count = await db<Resource>('resources')
    .where({ id })
    .del();
  if (!count) throw new Error('Did not remove!');

  return resource;
};
