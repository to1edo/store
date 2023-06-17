import NextLink from "next/link";
import { ShopLayout } from "@/components/layouts";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { Button, Chip, Grid, Typography } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef
} from "@mui/x-data-grid";

const rows: GridRowsProp = [
  { id: 11212, isPaid: false, fullName: "João da Silva" },
  { id: 22441, isPaid: true, fullName: "Maira G. " },
  { id: 65756, isPaid: false, fullName: "Pepe M." },
  { id: 75404, isPaid: true, fullName: "Luis G." },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "fullName", headerName: "Nome Completo", width: 250 },
  {
    field: "isPaid",
    headerName: "Pagado",
    width: 200,
    description: "Mostra o status do pedido",
    renderCell: (params) => {
      return params.row.isPaid ? (
        <Chip
          label="Ordem pagada"
          color="success"
          variant="outlined"
          sx={{ mt: 1 }}
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          label="Pendente de pago"
          color="error"
          variant="outlined"
          sx={{ mt: 1 }}
          icon={<CreditCardOffOutlined />}
        />
      );
    },
  },
  {
    field:'orderLink',
    headerName: 'Enlace',
    width: 150,
    renderCell: (params) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Button variant="text" color="secondary">
            Ver pedido
          </Button>
        </NextLink>
      );
    },
    sortable: false,
  },

];

const OrdersHistory = () => {
  return (
    <ShopLayout title="Histórico de pedidos" description="Histórico de pedidos">
      <Typography variant="h1">Histórico de Pedidos</Typography>

      <Grid container mt={2}>
        <Grid item xs={12} sx={{ height: 400, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrdersHistory;
