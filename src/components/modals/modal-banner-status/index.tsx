import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";

import { useBannerStore , useBrandTypeStore} from "@store";

interface PropsId {
  id?: string | number;
  text?: string;
}
const options = ["Activ", "Activ emas"];

const ITEM_HEIGHT = 48;

export default function LongMenu({ id, text }: PropsId) {
  const { bannerActivate } = useBannerStore();
  const { brandTypeActivated } = useBrandTypeStore();
  //  console.log(orderId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStatus = async (e: any) => {
    const data = {
      id: id,
      activated: e.target.firstChild.data == "Activ" ? true : false,
    };
    if (text == "banner") {
      const status = await bannerActivate(data);
      if (status === 200) {
        handleClose();
        toast.success("update success full");
      } else {
        toast.error("An error occurred during activation");
        handleClose();
      }
    }else if (text == "brandType"){
      const status = await brandTypeActivated(data);
      if (status === 200) {
        handleClose();
        toast.success("update success full");
      } else {
        toast.error("An error occurred during activation");
        handleClose();
      }
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={(e) => changeStatus(e)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
