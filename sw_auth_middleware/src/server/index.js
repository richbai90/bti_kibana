import "./common/env";
import Server from "./common/server";
import middleware from "./middleware";
import routes from "./routes";

export default new Server().middleware(middleware).then(server => {
  server.router(routes).listen(process.env.PORT);
});
