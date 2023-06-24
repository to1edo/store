import Link from "next/link"
import { AppBar, Toolbar, Box, Button, IconButton, Badge} from "@mui/material"
import Typography from '@mui/material/Typography';
import { SearchOutlined, ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UIContext } from "@/context";

export const NavBar = () => {
  
  const router = useRouter();

  const {toggleMenu} = useContext(UIContext);

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

        <Box sx={{display: {xs:'none', sm:'flex'}, gap: 1}}>
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

        <IconButton>
          <SearchOutlined/>
        </IconButton>

        <Link href="/" passHref  style={{ textDecoration: "none" }}>
          <IconButton sx={{}}>
            <Badge badgeContent={2} color="secondary">
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
