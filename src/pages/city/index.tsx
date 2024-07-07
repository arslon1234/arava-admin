import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {ModalCity} from "@modals"
import {GlobalTable , GlobalSearch } from "@ui";
import {useCityStore} from "@store"



function Index() {
const navigate = useNavigate()
const [change, setChange] = useState("")
const [ , setParams] = useState({limit: 10, page:1 , search:change})
const {getDataCity , dataCity , isLoader } =  useCityStore();
// const totleCuont2 = Math.ceil(totlCount / parms?.limit)

useEffect(() =>{
  getDataCity();
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
 const header = [
  {title: "S/N" , value:"t/r"},
  {title: "City name" , value: true ? "nameUz" : "nameRu" },
  {title: "Region name" , value:"regionName"},
  {title: "Action" , value:"city"}
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
const handleChange = (e:any)=>{
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
    <GlobalSearch search={change} handleChange={handleChange}/>
    <ModalCity title="post" 
    />
  </div>
   <GlobalTable header={header} body={dataCity} skelatonLoader={isLoader}/>
   {/* <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage} /> */}
  </>
}

export default Index