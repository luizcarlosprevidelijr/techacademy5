import { useState } from "react";
import StyleForm from "../../components/StyleForm";
import StyleInput from "../../components/StyleInput";
import StyleButton from "../../components/StyleButton";
import StyleLink from "../../components/StyleLink";
import { useNavigate } from "react-router";
import axios, { AxiosError } from "axios";

const SellerCreate = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  const formatCpf = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !cpf || !position || !salary) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    if (validateCpf(cpf)) {
      alert("CPF inválido. Use o formato 000.000.000-00");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:3000/sellers", {
        name,
        cpf,
        position,
        salary: parseFloat(salary),
      });

      alert("Vendedor cadastrado com sucesso!");
      navigate("/sellers");
    } catch (error: unknown) {
      console.error("Erro ao cadastrar vendedor:", error);

      if (error instanceof AxiosError) {
        alert(
          error.response?.data?.message || "Erro ao cadastrar. Tente novamente."
        );
      } else if (error instanceof Error) {
        alert(error.message || "Ocorreu um erro inesperado. Tente novamente.");
      } else {
        alert("Erro desconhecido. Verifique a conexão e tente novamente.");
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
        <StyleLink to="/sellers" bgColor="rgb(0, 94, 226)">
          Volta
        </StyleLink>
      </div>

      <h1 style={{ color: "rgb(255, 255, 255)" }}>Cadastrar Vendedor</h1>

      <StyleForm onSubmit={handleSubmit}>
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
          validate={validateCpf}
        />

        <StyleInput
          label="Cargo"
          type="text"
          value={position}
          onChangeValue={(e) => setPosition(e.target.value)}
          validate={validateRequired}
        />

        <StyleInput
          label="Salário"
          type="number"
          value={salary}
          onChangeValue={(e) => setSalary(e.target.value)}
          validate={validateRequired}
        />

        <StyleButton
          type="submit"
          bgColor="rgb(150, 200, 255)"
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Salvar"}
        </StyleButton>
      </StyleForm>
    </div>
  );
};

export default SellerCreate;
