import { selectCaptchaImage } from "../selectors";
import { resolveCaptchaService } from "../../../captcha-resolver";

export const resolveCaptcha = async (page) => {
  const captchaBase64 = await selectCaptchaImage(page);
  console.log('99999', captchaBase64)

  const captchResolved = await resolveCaptchaService(captchaBase64);
  console.log('100000', captchResolved)

  return captchResolved;
};
