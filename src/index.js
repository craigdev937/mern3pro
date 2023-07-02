import "dotenv/config";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { ERR } from "./middleware/errMid.js";
import { prodRt } from "./routes/prodRt.js";

(async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is now Connected!"))
    .catch((error) => console.log(error));
    const app = express();
    app.get(helmet());

    // CORS
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, DELETE");
            return res.status(200).json({"status message": "OK" });
            
        };
        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(logger("dev"));
    app.use("/products", prodRt);
    app.use(ERR.notFound);
    app.use(ERR.errorHandler);
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();



