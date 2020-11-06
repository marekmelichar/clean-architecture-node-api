import { Router } from 'express';
import { IControllers } from '../../../container/boundary';

export const customersRouter = (controllers: IControllers) => {
  return Router()
    .get('/all', controllers.express.customers.all.bind(controllers.express.customers))
    .post('/create', controllers.express.customers.create.bind(controllers.express.customers))
    .put('/edit/:id', controllers.express.customers.edit.bind(controllers.express.customers))
    .delete('/delete/:id', controllers.express.customers.delete.bind(controllers.express.customers))
};
