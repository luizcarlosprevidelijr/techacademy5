import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { jwtDecode } from "jwt-decode";
import DeleteUserButton from "./DeleteUserButton";
import StyleButton from "../../components/StyleButton";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/UserContext";

interface DecodedToken {
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
  };
}

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!user && token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded.user); // Atualiza o contexto
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Erro ao decodificar token.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  return (
    <div>
      <Menu />
      <div
        style={{
          marginLeft: "180px",
          padding: "20px",
          height: "100vh",
          width: "188vh",
          backgroundColor: "#1E1E2F",
          color: "#fff",
        }}
      >
        <h1
          style={{
            color: "#FFD700",
            fontSize: "2.5rem",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          Bem-vindo, {user ? user.name : "Carregando..."}!
        </h1>

        {loading ? (
          <p style={{ textAlign: "center", color: "#FFD700" }}>Carregando...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : (
          <div
            style={{
              backgroundColor: "#29293d",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              margin: "20px auto",
              textAlign: "left",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h2 style={{ color: "#FFD700", textAlign: "center" }}>
              Seus Dados
            </h2>
            <p>
              <strong>Nome:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>CPF:</strong> {user?.cpf}
            </p>

            <DeleteUserButton
              userId={user!.id}
              onDeleteSuccess={() => {
                setUser(null);
                navigate("/login");
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <StyleButton
                bgColor="#4CAF50"
                onClick={() => navigate("/edituser")}
              >
                Editar Perfil
              </StyleButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
