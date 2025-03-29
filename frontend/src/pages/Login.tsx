import { useState } from "react";
import StyledLink from "../Components/StyledLink";
import InputLoginRegister from "../Components/Input";
import StyledForm from "../Components/StyledForm";
import ButtonLoginRegister from "../Components/ButtonLoginRegister";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateRequired = (value: string) => {
    if (!value) return "Campo obrigatório";
    return undefined;
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    console.log("Email:", email);
    console.log("Senha:", password);

    alert("Login realizado com sucesso!");
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
        <StyledLink to="/" bgColor="rgb(137, 157, 25)">
          Home
        </StyledLink>

        <StyledLink to="/register" bgColor="#4CAF50">
          Registrar
        </StyledLink>
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

      <StyledForm>
        <InputLoginRegister
          label="Email"
          type="email"
          value={email}
          onChangeValue={(event) => setEmail(event.target.value)}
          validate={validateRequired}
        />

        <InputLoginRegister
          label="Senha"
          type="password"
          value={password}
          onChangeValue={(event) => setPassword(event.target.value)}
          validate={validateRequired}
        />

        <ButtonLoginRegister onClick={handleLogin} bgColor="rgb(239, 150, 150)">
          Entrar
        </ButtonLoginRegister>
      </StyledForm>
    </div>
  );
};

export default Login;
