import { selectCaptchaImage } from "../selectors";
import { resolveCaptchaService } from "../../../captcha-resolver";

export const resolveCaptcha = async (page) => {
  const captchaBase64 = await selectCaptchaImage(page);
  const captchResolved = await resolveCaptchaService(captchaBase64);
  return captchResolved;
};
