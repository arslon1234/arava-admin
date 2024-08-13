import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { DrawerBranch } from "@drawers";
import { GlobalTable, GlobalSearch, GlobalPogination } from "@ui";
import { useBranchStore } from "@store";
import { Spin } from "antd";

function Index() {
  const navigate = useNavigate();
  const [change, setChange] = useState("");
  const [params, setParams] = useState({ size: 10, page: 1, search: change });
  const { getDataBranch, dataBranch, isLoader, totlCount } = useBranchStore();
  const totleCuont2 = Math.ceil(totlCount / params?.size);
  // console.log(totleCuont2);

  useEffect(() => {
    getDataBranch(params);
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

  // Props Global teble header-------------->
  const header = [
    { title: "S/N", value: "t/r" },
    { title: "Branch name", value: "name" },
    { title: "Brand", value: "brandName" },
    { title: "Activated", value: "activatedBranch" },
    { title: "Image", value: "imageUrl" },

    { title: "Action", value: "branch" },
  ];

  //--- pagination tett mui <----
  const changePage = (value: number) => {
    setParams((preParams) => ({
      ...preParams,
      page: value,
    }));
  };
  //=-=-=-=-=-=-=-=-=-=-=-=--=--=-=-

  // Hendel chenge handleChange------>
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

        <DrawerBranch title="post" />
      </div>

      {/* GlobalTable */}
      <Spin spinning={isLoader} size="large">
        <GlobalTable
          header={header}
          body={dataBranch}
          skelatonLoader={isLoader}
        />
      </Spin>

      {/* GlobalPogination  */}
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
