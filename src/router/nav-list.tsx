
import CategoryIcon from '@mui/icons-material/Category';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

import ApartmentIcon from '@mui/icons-material/Apartment';
import LanguageIcon from '@mui/icons-material/Language';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

interface navListInterface {
    path: string,
    title :string,
    icon: JSX.Element,
}


const navList:navListInterface[] = [
    {
      path:"/home"  ,
      title:"Brand type",
      icon: <CategoryIcon />,
    },
    {
        path:"/home/brand"  ,
        title:"Brand",
        icon: <MilitaryTechIcon />,
    },
    {
        path:"/home/company"  ,
        title:"Company",
        icon: <HomeWorkIcon />,
    },
    {
        path:"/home/city"  ,
        title:"City",
        icon: <ApartmentIcon />,
    },
    {
        path:"/home/country"  ,
        title:"Country",
        icon: <LanguageIcon />,
    },
    {
        path:"/home/couriers"  ,
        title:"Couriers",
        icon: <ElectricMopedIcon />,
    },
]

export default navList;
