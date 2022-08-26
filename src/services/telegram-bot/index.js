import userModel, { getAllUsers, isUserExist } from "../../models/User";

const TelegramBotAPI = require("node-telegram-bot-api");

const createTelegramBot = (token) => {
  return new TelegramBotAPI(token, { polling: true });
};

const TelegramBot = createTelegramBot(process.env.TELEGRAM_BOT_TOKEN);

const initTelegramBotListeners = () => {
  TelegramBot.on("message", onMessageRecived);
  TelegramBot.on("callback_query", onCallbackQuery);
  TelegramBot.onText(/\/start/, showStartMenu);
};

const createStartButtons = () => {
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Notify me!", callback_data: "NOTIFY" }],
        [{ text: "About Bot", callback_data: "ABOUT" }],
      ],
    }),
  };
  return options;
};

const showStartMenu = (msg) => {
  const chatId = msg.chat.id;
  TelegramBot.sendMessage(chatId, "Please choose", createStartButtons());
};

const onMessageRecived = (msg) => {
  const chatId = msg.chat.id;
  saveChatIDToDB(chatId);

  showStartMenu();
};

const onCallbackQuery = (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === "NOTIFY") {
    text = "You will be notified when there is a new slot available";
  }
  if (action === "ABOUT") {
    text = "You can read more about this bot on the website";
  }

  TelegramBot.editMessageText(text, opts);
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
