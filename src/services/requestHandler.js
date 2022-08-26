export const appointmentRequestInterceptor = (
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
            return resolve(responseFromEndpoint);
          } else {
            console.log("responseFromEndpoint", responseFromEndpoint);
            return resolve("Appointment is Availble! Get it soon!");
          }
        }
      });
    } catch (e) {
      return reject(e);
    }
  });
