import Server from "./server.js";
import Database from "./database.js";

const startServer = async () => {
        const database = new Database();
        await database.connect();

        const server = new Server();
        await server.start();
}

startServer();