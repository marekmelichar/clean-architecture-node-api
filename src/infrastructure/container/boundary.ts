import {
  ICustomersController
} from '../../delivery';

export interface IControllers {
  express: IExpressControllers;
}

export interface IExpressControllers {
  customers: ICustomersController
}
