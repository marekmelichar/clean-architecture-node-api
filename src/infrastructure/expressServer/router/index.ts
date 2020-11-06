import { Router } from 'express';
import { statusRouter } from './status';
import { apiDocsRouter } from './apiDocs';
import { customersRouter } from './customers';
import { IExpressControllers } from '../../container/boundary';

export const router = (controllers: IExpressControllers) => {
  return Router()
    .get('/', statusRouter(controllers))
    .get('/v1/customers', customersRouter(controllers))
    .use('/status', statusRouter(controllers))
    .use('/api-docs', apiDocsRouter);
};
