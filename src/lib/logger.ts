const isDevelopment = import.meta.env.DEV;

export const logger = {
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    } else {
      // En production, envoyer à un service de logging (Sentry, LogRocket, etc.)
      // Sentry.captureException(new Error(args.join(' ')));
    }
  },
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
};
