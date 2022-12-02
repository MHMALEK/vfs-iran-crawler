const captchClient = require("@infosimples/node_two_captcha");

export const resolveCaptchaService = async (captcha) => {
  const captchResolver = new captchClient(process.env.CAPTCHA_SERVER_API_TOKEN, {
    timeout: 60000,
    polling: 5000,
    throwErrors: false,
  });

  const res = await captchResolver.decode({
    base64: captcha,
  });
  return res.text;
};
