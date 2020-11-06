import * as YAML from 'yamljs';
import { CustomersController } from '../../delivery';
import { IControllers } from './boundary';
import {
  getCustomers
} from './useCases';

// ---- Http request controllers ----
const controllers: IControllers = {
  express: {
    customers: new CustomersController()
  },
};

export const swaggerApiDocs = YAML.load('./swagger.yaml');

export { controllers };
