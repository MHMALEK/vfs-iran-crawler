import * as dotenv from "dotenv";
dotenv.config();
const compression = require("compression");
import express, { json } from "express";
import helmet from "helmet";
import checkAppointmentsController from "./controllers/checkAppointment.controller";
import telegramBotController from "./controllers/telegramBot.controller";
import initDataBase from "./database";
import { checkAppointmentServiceResult } from "./services/appointment-checker";
import createScheduledJobs, {
  cronJobDefaultConfig,
} from "./services/scheduldedFunctions";
import initilizeRollbarLogger from "./services/rollbar";
const PORT = process.env.PORT || 3000;


const middleWares = [json, helmet, compression];
const initMiddleWares = (app) =>
  middleWares.map((middleWare) => app.use(middleWare()));

const startApp = () => {
  const app = express();

  initMiddleWares(app);

  // start database
  initDataBase();

  // rollbar logger for errors
  initilizeRollbarLogger();

  // routes
  app.get("/", checkAppointmentsController);
  app.get("/start-bot", telegramBotController);

  app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
};

const checkAppointmentEveryDayJob = createScheduledJobs({
  expression: cronJobDefaultConfig.expression,
  callBack: checkAppointmentServiceResult,
});
// checkAppointmentEveryDayJob.start();


startApp();
