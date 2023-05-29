import * as dotenv from "dotenv";
dotenv.config();
const compression = require("compression");
import express, { json } from "express";
import helmet from "helmet";
var cors = require("cors");
import checkAppointmentsController, {
  showSoonestAppointmentFromDBController,
} from "./controllers/checkAppointment.controller";

import initilizeRollbarLogger from "./services/rollbar";
import { Server } from "socket.io";
import initDataBase from "./database";
import getAndSaveAppointmentCronjobService from "./services/get-soonest-appointment-cronjob";
import mainController from "./controllers/main.controller";
import startTelegramBotAndSaveUsersOnStartCommand from "./services/telegram-bot/init";
const PORT = process.env.PORT || 3002;

const rollbar = initilizeRollbarLogger();

const middleWares = [json, helmet, compression, rollbar.errorHandler, cors];
const initMiddleWares = (app) =>
  middleWares.map((middleWare) => app.use(middleWare()));

const startApp = () => {
  const app = express();

  initMiddleWares(app);

  // rollbar logger for errors

  // routes
  app.get("/", mainController);
  app.get("/check-appointment", checkAppointmentsController);
  app.get("/show-soonest", showSoonestAppointmentFromDBController);

  const server = app.listen(PORT, () =>
    console.log(`App listening at port ${PORT}`)
  );
  return { app, server };
};

initDataBase();

getAndSaveAppointmentCronjobService();

// init telegram bot

startTelegramBotAndSaveUsersOnStartCommand();

const { app, server } = startApp();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

export { app, server, io };
