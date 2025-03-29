import { Link } from "react-router";
import "./StyledLink.css";

interface StyledLink {
  to: string;
  children: React.ReactNode;
  bgColor?: string;
}

const StyledLink = ({ to, children, bgColor = "#4CAF50" }: StyledLink) => {
  return (
    <Link to={to} className="styled-link" style={{ backgroundColor: bgColor }}>
      {children}
    </Link>
  );
};

export default StyledLink;
