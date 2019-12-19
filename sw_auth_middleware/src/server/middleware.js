import proxy from "express-http-proxy";
import cookieSession from "cookie-session";
import crypto from "crypto";
import passport from "./passport";
import logger from "./common/logger";
import bodyParser from "body-parser";

const generateSecret = () =>
  new Promise((res, rej) => {
    crypto.randomBytes(256, (err, buff) => {
      if (err) return rej(err);
      res(buff.toString("hex"));
    });
  });

export default async function middleware(app) {
  const secret = generateSecret();
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  app.use(
    cookieSession({
      name: "swsession",
      secret,
      overwrite: false,
      signed: false
    })
  );

  app.use((req, res, next) => {
    logger.debug(req);
    next();
  });
  // initialize passport for authentication
  app.use(passport.initialize());

  // add the content-type header if it doesn't exist already

  app.use(
    "/search",
    proxy("http://elasticsearch:9200", {
    //   proxyReqPathResolver: req => {
    //     if(req.method.toUpperCase() === 'POST') {

    //     }
    //     const parts = req.url.split("?");
    //     const queryString = parts[1];
    //     const updatedPath = parts[0].replace(
    //       /\.kibana/,
    //       `.kibana_${req.session.user}`
    //     );
    //     return updatedPath + (queryString ? "?" + queryString : "");
    //   },
      proxyReqOptDecorator: (opts, src) => {
        if (src.method.toUpperCase() === "POST") {
          src.headers["content-type"] = "application/JSON";
        }
        return opts;
      },
      proxyReqBodyDecorator: function(bodyContent, srcReq) {
        let newBodyContent;
        
        if (
          bodyContent && typeof bodyContent === "object" &&
          !Object.keys(bodyContent).length
          ) {
          srcReq._hasBody = false;
          newBodyContent = '';
        } else {
          console.log(newBodyContent);
          newBodyContent = bodyContent;
        }
        return newBodyContent;
      }
    })
  );
}
