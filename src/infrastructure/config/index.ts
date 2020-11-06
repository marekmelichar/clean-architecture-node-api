import { applicationConfig } from './application';
import { systemConfig, appBanner } from './system';

const config = {
  ...applicationConfig,
  ...systemConfig,
  appBanner,
};

export { config };
