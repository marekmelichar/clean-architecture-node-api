import { Router } from 'express';
import { apiDocsRouter } from './apiDocs';
import { customersRouter } from './customers';
import { IExpressControllers } from '../../container/boundary';

export const router = (controllers: IExpressControllers) => {
  return Router()
    .get('/v1/customers', customersRouter(controllers))
    .use('/api-docs', apiDocsRouter);
};
