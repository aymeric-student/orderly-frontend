/// <reference types="@angular/localize" />
import { AppComponent } from "@/app.component";
import { appConfig } from "@/app.config";
import { bootstrapApplication } from "@angular/platform-browser";
import * as Sentry from "@sentry/angular";
import { browserTracingIntegration } from "@sentry/angular";

const urlSentry =
    "https://1dac94f58e6b59d9af34521621e7470b@o4509287670349824.ingest.us.sentry.io/4509287673495552";

Sentry.init({
    dsn: urlSentry,
    integrations: [browserTracingIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost"],
    environment: "production",
    sendDefaultPii: true,
});

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
