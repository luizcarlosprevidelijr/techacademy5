import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../services/api";
import StyleInput from "../../components/StyleInput";
import StyleButton from "../../components/StyleButton";
import { useUser } from "../../contexts/UserContext";
import { ValidateCPF } from "../../utils/ValidateCPF";
import { ValidatePasswordStrength } from "../../utils/ValidatePasswordStrength";

const EditUser = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [cpf, setCpf] = useState(user?.cpf || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!ValidateCPF(cpf)) {
      setError("CPF inválido.");
      return;
    }

    if (password && !ValidatePasswordStrength(password)) {
      setError("A senha deve ter pelo menos 8 caracteres, letras e números.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await api.put(`/users/${user?.id}`, {
        name,
        cpf,
        ...(password ? { password } : {}), // só envia se a senha for preenchida
      });

      setUser({ ...user!, name, cpf }); // atualiza no contexto
      navigate("/owner-dashboard"); // volta pra dashboard
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar usuário.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", color: "#fff" }}>
      <h2 style={{ textAlign: "center", color: "#FFD700" }}>Editar Perfil</h2>

      <StyleInput
        label="Nome"
        value={name}
        onChangeValue={(e) => setName(e.target.value)}
      />

      <StyleInput
        label="CPF"
        value={cpf}
        onChangeValue={(e) => setCpf(e.target.value)}
        validate={(value) => (!ValidateCPF(value) ? "CPF inválido" : undefined)}
      />

      <StyleInput
        label="Email"
        value={user?.email || ""}
        readOnly
        onChangeValue={() => {}}
      />

      <StyleInput
        label="Nova Senha"
        type="password"
        value={password}
        onChangeValue={(e) => setPassword(e.target.value)}
        placeholder="Deixe em branco para não alterar"
        validate={(value) =>
          value && !ValidatePasswordStrength(value) ? "Senha fraca" : undefined
        }
      />

      <StyleInput
        label="Confirmar Senha"
        type="password"
        value={confirmPassword}
        onChangeValue={(e) => setConfirmPassword(e.target.value)}
        placeholder="Repita a nova senha"
        validate={(value) =>
          password && value !== password ? "As senhas não coincidem" : undefined
        }
      />

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <StyleButton bgColor="#4CAF50" onClick={handleSubmit}>
        Salvar Alterações
      </StyleButton>
    </div>
  );
};

export default EditUser;
