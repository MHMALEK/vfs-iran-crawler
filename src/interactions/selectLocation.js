import { selectLocationIdDropdown } from "../dom/selectors";

export const selectVFSLocation = async (page) => {
  try {
   return await page.select(selectLocationIdDropdown(), "220");
  } catch (e) {
    throw new Error(e);
  }
};
