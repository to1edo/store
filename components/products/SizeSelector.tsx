import { FC } from 'react';
import { ICartProduct, IValidSizes } from '@/intefaces';
import { Box, Button } from '@mui/material';


interface Props{
  sizes: IValidSizes[],
  selectedSize?: IValidSizes,
  selectSize: (size:IValidSizes)=>void
}
export const SizeSelector: FC<Props> = ({sizes, selectedSize,selectSize}) => {
  return (
    <Box>
      {
        sizes.map(size => (
          <Button 
            key={size}
            size='small'
            color={size === selectedSize ? 'primary' : 'info'}
            onClick={() => selectSize(size)}
          >
            {size}
          </Button>
        ))
      }
    </Box>
    
  )
}
