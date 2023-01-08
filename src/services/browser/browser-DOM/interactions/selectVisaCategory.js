import { selectLocationIdDropdown, selectVisaCategoryDropwdown } from "../selectors";

export const selectCategory = async (page) => {
  try {
   return await page.select(selectVisaCategoryDropwdown(page), "4887");
  } catch (e) {
    throw new Error(e);
  }
};
