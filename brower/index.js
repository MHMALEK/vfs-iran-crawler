const create = async ({
  headless = true,
  args = `--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36`,
}) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36`,
    ],
  });
  return browser;
};
