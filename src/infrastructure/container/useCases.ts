import {
  spatialServiceGateway,
  timetableGateway,
  localCacheImplementation,
  fileStorage,
  feedbackGateway,
  sendMQTTMessageGateway,
  cacheAdapter,
} from './repositories';
import {
  LoadCollection,
  SetGPSData,
  SetPassengerCount,
  GetStatus,
  SetScreenBrightness,
} from '../../application';
import { logger } from '.';
import { config } from '../config';
import {
  UpdateData,
  OperateConnection,
  GetTrainIdentifiers,
  SendTrainMetrics,
  BackupCacheToAFile,
} from 'rt-npm-utils';

export const getStatus = new GetStatus({ appName: config.appName, version: config.version });

export const getTrainIdentifiers = new GetTrainIdentifiers(
  {
    localCacheImplementation,
    cacheKeys: config.cacheKeys,
  },
  config.vehicleId,
);

export const sendTrainMetrics = new SendTrainMetrics(
  {
    getTrainIdentifiers,
    localCacheImplementation,
    feedbackRepo: feedbackGateway,
    cacheKeys: config.cacheKeys,
  },
  config.feedback.priorities.low,
  config.feedback.types.trainMetrics,
);

export const updateData = new UpdateData(
  {
    timetableGateway,
    localCacheImplementation,
    getMaxSpeed: spatialServiceGateway.maxSpeed,
    getTrackGeometries: spatialServiceGateway.geometries,
    getTrackDistance: spatialServiceGateway.trackDistance,
    cacheKeys: config.cacheKeys,
  },
  logger,
);

export const operateConnection = new OperateConnection(
  {
    localCacheImplementation,
    timetableGateway,
    sendTrainMetrics,
    sendMqtt: sendMQTTMessageGateway,
    inStopRadius: config.inStopRadius,
    approachingStopRadius: config.approachingStopRadius,
    cacheKeys: config.cacheKeys,
  },
  logger,
);

export const backupCacheToAFile = new BackupCacheToAFile(
  {
    fileStorage,
    cacheAdapter,
    filename: { localCacheImplementation: config.data.volumeFile },
    directory: { localCacheImplementation: config.data.volumeDir },
  },
  logger,
);

export const setGpsData = new SetGPSData({
  localCacheImplementation,
  cacheKeys: config.cacheKeys,
});

export const setScreenBrightness = new SetScreenBrightness({
  localCacheImplementation,
  cacheKeys: config.cacheKeys,
});

export const setPassengerCount = new SetPassengerCount(
  {
    localCacheImplementation,
    getTrainIdentifiers,
    cacheKeys: config.cacheKeys,
    feedback: {
      gateway: feedbackGateway,
      priority: config.feedback.priorities.mid,
      type: {
        station: config.feedback.types.passengerCountStation,
        timeSeries: config.feedback.types.passengerCountTimeSeries,
      },
    },
    vehicleId: config.vehicleId,
  },
  logger,
);

export const loadCollection = new LoadCollection({
  localCacheImplementation,
  cacheKeys: config.cacheKeys,
  useCases: {
    connection: operateConnection,
  },
});
