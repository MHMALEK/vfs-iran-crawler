// const puppeteer = require("puppeteer-extra");
// const axios = require("axios");
// const TelegramBot = require("node-telegram-bot-api");

// const ERROR_TYPES = {
//   SUBMIT_CPATCH_TO_RESOLVER_SERVER_ERROR: {
//     status: 500,
//     message: "could not send it to resolver server",
//   },
//   CAPTCHA_NOT_READY: {
//     status: 404,
//     message: "captcha is not ready yet",
//   },
// };

// const CAPTCHA_SERVER = {
//   CREATE_TASK_API: "https://api.anycaptcha.com/createTask",
//   GET_TASK_API: "https://api.anycaptcha.com/getTaskResult",
//   API_TOKEN: "41922ef06402437ca348e785a4f6df05",
// };

// const USER_NAME = "mhos.malek@gmail.com";
// const PASSWORD = "Haavin1993!";

// // Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { default: brower } = require("./brower");
// puppeteer.use(StealthPlugin());

// // replace the value below with the Telegram token you receive from @BotFather
// const token = "5239349771:AAGsVEHuyJ7NZ_DOBQeMBtaVYjrPWZhq3E4";

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, { polling: true });

// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   console.log(chatId);

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, chatId);
// });

// const start = async () => {
//   const browser = brower.create();
//   const page = await browser.newPage();

//   await page.goto(
//     "https://online.vfsglobal.com/Global-Appointment/Account/RegisteredLogin?q=shSA0YnE4pLF9Xzwon/x/MI24mBrB3J1rBC1vdDKa5IQdrJXKYTs+DdVJBpH9l4l7y9kr9wkS1P1QdJpp0GPog=="
//   );

//   // page.on("response", async (response) => {
//   //   const request = response.request();
//   //   if (
//   //     request.url() ==
//   //     "https://online.vfsglobal.com/Global-Appointment/Account/CheckSeatAllotment"
//   //   ) {
//   //     const jsonRes = await response.json();
//   //     if (
//   //       jsonRes ===
//   //       "There are no open seats available for selected center - The Netherlands Visa Application Centre - Tehran"
//   //     ) {
//   //       bot.sendMessage(1949747267, jsonRes);

//   //       await page.click("#logoutForm  > a > span");
//   //       await page.waitForTimeout(5000);
//   //       await browser.close();
//   //     }
//   //   }
//   // });

//   // // const int = setInterval(async () => {
//   // //   await axios
//   // //     .post("https://api.anycaptcha.com/getTaskResult", {
//   // //       clientKey: "41922ef06402437ca348e785a4f6df05",
//   // //       taskId,
//   // //     })
//   // //     .then(async (response) => {
//   // //       // console.log("response", response);
//   // //       if (response.data.status === "ready") {
//   // //         clearInterval(int);

//   // //         let captchResult = response.data.solution.text;

//   // //         console.log("captchResult", captchResult);

//   // //         await page.type("#EmailId", "mhos.malek@gmail.com");
//   // //         await page.type("#Password", "Haavin1993!");
//   // //         await page.type("#CaptchaInputText", "asdasd");

//   // //         await page.screenshot({ path: "form-filled-state.png" });

//   // //         await Promise.all([
//   // //           await page.click("#btnSubmit"),
//   // //           page.waitForNavigation({ waitUntil: "networkidle2" }),
//   // //         ]);

//   // //         if ((await page.$("validation-summary-errors")) !== null) {
//   // //           console.log("found");
//   // //         } else {
//   // //           console.log("not found");
//   // //         }

//   // //         console.log("3", await page.evaluate("navigator.userAgent"));

//   // //         await page.waitForSelector(
//   // //           "#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(2) > a"
//   // //         ); // wait for the selector to load

//   // //         await page.waitForTimeout(5000);

//   // //         const elem = await page.$x(
//   // //           '//*[@id="Accordion1"]/div/div[2]/div/ul/li[1]/a'
//   // //         );

//   // //         await elem[0].click();

//   // //         await page.waitForTimeout(3000);

//   // //         const malek = await page.$("#LocationId");

//   // //         await page.waitForSelector("#LocationId > option:nth-child(3)");

//   // //         await malek.click();

//   // //         await page.waitForTimeout(1000);

//   // //         await malek.select("220");

//   // //         await page.waitForSelector("#logoutForm > a > span");

//   // //         await page.waitForTimeout(5000);
//   // //       }
//   // //       // console.log("final", response.data);
//   // //     })
//   // //     .catch((error) => {
//   // //       console.log("error", error);
//   // //     });
//   // // }, 5000);

