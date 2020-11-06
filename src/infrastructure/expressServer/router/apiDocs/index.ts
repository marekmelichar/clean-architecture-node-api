import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';

const swaggerYaml = YAML.load('./swagger.yaml');
export const apiDocsRouter = Router()
  .use('/', swaggerUi.serve)
  .get('/', swaggerUi.setup(swaggerYaml));
