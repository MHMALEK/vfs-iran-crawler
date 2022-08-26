import { goToLoginPage } from "../browser-DOM/interactions/goToLoginPage";
import browserApi from "../browser";
import isErrorScreen, { getErrorText } from "../browser-DOM/errors/errorScreen";
import fillLoginForm from "../browser-DOM/interactions/fillLoginForm";
import { getAppointmentData } from "../browser-DOM/interactions/getAppointment";
import { appointmentRequestInterceptor } from "../requestHandler";
import { selectVFSLocation } from "../browser-DOM/interactions/selectLocation";
import { resolveCaptcha } from "../browser-DOM/interactions/resolveCaptcha";
import logout from "../browser-DOM/interactions/logout";

const AppointmentCheckerService = async () => {
  const browser = await browserApi.create();
  const page = await browser.newPage();

  try {
    // go to login page
    await goToLoginPage(page);

    // show error if it couldn't show the login page
    const hasErrorOnStart = await isErrorScreen(page);
    if (hasErrorOnStart) {
      const errorText = getErrorText();
      throw new Error(errorText);
    }

    // login flow
    const captcha = await resolveCaptcha(page);
    await fillLoginForm(page, captcha);
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
      // res.send(errorText)
      throw new Error(errorText);
    }

    // select appointment on the menu
    await getAppointmentData(page);
    // select visa center on list
    await selectVFSLocation(page);
    // handle appointment response for this center
    const finalResult = await appointmentRequestInterceptor(page);
    await logout(page);
    return finalResult;
  } catch (e) {
    await logout(page);
    throw new Error(e);
  }
};

const checkAppointmentServiceResult = async () => {
  try {
    const result = await AppointmentCheckerService();
    sendMessageToAllUsers(result);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export { checkAppointmentServiceResult };

export default AppointmentCheckerService;
