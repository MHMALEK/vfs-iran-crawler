const ERROR_TYPES = {
  SUBMIT_CPATCH_TO_RESOLVER_SERVER_ERROR: {
    status: 500,
    message: "could not send it to resolver server",
  },
  CAPTCHA_NOT_READY: {
    status: 404,
    message: "captcha is not ready yet",
  },
};

export default ERROR_TYPES;
