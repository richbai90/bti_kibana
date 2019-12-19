"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportCustom = _interopRequireDefault(require("passport-custom"));

var _xmlmc = _interopRequireDefault(require("./xmlmc"));

var _bypass = _interopRequireDefault(require("./bypass"));

var _logger = _interopRequireDefault(require("../common/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport.default.use("sw", new _passportCustom.default(async (req, done) => {
  const success = () => done(null, true);

  const fail = () => done();

  const now = () => new Date().getTime();

  if ((0, _bypass.default)(req)) {
    _logger.default.debug("bypassing authorization for request");

    return done(null, true);
  } else {
    _logger.default.debug("unable to bypass request");
  }

  try {
    _logger.default.debug(`attempting to bind to token in session: ${req.session.sessid}`);

    await _xmlmc.default.session.bindSession(req.session.sessid);
    req.session.lastauthdate = now();
    success();
  } catch (err) {
    _logger.default.debug(`failed to bind to session token ${req.session.sessid}`);

    _logger.default.debug(err);

    try {
      _logger.default.debug(`attempting to bind to token from header ${req.header("X-SW-TOKEN")}`);

      await _xmlmc.default.session.bindSession(req.header("X-SW-TOKEN"));
      req.session.sessid = req.header("X-SW-TOKEN");
      req.session.lastauthdate = now();
      success();
    } catch (e) {
      _logger.default.debug(`failed to bind to header token ${req.header("X-SW-TOKEN")}`);

      _logger.default.debug(e);

      fail();
    }
  }
}));

