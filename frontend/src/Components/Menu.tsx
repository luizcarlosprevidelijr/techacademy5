import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, People, Store, ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router";
import LogoutButton from "./LogoutButton";

const menuItems = [
  { text: "Dashboard", path: "/ownerdashboard", icon: <Dashboard /> },
  { text: "Vendedores", path: "/sellers", icon: <People /> },
  { text: "Clientes", path: "/clients", icon: <People /> },
  { text: "Produtos", path: "/products", icon: <Store /> },
  { text: "Vendas", path: "/sales", icon: <ShoppingCart /> },
];

const Menu = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1E1E2F",
          color: "#FFF",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#FFD700",
                  color: "#000",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <ListItemButton sx={{ position: "absolute", bottom: 20, left: 10 }}>
        <LogoutButton />
      </ListItemButton>
    </Drawer>
  );
};

export default Menu;
