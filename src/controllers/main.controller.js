import AppointmentCheckerService from "../services/appointment-checker";
import { sendMessageToAllUsers } from "../services/telegram-bot";

const mainController = async (req, res, next) => {
  try {
    res.send(
      "this app is a simple robot to help you find and make appointment in VFS global in Iran! That's it!"
    );
  } catch (e) {
    next(e);
    throw new Error(e);
  }
};

export default mainController;
