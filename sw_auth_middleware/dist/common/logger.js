"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pino = _interopRequireDefault(require("pino"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const l = (0, _pino.default)({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL
});
var _default = l;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvY29tbW9uL2xvZ2dlci5qcyJdLCJuYW1lcyI6WyJsIiwibmFtZSIsInByb2Nlc3MiLCJlbnYiLCJBUFBfSUQiLCJsZXZlbCIsIkxPR19MRVZFTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUEsTUFBTUEsQ0FBQyxHQUFHLG1CQUFLO0FBQ2JDLEVBQUFBLElBQUksRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLE1BREw7QUFFYkMsRUFBQUEsS0FBSyxFQUFFSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUc7QUFGTixDQUFMLENBQVY7ZUFLZU4sQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwaW5vIGZyb20gJ3Bpbm8nO1xuXG5jb25zdCBsID0gcGlubyh7XG4gIG5hbWU6IHByb2Nlc3MuZW52LkFQUF9JRCxcbiAgbGV2ZWw6IHByb2Nlc3MuZW52LkxPR19MRVZFTCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsO1xuIl19