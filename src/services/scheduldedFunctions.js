const CronJob = require("node-cron");

export const cronJobDefaultConfig = {
  // every day at 12 pm
  // expression: `0 12 * * *`,
  expression: "*/30 * * * *",
  callBack: () => console.log("executed on a schedule!"),
};
const createScheduledJobs = ({
  callBack,
  expression,
} = cronJobDefaultConfig) => {
  const scheduledJobFunction = CronJob.schedule(expression, callBack);

  scheduledJobFunction.start();
  return {
    start: () => scheduledJobFunction.start(),
    stop: () => scheduledJobFunction.stop,
  };
};

export default createScheduledJobs;
