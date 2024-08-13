import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ModalRegion } from "@modals";
import { GlobalTable, GlobalSearch, GlobalPogination } from "@ui";
import { useRegionStore } from "@store";
import { Spin } from "antd";

function Index() {
  const navigate = useNavigate();
  const [change, setChange] = useState("");
  const [params, setParams] = useState({ size: 10, page: 1, search: change });
  const { getDataRegion, dataRegion, isLoader, totlCount } = useRegionStore();
  const totleCuont2 = Math.ceil(totlCount / params?.size);

  useEffect(() => {
    getDataRegion(params);
  }, [params]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const search = params.get("search");
    const searchString = search ? search : "";
    const pageNuber = page ? parseInt(page) : 1;
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
    { title: "Region name", value: true ? "nameUz" : "nameRu" },
    { title: "Country name", value: "countryName" },
    { title: "Action", value: "region" },
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setChange(search);
    setParams((preParams) => ({ ...preParams, search }));
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("search", search);
    navigate(`?${searchParams}`);
  };
  ///---------------------
  return (
    <>
      <ToastContainer />
      <div className="py-3 flex items-center justify-between">
        <GlobalSearch search={change} handleChange={handleChange} />
        <ModalRegion title="post" />
      </div>
      <Spin spinning={isLoader} size="large">
        <GlobalTable
          header={header}
          body={dataRegion}
          skelatonLoader={isLoader}
        />
      </Spin>

      {totleCuont2 > 1 && (
        <div className="flex items-center justify-end">
          <GlobalPogination
            totleCuont={totleCuont2}
            page={params?.page}
            setParams={changePage}
          />
        </div>
      )}
    </>
  );
}

export default Index;
