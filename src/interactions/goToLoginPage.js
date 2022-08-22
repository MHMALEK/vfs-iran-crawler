import { vfsLoginUrl } from "../config";
import isErrorScreen from "../errors/errorScreen";

export const goToLoginPage = async (page) => {
  // go to login page
  return await page.goto(process.env.VFS_BASE_URL);

};
