export const fillForm = async (page, captchResolved) => {
  await page.type("#EmailId", process.env.VFS_USER_NAME);
  await page.type("#Password", process.env.VFS_PASSWORD);
  await page.type("#CaptchaInputText", captchResolved.toUpperCase());
};
