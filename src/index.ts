import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res
    .status(200)
    .send("<h1>Hello World</h1><p>Welcome to SavingBuddy API.</p>");
});

app.use((_req, res) =>
  res
    .status(404)
    .json({ status: "Not Found", message: "This route does not exist" })
);

app.listen(PORT || 3000, () => {
  console.log(`Server started on PORT ${PORT} 🚀 `);
});
