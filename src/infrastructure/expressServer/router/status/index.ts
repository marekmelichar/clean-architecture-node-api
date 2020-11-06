import { Router } from 'express';
import { IExpressControllers } from '../../../container/boundary';

export const statusRouter = (controllers: IExpressControllers) => {
  return Router().use('*', controllers.status.execute.bind(controllers.status));
};
