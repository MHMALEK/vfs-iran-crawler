import createUserAgent from "./create";

const cerateAndSetRandomUserAgent = async (page) => {
  const userAgent = createUserAgent();
  await page.setUserAgent(userAgent);
};

export default cerateAndSetRandomUserAgent;
