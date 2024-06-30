import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {DrawerBrand} from "@drawers"
import {GlobalTeble , GlobalSearch} from "@ui";
import {useBrandStore} from "@store"



function Index() {
const navigate = useNavigate()
const [change, setChange] = useState("")
const [ , setParams] = useState({limit: 10, page:1 , search:change})
const {getDataBrand , dataBrand , isLoader } =  useBrandStore();
// const totleCuont2 = Math.ceil(totlCount / parms?.limit)

useEffect(() =>{
  getDataBrand();
},[]);

useEffect(()=>{
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const search = params.get("search");
  const searchString =  search ? search  : ""
  const pageNuber = page ? parseInt(page): 1;
  setParams(preParams=>({
     ...preParams,
      page:pageNuber,
      search:searchString
  }));
  setChange(searchString)
  
},[location.search]);




 // Props Global teble -------------->
 const theder = [
  {title: "S/N" , value:"t/r"},
  {title: "Name" , value:"name" },
  {title: "Company name" , value:"companyName" },
  {title: "Country" , value:"countryName" },
  {title: "Region" , value:"regionName" },
  {title: "City" , value:"cityName" },
  {title: "Image" , value:"imageUrl" },

  {title: "Action" , value:"brand"}
]


//--- pagination tett mui <----
// const changePage = (value:number)=>{
//   setParams(preParams=>({
//       ...preParams,
//       page:value
//   }));
// }
//=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-


// Hendel chenge ------>
const hendalChange = (e:any)=>{
  const search = e.target.value;
  setChange(search)
  setParams(preParams=>({ ...preParams, search }))
  const searchParams = new URLSearchParams(location.search);
        searchParams.set("search", search)
        navigate (`?${searchParams}`)

}
///---------------------
  return <>
  <ToastContainer />
  <div className="py-3 flex items-center justify-between">
    <GlobalSearch search={change} hendelChange={hendalChange}/>
    <DrawerBrand />
  </div>
   <GlobalTeble heders={theder} body={dataBrand} skelatonLoader={isLoader}/>

   {/* <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage} /> */}
  </>
}

export default Index