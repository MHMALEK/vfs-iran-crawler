import AppointmentCheckerService from "../services/appointment-checker";

const checkAppointmentsController = async (req, res, next) => {
  try {
    const result = await AppointmentCheckerService();
    // sendMessageToAllUsers(result)
    res.send(result);
  } catch (e) {
    next(e);
    throw new Error(e);
  }
};

export default checkAppointmentsController;
