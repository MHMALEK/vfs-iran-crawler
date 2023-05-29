const UserAgent = require("user-agents");

const userAgentDefault =
  "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36";

const randomUserAgent = new UserAgent();

console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
console.log(";randomUserAgent", randomUserAgent.data.userAgent);

const puppeteerConfig = {
  headless: process.env.NODE_ENV != "production" ? false : true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
};
export default puppeteerConfig;
