const Rollbar = require("rollbar");

const initilizeRollbarLogger = () => {
  // include and initialize the rollbar library with your access token
  return new Rollbar({
    accessToken: "a448a0ece2324e8eb5a4273565a815ee",
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
};

export default initilizeRollbarLogger;
