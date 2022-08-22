import ERROR_TYPES from "../../errors/errorTypes";

const axios = require("axios");

const {
  default: CAPTCHA_SERVER_ENDPOINTS,
  captchaDefaultType,
} = require("./config");

const sendDataToResolverServer = async (captcha) =>
  await axios
    .post(
      `${process.env.CAPTCHA_SERVER_BASE_API}/${CAPTCHA_SERVER_ENDPOINTS.CREATE_TASK}`,
      {
        clientKey: process.env.CAPTCHA_SERVER_API_TOKEN,
        task: {
          type: captchaDefaultType,
          body: captcha,
        },
      }
    )
    .then((response) => {
      return response.data.taskId;
    })
    .catch((error) => {
      throw new Error(ERROR_TYPES.SUBMIT_CPATCH_TO_RESOLVER_SERVER_ERROR);
    });

const getResultFromResolverServer = async (taskId) => {
  return await axios
    .post(
      `${process.env.CAPTCHA_SERVER_BASE_API}/${CAPTCHA_SERVER_ENDPOINTS.GET_TASK}`,
      {
        clientKey: process.env.CAPTCHA_SERVER_API_TOKEN,
        taskId,
      }
    )
    .then(async (response) => {
      return response.data;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

export const resolveCaptchaService = (captcha) =>
  new Promise(async (res, rej) => {
    try {
      const taskIdFromCaptchResolver = await sendDataToResolverServer(captcha);
      const getResultInterVal = setInterval(async () => {
        const response = await getResultFromResolverServer(
          taskIdFromCaptchResolver
        );
        if (response.status === "ready") {
          clearInterval(getResultInterVal);
          res(response.solution.text);
        }
      }, 3000);
    } catch (e) {
      rej(e);
    }
  });
