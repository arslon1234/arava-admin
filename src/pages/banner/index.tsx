import { useEffect , useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {ModalBanner} from "@modals"
import {GlobalTeble , GlobalSearch} from "@ui";
import {useBannerStore} from "@store"



function Index() {
const navigate = useNavigate()
const [change, setChange] = useState("")
const [ , setParams] = useState({limit: 10, page:1 , search:change})
const {getDataBanner , dataBanner , isLoader } =  useBannerStore();
// const totleCuont2 = Math.ceil(totlCount / parms?.limit)

useEffect(() =>{
    getDataBanner();
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
  {title: "Banner url" , value: "bannerUrl" },
  {title: "Image url" , value: "imageUrl" },
  {title: "Created by" , value: "createdBy" },
  {title: "Created date" , value: "createdDate"},
  {title: "Action" , value:"action3"}
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
    <ModalBanner title="post" 
    />
  </div>
   <GlobalTeble heders={theder} body={dataBanner} skelatonLoader={isLoader}/>

   {/* <GlobalPogination totleCuont={totleCuont2} page={parms?.page} setParams={changePage} /> */}
  </>
}

export default Index