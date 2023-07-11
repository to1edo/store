import Link from "next/link"
import { AppBar, Toolbar, Box, Button, IconButton, Badge, Input, InputAdornment, ListItem} from "@mui/material"
import Typography from '@mui/material/Typography';
import { ClearOutlined, SearchOutlined, ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CartContext, UIContext } from "@/context";

export const NavBar = () => {
  
  const router = useRouter();
  const {toggleMenu} = useContext(UIContext);
  const {items} = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInputText, setShowInputText] = useState(false);

  const onSearchTerm = ()=>{
    if(!searchTerm.trim().length) return ;
    router.push(`/search/${searchTerm}`);
    setSearchTerm('');
    setShowInputText(false)
  }


  return (
    <AppBar position="sticky">
      <Toolbar>

        <Link href="/" passHref  style={{ textDecoration: "none" }}>
          <Box sx={{display: 'flex', alignItems: 'baseline'}}>
            <Typography sx={{color: 'black'}} variant="h6">Clothes |</Typography>
            <Typography sx={{ml: 1, color: 'black'}} variant="h2">Shop</Typography>
          </Box>
        </Link>

        <Box flex={1}/>

        <Box sx={{display: {xs:'none', sm:showInputText?'none':'flex'}, gap: 1}} className="fadeIn">
          <Link href="/category/men" passHref  style={{ textDecoration: "none" }}>
            <Button color={router.pathname.includes('/men')?'primary':'info'} sx={{display: 'flex', alignItems: 'baseline'}} >Homens</Button>
          </Link>

          <Link href="/category/women" passHref  style={{ textDecoration: "none" }}>
            <Button color={router.pathname.includes('/women')?'primary':'info'} sx={{display: 'flex', alignItems: 'baseline'}}>Mulheres</Button>
          </Link>

          <Link href="/category/kids" passHref  style={{ textDecoration: "none" }}>
            <Button color={router.pathname.includes('/kids')?'primary':'info'} sx={{display: 'flex', alignItems: 'baseline'}}>Crianças</Button>
          </Link>
        </Box>

        <Box flex={1}/>

        {
          showInputText?
          (
            <Input
              sx={ {display:showInputText?{xs:'none', sm:'flex'}:'none' , width:'250px'}}
              value = {searchTerm}
              onChange = {(e)=> setSearchTerm(e.target.value)}
              onKeyPress ={(e)=> { if(e.key == 'Enter')onSearchTerm() }}
              type="text"
              placeholder="Buscar..."
              className="fadeIn"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={()=>{setShowInputText(false)}} aria-label="toggle password visibility" >
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ):
          (
            <IconButton onClick={()=>{setShowInputText(true)}} sx={{display:{xs:'none', sm:'flex'}}} aria-label="toggle password visibility" className="fadeIn">
              <SearchOutlined  />
            </IconButton>
          )
        }

        {/* xs screen only */}
        <IconButton onClick={toggleMenu} sx={{display:{xs:'flex', sm:'none'}}} aria-label="toggle password visibility" className="fadeIn">
          <SearchOutlined  />
        </IconButton>

        <Link href="/cart" passHref  style={{ textDecoration: "none" }}>
          <IconButton sx={{}}>
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingCart/>
            </Badge>
          </IconButton>
        </Link>

        <Button
          onClick={()=>toggleMenu()}
        >Menu</Button>

      </Toolbar>
    </AppBar>
  )
}