//   // const login = async () => {
//   //   const API_SEND_CAPTCHA_TO_SERVER = async (captcha) =>
//   //     await axios
//   //       .post(CAPTCHA_SERVER.CREATE_TASK_API, {
//   //         clientKey: CAPTCHA_SERVER.API_TOKEN,
//   //         task: {
//   //           type: "ImageToTextTask",
//   //           body: captcha,
//   //         },
//   //       })
//   //       .then((response) => {
//   //         return response.data.taskId;
//   //       })
//   //       .catch((error) => {
//   //         return reject(ERROR_TYPES.SUBMIT_CPATCH_TO_RESOLVER_SERVER_ERROR);
//   //       });

//   //   const API_GET_SOLVED_CAPTCHA_FROM_SERVER = async (taskId) => {
//   //     console.log("13", taskId);
//   //     return await axios
//   //       .post(CAPTCHA_SERVER.GET_TASK_API, {
//   //         clientKey: CAPTCHA_SERVER.API_TOKEN,
//   //         taskId,
//   //       })
//   //       .then(async (response) => {
//   //         console.log(response);
//   //         return response.data;
//   //       })
//   //       .catch((e) => {
//   //         throw new Error(e);
//   //       });
//   //   };

//   //   const GET_CAPTCH_IMAGE = async () => {
//   //     await page.waitForSelector("#CaptchaImage");
//   //     const captchImage = await page.$("#CaptchaImage");
//   //     const captchaImageBase64ScreenShot = await captchImage.screenshot({
//   //       path: "google.png",
//   //       encoding: "base64",
//   //     });

//   //     return captchaImageBase64ScreenShot;
//   //   };
//   //   const SEND_CAPTCH_IMAGE_TO_RESOLVER_SERVER = (captcha) =>
//   //     new Promise(async (resolve, reject) => {
//   //       try {
//   //         const taskIDFromCaptchaServer = await API_SEND_CAPTCHA_TO_SERVER(
//   //           captcha
//   //         );
//   //         resolve(taskIDFromCaptchaServer);
//   //       } catch (e) {
//   //         reject(e);
//   //       }
//   //     });
//   //   const GET_CAPTCHA_RESULT_FROM_SERVER = (taskId) =>
//   //     new Promise(async (resolve, reject) => {
//   //       const intervalForCaptcha = setInterval(async () => {
//   //         console.log("2", taskId);
//   //         try {
//   //           const result = await API_GET_SOLVED_CAPTCHA_FROM_SERVER(taskId);
//   //           if (result.status === "ready") {
//   //             resolve(result.solution.text);
//   //             clearInterval(intervalForCaptcha);
//   //           }
//   //         } catch (e) {
//   //           reject(e);
//   //         }
//   //       }, 5000);
//   //     });

//   //   // const malek = await page.$(
//   //   //   "#ApplicantListForm > div.validation-summary-errors > ul > li"
//   //   // );
//   //   // if (malek) {
//   //   //   const value = await malek.evaluate((el) => el.textContent); // grab the textContent from the element, by evaluating this function in the browser context
//   //   //   bot.sendMessage(1949747267, value);
//   //   // }
//   //   const fillForm = async (resolvedCaptcha) => {
//   //     await page.type("#EmailId", USER_NAME);
//   //     await page.type("#Password", PASSWORD);
//   //     await page.type("#CaptchaInputText", resolvedCaptcha.toUpperCase());
//   //   };
//   //   try {
//   //     const captcha = await GET_CAPTCH_IMAGE();
//   //     const taskId = await SEND_CAPTCH_IMAGE_TO_RESOLVER_SERVER(captcha);
//   //     const resolvedCaptcha = await GET_CAPTCHA_RESULT_FROM_SERVER(taskId);

//   //     // fill form
//   //     await fillForm(resolvedCaptcha);
//   //     // and submit
//   //     await page.click("#btnSubmit");
//   //   } catch (e) {}
//   // };

//   // const getAppointmentData = async () => {
//   //   await page.waitForSelector(
//   //     "#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(2) > a"
//   //   ); // wait for the selector to load

//   //   console.log("heereeeee");

//   //   const elem = await page.$x(
//   //     '//*[@id="Accordion1"]/div/div[2]/div/ul/li[1]/a'
//   //   );

//   //   await elem[0].click();

//   //   await page.waitForSelector("#LocationId");

//   //   await page.waitForTimeout(3000);

//   //   const malek = await page.$("#LocationId");

//   //   await page.waitForSelector("#LocationId > option:nth-child(3)");

//   //   await malek.click();

//   //   await malek.select("220");

//   //   await page.waitForSelector("#logoutForm > a > span");

//   // };

//   // login();
//   // getAppointmentData();
// };

// start();

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
