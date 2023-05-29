const selectCaptchaImage = async (page) => {
  const encoding = "base64";
  const captchaScreenShotConfig = {
    encoding,
  };
  await page.waitForSelector("#CaptchaImage", { timeout: 180000 });
  const captchImage = await page.$("#CaptchaImage");
  const captchaImageBase64ScreenShot = await captchImage.screenshot(
    captchaScreenShotConfig
  );

  return captchaImageBase64ScreenShot;
};

const selectScheduleMenuItem = async (page) => {
  try {
    return await page.$(
      "#Accordion1 > div > div.AccordionPanelContent > div > ul > li:nth-child(2) > a"
    );
  } catch (e) {
    throw new Error(e);
  }
};
const selectLocationIdDropdown = () => "select[name='LocationId']";

const selectVisaCategoryDropwdown = () => "select[name='VisaCategoryId']";

const selectLogOutButton = (page) => "#logoutForm  > a > span";

export {
  selectCaptchaImage,
  selectScheduleMenuItem,
  selectLocationIdDropdown,
  selectLogOutButton,
  selectVisaCategoryDropwdown,
};
