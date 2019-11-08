import * as Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('tasks', (tbl) => {
    tbl.increments();
    tbl.string('description').notNullable();
    tbl.text('notes');
    tbl
      .boolean('completed')
      .defaultTo(0)
      .notNullable();

    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  await knex.schema.createTable('projects', (tbl) => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.text('description');
    tbl
      .boolean('completed')
      .defaultTo(0)
      .notNullable();
  });

  await knex.schema.createTable('resources', (tbl) => {
    tbl.increments();
    tbl.string('name').notNullable();
    tbl.text('description');
  });

  await knex.schema.createTable('project-resources', (tbl) => {
    tbl.increments();
    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE');

    tbl
      .integer('resource_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists('project-resources');
  await knex.schema.dropTableIfExists('resources');
  await knex.schema.dropTableIfExists('projects');
  await knex.schema.dropTableIfExists('tasks');
};
