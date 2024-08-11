import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {ModalBrandTaype} from "@modals"
import {GlobalTable , GlobalSearch} from "@ui";
import {useBrandTypeStore} from "@store"
import { Spin } from "antd";



function Index() {
const navigate = useNavigate()
const [change, setChange] = useState("")
const [ params, setParams] = useState({size: 10, page:0 , search:change})
const {getDataBrandType , dataBrandType , isLoader } =  useBrandTypeStore();
// const totleCuont2 = Math.ceil(totlCount / parms?.limit)

useEffect(() =>{
  getDataBrandType(params);
},[params]);

useEffect(()=>{
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const search = params.get("search");
  const searchString =  search ? search  : ""
  const pageNuber = page ? parseInt(page): 0;
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
  {title: "Name" , value: true ? "nameUz" : "nameRu" },
  {title: "Description" , value: true ? "descriptionUz" : "descriptioRu" },
  {title: "Activated" , value: "activatedBrandType" },
  {title: "Action" , value:"brandType"}
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
    <ModalBrandTaype title="post" 
    />
  </div>
  <Spin spinning={isLoader} size="large">
     <GlobalTable header={header} body={dataBrandType} skelatonLoader={isLoader}/>
  </Spin>
   {/* <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage} /> */}
  </>
}

export default Index