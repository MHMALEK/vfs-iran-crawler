import { updateTime } from "../../models/Times";
import AppointmentCheckerService from "../appointment-checker";
import createScheduledJobs, {
  cronJobDefaultConfig,
} from "../scheduldedFunctions";
import { sendMessageToBot } from "../telegram-bot";

const getAndSaveAppointmentCronjobCallback = async () => {
  try {
    const result = await AppointmentCheckerService();
    updateTime(result);
    sendMessageToBot(result)
  } catch (e) {
    throw new Error(e);
  }
};

const checkAppointmentEveryDayJob = createScheduledJobs({
  expression: cronJobDefaultConfig.expression,
  callBack: getAndSaveAppointmentCronjobCallback,
});

const getAndSaveAppointmentCronjobService = () => {
  checkAppointmentEveryDayJob.start();
};

export default getAndSaveAppointmentCronjobService;
