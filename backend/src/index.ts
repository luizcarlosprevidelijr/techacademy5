import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import sellerRoutes from "./routes/sellerRoutes";
import clientRoutes from "./routes/clientRoutes";
import productRoutes from "./routes/productRoutes";
import loginRoutes from "./routes/loginRoutes";
import cors from "cors"; // 🔹 Importa o CORS

const app = express();
const port = 3000;

// 🔹 Configuração do CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Permite apenas o frontend acessar
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permite cookies e headers de autenticação
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(express.json());
app.use(userRoutes);
app.use(sellerRoutes);
app.use(productRoutes);
app.use(clientRoutes);
app.use(loginRoutes);

sequelize
  .sync({ alter: false })
  .then(() => {
    console.log("database foi sincronizado com sucesso");
  })
  .catch((error) => {
    console.log("deu zica no bagulho", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});
