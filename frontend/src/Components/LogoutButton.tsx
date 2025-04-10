// LogoutButton.tsx
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext"; // Ajuste o caminho conforme necessário

const LogoutButton = () => {
  const { logout } = useAuth(); // Pegue o `logout` do contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chama a função `logout` do contexto
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "red",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Sair
    </button>
  );
};

export default LogoutButton;
