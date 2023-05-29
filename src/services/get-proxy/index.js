const request = require("request-promise");

const getProxyFromRotatingProxyServer = async () => {
  const proxy = await request({
    url: "http://ipv4.webshare.io/",
    proxy: "http://jkwivzej-rotate:yf18u54hfjfx@p.webshare.io:80",
  });
  return proxy;
};

const handleProxyForPuppeteer = async ({
    
}) => {
  const browser = await puppeteer.launch({
    ...options,
    args: [...options.args, "--proxy-server=http://p.webshare.io:80"],
  });

  const page = await browser.newPage();

  await page.authenticate({
    username: process.env.ROTATE_PROXY_USER,
    password: process.env.ROTATE_PROXY_PASSWORD,
  });
  return browser;
};

export default handleProxyForPuppeteer;
export { getProxyFromRotatingProxyServer };
