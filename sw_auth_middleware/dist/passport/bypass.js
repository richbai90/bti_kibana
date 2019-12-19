"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../common/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = req => {
  return !!(req.method === "HEAD" || req.header('x-original-uri').match(/^\/[_.].*/) || requestWithinLimit(req));
};

exports.default = _default;

function requestWithinLimit(req) {
  // allow requests within an hour of each other without re-authentication
  if (req.session && req.session.lastauthdate) {
    _logger.default.debug(`time since last auth : ${(now() - req.session.lastauthdate) / 1000 / 60 / 60}`);

    return now() - req.session.lastauthdate < 60 * 60 * 1000;
  }
}

function now() {
  const date = new Date();
  return date.getTime();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvcGFzc3BvcnQvYnlwYXNzLmpzIl0sIm5hbWVzIjpbInJlcSIsIm1ldGhvZCIsImhlYWRlciIsIm1hdGNoIiwicmVxdWVzdFdpdGhpbkxpbWl0Iiwic2Vzc2lvbiIsImxhc3RhdXRoZGF0ZSIsImxvZ2dlciIsImRlYnVnIiwibm93IiwiZGF0ZSIsIkRhdGUiLCJnZXRUaW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7ZUFFZUEsR0FBRyxJQUFJO0FBQ3BCLFNBQU8sQ0FBQyxFQUNOQSxHQUFHLENBQUNDLE1BQUosS0FBZSxNQUFmLElBQ0FELEdBQUcsQ0FBQ0UsTUFBSixDQUFXLGdCQUFYLEVBQTZCQyxLQUE3QixDQUFtQyxXQUFuQyxDQURBLElBRUFDLGtCQUFrQixDQUFDSixHQUFELENBSFosQ0FBUjtBQUtELEM7Ozs7QUFFRCxTQUFTSSxrQkFBVCxDQUE0QkosR0FBNUIsRUFBaUM7QUFDL0I7QUFDQSxNQUFJQSxHQUFHLENBQUNLLE9BQUosSUFBZUwsR0FBRyxDQUFDSyxPQUFKLENBQVlDLFlBQS9CLEVBQTZDO0FBQzNDQyxvQkFBT0MsS0FBUCxDQUNHLDBCQUF5QixDQUFDQyxHQUFHLEtBQUtULEdBQUcsQ0FBQ0ssT0FBSixDQUFZQyxZQUFyQixJQUN4QixJQUR3QixHQUV4QixFQUZ3QixHQUd4QixFQUFHLEVBSlA7O0FBTUEsV0FBT0csR0FBRyxLQUFLVCxHQUFHLENBQUNLLE9BQUosQ0FBWUMsWUFBcEIsR0FBbUMsS0FBSyxFQUFMLEdBQVUsSUFBcEQ7QUFDRDtBQUNGOztBQUVELFNBQVNHLEdBQVQsR0FBZTtBQUNiLFFBQU1DLElBQUksR0FBRyxJQUFJQyxJQUFKLEVBQWI7QUFDQSxTQUFPRCxJQUFJLENBQUNFLE9BQUwsRUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZ2dlciBmcm9tIFwiLi4vY29tbW9uL2xvZ2dlclwiO1xuXG5leHBvcnQgZGVmYXVsdCByZXEgPT4ge1xuICByZXR1cm4gISEoXG4gICAgcmVxLm1ldGhvZCA9PT0gXCJIRUFEXCIgfHxcbiAgICByZXEuaGVhZGVyKCd4LW9yaWdpbmFsLXVyaScpLm1hdGNoKC9eXFwvW18uXS4qLykgfHxcbiAgICByZXF1ZXN0V2l0aGluTGltaXQocmVxKVxuICApO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdFdpdGhpbkxpbWl0KHJlcSkge1xuICAvLyBhbGxvdyByZXF1ZXN0cyB3aXRoaW4gYW4gaG91ciBvZiBlYWNoIG90aGVyIHdpdGhvdXQgcmUtYXV0aGVudGljYXRpb25cbiAgaWYgKHJlcS5zZXNzaW9uICYmIHJlcS5zZXNzaW9uLmxhc3RhdXRoZGF0ZSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcbiAgICAgIGB0aW1lIHNpbmNlIGxhc3QgYXV0aCA6ICR7KG5vdygpIC0gcmVxLnNlc3Npb24ubGFzdGF1dGhkYXRlKSAvXG4gICAgICAgIDEwMDAgL1xuICAgICAgICA2MCAvXG4gICAgICAgIDYwfWBcbiAgICApO1xuICAgIHJldHVybiBub3coKSAtIHJlcS5zZXNzaW9uLmxhc3RhdXRoZGF0ZSA8IDYwICogNjAgKiAxMDAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vdygpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gIHJldHVybiBkYXRlLmdldFRpbWUoKTtcbn1cbiJdfQ==