import passport from "passport";
import CustomStrategy from "passport-custom";
import xmlmc from "./xmlmc";
import bypass from "./bypass";
import logger from "../common/logger";

passport.use(
  "sw",
  new CustomStrategy(async (req, done) => {
    const success = () => done(null, true);
    const fail = () => done();
    const now = () => new Date().getTime();

    if (bypass(req)) {
      logger.debug("bypassing authorization for request");
      return done(null, true);
    } else {
      logger.debug("unable to bypass request");
    }
    try {
      logger.debug(
        `attempting to bind to token in session: ${req.session.sessid}`
      );
      await xmlmc.session.bindSession(req.session.sessid);
      req.session.lastauthdate = now();
      success();
    } catch (err) {
      logger.debug(`failed to bind to session token ${req.session.sessid}`);
      logger.debug(err);
      try {
        logger.debug(
          `attempting to bind to token from header ${req.header("X-SW-TOKEN")}`
        );
        await xmlmc.session.bindSession(req.header("X-SW-TOKEN"));
        req.session.sessid = req.header("X-SW-TOKEN");
        req.session.lastauthdate = now();
        success();
      } catch (e) {
        logger.debug(
          `failed to bind to header token ${req.header("X-SW-TOKEN")}`
        );
        logger.debug(e);
        fail();
      }
    }
  })
);

export default passport;
