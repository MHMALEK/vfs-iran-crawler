const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: {
    type: Number,
    unique: true,
  },
});

const userModel = mongoose.model("user", userSchema);

const getAllUsers = async () => await userModel.find();

const findUserByChatId = async (chatId) => await userModel.findOne({ chatId });

const isUserExist = async (chatId) => {
  const isUserSavedBefore = await findUserByChatId(chatId);
  if (isUserSavedBefore) {
    return true;
  }
  return false;
};

export { getAllUsers, findUserByChatId, isUserExist };
export default userModel;
