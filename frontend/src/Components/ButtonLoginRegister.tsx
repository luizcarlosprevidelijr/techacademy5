import "./ButtonLoginRegister.css";

interface ButtonLoginRegisterProps {
  onClick: () => void;
  children: React.ReactNode;
  bgColor?: string;
}

const ButtonLoginRegister: React.FC<ButtonLoginRegisterProps> = ({
  onClick,
  children,
  bgColor,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="button"
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  );
};

export default ButtonLoginRegister;
