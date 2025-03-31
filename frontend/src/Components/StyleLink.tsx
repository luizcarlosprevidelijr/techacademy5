import { Link } from "react-router";
import "./StyleLink.css";

interface StyleLink {
  to: string;
  children: React.ReactNode;
  bgColor?: string;
}

const StyleLink = ({ to, children, bgColor = "#4CAF50" }: StyleLink) => {
  return (
    <Link to={to} className="styled-link" style={{ backgroundColor: bgColor }}>
      {children}
    </Link>
  );
};

export default StyleLink;
