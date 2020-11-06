import { logger, prometheus } from './sharedObjects';
import { config } from '../config';
import * as YAML from 'yamljs';
import {
  StatusController,
  GetCollectionController,
  PostEventController,
  TrainConnectionsController,
  GPSMqttHandler,
  IMqttHandler,
  PassengerCountMqttHandler,
  TotalPassengerCountMqttHandler,
  BrightnessHandler,
  JobsController,
} from '../../delivery';
import { IControllers } from './boundary';
import { TrainConnectionCheckJob, StoreCacheJob, SendTrainMetricsJob } from '../job';
import { mqttConnection, mqttEventImplementation } from './repositories';
import {
  backupCacheToAFile,
  sendTrainMetrics,
  updateData,
  getStatus,
  setPassengerCount,
  setGpsData,
  setScreenBrightness,
  loadCollection,
  operateConnection,
} from './useCases';
import { PrometheusMonitoring } from 'rt-npm-metrics';
import { LogRequest, ErrorHandler, StreamRequest, SetHeaders } from 'rt-npm-errors';
import { SendEvent } from '../../application';

// middleWares
export const streamRequest = new StreamRequest(logger).getMiddleware();
export const logRequest = new LogRequest(logger).getMiddleware();
export const setHeaders = new SetHeaders(config.appBanner, config.appName).getMiddleware();
export const prometheusMonitoring = new PrometheusMonitoring(prometheus).getMiddleware();
export const errorHandler = new ErrorHandler(logger).getMiddleware();

// ---- Mqtt message handling ----
const passengerCountHandler = new PassengerCountMqttHandler(
  {
    setData: setPassengerCount,
  },
  logger,
);
const totalPassengerCountHandler = new TotalPassengerCountMqttHandler(
  {
    setData: setPassengerCount,
  },
  logger,
);
const gpsHandler = new GPSMqttHandler(
  {
    setData: setGpsData,
  },
  logger,
);
const brightnessHandler = new BrightnessHandler(
  {
    saveBrightness: setScreenBrightness,
  },
  logger,
);
const handlersMap: Map<string, IMqttHandler> = new Map([
  [config.mqtt.topics.handlers.gps, gpsHandler as IMqttHandler],
  [config.mqtt.topics.handlers.passengerCount, passengerCountHandler as IMqttHandler],
  [config.mqtt.topics.handlers.totalPassengerCount, totalPassengerCountHandler as IMqttHandler],
  [config.mqtt.topics.handlers.redBrightness, brightnessHandler as IMqttHandler],
  [config.mqtt.topics.handlers.yellowBrightness, brightnessHandler as IMqttHandler],
]);
mqttConnection.connect();
mqttConnection.addHandlers(handlersMap);

// ---- Http request controllers ----
const controllers: IControllers = {
  express: {
    status: new StatusController(getStatus),
    getCollection: new GetCollectionController(loadCollection),
    postEvent: new PostEventController(new SendEvent(mqttEventImplementation)),
    connections: new TrainConnectionsController(operateConnection, logger),
  },
  job: new JobsController({
    storeCache: {
      backupCache: backupCacheToAFile,
    },
    packages: {
      sendTrainMetrics,
    },
    trainConnectionCheck: {
      updateTrainData: updateData,
      updateConnection: operateConnection,
    },
  }),
};

const jobs = {
  gameLoopJob: new TrainConnectionCheckJob({
    logger,
    isEnabled: config.jobs.gameLoop.isEnabled,
    interval: config.jobs.gameLoop.interval,
    controller: controllers.job,
  }),
  storeCacheJob: new StoreCacheJob(controllers.job, config.jobs.storeCache.interval, logger),
  trainMetricsJob: new SendTrainMetricsJob(
    controllers.job,
    config.jobs.trainMetrics.interval,
    logger,
  ),
};

export const swaggerApiDocs = YAML.load('./swagger.yaml');

export { logger, controllers, jobs, backupCacheToAFile, operateConnection };
