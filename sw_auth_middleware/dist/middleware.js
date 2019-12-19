"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middleware;

var _expressHttpProxy = _interopRequireDefault(require("express-http-proxy"));

var _cookieSession = _interopRequireDefault(require("cookie-session"));

var _crypto = _interopRequireDefault(require("crypto"));

var _passport = _interopRequireDefault(require("./passport"));

var _logger = _interopRequireDefault(require("./common/logger"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateSecret = () => new Promise((res, rej) => {
  _crypto.default.randomBytes(256, (err, buff) => {
    if (err) return rej(err);
    res(buff.toString("hex"));
  });
});

async function middleware(app) {
  const secret = generateSecret();
  app.use(_bodyParser.default.json()); // support json encoded bodies

  app.use(_bodyParser.default.urlencoded({
    extended: true
  })); // support encoded bodies

  app.use((0, _cookieSession.default)({
    name: "swsession",
    secret,
    overwrite: false,
    signed: false
  }));
  app.use((req, res, next) => {
    _logger.default.debug(req);

    next();
  }); // initialize passport for authentication

  app.use(_passport.default.initialize()); // add the content-type header if it doesn't exist already

  app.use("/search", (0, _expressHttpProxy.default)("http://elasticsearch:9200", {
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
    proxyReqBodyDecorator: function (bodyContent, srcReq) {
      let newBodyContent;

      if (bodyContent && typeof bodyContent === "object" && !Object.keys(bodyContent).length) {
        srcReq._hasBody = false;
        newBodyContent = '';
      } else {
        console.log(newBodyContent);
        newBodyContent = bodyContent;
      }

      return newBodyContent;
    }
  }));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvbWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZVNlY3JldCIsIlByb21pc2UiLCJyZXMiLCJyZWoiLCJjcnlwdG8iLCJyYW5kb21CeXRlcyIsImVyciIsImJ1ZmYiLCJ0b1N0cmluZyIsIm1pZGRsZXdhcmUiLCJhcHAiLCJzZWNyZXQiLCJ1c2UiLCJib2R5UGFyc2VyIiwianNvbiIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsIm5hbWUiLCJvdmVyd3JpdGUiLCJzaWduZWQiLCJyZXEiLCJuZXh0IiwibG9nZ2VyIiwiZGVidWciLCJwYXNzcG9ydCIsImluaXRpYWxpemUiLCJwcm94eVJlcU9wdERlY29yYXRvciIsIm9wdHMiLCJzcmMiLCJtZXRob2QiLCJ0b1VwcGVyQ2FzZSIsImhlYWRlcnMiLCJwcm94eVJlcUJvZHlEZWNvcmF0b3IiLCJib2R5Q29udGVudCIsInNyY1JlcSIsIm5ld0JvZHlDb250ZW50IiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIl9oYXNCb2R5IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsY0FBYyxHQUFHLE1BQ3JCLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUN4QkMsa0JBQU9DLFdBQVAsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBQ0MsR0FBRCxFQUFNQyxJQUFOLEtBQWU7QUFDckMsUUFBSUQsR0FBSixFQUFTLE9BQU9ILEdBQUcsQ0FBQ0csR0FBRCxDQUFWO0FBQ1RKLElBQUFBLEdBQUcsQ0FBQ0ssSUFBSSxDQUFDQyxRQUFMLENBQWMsS0FBZCxDQUFELENBQUg7QUFDRCxHQUhEO0FBSUQsQ0FMRCxDQURGOztBQVFlLGVBQWVDLFVBQWYsQ0FBMEJDLEdBQTFCLEVBQStCO0FBQzVDLFFBQU1DLE1BQU0sR0FBR1gsY0FBYyxFQUE3QjtBQUNBVSxFQUFBQSxHQUFHLENBQUNFLEdBQUosQ0FBUUMsb0JBQVdDLElBQVgsRUFBUixFQUY0QyxDQUVoQjs7QUFDNUJKLEVBQUFBLEdBQUcsQ0FBQ0UsR0FBSixDQUFRQyxvQkFBV0UsVUFBWCxDQUFzQjtBQUFFQyxJQUFBQSxRQUFRLEVBQUU7QUFBWixHQUF0QixDQUFSLEVBSDRDLENBR1E7O0FBQ3BETixFQUFBQSxHQUFHLENBQUNFLEdBQUosQ0FDRSw0QkFBYztBQUNaSyxJQUFBQSxJQUFJLEVBQUUsV0FETTtBQUVaTixJQUFBQSxNQUZZO0FBR1pPLElBQUFBLFNBQVMsRUFBRSxLQUhDO0FBSVpDLElBQUFBLE1BQU0sRUFBRTtBQUpJLEdBQWQsQ0FERjtBQVNBVCxFQUFBQSxHQUFHLENBQUNFLEdBQUosQ0FBUSxDQUFDUSxHQUFELEVBQU1sQixHQUFOLEVBQVdtQixJQUFYLEtBQW9CO0FBQzFCQyxvQkFBT0MsS0FBUCxDQUFhSCxHQUFiOztBQUNBQyxJQUFBQSxJQUFJO0FBQ0wsR0FIRCxFQWI0QyxDQWlCNUM7O0FBQ0FYLEVBQUFBLEdBQUcsQ0FBQ0UsR0FBSixDQUFRWSxrQkFBU0MsVUFBVCxFQUFSLEVBbEI0QyxDQW9CNUM7O0FBRUFmLEVBQUFBLEdBQUcsQ0FBQ0UsR0FBSixDQUNFLFNBREYsRUFFRSwrQkFBTSwyQkFBTixFQUFtQztBQUNuQztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VjLElBQUFBLG9CQUFvQixFQUFFLENBQUNDLElBQUQsRUFBT0MsR0FBUCxLQUFlO0FBQ25DLFVBQUlBLEdBQUcsQ0FBQ0MsTUFBSixDQUFXQyxXQUFYLE9BQTZCLE1BQWpDLEVBQXlDO0FBQ3ZDRixRQUFBQSxHQUFHLENBQUNHLE9BQUosQ0FBWSxjQUFaLElBQThCLGtCQUE5QjtBQUNEOztBQUNELGFBQU9KLElBQVA7QUFDRCxLQWxCZ0M7QUFtQmpDSyxJQUFBQSxxQkFBcUIsRUFBRSxVQUFTQyxXQUFULEVBQXNCQyxNQUF0QixFQUE4QjtBQUNuRCxVQUFJQyxjQUFKOztBQUVBLFVBQ0VGLFdBQVcsSUFBSSxPQUFPQSxXQUFQLEtBQXVCLFFBQXRDLElBQ0EsQ0FBQ0csTUFBTSxDQUFDQyxJQUFQLENBQVlKLFdBQVosRUFBeUJLLE1BRjVCLEVBR0k7QUFDRkosUUFBQUEsTUFBTSxDQUFDSyxRQUFQLEdBQWtCLEtBQWxCO0FBQ0FKLFFBQUFBLGNBQWMsR0FBRyxFQUFqQjtBQUNELE9BTkQsTUFNTztBQUNMSyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWU4sY0FBWjtBQUNBQSxRQUFBQSxjQUFjLEdBQUdGLFdBQWpCO0FBQ0Q7O0FBQ0QsYUFBT0UsY0FBUDtBQUNEO0FBakNnQyxHQUFuQyxDQUZGO0FBc0NEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb3h5IGZyb20gXCJleHByZXNzLWh0dHAtcHJveHlcIjtcbmltcG9ydCBjb29raWVTZXNzaW9uIGZyb20gXCJjb29raWUtc2Vzc2lvblwiO1xuaW1wb3J0IGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XG5pbXBvcnQgcGFzc3BvcnQgZnJvbSBcIi4vcGFzc3BvcnRcIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4vY29tbW9uL2xvZ2dlclwiO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5cbmNvbnN0IGdlbmVyYXRlU2VjcmV0ID0gKCkgPT5cbiAgbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgY3J5cHRvLnJhbmRvbUJ5dGVzKDI1NiwgKGVyciwgYnVmZikgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlaihlcnIpO1xuICAgICAgcmVzKGJ1ZmYudG9TdHJpbmcoXCJoZXhcIikpO1xuICAgIH0pO1xuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gbWlkZGxld2FyZShhcHApIHtcbiAgY29uc3Qgc2VjcmV0ID0gZ2VuZXJhdGVTZWNyZXQoKTtcbiAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7IC8vIHN1cHBvcnQganNvbiBlbmNvZGVkIGJvZGllc1xuICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTsgLy8gc3VwcG9ydCBlbmNvZGVkIGJvZGllc1xuICBhcHAudXNlKFxuICAgIGNvb2tpZVNlc3Npb24oe1xuICAgICAgbmFtZTogXCJzd3Nlc3Npb25cIixcbiAgICAgIHNlY3JldCxcbiAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICBzaWduZWQ6IGZhbHNlXG4gICAgfSlcbiAgKTtcblxuICBhcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZyhyZXEpO1xuICAgIG5leHQoKTtcbiAgfSk7XG4gIC8vIGluaXRpYWxpemUgcGFzc3BvcnQgZm9yIGF1dGhlbnRpY2F0aW9uXG4gIGFwcC51c2UocGFzc3BvcnQuaW5pdGlhbGl6ZSgpKTtcblxuICAvLyBhZGQgdGhlIGNvbnRlbnQtdHlwZSBoZWFkZXIgaWYgaXQgZG9lc24ndCBleGlzdCBhbHJlYWR5XG5cbiAgYXBwLnVzZShcbiAgICBcIi9zZWFyY2hcIixcbiAgICBwcm94eShcImh0dHA6Ly9lbGFzdGljc2VhcmNoOjkyMDBcIiwge1xuICAgIC8vICAgcHJveHlSZXFQYXRoUmVzb2x2ZXI6IHJlcSA9PiB7XG4gICAgLy8gICAgIGlmKHJlcS5tZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BPU1QnKSB7XG5cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBjb25zdCBwYXJ0cyA9IHJlcS51cmwuc3BsaXQoXCI/XCIpO1xuICAgIC8vICAgICBjb25zdCBxdWVyeVN0cmluZyA9IHBhcnRzWzFdO1xuICAgIC8vICAgICBjb25zdCB1cGRhdGVkUGF0aCA9IHBhcnRzWzBdLnJlcGxhY2UoXG4gICAgLy8gICAgICAgL1xcLmtpYmFuYS8sXG4gICAgLy8gICAgICAgYC5raWJhbmFfJHtyZXEuc2Vzc2lvbi51c2VyfWBcbiAgICAvLyAgICAgKTtcbiAgICAvLyAgICAgcmV0dXJuIHVwZGF0ZWRQYXRoICsgKHF1ZXJ5U3RyaW5nID8gXCI/XCIgKyBxdWVyeVN0cmluZyA6IFwiXCIpO1xuICAgIC8vICAgfSxcbiAgICAgIHByb3h5UmVxT3B0RGVjb3JhdG9yOiAob3B0cywgc3JjKSA9PiB7XG4gICAgICAgIGlmIChzcmMubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09IFwiUE9TVFwiKSB7XG4gICAgICAgICAgc3JjLmhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL0pTT05cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgIH0sXG4gICAgICBwcm94eVJlcUJvZHlEZWNvcmF0b3I6IGZ1bmN0aW9uKGJvZHlDb250ZW50LCBzcmNSZXEpIHtcbiAgICAgICAgbGV0IG5ld0JvZHlDb250ZW50O1xuICAgICAgICBcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJvZHlDb250ZW50ICYmIHR5cGVvZiBib2R5Q29udGVudCA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICFPYmplY3Qua2V5cyhib2R5Q29udGVudCkubGVuZ3RoXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgc3JjUmVxLl9oYXNCb2R5ID0gZmFsc2U7XG4gICAgICAgICAgbmV3Qm9keUNvbnRlbnQgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhuZXdCb2R5Q29udGVudCk7XG4gICAgICAgICAgbmV3Qm9keUNvbnRlbnQgPSBib2R5Q29udGVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3Qm9keUNvbnRlbnQ7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcbn1cbiJdfQ==