import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { useMenuSectionStore } from "@store";
import { GlobalTable, GlobalPogination, GlobalSearch } from "@ui";
import { ModalMenuSection } from "@modals";

function Index() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [change, setChange] = useState("");
  const { dataMenuSection, getDataMenuSection, isLoader, totlCount } = useMenuSectionStore();
  const [params, setParams] = useState({ size: 10, page: 1, search: change });
  const totleCuont2 = Math.ceil(totlCount / params?.size);

  // function useEfect getDataBranchDays <-------
  useEffect(() => {
    getDataMenuSection({ ...params, id });
  }, [id , params]);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

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

  // Props Global teble header-------------->
  const header = [
    { title: "S/N", value: "t/r" },
    { title: "Name Uz", value: "nameUz" },
    { title: "Name Ru", value: "nameRu" },
    { title: "Action", value: "menu-section" },
  ];
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between py-4">
        <GlobalSearch search={change} handleChange={handleChange} />
        <ModalMenuSection title="post" />
      </div>
      <GlobalTable
        header={header}
        body={dataMenuSection}
        skelatonLoader={isLoader}
      />
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
