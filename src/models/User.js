const mongoose = require("mongoose");

const telegramUserSchema = new mongoose.Schema({
  chatId: {
    type: Number,
    unique: true,
  },
});

const telegramUserModel = mongoose.model("telegram", telegramUserSchema);

const findAllTelegramUsers = async () => await telegramUserModel.find();

const findAllTelegramUserByChatId = async (chatId) => await telegramUserModel.findOne({ chatId });

const isTelegramUserExist = async (chatId) => {
  const isUserSavedBefore = await findUserByChatId(chatId);
  if (isUserSavedBefore) {
    return true;
  }
  return false;
};

const addUserForTelegramBot = async (chatId) => {
  const user = new telegramUserModel({
    chatId,
  });
  return await user.save(function (err) {
    if (err) console.log(err);
    console.log("Inserted document into the collection");
  });
};

export { findAllTelegramUsers, findAllTelegramUserByChatId, isTelegramUserExist, addUserForTelegramBot };
export default telegramUserModel;
