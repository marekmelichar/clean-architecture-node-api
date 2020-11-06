// import { QoS } from 'async-mqtt';

const applicationConfig = {
  // jobs: {
  //   gameLoop: {
  //     isEnabled: true,
  //     interval: '* * * * * *',
  //   },
  // },
  // dataManager: {
  //   host: process.env.MANAGER_URL || 'http://localhost:5300',
  //   mockUrl: 'http://localhost:5300/mock',
  //   slowTimeout: 5000,
  //   fastTimeout: 500,
  // },
  // cloud: {
  //   host: process.env.CLOUD_URL || 'http://localhost:5355',
  //   timeout: 5000,
  //   urlPrefix: process.env.CLOUD_URL_PREFIX || '',
  // },
  // cacheKeys: {
  //   collection: 'collection',
  // },
  // mqtt: {
  //   connectionString: process.env.MQTT_HOST || 'mqtt://localhost',
  //   port: ((process.env.MQTT_PORT as unknown) as number) || 1883,
  //   reconnectionInterval: 1000,
  //   topics: {
  //     handlers: {
  //       onConnected: '/rt-screen-control/self/mqttConnected',
  //     },
  //     output: {
  //       yellowBrightness: process.env.MQTT_TOPIC_YELLOW_BRIGHTNESS || '/screen/yellow/brightness',
  //       redBrightness: process.env.MQTT_TOPIC_RED_BRIGHTNESS || '/screen/red/brightness',
  //     },
  //   },
  //   defaultPublishOptions: {
  //     retain: false,
  //     qos: 0 as QoS,
  //   },
  // },
  // urls: {
  //   collection: '/v1/collection',
  //   trainConnection: {
  //     search: `/v1/connections/search`,
  //     detail: `/v1/connections/detail`,
  //     select: `/v1/connections/selectcurrent`,
  //     suggest: '/v1/connections/suggest',
  //   },
  // },
  // defaultBrightness: {
  //   red: parseInt(process.env.RED_SCREEN_DEFAULT_BRIGHTNESS || '50', 10),
  //   yellow: parseInt(process.env.YELLOW_SCREEN_DEFAULT_BRIGHTNESS || '50', 10),
  // },
  // socket: {
  //   connect: 'connect',
  //   disconnect: 'disconnect',
  //   yellow: {
  //     collection: 'collection',
  //     search: 'search',
  //     select: 'select',
  //     detail: 'detail',
  //     suggest: 'suggest',
  //     brightness: 'brightness',
  //   },
  //   green: {},
  // },
  // messages: {
  //   selectComplete: 'Connection selected successfully',
  // },
};

export { applicationConfig };
