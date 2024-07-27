import { useState } from "react";
import { Button, Popover } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  useBannerStore,
  useBrandStore,
  useBrandTypeStore,
  useCityStore,
  useCountryStore,
  useCouriersStore,
  useRegionStore,
  useCompanyStore,
  useCuisinesStore,
  useBranchStore,
  useMenuStore,
  useMenuCategoriesStore,
  useMenuSectionStore,
} from "@store";
import "./style.scss";

interface FadeMenuProps {
  id: number;
  title: string;
}

const Index = ({ id, title }: FadeMenuProps) => {
  const [visible, setVisible] = useState(false);

  const { deleteDataBanner } = useBannerStore();
  const { deleteDataBrand } = useBrandStore();
  const { deleteDataBrandType } = useBrandTypeStore();
  const { deleteDataCity } = useCityStore();
  const { deleteDataCountry } = useCountryStore();
  const { deleteDataCouriers } = useCouriersStore();
  const { deleteDataRegion } = useRegionStore();
  const { deleteDataCompany } = useCompanyStore();
  const { deleteDataCuisines } = useCuisinesStore();
  const { deleteDataBranch } = useBranchStore();
  const { deleteDataMenu } = useMenuStore();
  const { deleteDataMenuCategories } = useMenuCategoriesStore();
  const { deleteDataMenuSection } = useMenuSectionStore();

  const deleteData = async () => {
    try {
      let status;
      switch (title) {
        case "banner":
          status = await deleteDataBanner(id);
          break;
        case "brand":
          status = await deleteDataBrand(id);
          break;
        case "brandType":
          status = await deleteDataBrandType(id);
          break;
        case "city":
          status = await deleteDataCity(id);
          break;
        case "country":
          status = await deleteDataCountry(id);
          break;
        case "couriers":
          status = await deleteDataCouriers(id);
          break;
        case "region":
          status = await deleteDataRegion(id);
          break;
        case "company":
          status = await deleteDataCompany(id);
          break;
        case "cuisines":
          status = await deleteDataCuisines(id);
          break;
        case "branch":
          status = await deleteDataBranch(id);
          break;
        case "menu":
          status = await deleteDataMenu(id);
          break;
        case "menu-categories":
          status = await deleteDataMenuCategories(id);
          break;
        case "menu-section":
          status = await deleteDataMenuSection(id);
          break;
        default:
          alert("Delete, id - " + id);
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
