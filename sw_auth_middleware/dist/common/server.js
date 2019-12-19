"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var path = _interopRequireWildcard(require("path"));

var bodyParser = _interopRequireWildcard(require("body-parser"));

var _followRedirects = require("follow-redirects");

var os = _interopRequireWildcard(require("os"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _express.default();

class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({
      limit: process.env.REQUEST_LIMIT || '100kb'
    }));
    app.use(bodyParser.urlencoded({
      extended: true,
      limit: process.env.REQUEST_LIMIT || '100kb'
    }));
    app.use((0, _cookieParser.default)(process.env.SESSION_SECRET));
    app.use(_express.default.static(`${root}/public`));
  }

  async middleware(...middlewares) {
    const promises = middlewares.map(middleware => middleware(app));
    await Promise.all(promises);
    return this;
  }

  router(routes) {
    routes(app);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => _logger.default.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);

    _followRedirects.http.createServer(app).listen(port, welcome(port));

    return app;
  }

}

exports.default = ExpressServer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvY29tbW9uL3NlcnZlci5qcyJdLCJuYW1lcyI6WyJhcHAiLCJFeHByZXNzIiwiRXhwcmVzc1NlcnZlciIsImNvbnN0cnVjdG9yIiwicm9vdCIsInBhdGgiLCJub3JtYWxpemUiLCJfX2Rpcm5hbWUiLCJzZXQiLCJ1c2UiLCJib2R5UGFyc2VyIiwianNvbiIsImxpbWl0IiwicHJvY2VzcyIsImVudiIsIlJFUVVFU1RfTElNSVQiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJTRVNTSU9OX1NFQ1JFVCIsInN0YXRpYyIsIm1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlcyIsInByb21pc2VzIiwibWFwIiwiUHJvbWlzZSIsImFsbCIsInJvdXRlciIsInJvdXRlcyIsImxpc3RlbiIsInBvcnQiLCJQT1JUIiwid2VsY29tZSIsInAiLCJsIiwiaW5mbyIsIk5PREVfRU5WIiwib3MiLCJob3N0bmFtZSIsImh0dHAiLCJjcmVhdGVTZXJ2ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsR0FBRyxHQUFHLElBQUlDLGdCQUFKLEVBQVo7O0FBRWUsTUFBTUMsYUFBTixDQUFvQjtBQUNqQ0MsRUFBQUEsV0FBVyxHQUFHO0FBQ1osVUFBTUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZ0IsR0FBRUMsU0FBVSxRQUE1QixDQUFiO0FBQ0FQLElBQUFBLEdBQUcsQ0FBQ1EsR0FBSixDQUFRLFNBQVIsRUFBb0IsR0FBRUosSUFBSyxRQUEzQjtBQUNBSixJQUFBQSxHQUFHLENBQUNTLEdBQUosQ0FBUUMsVUFBVSxDQUFDQyxJQUFYLENBQWdCO0FBQUVDLE1BQUFBLEtBQUssRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGFBQVosSUFBNkI7QUFBdEMsS0FBaEIsQ0FBUjtBQUNBZixJQUFBQSxHQUFHLENBQUNTLEdBQUosQ0FDRUMsVUFBVSxDQUFDTSxVQUFYLENBQXNCO0FBQ3BCQyxNQUFBQSxRQUFRLEVBQUUsSUFEVTtBQUVwQkwsTUFBQUEsS0FBSyxFQUFFQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBWixJQUE2QjtBQUZoQixLQUF0QixDQURGO0FBTUFmLElBQUFBLEdBQUcsQ0FBQ1MsR0FBSixDQUFRLDJCQUFhSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUksY0FBekIsQ0FBUjtBQUNBbEIsSUFBQUEsR0FBRyxDQUFDUyxHQUFKLENBQVFSLGlCQUFRa0IsTUFBUixDQUFnQixHQUFFZixJQUFLLFNBQXZCLENBQVI7QUFDRDs7QUFFRCxRQUFNZ0IsVUFBTixDQUFpQixHQUFHQyxXQUFwQixFQUFpQztBQUMvQixVQUFNQyxRQUFRLEdBQUdELFdBQVcsQ0FBQ0UsR0FBWixDQUFnQkgsVUFBVSxJQUFJQSxVQUFVLENBQUNwQixHQUFELENBQXhDLENBQWpCO0FBQ0EsVUFBTXdCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSCxRQUFaLENBQU47QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFFREksRUFBQUEsTUFBTSxDQUFDQyxNQUFELEVBQVM7QUFDYkEsSUFBQUEsTUFBTSxDQUFDM0IsR0FBRCxDQUFOO0FBQ0EsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQ0QixFQUFBQSxNQUFNLENBQUNDLElBQUksR0FBR2hCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZZ0IsSUFBcEIsRUFBMEI7QUFDOUIsVUFBTUMsT0FBTyxHQUFHQyxDQUFDLElBQUksTUFDbkJDLGdCQUFFQyxJQUFGLENBQ0cscUJBQW9CckIsT0FBTyxDQUFDQyxHQUFSLENBQVlxQixRQUFaLElBQ25CLGFBQWMsT0FBTUMsRUFBRSxDQUFDQyxRQUFILEVBQWMsYUFBWUwsQ0FBRSxHQUZwRCxDQURGOztBQUtBTSwwQkFBS0MsWUFBTCxDQUFrQnZDLEdBQWxCLEVBQXVCNEIsTUFBdkIsQ0FBOEJDLElBQTlCLEVBQW9DRSxPQUFPLENBQUNGLElBQUQsQ0FBM0M7O0FBQ0EsV0FBTzdCLEdBQVA7QUFDRDs7QUFsQ2dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQge2h0dHB9IGZyb20gJ2ZvbGxvdy1yZWRpcmVjdHMnO1xuaW1wb3J0ICogYXMgb3MgZnJvbSAnb3MnO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCBsIGZyb20gJy4vbG9nZ2VyJztcblxuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwcmVzc1NlcnZlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IHJvb3QgPSBwYXRoLm5vcm1hbGl6ZShgJHtfX2Rpcm5hbWV9Ly4uLy4uYCk7XG4gICAgYXBwLnNldCgnYXBwUGF0aCcsIGAke3Jvb3R9Y2xpZW50YCk7XG4gICAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyBsaW1pdDogcHJvY2Vzcy5lbnYuUkVRVUVTVF9MSU1JVCB8fCAnMTAwa2InIH0pKTtcbiAgICBhcHAudXNlKFxuICAgICAgYm9keVBhcnNlci51cmxlbmNvZGVkKHtcbiAgICAgICAgZXh0ZW5kZWQ6IHRydWUsXG4gICAgICAgIGxpbWl0OiBwcm9jZXNzLmVudi5SRVFVRVNUX0xJTUlUIHx8ICcxMDBrYicsXG4gICAgICB9KVxuICAgICk7XG4gICAgYXBwLnVzZShjb29raWVQYXJzZXIocHJvY2Vzcy5lbnYuU0VTU0lPTl9TRUNSRVQpKTtcbiAgICBhcHAudXNlKEV4cHJlc3Muc3RhdGljKGAke3Jvb3R9L3B1YmxpY2ApKTtcbiAgfVxuXG4gIGFzeW5jIG1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IG1pZGRsZXdhcmVzLm1hcChtaWRkbGV3YXJlID0+IG1pZGRsZXdhcmUoYXBwKSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcm91dGVyKHJvdXRlcykge1xuICAgIHJvdXRlcyhhcHApO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuKHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUKSB7XG4gICAgY29uc3Qgd2VsY29tZSA9IHAgPT4gKCkgPT5cbiAgICAgIGwuaW5mbyhcbiAgICAgICAgYHVwIGFuZCBydW5uaW5nIGluICR7cHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHxcbiAgICAgICAgICAnZGV2ZWxvcG1lbnQnfSBAOiAke29zLmhvc3RuYW1lKCl9IG9uIHBvcnQ6ICR7cH19YFxuICAgICAgKTtcbiAgICBodHRwLmNyZWF0ZVNlcnZlcihhcHApLmxpc3Rlbihwb3J0LCB3ZWxjb21lKHBvcnQpKTtcbiAgICByZXR1cm4gYXBwO1xuICB9XG59XG4iXX0=