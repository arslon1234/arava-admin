import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import { Error, SignIn, Brand, BrandType,
  Country, City, Company, Couriers, Banner, Region, Branch,
   Cuisines, WorkingDays, Menu, MenuSection, MenuCategories,
    Products, MenuProducts , BrandId } from "@pages";
import { HomeLayout } from "@layout";

const index = () => {
  const router = createBrowserRouter(
      createRoutesFromElements(
          <Route path="/" element={<App />}>
              <Route index element={<SignIn />} />
              <Route path="/home/*" element={<HomeLayout />} >
                  <Route index element={<Couriers />} />
                  <Route path="brand" element={<Brand />} />
                  <Route path="brand/:id" element={<BrandId/>} />
                  <Route path="country" element={<Country />} />
                  <Route path="city" element={<City />} />
                  <Route path="company" element={<Company />} />
                  <Route path="brand-type" element={<BrandType />} />
                  <Route path="banner" element={<Banner />} />
                  <Route path="region" element={<Region />} />
                  <Route path="branch" element={<Branch />} />
                  <Route path="branch/:id" element={<WorkingDays />} />
                  <Route path="cuisines" element={<Cuisines />} />
                  <Route path="menu" element={<Menu />} />
                  <Route path="menu/:id/section/:sectionId" element={<MenuProducts />} />
                  <Route path="menu/:id" element={<MenuSection />} />
                  <Route path="categories" element={<MenuCategories />} />
                  <Route path="products" element={<Products />} />
              </Route>
              <Route path="*" element={<Error />} />
          </Route>
      )
  );
  return <RouterProvider router={router} />;
}

export default index;
