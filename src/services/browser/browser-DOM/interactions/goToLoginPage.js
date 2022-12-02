export const goToLoginPage = async (page) => {
  // go to login page
  console.log("6666", page.goto);
  try {
    return await page.goto(process.env.VFS_BASE_URL, {
      waitUntil: "load",
      timeout: 0,
    });
  } catch (e) {
    console.log("vvvvv", e);
  }
};
