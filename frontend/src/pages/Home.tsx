import StyledLink from "../Components/StyledLink";

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        top: "25px",
        padding: "15px",
      }}
    >
      <h1 style={{ color: "rgb(255, 255, 255)", fontSize: "2.5rem" }}>
        Bem-vindo ao Sistema de Vendas da VendaFácil
      </h1>
      <p>
        Gerencie seus produtos, clientes e vendas de maneira rápida e eficiente.
      </p>

      <div
        style={{
          position: "absolute",
          top: "25px",
          right: "25px",
          display: "flex",
          gap: "10px",
        }}
      >
        <StyledLink to="/login" bgColor="#4A90E2">
          Entrar
        </StyledLink>

        <StyledLink to="/register" bgColor="#4CAF50">
          Registrar
        </StyledLink>
      </div>
    </div>
  );
};

export default Home;
