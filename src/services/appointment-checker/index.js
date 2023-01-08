import { goToLoginPage } from "../browser/browser-DOM/interactions/goToLoginPage";
import browserApi from "../browser";
import isErrorScreen, {
  getErrorText,
} from "../browser/browser-DOM/errors/errorScreen";
import fillLoginForm from "../browser/browser-DOM/interactions/fillLoginForm";
import { selectFamilyVisitInSelectBox } from "../browser/browser-DOM/interactions/selectFamilyVisitInSelectBox";
import { isAppointmentAvailableByRequestInterceptor } from "../browser/browser-request-interceptor/appointmentRequestInterceptor";
import { selectVFSLocation } from "../browser/browser-DOM/interactions/selectLocation";
import { resolveCaptcha } from "../browser/browser-DOM/interactions/resolveCaptcha";
import logout from "../browser/browser-DOM/interactions/logout";
import { selectCategory } from "../browser/browser-DOM/interactions/selectVisaCategory";

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
    steps.LOGIN_ACTION.succesfull = false;
    throw new Error(errorText);
  }
};

const getAppointmentData = async (page) => {
  return await page
    .waitForXPath(
      "/html/body/div[2]/div[1]/div[3]/div[3]/form/div[1]/div[2]/div[7]/div[6]/div/table/thead/tr[2]/td[1]/label[2]",
      {
        timeout: 10000,
      }
    )
    .then(async (res) => {
      console.log('asdsadsad', res)
      if (res !== null) {
        const appointmetntTimeText = await res.evaluate(
          (el) => el.innerHTML
        );
        console.log("appointmetntTimeText", appointmetntTimeText);
        return appointmetntTimeText;
      }
    })
    .catch((e) => new Error());
};

const steps = {
  GO_TO_LOGIN_PAGE: {
    id: 0,
    label: "Go to login page",
    succesfull: false,
  },
  GET_CAPTCHA: {
    id: 1,
    label: "Get Captcha Image",
    succesfull: false,
  },
  RESOLVE_CAPTCHA: {
    id: 2,
    label: "Resolve Captch Image by Third Party App",
    succesfull: false,
  },
  ENTER_LOGIN_DETAILS: {
    id: 3,
    label: "Enter Login details",
    succesfull: false,
  },
  LOGIN_ACTION: {
    id: 4,
    label: "Login to VFS successfully",
    succesfull: false,
  },
  SELECT_LOCATION: {
    id: 5,
    label: "Select location",
    succesfull: false,
  },
};

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
      steps.GO_TO_LOGIN_PAGE.succesfull = false;
      throw new Error(errorText);
    }

    steps.GO_TO_LOGIN_PAGE.succesfull = true;

    // login flow
    console.log("44444");
    const captcha = await resolveCaptcha(page);

    steps.GET_CAPTCHA.succesfull = true;

    await fillLoginForm(page, captcha);

    // submit form and wait until login finish
    await Promise.all([
      page.click("#btnSubmit"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    steps.RESOLVE_CAPTCHA.succesfull = true;

    handleErrorPage();

    steps.LOGIN_ACTION.succesfull = true;

    await selectFamilyVisitInSelectBox(page);

    // select visa center on list
    await selectVFSLocation(page);

    steps.SELECT_LOCATION.succesfull = true;


    // select visa category
    await selectCategory(page)

    // handle appointment response for this center
    const isAppointmentAvailable =
      await isAppointmentAvailableByRequestInterceptor(page);

    let time;
    if (isAppointmentAvailable) {
      console.log('1111')
      // select appointment on the menu
      time = await getAppointmentData(page);
      console.log("time", time);
    }

    await logout(page);
    await browser.close();
    return `Soonest available appointment for VFS is ${time}`
  } catch (e) {
    await logout(page);
    await browser.close();
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
