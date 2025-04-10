import { useState } from "react";
import StyleForm from "../components/StyleForm";
import StyleInput from "../components/StyleInput";
import StyleButton from "../components/StyleButton";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import { Eye, EyeOff } from "lucide-react";
import StyleLink from "../components/StyleLink";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateRequired = (value: string) => {
    if (!value) return "Campo obrigatório";
    return undefined;
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Digite um e-mail válido.");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.token;
      login(token); // Armazena no localStorage (via AuthContext)
      navigate("/ownerdashboard");
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        const msg =
          axiosError.response?.data?.message || "Erro ao fazer login.";
        alert(msg);
      } else {
        alert("Erro inesperado. Tente novamente.");
      }
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
          type={showPassword ? "text" : "password"}
          value={password}
          onChangeValue={(event) => setPassword(event.target.value)}
          validate={validateRequired}
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />

        <StyleButton type="submit" bgColor="rgb(239, 150, 150)">
          Entrar
        </StyleButton>
      </StyleForm>
    </div>
  );
};

export default Login;
