import { FC } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';


interface Props{

}
export const ItemCounter:FC<Props> = () => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton>
        <RemoveCircleOutline/>
      </IconButton>

      <Typography sx={{ margin: '0px 10px' }}>1</Typography>

      <IconButton>
        <AddCircleOutline/>
      </IconButton>

    </Box>
  )
}
