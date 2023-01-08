import puppeteerConfig from "./config";

// with stealth to trick vfs to not recongnize the bot
const puppeteer = require("puppeteer-extra");

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const create = async ({ headless, args } = puppeteerConfig) => {
  const browser = await puppeteer.launch({
    headless: false,
    // args,
  });
  return browser;
};

const browser = {
  create,
};

export default browser;
