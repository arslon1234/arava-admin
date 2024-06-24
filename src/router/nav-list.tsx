
import CategoryIcon from '@mui/icons-material/Category';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

import ApartmentIcon from '@mui/icons-material/Apartment';
import ElectricMopedIcon from '@mui/icons-material/ElectricMoped';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PublicIcon from '@mui/icons-material/Public';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

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
        icon: <PublicIcon />,
    },
    {
        path:"/home/couriers"  ,
        title:"Couriers",
        icon: <ElectricMopedIcon />,
    },
    {
        path:"/home/banner"  ,
        title:"Banner",
        icon: <ViewCarouselIcon />,
    },
]

export default navList;
