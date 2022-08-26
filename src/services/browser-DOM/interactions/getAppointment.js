import { selectScheduleMenuItem } from "../selectors";

export const getAppointmentData = async (page) => {
  try {
    const scheduleMenuItem = await selectScheduleMenuItem(page);
    return await Promise.all([
      scheduleMenuItem.click(),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);
  } catch (e) {
    throw new Error(e);
  }
};
