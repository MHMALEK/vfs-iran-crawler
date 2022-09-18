const isErrorScreen = async (page) => {
  return getErrorText()
    .then(() => true)
    .catch(() => false);
};

export const getErrorText = async (page) => {
  return await page
    .waitForXPath('//*[contains(text(), "Your estimated wait time")]', {
      timeout: 10000,
    })
    .then(async () => {
      if (queueText !== null) {
        const estimatedTimeText = await queueText.evaluate(
          (el) => el.innerHTML
        );
        return estimatedTimeText;
      }
    })
    .catch((e) => new Error());
};
export default isErrorScreen;
