import { getSoonestTime } from "../models/Times";
import AppointmentCheckerService from "../services/appointment-checker";

const checkAppointmentsController = async (req, res, next) => {
  try {
    const soonestTime = await AppointmentCheckerService();
    res.json({ soonestTime });
  } catch (e) {
    next(e);
    throw new Error(e);
  }
};

export const showSoonestAppointmentFromDBController = async (req, res, next) => {
  try {
    const soonestTime = await getSoonestTime();
    res.send(soonestTime);
  } catch (e) {
    next(e);
    throw new Error(e);
  }
};

export const sendSoonestAppointmentTelegramController = async (req, res, next) => {
  try {
    const soonestTime = await getSoonestTime();
    
  } catch (e) {
    next(e);
    throw new Error(e);
  }
};
export default checkAppointmentsController;
