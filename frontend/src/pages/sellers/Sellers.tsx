import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router";
import api from "../../services/api";
import Menu from "../../components/Menu";

// Tipo da resposta que vem da API
type SellerApiResponse = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  sellers: {
    id: number;
    name: string;
    cpf: string;
    position: string;
    salary: string; // vem como string da API
    userId: number;
    createdAt: string;
    updatedAt: string;
  }[];
};

// Tipo que usamos no estado
type Seller = {
  id: number;
  name: string;
  cpf: string;
  position: string;
  salary: number;
};

export default function SellerList() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get<SellerApiResponse>("/sellers")
      .then((res) => {
        const sellersParsed: Seller[] = res.data.sellers.map((s) => ({
          id: s.id,
          name: s.name,
          cpf: s.cpf,
          position: s.position,
          salary: parseFloat(s.salary),
        }));
        setSellers(sellersParsed);
      })
      .catch((err) => console.error("Erro ao buscar vendedores", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Menu />
      <div
        style={{
          marginLeft: "230px",
          padding: "20px",
          height: "100vh",
          width: "180vh",
          backgroundColor: "#1E1E2F",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3>Vendedores</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/sellers/create")}
          >
            Adicionar Vendedor
          </Button>
        </div>

        {loading ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "60vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={2} padding={2}>
            {sellers.map((seller) => (
              <Grid item xs={12} sm={6} md={4} key={seller.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{seller.name}</Typography>
                    <Typography variant="body2">CPF: {seller.cpf}</Typography>
                    <Typography variant="body2">
                      Cargo: {seller.position}
                    </Typography>
                    <Typography variant="body2">
                      Salário: R$ {seller.salary.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
