// with stealth to trick vfs to not recongnize the bot
const puppeteer = require("puppeteer-extra");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const create = async (
  { headless, args } = {
    headless: false,
    args: [
      "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
    ],
  }
) => {
  const browser = await puppeteer.launch({
    headless,
    args,
  });
  return browser;
};

const browser = {
  create,
};

export default browser;
