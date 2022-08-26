import { selectLogOutButton } from "../selectors";

const logout = async (page) => {
  try {
    await page.$(selectLogOutButton());
    await page.click(selectLogOutButton());
    return false;
  } catch {
    // Does not exit
    return true;
  }
};

export default logout;
