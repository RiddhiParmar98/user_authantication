import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import authRoute from "./Routes/authRoute.js";
import userRoute from './Routes/userRoute.js';

dotenv.config();


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.BACKEND_PORT || 3000;
        this.setUpMiddleWare();
        this.setUpRoutes();
    }

    setUpMiddleWare() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cors());
        console.log("Server configration")
    }

    setUpRoutes() {
        this.app.use("/api/auth", authRoute);
        this.app.use("/api/user", userRoute);

        console.log("Router Connected")
    }

   async start() {
        try {
            await this.app.listen(this.port, () => {
                console.log(`Server is running on port : ${this.port}`)
            })
        } catch (error) {
            console.log("Error starting the server", error);
        }
    }
}

export default Server;