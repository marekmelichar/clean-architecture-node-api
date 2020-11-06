import { Prometheus } from 'rt-npm-metrics';
import { config } from '../config';
import { Logger } from 'rt-npm-logger';
import { Memwatch } from 'rt-npm-memwatch';

export const prometheus = new Prometheus(config.metrics);

export const logger = new Logger({
  ...config.logger,
  name: config.appName,
  release: config.version,
});

export const memwatch = new Memwatch(logger);
