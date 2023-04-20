import dotenv from "dotenv";
import sls from "serverless-http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./routes/notes.js";
import mongoose from "mongoose";

import { APIGatewayProxyEvent, Context } from "aws-lambda";
dotenv.config();
const app = express();

// ----------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/notes", router);
app.get("/", (req, res) => {
  res.send(
    "Welcome to my Node.js CRUD REST API Project, please refer to the documentation at https://github.com/DomDevs2000/REST-API#readme"
  );
});
app.set("json spaces", 2);
//-----------------------------------------------------------------

//----------------------------------------------------------------

//@ts-ignore
const MONGO_URI: string = process.env.MONGO_URI;

const isValidMongoUrl = (mongoUrl: string | undefined): mongoUrl is string => {
  return mongoUrl !== undefined;
};

const mongoUrl = MONGO_URI;

if (!isValidMongoUrl(mongoUrl)) {
  throw new Error("Mongo URL Required");
}
const database = mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const db = async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  database
    .then(async (connection) => {
      console.log("Connected To MongoDB");
      app.listen(process.env.PORT, () => console.log("Server Running..."));
    })
    .catch((error) => console.log(error));
};

export const server = sls(app);
export { database };
export { app };
