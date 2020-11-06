import { INFO, LogLevel } from 'bunyan';
import { name, version, description } from '../../../../package.json';

const systemConfig = {
  version,
  description,
  environment: process.env.NODE_ENV || 'dev',
  appName: name,
  appNameUnderscore: `${name}_`.replace(new RegExp('-', 'g'), '_'),
  port: parseInt(process.env.PORT as string, 10) || 5301,
  originHeader: process.env.ORIGIN_HEADER || '*',
  logger: {
    environment: process.env.LOGGER_ENVIRONMENT || 'dev',
    baseLevel: (process.env.LOGGER_LEVEL as LogLevel) || INFO,
    sentryDsn: process.env.LOGGER_SENTRY_DSN || null,
    consoleEnabled: process.env.LOGGER_CONSOLE_ENABLED
      ? process.env.LOGGER_CONSOLE_ENABLED === 'true'
      : true,
    stdLogger: {
      enabled: process.env.LOGGER_STD_ENABLED ? process.env.LOGGER_STD_ENABLED === 'true' : true,
      stdoutPath: process.env.LOGGER_PATH_STDOUT || 'stdout.log',
      stderrPath: process.env.LOGGER_PATH_STDERR || 'stderr.log',
    },
  },
};

const appBanner = `${systemConfig.appName}/${systemConfig.version}`;

export { systemConfig, appBanner };
