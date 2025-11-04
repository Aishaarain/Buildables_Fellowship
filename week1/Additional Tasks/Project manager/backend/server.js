import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import db from "./config/db.js";

import dotenv from "dotenv";
import cors from "cors";
import schema from "./schema/schema.js";

dotenv.config();
const app = express();
app.use(cors());

db.on("connected", () => console.log("Database is ready!"));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
