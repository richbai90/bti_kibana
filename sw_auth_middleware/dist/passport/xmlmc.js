"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xmlmc = require("xmlmc");

// todo configure using env variables
var _default = new _xmlmc.XmlMethodCall(process.env.API_HOST || 'http://localhost');

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvcGFzc3BvcnQveG1sbWMuanMiXSwibmFtZXMiOlsiWG1sTWV0aG9kQ2FsbCIsInByb2Nlc3MiLCJlbnYiLCJBUElfSE9TVCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBO2VBQ2UsSUFBSUEsb0JBQUosQ0FBa0JDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLElBQXdCLGtCQUExQyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtYbWxNZXRob2RDYWxsfSBmcm9tICd4bWxtYyc7XG5cbi8vIHRvZG8gY29uZmlndXJlIHVzaW5nIGVudiB2YXJpYWJsZXNcbmV4cG9ydCBkZWZhdWx0IG5ldyBYbWxNZXRob2RDYWxsKHByb2Nlc3MuZW52LkFQSV9IT1NUIHx8ICdodHRwOi8vbG9jYWxob3N0Jyk7Il19