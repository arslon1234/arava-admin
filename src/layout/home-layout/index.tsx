import * as React from "react";
import { Layout, Menu, Typography, Button, theme } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import CategoryIcon from "@mui/icons-material/Category";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ElectricMopedIcon from "@mui/icons-material/ElectricMoped";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PublicIcon from "@mui/icons-material/Public";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { Account, DropdownLanguage } from "@ui";
import './style.scss'

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function ResponsiveDrawer() {
  const [collapsed, setCollapsed] = React.useState(false);
  const { t } = useTranslation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  interface navListInterface {
    path: string;
    title: string;
    icon: React.ReactNode;
  }

  const navList: navListInterface[] = [
    { path: "/home", title: t("Couriers"), icon: <ElectricMopedIcon/>},
    { path: "/home/banner", title: t("Banner"), icon: <ViewCarouselIcon /> },
    { path: "/home/brand-type", title: t("Brand type"), icon: <CategoryIcon /> },
    { path: "/home/brand", title: t("Brand"), icon: <MilitaryTechIcon /> },
    { path: "/home/country", title: t("Country"), icon: <PublicIcon /> },
    { path: "/home/region", title: t("Region"), icon: <SouthAmericaIcon /> },
    { path: "/home/city", title: t("City"), icon: <ApartmentIcon /> },
    { path: "/home/company", title: t("Company"), icon: <HomeWorkIcon /> },
    { path: "/home/branch", title: t("Branch"), icon: <AddHomeWorkIcon /> },
    { path: "/home/cuisines", title: t("Cuisines"), icon: <FastfoodIcon /> },
    { path: "/home/menu", title: t("Menu"), icon: <RestaurantMenuIcon /> },
    { path: "/home/categories", title: t("Categories"), icon: <MenuBookIcon /> },
    { path: "/home/products", title: t("Products"), icon: <ProductionQuantityLimitsIcon /> },
  ];

  const { pathname } = useLocation();

  const getCategoryName = (pathname: string) => {
    if (pathname === "/home/brand-type") return t("Brand type");
    if (pathname === "/home/brand") return t("Brand");
    if (pathname === "/home/company") return t("Company");
    if (pathname === "/home/city") return t("City");
    if (pathname === "/home/country") return t("Country");
    if (pathname === "/home") return t("Couriers");
    if (pathname === "/home/banner") return t("Banner");
    if (pathname === "/home/region") return t("Region");
    if (pathname === "/home/branch") return t("Branch");
    if (pathname === "/home/cuisines") return t("Cuisines");
    if (pathname === "/home/menu") return t("Menu");
    if (pathname === "/home/categories") return t("Categories");
    if (pathname === "/home/products") return t("Products");
    if (/^\/home\/branch\/\d+$/.test(pathname)) return t("Branch working days"); 
    if (/^\/home\/menu\/\d+$/.test(pathname)) return t("Menu sections"); 
    return "Error";
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#FFF" }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="light" 
        width={250}
        style={{ 
          position: "fixed", 
          minHeight: '100vh' 
        }} 
      >
        <div className="logo" style={{ padding: "16px", textAlign: "center" }}>
          <img
           src="https://www.brandbucket.com/sites/default/files/logo_uploads/508113/large_aravva.png"
            alt="logo"
            style={{ minWidth: "100%", height: "60px" , objectFit:"fill"}}
          />
        </div>
        <Menu theme="light" mode="inline" selectedKeys={[pathname]}>
          {navList.map((el) => (
            <Menu.Item key={el.path} className={pathname === el.path ? 'custom-active-item text-[18px]  ' : 'text-[18px]'}>
              
              <NavLink className="flex items-center gap-6"  to={el.path}> <div>{el.icon}</div> {el.title}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Header 
          style={{ 
            padding: 0, 
            height: 70, 
            background: colorBgContainer, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            position: 'fixed',
            width: `calc(100% - ${collapsed ? 80 : 250}px)`,
            zIndex: 1
          }} 
        >
          <div className="flex items-start gap-5 ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined style={{fontSize:24}}/> : <MenuFoldOutlined  style={{fontSize:24}}/>}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 34,
                height: 34,
              }}
            />
            <Title level={4} style={{ margin: 0, color: "#767676" }}>
              {getCategoryName(pathname)}
            </Title>
          </div>
          <div style={{ display: "flex", alignItems: "center", paddingRight:30}}>
            <DropdownLanguage />
            <Account />
          </div>
        </Header>
        <Content
          style={{
            margin: "90px 16px 24px 16px",
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
