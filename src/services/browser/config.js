const UserAgent = require("user-agents");

const userAgentDefault =
  "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36";

const randomUserAgent = new UserAgent({
  deviceCategory: "desktop",
  platform: "Linux x86_64",
});

console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
console.log(';randomUserAgent', randomUserAgent.data.userAgent)

const puppeteerConfig = {
  headless: process.env.NODE_ENV === 'production' ? true : false,
  args: [randomUserAgent.data.userAgent || userAgentDefault],
};
export default puppeteerConfig;
