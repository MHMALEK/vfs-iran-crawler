// Create random user-agent to be set through plugin

import UserAgent from "user-agents";

const createUserAgent = () => {
  const userAgent = new UserAgent();
  const userAgentStr = userAgent.toString();
  return userAgentStr;
};

export default createUserAgent;
