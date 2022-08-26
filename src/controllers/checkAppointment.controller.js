import AppointmentCheckerService from "../services/appointment-checker";

const checkAppointmentsController = async (req, res, next) => {
  try {
    const result = await AppointmentCheckerService();
    res.send(result);
  } catch (e) {
    console.log(e);
  }
};

export default checkAppointmentsController;