var _default = _passport.default;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvcGFzc3BvcnQvaW5kZXguanMiXSwibmFtZXMiOlsicGFzc3BvcnQiLCJ1c2UiLCJDdXN0b21TdHJhdGVneSIsInJlcSIsImRvbmUiLCJzdWNjZXNzIiwiZmFpbCIsIm5vdyIsIkRhdGUiLCJnZXRUaW1lIiwibG9nZ2VyIiwiZGVidWciLCJzZXNzaW9uIiwic2Vzc2lkIiwieG1sbWMiLCJiaW5kU2Vzc2lvbiIsImxhc3RhdXRoZGF0ZSIsImVyciIsImhlYWRlciIsImUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBQSxrQkFBU0MsR0FBVCxDQUNFLElBREYsRUFFRSxJQUFJQyx1QkFBSixDQUFtQixPQUFPQyxHQUFQLEVBQVlDLElBQVosS0FBcUI7QUFDdEMsUUFBTUMsT0FBTyxHQUFHLE1BQU1ELElBQUksQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUExQjs7QUFDQSxRQUFNRSxJQUFJLEdBQUcsTUFBTUYsSUFBSSxFQUF2Qjs7QUFDQSxRQUFNRyxHQUFHLEdBQUcsTUFBTSxJQUFJQyxJQUFKLEdBQVdDLE9BQVgsRUFBbEI7O0FBRUEsTUFBSSxxQkFBT04sR0FBUCxDQUFKLEVBQWlCO0FBQ2ZPLG9CQUFPQyxLQUFQLENBQWEscUNBQWI7O0FBQ0EsV0FBT1AsSUFBSSxDQUFDLElBQUQsRUFBTyxJQUFQLENBQVg7QUFDRCxHQUhELE1BR087QUFDTE0sb0JBQU9DLEtBQVAsQ0FBYSwwQkFBYjtBQUNEOztBQUNELE1BQUk7QUFDRkQsb0JBQU9DLEtBQVAsQ0FDRywyQ0FBMENSLEdBQUcsQ0FBQ1MsT0FBSixDQUFZQyxNQUFPLEVBRGhFOztBQUdBLFVBQU1DLGVBQU1GLE9BQU4sQ0FBY0csV0FBZCxDQUEwQlosR0FBRyxDQUFDUyxPQUFKLENBQVlDLE1BQXRDLENBQU47QUFDQVYsSUFBQUEsR0FBRyxDQUFDUyxPQUFKLENBQVlJLFlBQVosR0FBMkJULEdBQUcsRUFBOUI7QUFDQUYsSUFBQUEsT0FBTztBQUNSLEdBUEQsQ0FPRSxPQUFPWSxHQUFQLEVBQVk7QUFDWlAsb0JBQU9DLEtBQVAsQ0FBYyxtQ0FBa0NSLEdBQUcsQ0FBQ1MsT0FBSixDQUFZQyxNQUFPLEVBQW5FOztBQUNBSCxvQkFBT0MsS0FBUCxDQUFhTSxHQUFiOztBQUNBLFFBQUk7QUFDRlAsc0JBQU9DLEtBQVAsQ0FDRywyQ0FBMENSLEdBQUcsQ0FBQ2UsTUFBSixDQUFXLFlBQVgsQ0FBeUIsRUFEdEU7O0FBR0EsWUFBTUosZUFBTUYsT0FBTixDQUFjRyxXQUFkLENBQTBCWixHQUFHLENBQUNlLE1BQUosQ0FBVyxZQUFYLENBQTFCLENBQU47QUFDQWYsTUFBQUEsR0FBRyxDQUFDUyxPQUFKLENBQVlDLE1BQVosR0FBcUJWLEdBQUcsQ0FBQ2UsTUFBSixDQUFXLFlBQVgsQ0FBckI7QUFDQWYsTUFBQUEsR0FBRyxDQUFDUyxPQUFKLENBQVlJLFlBQVosR0FBMkJULEdBQUcsRUFBOUI7QUFDQUYsTUFBQUEsT0FBTztBQUNSLEtBUkQsQ0FRRSxPQUFPYyxDQUFQLEVBQVU7QUFDVlQsc0JBQU9DLEtBQVAsQ0FDRyxrQ0FBaUNSLEdBQUcsQ0FBQ2UsTUFBSixDQUFXLFlBQVgsQ0FBeUIsRUFEN0Q7O0FBR0FSLHNCQUFPQyxLQUFQLENBQWFRLENBQWI7O0FBQ0FiLE1BQUFBLElBQUk7QUFDTDtBQUNGO0FBQ0YsQ0FyQ0QsQ0FGRjs7ZUEwQ2VOLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhc3Nwb3J0IGZyb20gXCJwYXNzcG9ydFwiO1xuaW1wb3J0IEN1c3RvbVN0cmF0ZWd5IGZyb20gXCJwYXNzcG9ydC1jdXN0b21cIjtcbmltcG9ydCB4bWxtYyBmcm9tIFwiLi94bWxtY1wiO1xuaW1wb3J0IGJ5cGFzcyBmcm9tIFwiLi9ieXBhc3NcIjtcbmltcG9ydCBsb2dnZXIgZnJvbSBcIi4uL2NvbW1vbi9sb2dnZXJcIjtcblxucGFzc3BvcnQudXNlKFxuICBcInN3XCIsXG4gIG5ldyBDdXN0b21TdHJhdGVneShhc3luYyAocmVxLCBkb25lKSA9PiB7XG4gICAgY29uc3Qgc3VjY2VzcyA9ICgpID0+IGRvbmUobnVsbCwgdHJ1ZSk7XG4gICAgY29uc3QgZmFpbCA9ICgpID0+IGRvbmUoKTtcbiAgICBjb25zdCBub3cgPSAoKSA9PiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIGlmIChieXBhc3MocmVxKSkge1xuICAgICAgbG9nZ2VyLmRlYnVnKFwiYnlwYXNzaW5nIGF1dGhvcml6YXRpb24gZm9yIHJlcXVlc3RcIik7XG4gICAgICByZXR1cm4gZG9uZShudWxsLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmRlYnVnKFwidW5hYmxlIHRvIGJ5cGFzcyByZXF1ZXN0XCIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICBgYXR0ZW1wdGluZyB0byBiaW5kIHRvIHRva2VuIGluIHNlc3Npb246ICR7cmVxLnNlc3Npb24uc2Vzc2lkfWBcbiAgICAgICk7XG4gICAgICBhd2FpdCB4bWxtYy5zZXNzaW9uLmJpbmRTZXNzaW9uKHJlcS5zZXNzaW9uLnNlc3NpZCk7XG4gICAgICByZXEuc2Vzc2lvbi5sYXN0YXV0aGRhdGUgPSBub3coKTtcbiAgICAgIHN1Y2Nlc3MoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgZmFpbGVkIHRvIGJpbmQgdG8gc2Vzc2lvbiB0b2tlbiAke3JlcS5zZXNzaW9uLnNlc3NpZH1gKTtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhlcnIpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICAgIGBhdHRlbXB0aW5nIHRvIGJpbmQgdG8gdG9rZW4gZnJvbSBoZWFkZXIgJHtyZXEuaGVhZGVyKFwiWC1TVy1UT0tFTlwiKX1gXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHhtbG1jLnNlc3Npb24uYmluZFNlc3Npb24ocmVxLmhlYWRlcihcIlgtU1ctVE9LRU5cIikpO1xuICAgICAgICByZXEuc2Vzc2lvbi5zZXNzaWQgPSByZXEuaGVhZGVyKFwiWC1TVy1UT0tFTlwiKTtcbiAgICAgICAgcmVxLnNlc3Npb24ubGFzdGF1dGhkYXRlID0gbm93KCk7XG4gICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgICAgIGBmYWlsZWQgdG8gYmluZCB0byBoZWFkZXIgdG9rZW4gJHtyZXEuaGVhZGVyKFwiWC1TVy1UT0tFTlwiKX1gXG4gICAgICAgICk7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhlKTtcbiAgICAgICAgZmFpbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSlcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHBhc3Nwb3J0O1xuIl19