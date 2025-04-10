interface DeleteUserButtonProps {
  userId: string;
  onDeleteSuccess: () => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({
  userId,
  onDeleteSuccess,
}) => {
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Você não está autenticado.");
        return;
      }

      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário.");
      }

      alert("Usuário excluído com sucesso.");
      localStorage.removeItem("authToken");
      onDeleteSuccess();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Erro ao excluir conta.");
    }
  };

  return (
    <button
      onClick={handleDeleteUser} // ← Aqui a função é chamada corretamente!
      style={{
        marginTop: "20px",
        padding: "10px 15px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      Excluir Conta
    </button>
  );
};

export default DeleteUserButton;
