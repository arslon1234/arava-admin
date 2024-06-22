import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";

import App from "../App";
import { Arror , SignIn , Brand, BrandType, Country, City, Company , Couriers ,} from "@pages"
import {HomeLayout} from "@layout"

const index = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<SignIn />} />
            <Route path="/home/*" element={<HomeLayout />} >
                <Route index element={<BrandType />} />
                <Route path="brand" element={<Brand />} />
                <Route path="country" element={<Country />} />
                <Route path="city" element={<City />} />
                <Route path="company" element={<Company />} />
                <Route path="couriers" element={<Couriers/>} />
            </Route>  
            <Route path="*" element={<Arror />} />
            
          </Route>
        )
      );
      return <RouterProvider router={router} />;
}

export default index;