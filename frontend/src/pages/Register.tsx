import { useState } from "react";
import StyleButton from "../Components/StyleButton";
import StyleLink from "../Components/StyleLink";
import StyleInput from "../Components/StyleInput";
import StyleForm from "../Components/StyleForm";
import { useNavigate } from "react-router"; // Correção: useNavigate deve vir de "react-router-dom"
import api from "../services/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const navigate = useNavigate(); // ✅ Correção: Agora o useNavigate está no lugar certo

  const validateRequired = (value: string) => {
    if (!value) return "Campo obrigatório";
    return undefined;
  };

  const validateCpf = (cpf: string) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf))
      return "CPF inválido. Use o formato 000.000.000-00";
    return undefined;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        "/users",
        {
          name: name,
          email: email,
          password: password,
          cpf: cpf,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      navigate("/login"); // ✅ Agora vai funcionar corretamente
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
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

        <StyleLink to="/login" bgColor="#4A90E2">
          Entrar
        </StyleLink>
      </div>

      <h1 style={{ color: "rgb(255, 255, 255)" }}>Registrar</h1>

      <StyleForm onSubmit={handleRegister}>
        <StyleInput
          label="Nome"
          type="text"
          value={name}
          onChangeValue={(event) => setName(event.target.value)}
          validate={validateRequired}
        />

        <StyleInput
          label="CPF"
          type="text"
          value={cpf}
          onChangeValue={(event) => setCpf(event.target.value)}
          validate={validateCpf}
        />

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
          Registrar
        </StyleButton>
      </StyleForm>
    </div>
  );
};

export default Register;
