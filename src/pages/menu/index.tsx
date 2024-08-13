import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ModalMenu } from "@modals";
import { GlobalTable, GlobalSearch, GlobalPogination } from "@ui";
import { useMenuStore } from "@store";
import { Spin } from "antd";

///      Menu pgedi paramsta page 1 danboshlanmayab shuni bekendch togrilash ligi kerk 
function Index() {
  const navigate = useNavigate();
  const [change, setChange] = useState("");
  const [params, setParams] = useState({ size: 10, page: 0, search: change });
  const { getDataMenu, dataMenu, isLoader, totlCount } = useMenuStore();
  const totleCuont2 = Math.ceil(totlCount / params?.size);

  useEffect(() => {
    getDataMenu(params);
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
    { title: "Menu name", value: "name" },
    { title: "Branch name", value: "branchName" },
    { title: "Description", value: "description" },
    { title: "Action", value: "menu" },
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
        <ModalMenu title="post" />
      </div>
      <Spin spinning={isLoader} size="large">
        <GlobalTable
          header={header}
          body={dataMenu}
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
