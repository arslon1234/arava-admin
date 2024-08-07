import { ConfigProvider, Switch } from "antd";
import { useBannerStore , useBrandTypeStore , useBrandStore , useCompanyStore , useBranchStore , useBranchWorkingDaysStore} from "@store";

import { useState } from "react";

const Index = ({ activated, text , id }: { activated: boolean; text: string , id:number }) => {
  const [checked1, setChecked] = useState(activated);
  const { bannerActivate } = useBannerStore();
  const {brandTypeActivated} = useBrandTypeStore();
  const {activateBrand} = useBrandStore();
  const {activateCompany } = useCompanyStore();
  const {activatedBranch } = useBranchStore();
  const {activatedBranchDays } = useBranchWorkingDaysStore();


  // reyuzbil switch popsdagi quydagi "activated, text , id" qaiyatlar asosida ishbajaradi
  const onChange = async (checked: boolean) => {
    const data = {
      id: id,
      activated: checked,
    };
    if (text == "banner") {
      const status = await bannerActivate(data);
      if (status === 200) {
        setChecked(!checked1);
      }
    }else if(text =="brandType"){
      const status = await brandTypeActivated(data);
      if(status === 200){
        setChecked(!checked1);
      }
    }else if(text =="brand"){
      const status = await activateBrand(data);
      if(status === 200){
        setChecked(!checked1);
      }
    }else if(text =="company"){
      const status = await activateCompany(data);
      if(status === 200){
        setChecked(!checked1);
      }
    }else if(text =="branch"){
      const status = await activatedBranch(data);
      if(status === 200){
        setChecked(!checked1);
      }
    }else if(text =="branchDays"){
      const status = await activatedBranchDays(data);
      if(status === 200){
        setChecked(!checked1);
      }
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  return (
    <>
      <ConfigProvider
      theme={{
        token:{
          colorPrimary: "#008524"
        }
      }}
      >
        <Switch checked={checked1} onChange={onChange} />
      </ConfigProvider>
    </>
  );
};

export default Index;
