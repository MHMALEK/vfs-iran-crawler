import userModel, { getAllUsers, isUserExist } from "../../models/User";

const TelegramBotAPI = require("node-telegram-bot-api");

const createTelegramBot = (token) => {
  return new TelegramBotAPI(token, { polling: true });
};

const TelegramBot = createTelegramBot(process.env.TELEGRAM_BOT_TOKEN);

const initTelegramBotListeners = () => {
  TelegramBot.on("message", onMessageRecived);
};

const onMessageRecived = (msg) => {
  const chatId = msg.chat.id;
  saveChatIDToDB(chatId);
};
const saveChatIDToDB = async (chatId) => {
  try {
    const isDuplicate = await isUserExist(chatId);
    if (!isDuplicate) {
      const user = new userModel({
        chatId,
      });
      user.save();
    }
  } catch (error) {
    throw new Error("can not save user to database");
  }
};

const sendMessageToAllUsers = async (message) => {
  const users = await getAllUsers();
  users.map(({ chatId }) => TelegramBot.sendMessage(chatId, message));
};

const sendMessageToUser = ({ chatId, message }) => {
  TelegramBot.sendMessage(chatId, message);
};

export { initTelegramBotListeners, sendMessageToAllUsers, sendMessageToUser };
export default TelegramBot;
