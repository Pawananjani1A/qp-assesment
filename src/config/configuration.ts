export const configuration = async (): Promise<Record<string, unknown>> => {
    // logger.info('NODE_ENV -> ', process.env.NODE_ENV);
    let envFile = `./${process.env.NODE_ENV || 'development'}`;
    // logger.info(`ENV_FILE -> ${envFile}`);
    // logger.info(`LOG_LEVEL --> ${process.env.LOG_LEVEL || 'info'}`);
    const environment = await import(envFile);
    return environment.config;
  };