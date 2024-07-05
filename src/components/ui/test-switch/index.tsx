import { ConfigProvider, Switch } from "antd";
import { useBannerStore , useBrandTypeStore} from "@store";

import { useState } from "react";

const Index = ({ activated, text , id }: { activated: boolean; text: string , id:number }) => {
  const [checked1, setChecked] = useState(activated);
  const { bannerActivate } = useBannerStore();
  const {brandTypeActivated} = useBrandTypeStore();

  const onChange = async (checked: boolean) => {
    const data = {
      id: id,
      activated: checked,
    };
    if (text == "banner") {
      const status = await bannerActivate(data);
      if (status === 200) {
        setChecked(!checked1);
        console.log(checked);
      }
    }else if(text =="brandType"){
      const status = await brandTypeActivated(data);
      if(status === 200){
        setChecked(!checked1);
        console.log(checked);
      }
    }
  };
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
