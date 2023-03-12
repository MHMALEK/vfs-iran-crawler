import * as dotenv from "dotenv";
const http = require("http");
dotenv.config();
const compression = require("compression");
import express, { json } from "express";
import helmet from "helmet";
var cors = require("cors");
import checkAppointmentsController from "./controllers/checkAppointment.controller";
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

const createSocketIOServer = () => {
  const server = http.createServer(app);
  const { Server } = require("socket.io");
  const io = new Server(server);
  return io;
};

const socketServer = createSocketIOServer();

socketServer.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export { socketServer };
