import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useMenuSectionStore } from "@store";
import { GlobalTable  } from "@ui";
import {ModalMenuSection} from "@modals"

function Index() {
  const { id } = useParams();
  const { dataMenuSection, getDataMenuSection, isLoader } =
  useMenuSectionStore();

  // function useEfect getDataBranchDays <-------
  useEffect(() => {
    getDataMenuSection(id);
  }, [id]);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

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
      <div className="flex items-center justify-end py-4">
        
        <ModalMenuSection title="post" />
      </div>
      <GlobalTable header={header} body={dataMenuSection} skelatonLoader={isLoader} />
    </>
  );
}

export default Index;
