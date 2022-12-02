import { goToLoginPage } from "../browser/browser-DOM/interactions/goToLoginPage";
import browserApi from "../browser";
import isErrorScreen, {
  getErrorText,
} from "../browser/browser-DOM/errors/errorScreen";
import fillLoginForm from "../browser/browser-DOM/interactions/fillLoginForm";
import { getAppointmentData } from "../browser/browser-DOM/interactions/getAppointment";
import { appointmentRequestInterceptor } from "../browser/browser-request-interceptor/appointmentRequestInterceptor";
import { selectVFSLocation } from "../browser/browser-DOM/interactions/selectLocation";
import { resolveCaptcha } from "../browser/browser-DOM/interactions/resolveCaptcha";
import logout from "../browser/browser-DOM/interactions/logout";

const handleErrorPage = async (page) => {
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
};

const AppointmentCheckerService = async () => {
  const browser = await browserApi.create();
  const page = await browser.newPage();

  try {
    // go to login page
    console.log('22222')
    await goToLoginPage(page);
    console.log('33333')

    // show error if it couldn't show the login page
    const hasErrorOnStart = await isErrorScreen(page);
    if (hasErrorOnStart) {
      const errorText = getErrorText();
      throw new Error(errorText);
    }

    // login flow
    console.log('44444')
    const captcha = await resolveCaptcha(page);
    console.log("55555", captcha);

    await fillLoginForm(page, captcha);
    // submit form and wait until login finish
    await Promise.all([
      page.click("#btnSubmit"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    handleErrorPage();

    // select appointment on the menu
    await getAppointmentData(page);
    // select visa center on list
    await selectVFSLocation(page);
    // handle appointment response for this center
    const finalResult = await appointmentRequestInterceptor(page);
    await logout(page);
    return 'finalResult';
  } catch (e) {
    // await logout(page);
    console.log("eeeeee", e);
    throw new Error(e);
  }
};

const checkAppointmentServiceResult = async () => {
  try {
    const result = await AppointmentCheckerService();
    // sendMessageToAllUsers(result);
  } catch (e) {
    throw new Error(e);
  }
};

export { checkAppointmentServiceResult };

export default AppointmentCheckerService;
