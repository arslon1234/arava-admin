import { useState } from "react";
import { Button, Popover } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";

import {
 
  useMenuProductsStore,
} from "@store";
import "./style.scss";



interface FadeMenuProps {
  title: string;
  productsId: string|undefined |number,
    menuSectionId: string | undefined 
}

const Index = ({ productsId , menuSectionId , title }: FadeMenuProps) => {
  const [visible, setVisible] = useState(false);

  const { deleteDataMenuProducts } = useMenuProductsStore();

  const deleteData = async () => {
    try {
      let status;
      switch (title) {
        case "menu-products":
          status = await deleteDataMenuProducts({menuSectionId  , productsId});
          break;
        default:
          console.log("No action defined for this title:", title);
          return;
      }
      if (status === 200) {
        setVisible(false);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const content = (
    <>
      <div className="px-4 py-2">
        <h3>Are you sure you want to delete?</h3>
        <div className="flex items-center justify-end gap-3 mt-2">
          <Button onClick={() => setVisible(false)} className="button-no">
            No
          </Button>
          <Button onClick={deleteData} className="button-yes">
            Yes
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Popover
        content={content}
        placement="bottomRight"
        trigger="click"
        visible={visible}
        onVisibleChange={(visible) => setVisible(visible)}
      >
        <Button
          onClick={() => setVisible(true)}
          style={{ border: "none", boxShadow: "none" }}
        >
          <DeleteIcon className=" text-zinc-500" />
        </Button>
      </Popover>
    </>
  );
};

export default Index;
