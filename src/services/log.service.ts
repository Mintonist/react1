// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';
// import { config } from '../config';

function init() {
  // Sentry.init({
  //   dsn: config.SENTRY_DSN,
  //   Integrations: [new Integrations.BrowserTracing()],
  //   traceSampleRate: 1.0,
  // });
}

function log(data) {
  //Sentry.captureException(data);
}

const logService = { init, log };
export default logService;
