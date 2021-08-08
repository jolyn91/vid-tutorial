import * as http from "http";
import App from "./app";
import { Logger } from "./logger/logger";

const port = 3080;

App.set("port", port);
const server = http.createServer(App);

if (process.env.NODE_ENV !== 'test') {
    server.listen(port);
}

const logger = new Logger();

server.on("listening", () => {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`);
 });

module.exports = App;

// reference: https://github.com/bbachi/react-nodejs-typescript-example