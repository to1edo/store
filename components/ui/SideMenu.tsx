import { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { AuthContext, UIContext } from "@/context";
import Link from "next/link";

export const SideMenu = () => {

  const {isLoggedIn, user, logout} = useContext(AuthContext)
  const { isMenuOpen, toggleMenu } = useContext(UIContext);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = ()=>{
    if(!searchTerm.trim().length) return ;
    navigateTo(`/search/${searchTerm}`);
    setSearchTerm('');
  }

  const navigateTo = (url: string) => {
    toggleMenu();
    router.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleMenu}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              value = {searchTerm}
              onChange = {(e)=> setSearchTerm(e.target.value)}
              onKeyPress ={(e)=> { if(e.key == 'Enter')onSearchTerm() }}
              type="text"
              autoFocus
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={()=>onSearchTerm()}  aria-label="toggle password visibility" >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {
            isLoggedIn && (
              <>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Perfil"} />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Mis Ordenes"} />
                </ListItemButton>

                <ListItemButton  sx={{ display: { xs: "", sm: "none" } }} onClick={()=>navigateTo('/category/men')}>
                  <ListItemIcon>
                    <MaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Hombres"} />
                </ListItemButton>

                <ListItemButton sx={{ display: { xs: "", sm: "none" } }} onClick={()=>navigateTo('/category/women')}> 
                  <ListItemIcon>
                    <FemaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Mujeres"} />
                </ListItemButton>

                <ListItemButton sx={{ display: { xs: "", sm: "none" } }} onClick={()=>navigateTo('/category/kids')}>
                  <ListItemIcon>
                    <EscalatorWarningOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Niños"} />
                </ListItemButton>

                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <LoginOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Salir"} />
                </ListItemButton>
              </>
            )
          }

          {
            !isLoggedIn && (
              <ListItemButton onClick={()=> navigateTo(`/auth/login?p=${router.asPath}`)}>
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary={"Ingresar"} />
              </ListItemButton>
            )
          }


          {/* Admin */}

          {
            isLoggedIn && user?.role === 'admin' && (
              <>
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItemButton>
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Productos"} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Ordenes"} />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary={"Usuarios"} />
                </ListItemButton>
              </>
            )
          }
        </List>
      </Box>
    </Drawer>
  );
};
