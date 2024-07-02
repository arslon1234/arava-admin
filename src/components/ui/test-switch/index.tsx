import { Switch } from "antd";
import { useBannerStore } from "@store";

import { useState } from "react";

const Index = ({ activated, text , id }: { activated: boolean; text: string , id:number }) => {
  const [checked1, setChecked] = useState(activated);
  const { bannerActivate } = useBannerStore();

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
    }
  };
  return (
    <>
      <Switch defaultChecked checked={checked1} onChange={onChange} />
    </>
  );
};

export default Index;
