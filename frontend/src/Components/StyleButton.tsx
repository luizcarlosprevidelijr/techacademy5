import "./StyleButton.css";

interface StyleButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  bgColor?: string;
  type?: "button" | "submit" | "reset";
}

const StyleButton: React.FC<StyleButtonProps> = ({
  onClick,
  children,
  bgColor,
  type = "button", // Default to "button" if not provided
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="button"
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  );
};

export default StyleButton;
