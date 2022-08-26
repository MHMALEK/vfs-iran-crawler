import * as dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import helmet from "helmet";
import checkAppointmentsController from "./controllers/checkAppointment.controller";
import telegramBotController from "./controllers/telegramBot.controller";
import initDataBase from "./database";
import {
  initTelegramBotListeners,
  sendMessageToAllUsers,
} from "./services/telegram-bot";
import createScheduledJobs, {
  cronJobDefaultConfig,
} from "./scheduledFunctions";
import { checkAppointmentServiceResult } from "./services/appointment-checker";
import ErrorMiddleWare from "./errors/ErrorHandlerMiddleware";
const PORT = process.env.PORT || 3000;

const startApp = () => {
  const app = express();

  app.use(json());
  app.use(helmet());
  app.use(ErrorMiddleWare);

  // start database
  initDataBase();
  // routes
  app.get("/", checkAppointmentsController);
  app.get("/start-bot", telegramBotController);

  /* Error handler middleware */
  app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
};

// listen to messages request
initTelegramBotListeners();
const checkAppointmentEveryDayJob = createScheduledJobs({
  expression: cronJobDefaultConfig.expression,
  callBack: checkAppointmentServiceResult,
});

checkAppointmentEveryDayJob.start();

startApp();
