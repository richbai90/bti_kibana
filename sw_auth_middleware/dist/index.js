"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./common/env");

var _server = _interopRequireDefault(require("./common/server"));

var _middleware = _interopRequireDefault(require("./middleware"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _server.default().middleware(_middleware.default).then(server => {
  server.router(_routes.default).listen(process.env.PORT);
});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvaW5kZXguanMiXSwibmFtZXMiOlsiU2VydmVyIiwibWlkZGxld2FyZSIsInRoZW4iLCJzZXJ2ZXIiLCJyb3V0ZXIiLCJyb3V0ZXMiLCJsaXN0ZW4iLCJwcm9jZXNzIiwiZW52IiwiUE9SVCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O2VBRWUsSUFBSUEsZUFBSixHQUFhQyxVQUFiLENBQXdCQSxtQkFBeEIsRUFBb0NDLElBQXBDLENBQXlDQyxNQUFNLElBQUk7QUFDaEVBLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjQyxlQUFkLEVBQXNCQyxNQUF0QixDQUE2QkMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLElBQXpDO0FBQ0QsQ0FGYyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9jb21tb24vZW52XCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuL2NvbW1vbi9zZXJ2ZXJcIjtcbmltcG9ydCBtaWRkbGV3YXJlIGZyb20gXCIuL21pZGRsZXdhcmVcIjtcbmltcG9ydCByb3V0ZXMgZnJvbSBcIi4vcm91dGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTZXJ2ZXIoKS5taWRkbGV3YXJlKG1pZGRsZXdhcmUpLnRoZW4oc2VydmVyID0+IHtcbiAgc2VydmVyLnJvdXRlcihyb3V0ZXMpLmxpc3Rlbihwcm9jZXNzLmVudi5QT1JUKTtcbn0pO1xuIl19