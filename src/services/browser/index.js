import axios from "axios";
import UserAgent from "user-agents";
import handleProxyForPuppeteer from "../get-proxy";
import getProxyFromRotatingProxyServer from "../get-proxy";
import puppeteerConfig from "./config";

// with stealth to trick vfs to not recongnize the bot
const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const create = async ({
  headless,
  args,
  useProxy = false,
} = puppeteerConfig) => {
  let browser;
  if (useProxy) {
    browser = await handleProxyForPuppeteer({
      headless: true,
      args,
    });
  } else {
    browser = await puppeteer.launch({
      headless: true,
      args,
    });
  }
  return browser;
};

const browser = {
  create,
};

export default browser;
