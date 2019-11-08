import * as express from 'express';
import * as helmet from 'helmet';

import { projectRouter } from './routes/project.routes';
import { taskRouter } from './routes/task.routes';
import { resourceRouter } from './routes/resource.routes';

export const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/project', projectRouter);
server.use('/api/task', taskRouter);
server.use('/api/resource', resourceRouter);
