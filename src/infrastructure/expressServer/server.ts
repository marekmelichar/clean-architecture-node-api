import * as bodyParser from 'body-parser';
import * as express from 'express';
// @ts-ignore
import * as queryParser from 'express-query-int';
import * as session from 'express-session';
import * as formDataParser from 'express-form-data';
import * as http from 'http';
import * as cors from 'cors';
import { errorHandler, streamRequest, setHeaders, prometheusMonitoring } from '../container';

export class ExpressServer {
  private express: express.Application;
  private http: http.Server;
  private session: express.RequestHandler;

  constructor(router: express.Router, sessionOptions: session.SessionOptions) {
    this.session = session(sessionOptions);
    this.express = express();

    this.express.use(streamRequest);
    this.express.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(
      formDataParser.parse({
        autoClean: false,
      }),
    );
    this.express.use(formDataParser.stream());
    this.express.use(queryParser());
    this.express.use(this.session);
    this.express.use(setHeaders.getMiddleware());
    this.express.use(cors(setHeaders.getCorsOptions()));
    this.express.use(router);
    this.express.use(errorHandler);
    this.http = http.createServer(this.express);
    this.express.use(prometheusMonitoring);
  }

  public listen = (port: number, callback: Function) => {
    this.express.listen(port, callback());
  }

  public getServer = () => {
    return this.http;
  }

  public getSession = () => {
    return this.session;
  }

  public getApp = () => {
    return this.express;
  }
}
