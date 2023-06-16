import { FC } from 'react';
import { IValidSizes } from '@/intefaces';
import { Box, Button } from '@mui/material';


interface Props{
  sizes: IValidSizes[],
  selectedSize?: IValidSizes
}
export const SizeSelector: FC<Props> = ({sizes, selectedSize}) => {
  return (
    <Box>
      {
        sizes.map(size => (
          <Button 
            key={size}
            size='small'
            color={size === selectedSize ? 'primary' : 'info'}
          >
            {size}
          </Button>
        ))
      }
    </Box>
    
  )
}
