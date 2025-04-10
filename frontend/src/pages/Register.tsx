import { useState } from "react";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";

import StyleButton from "../components/StyleButton";
import StyleInput from "../components/StyleInput";
import StyleForm from "../components/StyleForm";
import StyleLink from "../components/StyleLink";
import { ValidateCPF } from "../utils/ValidateCPF";
import { ValidatePasswordStrength } from "../utils/ValidatePasswordStrength";

const Register = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateRequired = (value: string): string | undefined => {
    if (!value) return "Campo obrigatório";
    return undefined;
  };

  // const ValidateCPF = (value: string): string | undefined => {
  //   if (!ValidateCPF(value)) return "CPF inválido";
  //   return undefined;
  // };

  const formatCpf = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !cpf || !password || !confirmPassword) {
      alert("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!ValidateCPF(cpf)) {
      alert("CPF inválido.");
      return;
    }

    if (!ValidatePasswordStrength(password)) {
      setPasswordError(
        "A senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial."
      );
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:3000/users", {
        name,
        cpf,
        email,
        password,
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message || "Erro ao cadastrar.");
      } else {
        alert("Erro inesperado.");
      }
    } finally {
      setIsLoading(false);
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

      <h1 style={{ color: "#fff" }}>Registrar</h1>

      <StyleForm onSubmit={handleRegister}>
        <StyleInput
          label="Nome"
          type="text"
          value={name}
          onChangeValue={(e) => setName(e.target.value)}
          validate={validateRequired}
        />

        <StyleInput
          label="CPF"
          type="text"
          value={cpf}
          onChangeValue={(e) => setCpf(formatCpf(e.target.value))}
          validate={ValidateCPF}
        />

        <StyleInput
          label="Email"
          type="email"
          value={email}
          onChangeValue={(e) => setEmail(e.target.value)}
          validate={validateRequired}
        />

        <StyleInput
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={password}
          onChangeValue={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          validate={validateRequired}
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: "none", border: "none" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />
        {passwordError && (
          <span
            style={{ color: "red", fontSize: "0.8rem", marginTop: "-10px" }}
          >
            {passwordError}
          </span>
        )}

        <StyleInput
          label="Confirmar Senha"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChangeValue={(e) => setConfirmPassword(e.target.value)}
          validate={validateRequired}
          iconRight={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ background: "none", border: "none" }}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />

        <StyleButton
          type="submit"
          bgColor="rgb(239, 150, 150)"
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Registrar"}
        </StyleButton>
      </StyleForm>
    </div>
  );
};

export default Register;
