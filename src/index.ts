import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import apiDoc from "./api/v1/config/apiDoc.json";
import Routes from "./api/v1/routes/index";
import { CONSTANTS } from "./api/v1/config/CONSTANTS";

dotenv.config();
const { PORT } = CONSTANTS;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes(app);

app.get("/", (_req, res) => {
  res
    .status(200)
    .send(
      "<h1>SavingBuddy API</h1><p>Welcome to SavingBuddy API.</p><p><a href='/api_doc/v1'>Click here</a> for the API documentation</p>"
    );
});

app.use("/api_doc/v1", swaggerUi.serve, swaggerUi.setup(apiDoc));

app.use((_req, res) =>
  res
    .status(404)
    .json({ status: "Not Found", message: "This route does not exist" })
);

app.listen(Number(PORT), () => {
  console.log(`Server started on PORT ${PORT} 🚀 `);
});
