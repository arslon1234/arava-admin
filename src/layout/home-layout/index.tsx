import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ListItemText } from "@mui/material";

import CategoryIcon from '@mui/icons-material/Category';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PublicIcon from '@mui/icons-material/Public';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';

import { useTranslation } from 'react-i18next';

// import navList from "../../router/nav-list";
import { Account, DropdownLanguage } from "@ui";
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



  //test language ----------------------------------------------------------------

  const { t } = useTranslation();
interface navListInterface {
    path: string,
    title :string,
    icon: JSX.Element,
}


const navList:navListInterface[] = [
    
    {
      path:"/home"  ,
      title:t('brandType'),
      icon: <CategoryIcon />,
    },
    {
        path:"/home/brand"  ,
        title:t('brand'),
        icon: <MilitaryTechIcon />,
    },
    {
      path:"/home/country"  ,
      title:t('country'),
      icon: <PublicIcon />,
    },
    {
      path:"/home/region"  ,
      title:t('region'),
      icon: <SouthAmericaIcon />,
    },
    {
        path:"/home/city"  ,
        title:t('city'),
        icon: <ApartmentIcon />,
    },
    {
        path:"/home/company"  ,
        title:t('company'),
        icon: <HomeWorkIcon />,
    },
    {
        path:"/home/couriers"  ,
        title:t('couriers'),
        icon: <ElectricMopedIcon />,
    },
    {
        path:"/home/banner"  ,
        title:t('banner'),
        icon: <ViewCarouselIcon />,
    },
    
]
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const { pathname } = useLocation();

  const getCategoryName = (pathname: string) => {
    if (pathname === "/home") return t("brandType");
    if (pathname === "/home/brand") return t("brand");
    if (pathname === "/home/company") return t("company");
    if (pathname === "/home/city") return t("city");
    if (pathname === "/home/country") return t("country");
    if (pathname === "/home/couriers") return t('couriers');
    if (pathname === "/home/banner") return t('banner');
    if (pathname === "/home/region") return t('region');
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
                ? "block bg-[#008524] text-white duration-200    "
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
