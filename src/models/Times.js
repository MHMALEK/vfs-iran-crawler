const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  time: {
    type: String,
    unique: false,
  },
  lastUpdated: {
    type: Date,
    unique: true,
  },
});

const timeModel = mongoose.model("time", timeSchema);

const getSoonestTimes = async () => await timeModel.find();

const getSoonestTime = async () => {
  const res = await timeModel.findOne().sort({ _id: -1 });
  console.log("asd", res);
  return res;
};
const updateTime = async (time) => {
  const soonestTime = new timeModel({
    time,
    lastUpdated: new Date(),
  });
  return await soonestTime.save(function (err) {
    if (err) console.log(err);
    console.log("Inserted document into the collection");
  });
};

export { getSoonestTimes, getSoonestTime, updateTime };
export default timeModel;
