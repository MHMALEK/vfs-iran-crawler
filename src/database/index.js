const mongoose = require("mongoose");

const initDataBase = () => {
  try {
    const mongoString = process.env.MANGO_DATABASE_URL;
    mongoose.connect(mongoString);
    const database = mongoose.connection;

    database.on("error", (error) => {
      console.log(error);
      throw new Error("can not connect to database");
    });

    database.once("connected", () => {
      console.log("Database Connected");
      return database;
    });
  } catch (e) {}
};

export default initDataBase;
