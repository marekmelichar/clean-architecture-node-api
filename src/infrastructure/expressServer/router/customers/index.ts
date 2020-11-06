import { Router } from 'express';
import { IExpressControllers } from '../../../container/boundary';

export const customersRouter = (controllers: IExpressControllers) => {
  return Router()
    .get('/all', controllers.customers.all.bind(controllers.customers))
    .post('/create', controllers.customers.create.bind(controllers.customers))
    .put('/edit/:id', controllers.customers.edit.bind(controllers.customers))
    .delete('/delete/:id', controllers.customers.delete.bind(controllers.customers))
};
