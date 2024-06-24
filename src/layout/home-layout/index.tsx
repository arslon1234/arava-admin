import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
// import Divider from '@mui/material/Divider';
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ListItemText } from "@mui/material";
// import { useEffect  } from 'react';
// import { useNavigate } from 'react-router-dom';

// import {getCookies} from "@coocse"
import navList from "../../router/nav-list";
import { Account, DropdownLanguage } from "@ui";
// import Logo from "../../assets/texnoatk-logo-grup.svg"
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // my code ....------------------------------------------------
  //  const navigate = useNavigate()

  //-> useEfect <------
  // useEffect(() => {
  //   if(!getCookies("access_token")){
  //       navigate("/");
  //   }
  // })
  //=-=--=-===-=-===-=-=-=

  const { pathname } = useLocation();

  const getCategoryName = (pathname: any) => {
    if (pathname === "/home") return "Brand type";
    if (pathname === "/home/brand") return "Brand";
    if (pathname === "/home/company") return "Company";
    if (pathname === "/home/city") return "City";
    if (pathname === "/home/country") return "Country";
    if (pathname === "/home/couriers") return "Couriers";
    // if (/^\/home\/category\/\d+$/.test(pathname)) return "Subcategory";
    // if (/^\/home\/brands\/\d+$/.test(pathname)) return "Brand Catigory";
    // if (/^\/home\/products\/\d+$/.test(pathname)) return "Product"; // Regex for dynamic path
    return "Error";
  };

  // ....------------------------------------------------

  const drawer = (
    <div>
      <div className="w-full py-[1px] flex items-center justify-center">
        <img
          className="w-[150px] h-[62px]"
          src="https://static.vecteezy.com/system/resources/thumbnails/017/421/220/small_2x/test-3d-word-text-png.png"
          alt="logo"
        />
      </div>
      {/* <Divider /> */}
      <List className="bg-[#FFF] min-h-[90vh]">
        {navList.map((el, index) => (
          <NavLink
            key={index}
            to={el.path}
            className={
              el.path === pathname
                ? "block bg-[rgb(43,198,43)] text-white duration-200    "
                : "  "
            }
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <span className={el.path === pathname ? "text-white" : ""}>
                    {el.icon}
                  </span>
                </ListItemIcon>
                <ListItemText primary={el.title} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="bg-[#FFF] h-[72px] flex items-center justify-between " >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              color: "#767676", // HEX formatida rang
            }}
          ></IconButton>
          
            <div>
              <h1 className="text-[20px] text-slate-600">
                {getCategoryName(pathname)}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="">
                <DropdownLanguage />
              </div>
              <Account />
            </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
