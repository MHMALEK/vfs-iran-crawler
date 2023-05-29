import { startBot } from ".";
import { addUserForTelegramBot } from "../../models/User";

const startTelegramBotAndSaveUsersOnStartCommand = () => {
  // init telegram bot
  startBot(addUserForTelegramBot);
};

export default startTelegramBotAndSaveUsersOnStartCommand;
