import { config } from '../config';
import { logger, prometheus } from './sharedObjects';
import {
  GetTrackGeometriesGI,
  GetMaxSpeedGI,
  GetTrackDistanceGI,
  RefineLocationSpatialServiceGI,
  MqttEventImplementation,
} from '../storage';
import {
  FileStorage,
  TimetableGateway,
  FeedbackGateway,
  LocalCacheImplementation,
  SendMQTTMessageGateway,
} from 'rt-npm-utils';
import { MqttConnection, RestConnection, CacheFactory } from 'rt-npm-connections';

// timetable repository
export const timetableConnection = new RestConnection(
  config.userAgent,
  config.timeouts.timetable,
  prometheus,
  config.timetableUrl,
  logger,
);

export const timetableGateway = new TimetableGateway(
  timetableConnection,
  logger,
  config.urls.cloud,
  !!config.timetableUrl,
);

// Feedback repository
export const feedbackConnection = new RestConnection(
  config.userAgent,
  config.timeouts.feedback,
  prometheus,
  config.feedbackUrl,
  logger,
);

export const feedbackGateway = new FeedbackGateway(
  feedbackConnection,
  logger,
  config.urls.feedback,
  !!config.feedbackUrl,
);

// Local repository
export const cacheAdapter = new CacheFactory().create();
export const localCacheImplementation = new LocalCacheImplementation(cacheAdapter);

// File Storage
export const fileStorage = new FileStorage(config.data.volumePath);

// Spatial service repository
export const spatialServiceConnection = new RestConnection(
  config.userAgent,
  config.timeouts.spatial.slow,
  prometheus,
  config.spatialServiceUrl,
  logger,
);

export const fastSpatialServiceConnection = new RestConnection(
  config.userAgent,
  config.timeouts.spatial.fast,
  prometheus,
  config.spatialServiceUrl,
  logger,
);

export const spatialServiceGateway = {
  maxSpeed: new GetMaxSpeedGI(
    spatialServiceConnection,
    config.urls.spatialService.state,
    !!config.spatialServiceUrl,
  ),
  geometries: new GetTrackGeometriesGI(
    spatialServiceConnection,
    config.urls.spatialService.geometries,
    logger,
    !!config.spatialServiceUrl,
  ),
  locationCorrection: new RefineLocationSpatialServiceGI(
    fastSpatialServiceConnection,
    config.urls.spatialService.correctLocation,
    logger,
    !!config.spatialServiceUrl,
  ),
  trackDistance: new GetTrackDistanceGI(
    fastSpatialServiceConnection,
    config.urls.spatialService.trackDistance,
    !!config.spatialServiceUrl,
  ),
};

// Mqtt
const topicList = Object.values(config.mqtt.topics.handlers);
export const mqttConnection = new MqttConnection(config.mqtt, logger, topicList, prometheus);
export const mqttEventImplementation = new MqttEventImplementation(mqttConnection, logger);
export const sendMQTTMessageGateway = new SendMQTTMessageGateway(
  mqttConnection,
  {
    localCacheImplementation,
    topics: config.mqtt.topics.output,
    cacheKeys: config.cacheKeys.message,
  },
  logger,
);
