export const isAppointmentAvailableByRequestInterceptor = (
  page,
  slotEndPointUrl = "Account/CheckSeatAllotment"
) =>
  new Promise((resolve, reject) => {
    try {
      page.on("response", async (response) => {
        const originalRequest = response.request();
        if (originalRequest.url().includes(slotEndPointUrl)) {
          const responseFromEndpoint = await response.json();
          if (JSON.stringify(responseFromEndpoint).includes("no seat")) {
            // appointmetn is not available
            return resolve(false);
          } else {
            // appointmetn is available
            return resolve(true);
          }
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
