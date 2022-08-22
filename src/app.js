import express, { json } from "express";
import { goToLoginPage } from "./interactions/goToLoginPage";
import browserApi from "./services/browser";
import isErrorScreen, { getErrorText } from "./errors/errorScreen";
import { fillForm } from "./interactions/loginToVFS";
import { getAppointmentData } from "./interactions/getAppointment";
import { appointmentRequestInterceptor } from "./services/requestHandler";
import { selectVFSLocation } from "./interactions/selectLocation";
import { resolveCaptcha } from "./interactions/resolveCaptcha";
import createTelegramBot from "./services/telegram-bot";
import logout from "./interactions/logout";

const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(json());

const TelegramBot = createTelegramBot();

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const browser = await browserApi.create();
  const page = await browser.newPage();

  try {
    // go to login page
    await goToLoginPage(page);

    // show error if it couldn't show the login page
    const hasErrorOnStart = await isErrorScreen(page);
    if (hasErrorOnStart) {
      const errorText = getErrorText();
      //  res.send(errorText);
      throw new Error(errorText);
    }

    // login flow
    const captcha = await resolveCaptcha(page);
    await fillForm(page, captcha);
    // submit form and wait until login finish
    await Promise.all([
      page.click("#btnSubmit"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // if login was not sucessfull
    const isErrorElementVisible = await page.$(
      "#ApplicantListForm > div.validation-summary-errors > ul > li"
    );
    if (isErrorElementVisible) {
      const errorText = await isErrorElementVisible.evaluate(
        (el) => el.textContent
      ); // grab the textContent from the element, by evaluating this function in the browser context
      console.log(isErrorElementVisible, errorText);
      // res.send(errorText)
      throw new Error(errorText);
    }

    // select appointment on the menu
    await getAppointmentData(page);
    // select visa center on list
    await selectVFSLocation(page);
    // handle appointment response for this center
    const finalResult = await appointmentRequestInterceptor(page);
    TelegramBot.sendMessage(1949747267, finalResult);
    await logout(page);
    res.send(finalResult);
  } catch (e) {
    console.log(e);
    TelegramBot.sendMessage(1949747267, `Error: ${e}`);
    await logout(page);
    res.send("errors");
  }
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
