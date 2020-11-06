import {
  // IStatusController,
  // IGetCollectionController,
  // IPostEventController,
  // ITrainConnectionsController,
  // IJobsController,
  ICustomersController
} from '../../delivery';

export interface IControllers {
  express: IExpressControllers;
}

export interface IExpressControllers {
  // status: IStatusController;
  // getCollection: IGetCollectionController;
  // postEvent: IPostEventController;
  // connections: ITrainConnectionsController;
  // getAllCustomers: IGetAllCustomersController;
  // createCustomer: ICreateCustomerController;
  // editCustomer: IEditCustomerController;
  // deleteCustomer: IDeleteCustomerController;
  customers: ICustomersController
}
