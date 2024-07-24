import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useMenuCategoriesStore } from "@store";
import { GlobalTable  } from "@ui";
import {ModalTest} from "@modals"

function Index() {
  const { id } = useParams();
  const { dataMenuCategories, getDataMenuCategories, isLoader } =
    useMenuCategoriesStore();

  // function useEfect getDataBranchDays <-------
  useEffect(() => {
    getDataMenuCategories();
  }, [id]);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // Props Global teble header-------------->
  const header = [
    { title: "S/N", value: "t/r" },
    { title: "Name Uz", value: "nameUz" },
    { title: "Name Ru", value: "nameRu" },
  ];
  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between py-4">
        <h1>Test menu id  : {id}</h1>
        <ModalTest title="post" />
      </div>
      <GlobalTable header={header} body={dataMenuCategories} skelatonLoader={isLoader} />
    </>
  );
}

export default Index;
