// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://82d8b3bae323825dcb7ddeb4ae1cbbbb@o4509718258057217.ingest.us.sentry.io/4509926499418112",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  // tracesSampleRate: 1.0,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

Sentry.profiler.startProfiler();

Sentry.startSpan(
  {
    name: "My first transaction",
  },
  () => {}
);

Sentry.profiler.stopProfiler();
