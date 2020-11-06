import 'source-map-support/register';
import {
  logger,
  controllers,
  config,
  ExpressServer,
  router,
  dbMigration,
  redisConnection,
  schema,
} from './infrastructure';
// import { SocketServer } from './infrastructure/socketServer';
import { runAllJobs } from './infrastructure/container/jobs';
import { ApolloGraphqlServer } from './infrastructure/apolloServer';

process.on('unhandledRejection', (reason) => {
  logger.error(reason, 'UnhandledRejection error caught');
});
process.on('uncaughtException', (error) => {
  logger.error(error, 'UncaughtException error caught');
  process.nextTick(() => {
    process.exit(1);
  });
});

const initializationSequence = async () => {
  await dbMigration.up();
  await runAllJobs();

  const expressServer = new ExpressServer(
    router(controllers.express),
    redisConnection.getSessionOptions(),
  );
  expressServer.listen(config.port, () => {
    logger.info(`server running on port: ${config.port}`);
  });

  // new SocketServer(
  //   expressServer.getServer(),
  //   expressServer.getSession(),
  //   controllers.socket,
  //   config.redis,
  // ).listen(config.socketPort, () => {
  //   logger.info(`Sockets running on port: ${config.socketPort}`);
  // });

  // new ApolloGraphqlServer(expressServer.getApp(), expressServer.getServer(), schema).listen(
  //   config.apolloPort,
  //   () => {
  //     logger.info(`Apollo server running on port: ${config.apolloPort}`);
  //   },
  // );
};
initializationSequence();
