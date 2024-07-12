import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useBranchWorkingDaysStore } from "@store";
import { GlobalTable  } from "@ui";
import {ModalBranchDaysCreate} from "@modals"

function Index() {
  const { id } = useParams();
  const { dataBranchWorkingDays, getDataBranchDays, isLoader } =
    useBranchWorkingDaysStore();

  // function useEfect getDataBranchDays <-------
  useEffect(() => {
    getDataBranchDays(id);
  }, [id]);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // Props Global teble header-------------->
  const header = [
    // { title: "S/N", value: "t/r" },
    { title: "Days", value: "days" },
    { title: "Working Start Time", value: "workingStartTime" },
    { title: "Working End Time", value: "workingEndTime" },
    { title: "Open", value: "activatedBranchDays" },
    { title: "Action", value: "branchWorkingDays" },
  ];
  return (
    <>
      <ToastContainer />
      {
        dataBranchWorkingDays?.length < 6  && <div className="flex justify-start py-3">
          <ModalBranchDaysCreate />
        </div>
      }
      <GlobalTable header={header} body={dataBranchWorkingDays} skelatonLoader={isLoader} />
    </>
  );
}

export default Index;
