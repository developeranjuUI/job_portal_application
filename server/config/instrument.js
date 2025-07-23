// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://c38e72a200b6cff2e2037ab0feffe0db@o4509718258057217.ingest.us.sentry.io/4509718264020992",
  integrations: [
    Sentry.mongooseIntegration(),
  ],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});