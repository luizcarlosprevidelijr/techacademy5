import { FormEvent } from "react";

interface StyledFormProps {
  children: React.ReactNode;
  onSubmit?: (e: FormEvent) => void; // Adiciona a propriedade onSubmit
}

const StyledForm: React.FC<StyledFormProps> = ({ children, onSubmit }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "320px",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.7)",
        textAlign: "center",
      }}
      onSubmit={onSubmit} // Passa o onSubmit para o formulário
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        {children}
      </form>
    </div>
  );
};

export default StyledForm;
