import LogoutButton from "../Components/LogoutButton";

const OwnerDashboard = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px",
        backgroundColor: "#1E1E2F",
      }}
    >
      <h1 style={{ color: "#FFD700", fontSize: "2.5rem", textAlign: "center" }}>
        Bem-vindo ao seu perfil de proprietário!
      </h1>

      <LogoutButton />
    </div>
  );
};

export default OwnerDashboard;
