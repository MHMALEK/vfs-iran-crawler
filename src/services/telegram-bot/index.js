import { Bot } from "grammy";
import { findAllTelegramUsers } from "../../models/User";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("6225139319:AAEtFdJlbuS9Dp4bvoJzxPjDOCzIMXwd1AU"); //

export const initBot = (onStartCommandCallback) => {
  // Handle the /start command.
  bot.command("start", (ctx) => {
    ctx.reply("Welcome! This bot will check VFS appointment system and will notify about the soonest available appointment");
    onStartCommandCallback(ctx.from.id);
  });
  // Handle other messages.
  bot.on("message", (ctx) => ctx.reply("Got another message!"));
};
export const sendMessageToBot = async (message) => {
  const telegramUsers = await findAllTelegramUsers();
  telegramUsers.map(
    async (telegramUser) =>
      await bot.api.sendMessage(telegramUser.chatId, message)
  );
};

// Start the bot.
export const startBot = async (onStartCommandCallback) => {
  initBot(onStartCommandCallback);
  bot.start();
};

export const getBot = () => {
  return bot;
};
