import * as dotenv from "dotenv";
dotenv.config();
const compression = require("compression");
import express, { json } from "express";
import helmet from "helmet";
var cors = require('cors')
import checkAppointmentsController from "./controllers/checkAppointment.controller";
import telegramBotController from "./controllers/telegramBot.controller";
import initDataBase from "./database";
import { checkAppointmentServiceResult } from "./services/appointment-checker";
import createScheduledJobs, {
  cronJobDefaultConfig,
} from "./services/scheduldedFunctions";
import initilizeRollbarLogger from "./services/rollbar";
import mainController from "./controllers/main.controller";
const PORT = process.env.PORT || 3000;

const rollbar = initilizeRollbarLogger();

const middleWares = [json, helmet, compression, rollbar.errorHandler, cors];
const initMiddleWares = (app) =>
  middleWares.map((middleWare) => app.use(middleWare()));

const startApp = () => {
  const app = express();

  initMiddleWares(app);


  // start database
  // initDataBase();

  // rollbar logger for errors

  // routes
  app.get("/", mainController);
  app.get("/check-appointment", checkAppointmentsController);

  app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
  return app;
};

const checkAppointmentEveryDayJob = createScheduledJobs({
  expression: cronJobDefaultConfig.expression,
  callBack: checkAppointmentServiceResult,
});

const app = startApp();
