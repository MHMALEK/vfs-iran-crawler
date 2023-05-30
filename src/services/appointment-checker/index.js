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
import { io } from "../../app";
import UserAgent from "user-agents";
import cerateAndSetRandomUserAgent from "../browser/useragent";

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
    io.emit("newUpdate", steps);
    io.emit("errorHappend", e);
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
      console.log("asdsadsad", res);
      if (res !== null) {
        const appointmetntTimeText = await res.evaluate((el) => el.innerHTML);
        console.log("appointmetntTimeText", appointmetntTimeText);
        return appointmetntTimeText;
      }
    })
    .catch((e) => new Error());
};

const steps = {
  GO_TO_LOGIN_PAGE: {
    id: 0,
    label: "در حال ورود به وبسایت ",
    desc: "ما در حال باز کردن سایت VFS گلوبال هستیم... لطفا مرورگر رو نبنید و منتظر اتمام فرآیند باشید.",
    succesfull: false,
  },
  GET_CAPTCHA: {
    id: 1,
    label: "در حال ذخیره سازی تصویر کپچا",
    desc: "ما داریم تصویر کپچا رو استخراج میکنیم تا بتونیم اونو حل کنیم و فرآیند ورود رو انجام بدیم.",

    succesfull: false,
  },
  RESOLVE_CAPTCHA: {
    id: 2,
    label: "حل کپچا",
    desc: "تصویر کپچا در حال حل شدن است...",

    succesfull: false,
  },
  ENTER_LOGIN_DETAILS: {
    id: 3,
    label: "وارد کردن اطلاعات ورود",
    desc: "ما در حال وارد کردن اطلاعات ورود و ورود به ناحیه کاربری در وبسایت ٰVFS هستیم.",

    succesfull: false,
  },
  LOGIN_ACTION: {
    id: 4,
    label: "ورود به وبسایت VFS با موفقیت انجام شد!",
    desc: "ما حالا میتونیم اطلاعات قرار ملاقات رو از وبسایت پیدا کنیم.",

    succesfull: false,
  },
  SELECT_SERVICE: {
    id: 5,
    label: "انتخاب سرویس ثبت قرار ملاقات",
    desc: "ما سرویس ثبت قرار ملاقات رو انتخاب میکنیم.",

    succesfull: false,
  },
  SELECT_LOCATION: {
    id: 6,
    label: "انتخاب محل",
    desc: "ما دفتر تهران رو برای این قرار انتخاب میکنیم.",

    succesfull: false,
  },
  SELECT_APPOINTMENT_TYPE: {
    id: 7,
    label: "انتخاب سرویس",
    desc: "ما سرویس ملاقات خانواده و دوستان رو انتخاب میکنیم.",

    succesfull: false,
  },
  GET_SOONEST_DATA: {
    id: 8,
    label: "در حال ارسال درخواست قرار ملاقات",
    desc: "ما اطلاعات قرار ملاقات رو دریافت می‌کنیم",
    succesfull: false,
  },
  LOGOUT_ACTION: {
    id: 9,
    label: "خروج از سیستم",
    succesfull: false,
  },
};

const AppointmentCheckerService = async () => {
  const browser = await browserApi.create();

  console.log('sadsa', browser)
  const page = await browser.newPage();

  console.log('page', browser)

  // set cache to false
  await page.setCacheEnabled(false);

  await cerateAndSetRandomUserAgent(page);

  page.setDefaultNavigationTimeout(180000);

  let captcha;

  console.log('page', browser)


  try {
    // go to login page
    await goToLoginPage(page);

    // show error if it couldn't show the login page
    const hasErrorOnStart = await isErrorScreen(page);
    if (hasErrorOnStart) {
      const errorText = getErrorText();
      steps.GO_TO_LOGIN_PAGE.succesfull = false;
      steps.ENTER_LOGIN_DETAILS.succesfull = false;
      io.emit("errorHappend", e);
      io.emit("newUpdate", steps);
      throw new Error(errorText);
    }

    steps.GO_TO_LOGIN_PAGE.succesfull = true;
    io.emit("newUpdate", steps);

    // login flow

    try {
      captcha = await resolveCaptcha(page);
      steps.RESOLVE_CAPTCHA.succesfull = true;
      steps.GET_CAPTCHA.succesfull = true;
      io.emit("newUpdate", steps);
    } catch (e) {
      console.log("asdasdasdasdads", e);
      steps.GET_CAPTCHA.succesfull = false;
      steps.RESOLVE_CAPTCHA.succesfull = false;
      io.emit("newUpdate", steps);
      io.emit("errorHappend", e);
    }

    try {
      await fillLoginForm(page, captcha);
      steps.ENTER_LOGIN_DETAILS = true;
      io.emit("newUpdate", steps);
    } catch (e) {
      steps.ENTER_LOGIN_DETAILS = false;
      io.emit("newUpdate", steps);
      io.emit("errorHappend", e);
    }

    try {
      // submit form and wait until login finish
      await Promise.all([
        page.click("#btnSubmit"),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);

      steps.LOGIN_ACTION.succesfull = true;
      io.emit("newUpdate", steps);
    } catch (e) {
      steps.LOGIN_ACTION.succesfull = false;
      io.emit("newUpdate", steps);
      io.emit("errorHappend", e);
    }

    handleErrorPage();

    try {
      await selectFamilyVisitInSelectBox(page);
      steps.SELECT_SERVICE.succesfull = true;
      io.emit("newUpdate", steps);
    } catch (e) {
      steps.SELECT_SERVICE.succesfull = false;
      io.emit("newUpdate", steps);
      io.emit("errorHappend", e);
    }

    try {
      // select visa center on list
      await selectVFSLocation(page);
      steps.SELECT_LOCATION.succesfull = true;
      io.emit("newUpdate", steps);
    } catch (e) {
      steps.SELECT_LOCATION.succesfull = false;
      io.emit("newUpdate", steps);
      io.emit("errorHappend", e);
    }

    try {
      // select visa category
      await selectCategory(page);
      steps.SELECT_APPOINTMENT_TYPE.succesfull = true;
      io.emit("newUpdate", steps);
    } catch (e) {
      steps.SELECT_APPOINTMENT_TYPE.succesfull = false;
      io.emit("newUpdate", steps);
      io.emit("errorHappend", e);
    }

    let time;

    try {
      // handle appointment response for this center
      const isAppointmentAvailable =
        await isAppointmentAvailableByRequestInterceptor(page);

      if (isAppointmentAvailable) {
        // select appointment on the menu
        time = await getAppointmentData(page);
        console.log("time", time);
        steps.GET_SOONEST_DATA.succesfull = true;
        io.emit("newUpdate", steps);
      }
    } catch (e) {
      steps.GET_SOONEST_DATA.succesfull = false;
      io.emit("newUpdate", steps);
    }

    await logout(page);
    steps.LOGOUT_ACTION.succesfull = true;
    io.emit("newUpdate", steps);
    await browser.close();
    return time;
  } catch (e) {
    await logout(page);
    steps.LOGOUT_ACTION.succesfull = true;
    io.emit("newUpdate", steps);
    io.emit("errorHappend", e);

    await browser.close();
    console.log("eeeeee", e);

    throw new Error(e);
  }
};

export default AppointmentCheckerService;
