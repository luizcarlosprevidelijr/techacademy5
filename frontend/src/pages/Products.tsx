import Menu from "../components/Menu";

const Products = () => {
  return (
    <div>
      <Menu />
      {/* Conteúdo do Dashboard */}
      <div
        style={{
          marginLeft: "180px", // Deixa espaço para o menu lateral
          padding: "20px",
          height: "100vh", // Garante que o conteúdo ocupe toda a tela
          width: "188vh",
          backgroundColor: "#1E1E2F", // Cor de fundo do dashboard
          color: "#fff",
        }}
      >
        {/* Título do Dashboard */}
        <h1
          style={{
            color: "#FFD700",
            fontSize: "2.5rem",
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          Bem-vindo ao seu perfil de proprietário!
        </h1>

        {/* Outros conteúdos do Dashboard podem ser adicionados aqui */}
      </div>
    </div>
  );
};

export default Products;
