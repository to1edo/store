import { Box, CircularProgress, Typography } from "@mui/material"


export const FullScreenLoading = () => {
  return (
    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
          flexDirection: "column",
          height: "calc(100vh - 200px)",
        }}
      >
        <Typography variant="h6">Cargando...</Typography>
        <CircularProgress/>
      </Box>
  )
}
