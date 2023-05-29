import axios from "axios";

const fillLoginForm = async (page, captchResolved) => {
  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  let user;
  const users = await axios.get("http://localhost:3000/users/verified");

  console.log("ssdasdasdasdsadsad", users);
  if (users.data.length > 0) {
    console.log("asdsadsadasdasdsad");
    user = getRandomItem(users.data).data.username;
    console.log("asdsadsadasdasdsad", user, getRandomItem(users.data));
  }
  await page.type("#EmailId", user || process.env.VFS_USER_NAME);
  await page.type("#Password", process.env.VFS_PASSWORD);
  await page.type("#CaptchaInputText", captchResolved.toUpperCase());
};

export default fillLoginForm;
