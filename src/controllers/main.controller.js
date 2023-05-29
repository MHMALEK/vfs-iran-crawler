
const mainController = async (req, res, next) => {
  try {
    res.send(
      "this app is a simple robot to help you find and make appointment in VFS global in Iran!!!"
    );
  } catch (e) {
    next(e);
    throw new Error(e);
  }
};

export default mainController;
