import { useState } from "react";
import StyleLink from "../Components/StyleLink";
import StyleForm from "../Components/StyleForm";
import StyleInput from "../Components/StyleInput";
import StyleButton from "../Components/StyleButton";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateRequired = (value: string) => {
    if (!value) return "Campo obrigatório";
    return undefined;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });
      const token = response.data.accessToken;
      login(token);
      navigate("/ownerdashboard");
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer login.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "94vh",
        width: "97vw",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "25px",
          right: "25px",
          display: "flex",
          gap: "10px",
        }}
      >
        <StyleLink to="/" bgColor="rgb(137, 157, 25)">
          Home
        </StyleLink>

        <StyleLink to="/register" bgColor="#4CAF50">
          Registrar
        </StyleLink>
      </div>

      <h1
        style={{
          color: "rgb(255, 255, 255)",
          fontSize: "2.5rem",
          marginBottom: "20px",
        }}
      >
        Login
      </h1>

      <StyleForm onSubmit={handleLogin}>
        <StyleInput
          label="Email"
          type="email"
          value={email}
          onChangeValue={(event) => setEmail(event.target.value)}
          validate={validateRequired}
        />

        <StyleInput
          label="Senha"
          type="password"
          value={password}
          onChangeValue={(event) => setPassword(event.target.value)}
          validate={validateRequired}
        />

        <StyleButton type="submit" bgColor="rgb(239, 150, 150)">
          Entrar
        </StyleButton>
      </StyleForm>
    </div>
  );
};

export default Login;
