import logger from "../common/logger";

export default req => {
  return !!(
    req.method === "HEAD" ||
    // allow access to private kibana urls needed to initialize the app
    req.header('x-original-uri').match(/^\/[_.].*/) ||
    // allow direct access to any dashboard in the public domain
    req.header('X-original-uri').match(/\?(?=.*suffix=public)(.*object=.+)/) ||
    // don't reauthenticate for at least 1 hour between requests
    requestWithinLimit(req)
  );
};

function requestWithinLimit(req) {
  // allow requests within an hour of each other without re-authentication
  if (req.session && req.session.lastauthdate) {
    logger.debug(
      `time since last auth : ${(now() - req.session.lastauthdate) /
        1000 /
        60 /
        60}`
    );
    return now() - req.session.lastauthdate < 60 * 60 * 1000;
  }
}

function now() {
  const date = new Date();
  return date.getTime();
}
