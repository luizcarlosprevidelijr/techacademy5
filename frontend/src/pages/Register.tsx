import { useState } from "react";
import InputLoginRegister from "../Components/Input";
import StyledLink from "../Components/StyledLink";
import StyledForm from "../Components/StyledForm";
import ButtonLoginRegister from "../Components/ButtonLoginRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const validateRequired = (value: string) => {
    if (!value) return "Campo obrigatório";
    return undefined;
  };

  const handleRegister = () => {
    if (!email || !password || !name || !cpf) {
      alert("Preencha todos os campos!");
      return;
    }

    console.log(email);
    console.log(password);
    console.log(name);
    console.log(cpf);

    alert("Cadastro realizado com sucesso!");
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

        <StyledLink to="/login" bgColor="#4A90E2">
          Entrar
        </StyledLink>
      </div>

      <h1 style={{ color: "rgb(255, 255, 255)" }}>Registrar</h1>

      <StyledForm>
        <InputLoginRegister
          label="Nome"
          type="text"
          value={name}
          onChangeValue={(event) => setName(event.target.value)}
          validate={validateRequired}
        />

        <InputLoginRegister
          label="CPF"
          type="text"
          value={cpf}
          onChangeValue={(event) => setCpf(event.target.value)}
          validate={validateRequired}
        />

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

        <ButtonLoginRegister
          onClick={handleRegister}
          bgColor="rgb(239, 150, 150)"
        >
          Registrar
        </ButtonLoginRegister>
      </StyledForm>
    </div>
  );
};

export default Register;
