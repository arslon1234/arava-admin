import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {ModalTest} from "@modals"
import {GlobalTable , GlobalSearch} from "@ui";
import {useMenuCategoriesStore} from "@store"



function Index() {
const navigate = useNavigate()
const [change, setChange] = useState("")
const [ , setParams] = useState({limit: 10, page:1 , search:change})
const {getDataMenuCategories, dataMenuCategories  , isLoader } =  useMenuCategoriesStore();
// const totleCuont2 = Math.ceil(totlCount / parms?.limit)

useEffect(() =>{
  getDataMenuCategories();
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
  {title: "Menu categories" , value: true ? "nameUz" : "nameRu" },
  {title: "Test" , value:"test"},
  {title: "Test" , value:"test"},
  {title: "Action" , value:"test"}
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
const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
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
    <ModalTest title="post" 
    />
  </div>
   <GlobalTable header={header} body={dataMenuCategories} skelatonLoader={isLoader}/>

   {/* <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage} /> */}
  </>
}

export default Index