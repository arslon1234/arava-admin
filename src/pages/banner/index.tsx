import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";

import { ModalBanner } from "@modals";
import { GlobalPogination, GlobalTable } from "@ui";
import { useBannerStore } from "@store";
import { Spin } from "antd";

function Index() {
  // const navigate = useNavigate()

  ///                   page 1 dan boshlanmagan eslatma , bekendchi to'grilashligi kerak !!!!
  const [change, setChange] = useState("");
  const [params, setParams] = useState({ size: 10, page: 0, search: change });
  const { getDataBanner, dataBanner, isLoader, totlCount } = useBannerStore();
  const totleCuont2 = Math.ceil(totlCount / params?.size);

  +
  useEffect(() => {
    getDataBanner(params);
  }, [params]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const search = params.get("search");
    const searchString = search ? search : "";
    const pageNuber = page ? parseInt(page) : 0;
    setParams((preParams) => ({
      ...preParams,
      page: pageNuber,
      search: searchString,
    }));
    setChange(searchString);
  }, [location.search]);

  // Props Global teble -------------->
  const header = [
    { title: "S/N", value: "t/r" },
    // {title: "Banner url" , value: "bannerUrl" },
    { title: "Created date", value: "createdDate" },
    { title: "Image url", value: "imageUrl" },
    { title: "Activated", value: "activatedBanner" },
    { title: "Action", value: "banner" },
  ];

  //--- pagination tett mui <----
  const changePage = (value: number) => {
    setParams((preParams) => ({
      ...preParams,
      page: value,
    }));
  };
  //=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-

  // Hendel chenge ------>
  // const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const search = e.target.value;
  //   setChange(search)
  //   setParams(preParams=>({ ...preParams, search }))
  //   const searchParams = new URLSearchParams(location.search);
  //         searchParams.set("search", search)
  //         navigate (`?${searchParams}`)

  // }
  ///---------------------
  return (
    <>
      <ToastContainer />
      <div className="py-3 flex items-center justify-end">
        {/* <GlobalSearch search={change} handleChange={handleChange}/> */}
        <ModalBanner title="post" />
      </div>
      <Spin spinning={isLoader} size="large">
        <GlobalTable
          header={header}
          body={dataBanner}
          skelatonLoader={isLoader}
        />
      </Spin>
      <div className="flex items-center justify-end">
        {totleCuont2 > 1 && (
          <GlobalPogination
            totleCuont={totleCuont2}
            page={params?.size}
            setParams={changePage}
          />
        )}
      </div>
    </>
  );
}

export default Index;
