const vfsLoginUrl = process.env.VFS_BASE_URL;
const vfsLoginCredentials = {
  userName: process.env.VFS_USER_NAME,
  password: process.env.VFS_PASSWORD,
};

export {
    vfsLoginUrl,
    vfsLoginCredentials,
}