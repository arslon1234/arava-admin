import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";

import App from "../App";
import { Error , SignIn , Brand, BrandType,
   Country, City, Company , Couriers , Banner , Region  } from "@pages"
import {HomeLayout} from "@layout"

const index = ()=>{
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<SignIn />} />
            <Route path="/home/*" element={<HomeLayout />} >
                <Route index element={<Couriers />} />
                <Route path="brand" element={<Brand />} />
                <Route path="country" element={<Country />} />
                <Route path="city" element={<City />} />
                <Route path="company" element={<Company />} />
                <Route path="brand-type" element={<BrandType/>} />
                <Route path="banner" element={<Banner/>} />
                <Route path="region" element={<Region/>} />
            </Route>  
            <Route path="*" element={<Error />} />
            
          </Route>
        )
      );
      return <RouterProvider router={router} />;
}

export default index;