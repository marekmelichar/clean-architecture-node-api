import { Router } from 'express';
import { IControllers } from '../../../container/boundary';

export const customersRouter = (controllers: IControllers) => {
  return Router()
    .get('/all', controllers.express.getAllCustomers.all.bind(controllers.express.getAllCustomers))
    .post('/create', controllers.express.createCustomer.create.bind(controllers.express.createCustomer))
    .put('/edit/:id', controllers.express.editCustomer.edit.bind(controllers.express.editCustomer))
    .delete('/delete/:id', controllers.express.deleteCustomer.delete.bind(controllers.express.deleteCustomer))
};
