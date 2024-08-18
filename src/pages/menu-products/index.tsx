import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useMenuProductsStore } from "@store";
import { GlobalTable,  } from "@ui";
import { ModalMenuProducts } from "@modals";

function Index() {
  const { sectionId } = useParams();
  const { dataMenuProducts, getDataMenuProducts, isLoader,title } = useMenuProductsStore();

  // function useEfect getDataBranchDays <-------
  useEffect(() => {
    getDataMenuProducts(sectionId);
  }, [sectionId]);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-





  // Props Global teble header-------------->
  const header = [
    {title: "S/N" , value:"t/r"},
    {title: "Product name" , value:  "nameUz" },
    {title: "Description" , value:"descriptionUz"},
    {title: "Image url" , value:"imageUrl"},
    {title: "Action" , value:"menu-products"}
  ]

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between py-4">
        <h1 className="text-[20px] font-semibold">
        Menu Section name : <span className="text-[#3ad363] font-bold">{title}</span> 
        </h1>
        <ModalMenuProducts title="post" />
      </div>
      <GlobalTable
        header={header}
        body={dataMenuProducts}
        skelatonLoader={isLoader}
      />
    </>
  );
}

export default Index;
