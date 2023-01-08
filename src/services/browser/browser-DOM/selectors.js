const selectCaptchaImage = async (page) => {
  // TODO: get confing from env or user
  const path = "captcha.png";
  const encoding = "base64";
  const captchaScreenShotConfig = {
    encoding,
  };
  await page.waitForSelector("#CaptchaImage");
  const captchImage = await page.$("#CaptchaImage");
  console.log('77777', captchImage)
  const captchaImageBase64ScreenShot = await captchImage.screenshot(
    captchaScreenShotConfig
  );

  console.log('88888', captchaImageBase64ScreenShot)


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

export { selectCaptchaImage, selectScheduleMenuItem, selectLocationIdDropdown, selectLogOutButton, selectVisaCategoryDropwdown };
